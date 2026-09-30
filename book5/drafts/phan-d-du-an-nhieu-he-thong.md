# Phần D: Dự án có nhiều hệ thống (web + app + nhiều vai trò)

📌 **Tóm tắt phần này** — Phần A-C dựng khung cho các dự án **độc lập** với
nhau. Phần này giải quyết tình huống thực tế phổ biến hơn: **1 sản phẩm gồm
nhiều hệ thống dùng chung nghiệp vụ**, ví dụ:

| Hệ thống | Nền tảng | Người dùng |
|---|---|---|
| Khách hàng | Web responsive **+ app native iOS/Android** | Người mua hàng |
| Merchant | Web | Chủ cửa hàng |
| Admin | Web | Nhân viên vận hành |

Sau phần này bạn sẽ biết: khi nào gộp chung repo, cách bố trí tầng dùng
chung giữa các hệ thống, và cách viết test **xuyên hệ thống** — loại test có
giá trị cao nhất nhưng cũng dễ làm sai nhất.

## D1. Gộp chung 1 repo hay tách mỗi hệ thống 1 repo?

Ở Phần A đã chốt: **mỗi dự án 1 repo riêng**, dùng chung package
`qa-automation-core`. Nhưng "dự án" ở đây nghĩa là gì — mỗi **hệ thống** là
1 dự án, hay cả **sản phẩm** là 1 dự án?

Câu trả lời phụ thuộc 1 câu hỏi duy nhất: **dữ liệu có chảy giữa các hệ
thống không?**

| | Tách mỗi hệ thống 1 repo | Gộp cả sản phẩm vào 1 repo |
|---|---|---|
| Khi nào đúng | Các hệ thống **không liên quan** nhau (2 sản phẩm khác nhau của công ty) | Các hệ thống **dùng chung backend/nghiệp vụ**, dữ liệu chảy qua lại |
| Test xuyên hệ thống | Không viết được (không biết đặt ở repo nào) | Viết bình thường |
| Code tạo dữ liệu | Bị lặp ở mỗi repo | Viết 1 lần, dùng chung |

Với sản phẩm 3 hệ thống ở trên, câu trả lời là **gộp chung 1 repo** — vì
những test đáng giá nhất lại là test đi xuyên qua cả 3:

> Admin tạo merchant → Merchant đăng nhập thấy mình trong hệ thống →
> Khách hàng đặt đơn của merchant đó → Merchant thấy đơn vừa đặt →
> Admin thấy giao dịch

Nếu tách 3 repo, bài test trên **không biết đặt ở đâu**, và đoạn code "tạo 1
merchant" sẽ phải viết lại ở cả 3 repo.

> **Chú ý phân biệt:** gộp 3 hệ thống vào 1 repo **không** mâu thuẫn với
> quyết định ở Phần A. `qa-automation-core` vẫn là repo riêng, vẫn dùng
> chung cho mọi sản phẩm của công ty. Cái được gộp là 3 **hệ thống của cùng
> 1 sản phẩm**, không phải gộp core vào dự án.

## D2. Cấu trúc thư mục

```
project-<name-san-pham>/
├── requirements.txt          → qa-automation-core[mobile] @ git+...@v1.3.0
├── config.json               → NHIỀU URL cho mỗi môi trường
├── conftest.py               → lắp ráp toàn bộ
├── common/                   ← dùng chung GIỮA 3 hệ thống
│   ├── api/clients.py        → CustomerApi, MerchantApi, AdminApi
│   └── data/factory.py       → tạo merchant, tạo khách hàng (qua API)
├── customer_web/  pages/  tests/    ← web responsive
├── customer_app/  screens/ tests/   ← app native (Appium)
├── merchant_web/  pages/  tests/
├── admin_web/     pages/  tests/
└── e2e/           tests/            ← test xuyên hệ thống
```

**2 quy tắc bố trí:**

1. `customer_web` và `customer_app` là **2 thư mục riêng** (khác công cụ,
   khác locator), nhưng **dùng chung** `common/api` và `common/data` — dựng
   dữ liệu 1 lần, kiểm tra được trên cả web lẫn app.
2. Thứ gì dùng ở **từ 2 hệ thống trở lên** thì đưa vào `common/`. Thứ gì chỉ
   1 hệ thống dùng thì để trong thư mục hệ thống đó — đúng nguyên tắc C3, chỉ
   đổi phạm vi từ "giữa các dự án" thành "giữa các hệ thống".

## D3. Config nhiều URL

Khác với dự án 1 hệ thống (`base_url` duy nhất), ở đây mỗi môi trường phải
khai báo **nhiều địa chỉ**:

```json
{
  "dev": {
    "customer_web_url": "https://customer.dev.example.com",
    "merchant_web_url": "https://merchant.dev.example.com",
    "admin_web_url": "https://admin.dev.example.com",
    "api_url": "https://api.dev.example.com",
    "app": {
      "platform": "Android",
      "app_path": "apps/customer-dev.apk",
      "appium_server": "http://127.0.0.1:4723"
    }
  },
  "staging": { "...": "..." }
}
```

Hàm `load_config()` của core (mục A6) không cần sửa gì — nó trả về nguyên cả
khối, dự án tự lấy khoá nào cần. Đây là dấu hiệu cho thấy thiết kế ở Phần A
đủ tổng quát: **thêm 1 tình huống mới mà không phải đụng vào core.**

## D4. Tầng dùng chung — API client và nhà máy dữ liệu

`common/api/clients.py` — 3 client cho 3 hệ thống, cùng kế thừa
`BaseApiClient`:

```python
from qa_automation_core.base_api_client import BaseApiClient


class TokenApiClient(BaseApiClient):
    """Phan dung chung: giu token va gan vao header Authorization.

    TODO: doi lai cho dung cach he thong that xac thuc (Bearer, Cookie,
    X-API-Key...). Chi sua o DAY, khong sua trong tung test.
    """

    def __init__(self, api_context, token=None):
        super().__init__(api_context)
        self._token = token

    def set_token(self, token: str) -> None:
        self._token = token

    def _auth_headers(self) -> dict:
        return {"Authorization": f"Bearer {self._token}"} if self._token else {}


class CustomerApi(TokenApiClient):
    """API he thong khach hang - dung cho CA web responsive LAN app native."""

    def place_order(self, payload):
        return self.post("/orders", data=payload)


class AdminApi(TokenApiClient):
    def create_merchant(self, payload):
        return self.post("/admin/merchants", data=payload)

    def delete_merchant(self, merchant_id):
        return self.delete(f"/admin/merchants/{merchant_id}")
```

> Nếu chưa biết chắc 3 hệ thống dùng chung 1 backend hay mỗi hệ thống 1
> backend riêng, cứ **tách sẵn 3 client** như trên. Sau này xác nhận dùng
> chung thì chỉ cần gộp lớp cha — các test không phải sửa dòng nào.

`common/data/factory.py` — nhà máy sinh dữ liệu, **lý do chính** khiến 3 hệ
thống phải chung repo:

```python
from uuid import uuid4


class TestDataError(Exception):
    """Loi khi DUNG du lieu dau vao - KHONG phai bai test that bai.

    Phan biet ro 2 thu nay rat quan trong luc doc bao cao: dung `assert` o
    day se hien thanh "test FAILED", nguoi doc tuong ung dung sai, mat cong
    dieu tra nham huong.
    """


def _unique_suffix() -> str:
    """Dinh kem vao name/email de khong trung du lieu.

    Dung uuid chu KHONG dung thoi gian: chay song song (pytest-xdist) thi 2
    tien trinh co the roi vao cung 1 mili giay -> trung email -> do oan.
    """
    return uuid4().hex[:10]


def create_merchant(admin_api, cleanup=None) -> dict:
    """Admin tao 1 merchant moi. Tra ve dict thong tin merchant."""
    suffix = _unique_suffix()
    payload = {
        "name": f"Merchant Test {suffix}",
        "email": f"merchant{suffix}@test.local",
        "password": "Test@12345",
    }
    response = admin_api.create_merchant(payload)
    if response.status not in (200, 201):
        raise TestDataError(
            f"Khong dung duoc du lieu dau vao (tao merchant): HTTP {response.status}. "
            f"Day la loi CHUAN BI, khong phai bai test that bai."
        )
    merchant = response.json()

    if cleanup is not None:
        cleanup(lambda: admin_api.delete_merchant(merchant["id"]))

    return {**payload, **merchant}
```

3 điểm đáng chú ý trong hàm này:

| Điểm | Vì sao |
|---|---|
| Tạo qua **API** chứ không qua giao diện | Nhanh hơn hàng chục lần, và không phụ thuộc giao diện đang có lỗi hay không |
| Hậu tố bằng **`uuid`**, không phải thời gian | Chạy song song (`pytest-xdist`) 2 tiến trình có thể rơi vào cùng 1 mili giây → trùng email → đỏ oan |
| Ném `TestDataError` thay vì `assert` | Đọc báo cáo là biết ngay "lỗi chuẩn bị dữ liệu" chứ không phải "ứng dụng sai" — xem Phần C mục C4, quy tắc 4 |
| Nhận `cleanup` để tự đăng ký xoá | Không để lại rác dữ liệu (mục A10) — người viết test không phải nhớ |

## D5. Lắp ráp `conftest.py`

Đây là nơi duy nhất nối core với sản phẩm. 4 nhóm fixture:

**(1) Config và API:**

```python
@pytest.fixture(scope="session")
def config(env_name) -> dict:
    cfg = load_config("config.json", env_name)
    if "example.com" in cfg.get("customer_web_url", ""):
        pytest.skip("config.json dang la URL mau - thay bang URL that truoc khi chay")
    return cfg


@pytest.fixture(scope="session")
def api_context(playwright, config):
    context = new_api_context(playwright, config["api_url"])
    yield context
    context.dispose()


@pytest.fixture
def admin_api(api_context) -> AdminApi:
    return AdminApi(api_context)
```

**(2) Tài khoản test — đọc từ biến môi trường, KHÔNG hardcode:**

```python
def _env_var(name: str) -> str:
    """Doc tai khoan test tu bien moi truong - thieu thi BO QUA test."""
    value = os.environ.get(name)
    if not value:
        pytest.skip(f"Chua khai bao bien moi truong {name} (tai khoan test)")
    return value


@pytest.fixture
def admin_api_logged_in(admin_api) -> AdminApi:
    response = admin_api.login(
        _env_var("ADMIN_EMAIL"), _env_var("ADMIN_PASSWORD")
    )
    admin_api.set_token(response.json()["token"])
    return admin_api
```

> **Bảo mật — quy tắc không có ngoại lệ:** mật khẩu tài khoản test **không
> bao giờ** viết thẳng vào repo. Trên máy cá nhân đặt biến môi trường, trên
> CI dùng Secrets (xem D7). Repo bị lộ thì mật khẩu cũng không lộ theo.

**(3) Trang web đã đăng nhập sẵn theo vai trò** — dùng `get_session` (mục A8):

```python
def _session_for_role(browser, config, role: str):
    """Dang nhap 1 lan cho 1 vai tro roi tai dung phien do cho moi test sau."""

    def login(page):
        url = config[f"{role}_web_url"]
        page.goto(f"{url}/login")
        page.fill("#email", _env_var(f"{role.upper()}_EMAIL"))
        page.fill("#password", _env_var(f"{role.upper()}_PASSWORD"))
        page.click("#dang-nhap")
        page.wait_for_url(f"{url}/**")

    return get_session(browser, role, login)


@pytest.fixture
def admin_merchants(browser, request, config, viewport_name):
    from admin_web.pages.merchant_orders import AdminMerchantsPage

    for page in _logged_in_page(browser, config, viewport_name, "admin"):
        yield from with_screenshot_on_failure(
            request, AdminMerchantsPage(page, config["admin_web_url"])
        )
```

**(4) Driver Appium cho app native** — tự bỏ qua nếu máy chưa có Appium:

```python
@pytest.fixture
def app_driver(config):
    """Test app tu dong BO QUA (skip) neu chua cai Appium hoac chua bat
    Appium server - de may chi chay web van chay duoc binh thuong."""
    webdriver = pytest.importorskip(
        "appium.webdriver",
        reason="Chua cai Appium. Cai bang: pip install 'qa-automation-core[mobile]'",
    )
    from appium.options.common import AppiumOptions

    app_config = config["app"]
    options = AppiumOptions().load_capabilities({
        "platformName": app_config["platform"],
        "appium:automationName": "UiAutomator2"
            if app_config["platform"] == "Android" else "XCUITest",
        "appium:app": app_config["app_path"],
        "appium:autoGrantPermissions": True,
    })
    driver = webdriver.Remote(app_config["appium_server"], options=options)
    yield driver
    driver.quit()
```

`pytest.importorskip` là điểm quan trọng: máy của member chỉ làm web sẽ thấy
test app **SKIP** kèm lời nhắc, chứ không thấy một đống lỗi đỏ khó hiểu.

## D6. Test xuyên hệ thống — phần giá trị nhất

```python
from common.data.factory import create_merchant


def test_customer_order_appears_for_merchant(
    admin_api_logged_in, customer_api, merchant_orders, cleanup
):
    """Admin tao merchant -> khach dat don qua API -> merchant thay don tren UI."""
    merchant = create_merchant(admin_api_logged_in, cleanup)

    response = customer_api.place_order(
        {"merchant_id": merchant["id"], "items": [{"sku": "SP001", "qty": 1}]}
    )
    assert response.status in (200, 201)
    order_code = response.json()["order_code"]

    merchant_orders.open_order_list().search_order(order_code)

    assert merchant_orders.has_order(order_code)
    assert merchant_orders.order_status(order_code) == "Cho xac nhan"
```

**Công thức của 1 test xuyên hệ thống:**

1. **Dựng dữ liệu qua API** (nhanh, ổn định) — không bấm chuột qua giao diện
   để tạo dữ liệu đầu vào.
2. **Kiểm tra trên giao diện** của hệ thống cần xác minh.
3. **Đăng ký dọn dẹp** ngay lúc tạo, không để cuối test.

**3 cái bẫy thường gặp:**

| Bẫy | Hậu quả | Cách tránh |
|---|---|---|
| Dựng dữ liệu bằng cách bấm qua giao diện | Test chậm gấp nhiều lần, và hỏng lây khi giao diện tạo dữ liệu có lỗi | Luôn dựng bằng API |
| Test này phụ thuộc dữ liệu test kia tạo ra | Chạy riêng lẻ thì fail, đổi thứ tự cũng fail | Mỗi test tự tạo dữ liệu của mình |
| Assert vào tổng số lượng (vd "có đúng 5 merchant") | Flaky khi môi trường có người khác dùng chung | Chỉ assert vào **bản ghi mình vừa tạo** |

## D7. CI — tách theo tầng, chạy cái nhanh trước

Test xuyên hệ thống chậm hơn test đơn lẻ nhiều lần. Đừng bắt mọi lần đẩy
code phải chờ hết:

```yaml
jobs:
  # Test WEB 3 he thong - chay moi lan day code
  web:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.13"
      - run: pip install -r requirements.txt
      - run: playwright install --with-deps chromium
      - name: Chay test web 3 he thong
        env:
          ADMIN_EMAIL: ${{ secrets.ADMIN_EMAIL }}
          ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
          MERCHANT_EMAIL: ${{ secrets.MERCHANT_EMAIL }}
          MERCHANT_PASSWORD: ${{ secrets.MERCHANT_PASSWORD }}
        run: pytest customer_web merchant_web admin_web --env=dev --alluredir=allure-results

  # Test E2E xuyen he thong - cham hon, chi chay 1 lan/dem
  e2e:
    if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
    runs-on: ubuntu-latest
    steps:
      # ... cac buoc tuong tu
      - run: pytest e2e --env=dev --alluredir=allure-results
```

Tài khoản test truyền qua `secrets` của GitHub — khớp với nguyên tắc ở D5:
không có mật khẩu nào nằm trong repo.

Test app native không có trong file này vì máy chủ CI không có điện thoại —
xem 3 cách xử lý ở Phần C mục C2.

## D8. Checklist khởi động dự án mới

| # | Việc | Ghi chú |
|---|---|---|
| 1 | Tạo repo mới, copy cấu trúc thư mục ở D2 | Chưa cần code, chỉ cần khung |
| 2 | Khai báo `requirements.txt` trỏ tới `qa-automation-core` theo **tag** | Thêm `[mobile]` nếu có app native |
| 3 | Điền `config.json` — URL thật của từng hệ thống, từng môi trường | Chưa điền thì test tự SKIP kèm lời nhắc |
| 4 | Đặt biến môi trường tài khoản test | Không hardcode vào repo |
| 5 | Viết `common/api/clients.py` — endpoint thật + cách xác thực thật | Sửa `_auth_headers()` cho đúng hệ thống |
| 6 | Viết `common/data/factory.py` — 2-3 hàm tạo dữ liệu hay dùng nhất | Đây là thứ tiết kiệm nhiều công nhất về sau |
| 7 | Viết 1 test đơn giản nhất cho mỗi hệ thống, chạy cho xanh | Xác nhận đã lắp đúng trước khi viết nhiều |
| 8 | Viết 1 test xuyên hệ thống | Đây mới là thứ chứng minh bộ khung hoạt động |
| 9 | Bật CI theo D7 | Tách job web (mỗi lần đẩy code) và job e2e (chạy đêm) |

**Trạng thái bộ khung mẫu đi kèm sách** (`project-3-he-thong`):

| Phần | Đã kiểm chứng thật? |
|---|---|
| Cấu trúc, import, lắp ráp fixture | ✅ 9 test nhận diện đúng, không lỗi import |
| Cơ chế SKIP khi thiếu config/tài khoản/Appium | ✅ Chạy thật, skip đúng kèm lý do rõ ràng |
| Tầng web + responsive + phiên đăng nhập | ✅ Đã kiểm chứng ở repo demo Phần A |
| Tầng app native (Appium) | ⚠️ **Chưa chạy thật** — cần Appium server + thiết bị + file app |
| Locator, endpoint trong khung mẫu | ⚠️ Là mẫu (`TODO`) — phải thay bằng của hệ thống thật |
