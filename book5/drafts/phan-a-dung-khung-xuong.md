# Phần A: Dựng khung xương (core dùng chung cho nhiều dự án)

📌 **Tóm tắt phần này** — sau phần này bạn sẽ:
- Hiểu vì sao "core dùng chung" cho nhiều dự án nên là 1 **package Python cài
  đặt được**, không phải 1 thư mục con trong cùng repo.
- Dựng được lớp nền cho **cả 3 loại test**: web (`BasePage`), app native
  iOS/Android (`BaseScreen`), và API (`BaseApiClient`) — tất cả đều tổng
  quát, không gắn cứng vào 1 trang/1 API/1 dự án cụ thể nào.
- Có sẵn 4 cơ chế **tự động** mà dự án nào cũng cần: chạy test web trên
  nhiều kích thước màn hình, tái dùng phiên đăng nhập, chụp ảnh bằng chứng
  khi FAILED, và dọn dữ liệu test.
- Đóng gói thành package, cài vào dự án khác qua `pip install git+...`.
- Chứng minh bằng code thật: **2 dự án nằm ở 2 repo Git hoàn toàn khác
  nhau**, cùng cài 1 package core, không chia sẻ 1 dòng code nào khác.

Toàn bộ code trong phần này đã chạy thật — 3 repo demo:
`qa-automation-core` (package core), `project-restful-booker`,
`project-restful-booker-platform`.

## A1. Vì sao cần 1 core dùng chung

Ở Sách 4, dự án tự viết `RestfulBookerClient` riêng cho mình. Cách này ổn
khi chỉ có **1 dự án**. Nhưng khi công ty có **nhiều dự án** (mỗi dự án test
1 ứng dụng khác nhau, thường do các team khác nhau phụ trách), mỗi dự án sẽ
tự viết lại đoạn code "gọi HTTP, gắn header, chụp ảnh khi lỗi, chờ phần
tử..." gần giống hệt nhau — sửa 1 lỗi chung thì phải sửa ở **N nơi**, dễ
sót, dễ lệch chuẩn giữa các dự án.

**Giải pháp:** tách phần **giống nhau giữa mọi dự án** ra 1 nơi riêng, dự
án nào cũng dùng chung, chỉ viết thêm phần **riêng của dự án đó**.

## A2. Mono-repo hay package riêng? — quyết định kiến trúc đầu tiên

Có 2 cách hiện thực hoá "core dùng chung", khác nhau ở **ranh giới repo Git**:

| | Mono-repo (core = thư mục con) | Package riêng (core = repo + gói cài đặt được) |
|---|---|---|
| Core nằm ở đâu | 1 thư mục `core/` trong CÙNG repo với mọi dự án | 1 **repo Git riêng biệt**, đóng gói thành package Python |
| Dự án mới thêm bằng cách nào | Thêm 1 thư mục con trong repo đó | Tạo 1 repo mới, khai báo cài package core trong `requirements.txt` |
| Phù hợp khi | 1 team nhỏ quản lý hết các dự án | Mỗi dự án 1 team/1 repo riêng (**tình huống thực tế phổ biến hơn**) |
| Nâng cấp core | Sửa trực tiếp, ảnh hưởng ngay lập tức mọi dự án | Tăng version (`v0.2.0`), dự án tự chọn thời điểm nâng cấp |

Sách này chọn **package riêng** — đúng với bối cảnh nhiều team, nhiều repo,
cần kiểm soát version rõ ràng khi core thay đổi.

**Cấu trúc 3 repo sẽ dựng trong Phần A:**

```
qa-automation-core/              ← repo RIÊNG, đóng gói thành package Python
├── pyproject.toml               ← khai báo package, version, dependency
├── CHANGELOG.md                 ← ghi lại mọi thay đổi giữa các version
└── qa_automation_core/
    ├── base_page.py             ← lớp nền cho Page Object (WEB)
    ├── base_screen.py           ← lớp nền cho Screen Object (APP NATIVE)
    ├── base_api_client.py       ← lớp nền cho mọi API client
    ├── config.py                ← hàm đọc config.json của TỪNG dự án
    ├── fixtures.py              ← hàm dựng APIRequestContext dùng chung
    ├── responsive.py            ← chạy 1 test trên nhiều kích thước màn hình
    ├── auth_session.py          ← đăng nhập 1 lần, tái dùng phiên
    ├── evidence.py              ← tự động chụp ảnh khi FAILED
    ├── data_registry.py         ← fixture "cleanup" - dọn dữ liệu tự động
    └── pytest_plugin.py         ← tự động đăng ký --env, kích thước màn hình, hook

project-restful-booker/          ← repo RIÊNG của dự án 1 (thuần API)
project-restful-booker-platform/ ← repo RIÊNG của dự án 2 (UI + API + tích hợp)
```

Quy tắc duy nhất cần nhớ: **`qa_automation_core` không bao giờ import bất
cứ thứ gì từ 1 dự án cụ thể.** Chiều phụ thuộc chỉ đi 1 hướng: dự án →
`qa_automation_core` (qua `pip install`), không bao giờ ngược lại.

## A3. `BasePage` — lớp nền cho test WEB

`base_page.py` không biết trang nào cả — chỉ có các hành động **mọi trang
đều cần**. Mỗi hàm nhận locator dạng **chuỗi CSS hoặc 1 `Locator` có sẵn của
Playwright** (vd `page.get_by_role(...)`) — Playwright khuyến nghị ưu tiên
cách thứ 2 vì bền hơn CSS khi giao diện thay đổi.

```python
# `logging` la thu vien GHI NHAT KY co san cua Python (khong phai cai them).
# Dung de ghi lai "framework da lam gi" trong luc test chay.
#
# Vi sao khong dung print()?
# - print() luon in ra man hinh, khong tat duoc -> chay 500 test thi rac
#   man hinh, khong doc noi.
# - logging co MUC DO (INFO / WARNING / ERROR): luc binh thuong an di, khi
#   can dieu tra moi bat len bang `pytest --log-cli-level=INFO`.
# - pytest tu dong thu gom log va CHI IN RA khi test FAILED - dung luc can
#   nhat. Allure/CI cung doc duoc phan log nay.
import logging

from playwright.sync_api import expect

# Quy uoc noi luu anh bang chung dat o 1 file rieng, dung chung voi
# BaseScreen (app native) - xem Phan C muc C4, quy tac 3.
from qa_automation_core.screenshots import DEFAULT_SCREENSHOT_DIR, screenshot_path

# Tao 1 "so ghi nhat ky" mang name chinh module nay. `__name__` la bien co san
# cua Python, chua name module - o day la "qa_automation_core.base_page".
# Nho vay moi dong log deu kem name file phat ra no:
#     INFO  qa_automation_core.base_page:base_page.py:100 mo trang: https://...
# Doc log la biet ngay loi den tu tang nao, khong phai do tim.
logger = logging.getLogger(__name__)


class BasePage:
    def __init__(self, page):
        self.page = page

    def _to_locator(self, locator):
        """Chuyen 1 chuoi CSS thanh Locator; neu da la Locator thi giu nguyen."""
        return self.page.locator(locator) if isinstance(locator, str) else locator

    def goto(self, url: str) -> "BasePage":
        logger.info("mo trang: %s", url)
        self.page.goto(url)
        return self

    def click(self, locator) -> "BasePage":
        logger.info("click: %s", locator)
        self._to_locator(locator).click()
        return self

    def fill(self, locator, value: str) -> "BasePage":
        logger.info("dien '%s' vao: %s", value, locator)
        self._to_locator(locator).fill(value)
        return self

    def get_text(self, locator) -> str:
        return self._to_locator(locator).inner_text()

    def count_of(self, locator) -> int:
        return self._to_locator(locator).count()

    def wait_until_visible(self, locator, timeout: int = None) -> "BasePage":
        """Cho phan tu DAU TIEN khop locator hien ra - dung khi trang tai bat dong bo."""
        self._to_locator(locator).first.wait_for(
            state="visible", timeout=timeout or self.default_timeout
        )
        return self

    # ... nhom ham kiem_tra_* xem ngay ben duoi ...

    def save_screenshot(self, name: str, directory: str = DEFAULT_SCREENSHOT_DIR) -> str:
        """Goi khi test FAILED de luu bang chung. Tra ve duong dan anh."""
        duong_dan = screenshot_path(name, directory)
        self.page.screenshot(path=duong_dan)
        logger.warning("Test FAILED - da chup anh loi: %s", duong_dan)
        return duong_dan
```

| Điểm thiết kế | Vì sao |
|---|---|
| `_to_locator()` nhận cả chuỗi lẫn `Locator` | Page Object nào muốn dùng `page.get_by_role(...)` (bền hơn CSS) vẫn gọi `self.click(...)` bình thường |
| `logger.info(...)` ở mọi hành động | Khi CI chạy fail lúc không ai trực, đọc log biết ngay "đã click gì, điền gì" trước khi lỗi xảy ra |
| Dùng `logging` chứ không `print()` | Bật/tắt được theo mức độ, và pytest **chỉ in ra khi test FAILED** — xem giải thích ngay bên dưới |
| `directory` có tham số, không hardcode | Dự án muốn đổi nơi lưu ảnh chỉ cần truyền tham số, không sửa code trong package dùng chung |
| `return self` ở mọi hành động | Cho phép gọi nối tiếp: `trang.goto(url).fill(...).click(...)` |

### `logging` dùng để làm gì, khác `print()` chỗ nào?

`logging` là thư viện **ghi nhật ký** có sẵn của Python — không phải cài
thêm. Framework dùng nó để ghi lại "đã làm những gì" trong lúc test chạy.

| | `print()` | `logging` |
|---|---|---|
| Tắt đi khi không cần | Không — phải xoá code | Có — chỉnh mức độ là xong |
| Có mức độ quan trọng | Không | Có: `INFO` (bình thường), `WARNING` (đáng chú ý), `ERROR` |
| Biết dòng đó từ file nào | Không | Có — tự kèm tên module |
| pytest xử lý thế nào | In ra luôn, rác màn hình | **Thu gom lại, chỉ in khi test FAILED** |

Dòng cuối là điểm quan trọng nhất với tester: lúc test xanh thì log im lặng,
lúc test đỏ thì pytest in ra **đúng phần log của bài test đó** — chính là
thứ cần để biết chuyện gì xảy ra trước khi lỗi.

Hai dòng khai báo trong mọi file của core:

```python
import logging                          # nap thu vien ghi nhat ky
logger = logging.getLogger(__name__)    # tao "so ghi" mang name module nay
```

`__name__` là biến có sẵn của Python, chứa tên module. Nhờ vậy mỗi dòng log
đều kèm nơi phát ra nó:

```
INFO  qa_automation_core.base_page:base_page.py:100 mo trang: https://...
INFO  qa_automation_core.base_api_client:base_api_client.py:54 post /auth {...}
```

Đọc log là biết ngay lỗi đến từ tầng web hay tầng API — không phải dò tìm.

**Muốn xem log ngay cả khi test xanh** (lúc đang viết test, muốn kiểm tra
framework có làm đúng không):

```
pytest --log-cli-level=INFO
```

### Cái bẫy lớn nhất: `get_text()` + `assert` làm test đỏ oan

Nhìn dòng test này, hầu hết người mới đều thấy hoàn toàn hợp lý:

```python
assert trang.error_message() == "Invalid credentials"
```

Nhưng nó là **nguồn gây test đỏ oan phổ biến nhất** trong test giao diện.
Lý do: `get_text()` đọc giá trị **ngay tại thời điểm gọi**. Nếu thông báo chỉ
hiện ra sau khi gọi API xong (chuyện xảy ra ở gần như mọi ứng dụng web hiện
đại), ta đọc trúng trạng thái cũ.

**Đã kiểm chứng thật** — trang có nội dung đổi sau 1,5 giây:

```
Kieu 1 (get_text + assert):   FAIL  -> doc duoc: 'Dang xu ly...'
Kieu 2 (expect to_have_text): PASS
```

Ứng dụng **không hề sai** — chỉ là cách kiểm tra sai. Với tester, loại lỗi
này còn tệ hơn lỗi thật: test đỏ ngẫu nhiên khiến cả team dần mất niềm tin
vào bộ test, rồi bắt đầu bỏ qua kết quả đỏ.

**Cách sửa:** `BasePage` có sẵn nhóm hàm `kiem_tra_*` — dùng `expect()` của
Playwright, **tự thử lại** cho đến khi đúng hoặc hết giờ:

```python
    def should_have_text(self, locator, expected, timeout: int = None) -> "BasePage":
        """Text cua phan tu phai DUNG BANG expected (tu thu lai)."""
        expect(self._to_locator(locator)).to_have_text(
            expected, timeout=timeout or self.default_timeout
        )
        return self

    def should_contain_text(self, locator, expected, timeout: int = None) -> "BasePage":
        """Text cua phan tu phai CHUA expected (tu thu lai)."""
        ...

    def should_be_visible(self, locator, timeout: int = None) -> "BasePage":
        """Phan tu phai hien ra (tu thu lai)."""
        ...

    def should_be_hidden(self, locator, timeout: int = None) -> "BasePage":
        """Phan tu phai KHONG hien - vd thong bao loi da bien mat."""
        ...

    def should_have_count(self, locator, expected_count: int, timeout: int = None) -> "BasePage":
        """So phan tu khop locator phai dung bang expected_count (tu thu lai)."""
        ...
```

**Quy tắc dùng — chỉ cần nhớ 1 câu:**

| Mục đích | Dùng hàm nào |
|---|---|
| **Kiểm tra** (assert) | `kiem_tra_*` — luôn luôn |
| **Lấy giá trị** để xử lý tiếp (vd lấy mã đơn rồi tra cứu tiếp) | `get_text()`, `count_of()` |

Quan trọng: hàm tự thử lại **vẫn phải báo đỏ khi ứng dụng sai thật** — đã
kiểm chứng: `should_have_text` với giá trị sai vẫn FAIL đúng như mong đợi, chứ
không phải "thử lại mãi rồi cho qua".

**Timeout mặc định 10 giây**, đổi 1 chỗ cho toàn dự án:

```python
# trong conftest.py cua du an, khi chay tren moi truong cham
BasePage.set_default_timeout(20_000)
```

## A4. `BaseScreen` — lớp nền cho test APP NATIVE (iOS/Android)

**Playwright không test được app native.** App tải từ App Store / CH Play là
phần mềm cài đặt trên máy, không chạy trong trình duyệt — phải dùng
**Appium**. Vì vậy core có 2 lớp nền UI song song:

| | Web (kể cả responsive) | App native |
|---|---|---|
| Công cụ | Playwright | Appium |
| Lớp nền | `BasePage` | `BaseScreen` |
| Locator | chuỗi CSS hoặc `Locator` | tuple `(AppiumBy.ACCESSIBILITY_ID, "...")` |
| Chờ phần tử | Playwright tự chờ | **Phải chờ thủ công** (`wait_until_visible`) |
| Thao tác riêng | — | vuốt (swipe), chạm giữ, xoay màn hình |

```python
import logging

logger = logging.getLogger(__name__)

DEFAULT_SCREENSHOT_DIR = "report/anh_loi"


class BaseScreen:
    default_timeout = DEFAULT_TIMEOUT_SECONDS

    @classmethod
    def set_default_timeout(cls, seconds: int) -> None:
        """Doi timeout chung cho MOI Screen Object - goi 1 lan trong conftest.py.

        Luu y don vi: Appium/Selenium tinh bang GIAY, con Playwright (BasePage)
        tinh bang MILI GIAY.
        """
        cls.default_timeout = seconds

    def __init__(self, driver):
        """driver: 1 Appium WebDriver da ket noi san toi thiet bi/emulator."""
        self.driver = driver

    def wait_until_visible(self, locator, timeout: int = None):
        """Cho phan tu hien ra roi tra ve no - app native KHONG tu dong cho
        nhu Playwright, nen buoc nay BAT BUOC truoc moi thao tac."""
        from selenium.webdriver.support import expected_conditions as EC
        from selenium.webdriver.support.ui import WebDriverWait

        return WebDriverWait(self.driver, timeout or self.default_timeout).until(
            EC.visibility_of_element_located(locator)
        )

    def tap(self, locator, timeout: int = None) -> "BaseScreen":
        logger.info("nhan: %s", locator)
        self.wait_until_visible(locator, timeout).click()
        return self

    def fill(self, locator, value: str, timeout: int = None) -> "BaseScreen":
        logger.info("dien '%s' vao: %s", value, locator)
        phan_tu = self.wait_until_visible(locator, timeout)
        phan_tu.clear()
        phan_tu.send_keys(value)
        return self

    def is_visible(self, locator, timeout: int = None) -> bool:
        """Kiem tra 1 phan tu co hien khong - tra ve True/False thay vi bao loi."""
        from selenium.common.exceptions import TimeoutException

        try:
            self.wait_until_visible(locator, timeout)
            return True
        except TimeoutException:
            return False

    def swipe(
        self, from_x: int, from_y: int, to_x: int, to_y: int, duration_ms: int = 800
    ) -> "BaseScreen":
        """Vuot man hinh (swipe) - thao tac dac thu cua app native, web khong co."""
        logger.info("vuot tu (%s,%s) den (%s,%s)", from_x, from_y, to_x, to_y)
        self.driver.swipe(from_x, from_y, to_x, to_y, duration_ms)
        return self

    def save_screenshot(self, name: str, directory: str = DEFAULT_SCREENSHOT_DIR) -> str:
        """Giong BasePage.save_screenshot - de evidence.py dung chung cho ca web lan app."""
        from pathlib import Path

        Path(directory).mkdir(parents=True, exist_ok=True)
        duong_dan = f"{directory}/{name}.png"
        self.driver.get_screenshot_as_file(duong_dan)
        logger.warning("Test FAILED - da chup anh loi: %s", duong_dan)
        return duong_dan
```

**2 quyết định thiết kế quan trọng ở đây:**

1. **Import Appium theo kiểu "lười" (lazy import)** — thư viện Appium chỉ
   được nạp khi thật sự gọi hàm, không nạp lúc import file. Nhờ vậy **dự án
   chỉ làm web không bắt buộc phải cài Appium**. Đã kiểm chứng thật: máy
   chưa cài Appium, `import qa_automation_core.base_screen` vẫn chạy bình
   thường.

2. **`save_screenshot()` đặt tên và tham số y hệt `BasePage`** — nhờ vậy cơ
   chế chụp ảnh evidence (mục A9) dùng chung được cho **cả web lẫn app**,
   không phải viết 2 lần.

## A5. `BaseApiClient` — lớp nền cho test API

Không biết endpoint nào, không ép 1 kiểu xác thực cụ thể, có log lại từng
request/response:

```python
import logging

logger = logging.getLogger(__name__)


class BaseApiClient:
    def __init__(self, api_context):
        self._api = api_context

    def _auth_headers(self) -> dict:
        """Mac dinh KHONG co header auth nao.

        Du an nao can dang nhap (token, API key, Bearer...) thi override ham
        nay trong class con - package khong ap dat 1 kieu auth cu the nao.
        """
        return {}

    def _request(self, method: str, path: str, **kwargs):
        headers = {**self._auth_headers(), **kwargs.pop("headers", {})}
        log_payload = kwargs.get("params") or kwargs.get("data") or ""
        safe_path = mask_url(path)
        # Chu y: KHONG ghi `headers` vao log - Authorization/Cookie nam o do.
        logger.info("%s %s %s", method, safe_path, mask_sensitive(log_payload))
        response = getattr(self._api, method)(path, headers=headers, **kwargs)
        logger.info("-> %s %s (status=%s)", method, safe_path, response.status)
        return response

    def get(self, path, **kwargs):
        return self._request("get", path, **kwargs)

    def post(self, path, data=None, **kwargs):
        return self._request("post", path, data=data, **kwargs)

    def put(self, path, data=None, **kwargs):
        return self._request("put", path, data=data, **kwargs)

    def patch(self, path, data=None, **kwargs):
        return self._request("patch", path, data=data, **kwargs)

    def delete(self, path, **kwargs):
        return self._request("delete", path, **kwargs)
```

### Ghi log nhưng KHÔNG được làm lộ mật khẩu

Ghi log request rất hữu ích, nhưng có 1 cái bẫy nguy hiểm: `data` của
request đăng nhập chứa **mật khẩu thật**. Nếu in thẳng vào log, mật khẩu đó
sẽ nằm trong log CI — nơi cả team đọc được và thường được lưu lại hàng
tháng. Đây là lỗi bảo mật thật, rất hay gặp ở framework tự dựng.

Cách xử lý: che giá trị của các trường nhạy cảm **trước khi ghi log** — dữ
liệu gửi đi vẫn nguyên vẹn, chỉ dòng log bị che:

```python
# Cac truong KHONG duoc ghi nguyen van vao log.
SENSITIVE_FIELDS = {
    "password", "pass", "passwd", "mat_khau", "matkhau",
    "token", "access_token", "refresh_token", "secret", "client_secret",
    "authorization", "api_key", "apikey", "otp", "pin", "cvv", "cvc",
    "card_number", "so_the",
}


def mask_sensitive(payload):
    """Thay gia tri cua cac truong nhay cam bang *** truoc khi ghi log."""
    if isinstance(payload, dict):
        return {
            key: ("***" if str(key).lower() in SENSITIVE_FIELDS else mask_sensitive(value))
            for key, value in payload.items()
        }
    if isinstance(payload, (list, tuple)):
        return [mask_sensitive(element) for element in payload]
    if isinstance(payload, str):
        return _mask_json_string(payload)
    return payload
```

**Đã kiểm chứng thật:** chạy `pytest --log-cli-level=INFO`, log hiện đủ
từng request và từng thao tác UI — nhưng mật khẩu đã bị che:

```
INFO  qa_automation_core.base_api_client:base_api_client.py:54 post /auth {'username': 'admin', 'password': '***'}
INFO  qa_automation_core.base_api_client:base_api_client.py:56 -> post /auth (status=200)
INFO  qa_automation_core.base_page:base_page.py:32 mo trang: https://automationintesting.online/admin
INFO  qa_automation_core.base_page:base_page.py:42 dien 'sai_user' vao: #username
INFO  qa_automation_core.base_page:base_page.py:37 click: #doLogin
```

> **Chú ý:** che ở tầng log chỉ chặn được rò rỉ qua log. Mật khẩu vẫn không
> được hardcode trong repo — xem nguyên tắc dùng biến môi trường ở Phần D
> mục D5.

### Hai lỗ hổng của chính hàm che này

Bản trên **chưa đủ**. Vòng review ở A13 chạy thử 3 dạng gửi dữ liệu và bắt
được 2 đường rò rỉ — cả hai đều tái hiện được, không phải suy đoán:

```
LOG| post /auth {'username':'admin', 'password':'***'}            ← che đúng
LOG| post /auth {"username":"admin","password":"sieu-bi-mat"}     ← LỌT
LOG| get /users?access_token=abc123xyz                            ← LỌT
```

**Lỗ hổng 1 — body dạng chuỗi JSON.** Hàm che chỉ duyệt `dict`. Rất nhiều
client gọi `json.dumps(...)` trước khi gửi, khi đó `payload` là một **chuỗi**
và đi thẳng vào log nguyên văn mật khẩu.

```python
def _mask_json_string(text: str) -> str:
    """Che secret trong body dang chuoi JSON."""
    stripped = text.strip()
    if not stripped.startswith(("{", "[")):
        return text
    try:
        parsed = json.loads(stripped)
    except ValueError:
        return text
    return json.dumps(mask_sensitive(parsed), ensure_ascii=False)
```

**Lỗ hổng 2 — secret nằm ngay trên URL.** Không ít API nhận token qua query
string. URL được ghi vào log, vào lịch sử CI, đôi khi cả log của proxy.

```python
def mask_url(url: str) -> str:
    """Che secret nam ngay tren URL - vd /users?access_token=abc123."""
    if "?" not in url:
        return url
    parts = urlsplit(url)
    query = parse_qsl(parts.query, keep_blank_values=True)
    if not query:
        return url
    # Tu noi chuoi thay vi urlencode() de dau *** khong bi ma hoa thanh %2A.
    masked = "&".join(
        f"{key}=***" if key.lower() in SENSITIVE_FIELDS else f"{key}={value}"
        for key, value in query
    )
    return urlunsplit(parts._replace(query=masked))
```

Lưu ý chi tiết dễ bỏ qua: **không che sạch mọi tham số**. `page=2`,
`status=paid` phải giữ nguyên, nếu không log mất hết giá trị chẩn đoán. Che
đúng trường nhạy cảm, không che bừa.

Kết quả sau khi vá, chạy lại đúng 3 trường hợp cũ:

```
LOG| post /auth {'username': 'admin', 'password': '***'}
LOG| post /auth {"username": "admin", "password": "***"}
LOG| get /users?access_token=***&page=2
```

> **Bài học:** hàm che viết lần đầu trông rất hợp lý và có test xanh. Nó chỉ
> lộ ra thiếu sót khi có người **thử đúng những dạng dữ liệu thật** mà dự án
> hay gửi. Đây là lý do bảo mật phải là một tiêu chí review riêng, chứ không
> phải thứ "viết cẩn thận là xong".

## A6. Config theo dự án + môi trường

`qa_automation_core` **không được phép biết trước** dự án nào tồn tại (vì dự
án nằm ở repo khác, có thể được tạo SAU khi core đã phát hành). Core chỉ
cung cấp **cơ chế đọc** — còn nội dung config là của riêng từng dự án.

```python
import json
from pathlib import Path


def load_config(config_file, env: str) -> dict:
    message = json.loads(Path(config_file).read_text(encoding="utf-8"))
    try:
        return message[env]
    except KeyError as exc:
        raise ValueError(
            f"Khong tim thay moi truong {env!r} trong {config_file}. "
            f"Moi truong co san: {list(message)}"
        ) from exc
```

`config.json` **của riêng** từng dự án — dự án đơn giản thì 1 URL, dự án
nhiều hệ thống thì nhiều URL (xem Phần D):

```json
{
  "dev": { "base_url": "https://restful-booker.herokuapp.com" }
}
```

Và `fixtures.py` — nhận thẳng `base_url`:

```python
def new_api_context(playwright, base_url: str):
    return playwright.request.new_context(base_url=base_url)
```

Đổi môi trường khi chạy test (`pytest --env=staging`) không cần dự án tự
khai báo gì — cờ `--env` có sẵn ngay khi cài package (xem A11).

## A7. Test web responsive — 1 test, nhiều kích thước màn hình

Web responsive **vẫn là web** (khác hẳn app native) — chỉ cần đổi kích thước
cửa sổ trình duyệt. Playwright làm được sẵn, core gom lại thành 1 cách dùng
thống nhất:

```python
import pytest

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "tablet": {"width": 768, "height": 1024},
    "mobile": {"width": 390, "height": 844},
}


def for_viewports(*viewport_names):
    """Danh dau 1 test chay lai tren nhieu kich thuoc man hinh.
    Khong truyen gi -> chay du ca 3 (desktop, tablet, mobile)."""
    danh_sach = list(viewport_names) or list(VIEWPORTS)
    for name in danh_sach:
        if name not in VIEWPORTS:
            raise ValueError(
                f"Kich thuoc {name!r} khong ton tai. Co san: {list(VIEWPORTS)}"
            )
    return pytest.mark.parametrize("viewport_name", danh_sach, indirect=True)
```

Cách dùng trong test — chỉ thêm 1 dòng:

```python
from qa_automation_core.responsive import for_viewports


@for_viewports("desktop", "tablet", "mobile")
def test_home_shows_rooms_on_every_viewport(home_page, viewport_name, rooms_available):
    home_page.open_home().wait_until_visible(".room-card")
    assert home_page.room_card_count() >= 1
```

**Đã kiểm chứng thật** — 1 test chạy thành 3 lần, đúng kích thước yêu cầu:

```
test_home_shows_rooms_on_every_viewport[chromium-desktop]
-> dang chay o 'desktop': {'width': 1440, 'height': 900}   PASSED
test_home_shows_rooms_on_every_viewport[chromium-tablet]
-> dang chay o 'tablet': {'width': 768, 'height': 1024}    PASSED
test_home_shows_rooms_on_every_viewport[chromium-mobile]
-> dang chay o 'mobile': {'width': 390, 'height': 844}     PASSED

============================== 3 passed in 5.44s ==============================
```

## A8. Tái dùng phiên đăng nhập — đăng nhập 1 lần cho mỗi vai trò

**Vấn đề:** dự án có nhiều vai trò (khách hàng, merchant, admin), mỗi test
lại đăng nhập lại qua giao diện thì rất chậm — 100 test = 100 lần đăng nhập.

**Cách làm:** đăng nhập 1 lần, lưu toàn bộ cookie + localStorage của trình
duyệt vào 1 file (`storage_state` của Playwright). Các test sau mở trình
duyệt với file đó là **đã ở trạng thái đăng nhập sẵn**.

```python
import logging
from pathlib import Path

logger = logging.getLogger(__name__)

DEFAULT_SESSION_DIR = ".phien_dang_nhap"


# Phien cu hon nguong nay se dang nhap lai. Token cua hau het he thong song
# vai gio; neu khong co han, file phien tu hom truoc se duoc dung lai va test
# fail voi ly do rat kho doan ("bi da ve trang dang nhap").
DEFAULT_SESSION_TTL_MINUTES = 30


def get_session(browser, role, login_fn,
              directory=DEFAULT_SESSION_DIR, ttl_minutes=DEFAULT_SESSION_TTL_MINUTES) -> str:
    """Tra ve duong dan file phien cua vai tro - tao moi neu chua co hoac da qua han."""
    duong_dan = session_path(role, directory)
    if duong_dan.exists() and _is_fresh(duong_dan, ttl_minutes):
        logger.info("dung lai phien dang nhap co san cho vai tro '%s'", role)
        return str(duong_dan)

    logger.info("dang nhap moi cho vai tro '%s'", role)
    duong_dan.parent.mkdir(parents=True, exist_ok=True)
    context = browser.new_context()
    try:
        page = context.new_page()
        login_fn(page)
        # Ghi ra file tam roi doi name - tranh truong hop 2 tien trinh chay
        # song song (pytest-xdist) doc phai file dang ghi do dang.
        tam = duong_dan.with_suffix(f".{id(context)}.tmp")
        context.storage_state(path=str(tam))
        tam.replace(duong_dan)
    finally:
        # Dang nhap that bai van phai dong trinh duyet - neu khong, moi lan
        # thu lai se bo lai 1 context treo, chay lau se het bo nho.
        context.close()

    return str(duong_dan)
```

Điểm mấu chốt: core **không biết đăng nhập thế nào** — dự án truyền vào 1
hàm `login_fn(page)` tự làm việc đó trên hệ thống của mình.

**3 chi tiết dễ bỏ sót** (bản đầu tiên thiếu cả ba, phát hiện khi review):

| Chi tiết | Nếu thiếu thì sao |
|---|---|
| Phiên có **hạn** (`ttl_minutes`) | File phiên từ hôm trước vẫn được dùng lại, token đã hết hạn → test fail với lý do rất khó đoán, mất cả buổi để tìm |
| `try/finally` khi đăng nhập | Đăng nhập lỗi → trình duyệt không được đóng → chạy lâu là hết bộ nhớ |
| Ghi file tạm rồi đổi tên | Chạy song song (`pytest-xdist`), tiến trình này đọc phải file tiến trình kia đang ghi dở → JSON hỏng, lỗi rất khó tái hiện |

Kèm theo là hàm `clear_session(role)` để chủ động xoá khi test phát hiện
phiên không còn dùng được.

**Đã kiểm chứng thật:**

```
--- LAN 1: chua co file phien ---
INFO chua co phien cho vai tro 'admin' - dang nhap lan dau
INFO da luu phien vai tro 'admin' vao phien_test_tam\admin.json
so lan goi ham dang nhap: 1

--- LAN 2: da co file phien -> phai DUNG LAI ---
INFO dung lai phien dang nhap co san cho vai tro 'admin'
so lan goi ham dang nhap: 1        ← van la 1, KHONG dang nhap lai

--- Mo context moi tu file phien ---
cookie trong context moi: token-abc-123    ← phien con nguyen
```

## A9. Tự động chụp ảnh khi test FAILED

`BasePage` và `BaseScreen` đều có `save_screenshot()`, nhưng nếu bắt người viết
test **tự nhớ gọi** thì chắc chắn sẽ có người quên. Cách chuẩn: để core tự
động chụp.

```python
import allure


def with_screenshot_on_failure(request, page_or_screen):
    """Dung trong 1 fixture Page Object / Screen Object kieu yield:

        @pytest.fixture
        def home_page(page, request):
            yield from with_screenshot_on_failure(request, HomePage(page))

        @pytest.fixture
        def login_screen(driver, request):
            yield from with_screenshot_on_failure(request, LoginScreen(driver))
    """
    yield page_or_screen

    # Dung getattr: neu 1 fixture khac that bai ngay o giai doan SETUP thi
    # test chua he chay, rep_call chua ton tai. Truy cap thang se nem
    # AttributeError - 1 loi GIA chong len loi that, rat kho debug.
    report = getattr(request.node, "rep_call", None)
    if report is None or not report.failed:
        return

    try:
        duong_dan = page_or_screen.save_screenshot(request.node.name)
        allure.attach.file(duong_dan, name="anh_loi", attachment_type=allure.attachment_type.PNG)
    except Exception as loi:
        # Chup anh that bai (trinh duyet da dong, het dung luong dia...) thi
        # ghi canh bao thoi - KHONG duoc che mat loi that cua bai test.
        logger.warning("Khong chup duoc anh loi cho '%s': %s", request.node.name, loi)
```

Tham số đặt tên `page_or_screen` vì hàm này **dùng chung cho cả web lẫn
app native** — nó không cần biết đang làm việc với loại nào, chỉ cần đối
tượng đó có hàm `save_screenshot()`.

**2 chi tiết nhỏ nhưng quan trọng** (phát hiện khi review lại, bản đầu tiên
viết sai cả hai):

| Chi tiết | Nếu viết sai thì sao |
|---|---|
| Dùng `getattr(..., "rep_call", None)` thay vì `request.node.rep_call` | Khi 1 fixture khác lỗi ở giai đoạn **setup**, test chưa chạy nên `rep_call` chưa tồn tại → ném `AttributeError`, đè lên lỗi thật. Người đọc log thấy 2 lỗi, lỗi giả nằm trên, rất dễ đi sai hướng |
| Bọc phần chụp ảnh trong `try/except` | Nếu lúc chụp ảnh gặp trục trặc (trình duyệt đã đóng, hết dung lượng đĩa) thì lỗi đó sẽ **che mất** lỗi thật của bài test |

Nguyên tắc chung rút ra: **code phục vụ việc báo lỗi thì không bao giờ được
tự gây thêm lỗi.** Nó chỉ được im lặng ghi cảnh báo, nhường chỗ cho lỗi
thật.

`request.node.rep_call.failed` đọc từ 1 hook pytest tiêu chuẩn, nằm sẵn
trong plugin của package (mục A11) — dự án không phải viết lại.

**Đã kiểm chứng thật:** viết 1 test cố ý sai, chạy FAILED — ảnh PNG thật
xuất hiện, không có dòng code nào trong test gọi chụp ảnh:

```
WARNING  qa_automation_core.base_page:base_page.py:65 Test FAILED - da chup anh loi: report/anh_loi/test_co_y_that_bai[chromium].png
```

### Cảnh báo bảo mật: file trace lưu cả mật khẩu

Ảnh chụp và file trace là bằng chứng rất quý khi chẩn đoán lỗi — nhưng chúng
là **bản sao dữ liệu thật trên màn hình**. Đây là điều gần như không tài liệu
nào nhắc tới khi hướng dẫn bật tracing.

Chạy thử một test đăng nhập với `--tracing=on` rồi mở file trace ra đọc:

```
trace.trace: "method":"fill","params":{"selector":"#password","value":"sai_pass"}
```

Playwright ghi lại **mọi thao tác kèm giá trị**, nên chuỗi gõ vào ô mật khẩu
nằm nguyên văn trong `trace.zip`. Che ở tầng log (A5) hoàn toàn không giúp gì
ở đây — đó là hai đường rò rỉ khác nhau.

Ba việc phải làm:

| Việc | Cụ thể |
|---|---|
| **Chặn lọt vào git** | `.gitignore` phải có `report/`, `test-results/`, `.phien_dang_nhap/` |
| **Không đưa trace lên CI** | Đừng `upload-artifact` thư mục `test-results/`; cần chẩn đoán thì tải về máy riêng |
| **Đặt hạn xoá ngắn** | Ảnh evidence để `retention-days: 7` thay vì mặc định 90 ngày |

Riêng `.phien_dang_nhap/` (cơ chế ở A8) còn nguy hiểm hơn ảnh: nó **chính là
cookie đăng nhập còn hiệu lực**. Commit lên là trao thẳng phiên admin cho bất
kỳ ai đọc được repo.

> **Lỗi thật tìm được ở vòng review:** `.gitignore` của các repo vẫn ghi tên
> thư mục cũ `bao_cao/` trong khi code đã đổi sang `report/` từ đợt chuẩn hoá
> tiếng Anh. Nghĩa là suốt thời gian đó ảnh evidence **không hề được bỏ qua**
> — chỉ là chưa ai chạy test hỏng nên chưa sinh ra file. Đổi tên thư mục
> trong code thì phải soát lại `.gitignore` và cả file CI.

## A10. Dọn dữ liệu test tự động

Mỗi test tạo dữ liệu (booking, khách hàng...) mà không dọn lại thì dữ liệu
rác sẽ chất đống. Core không biết "booking" là gì, nhưng vẫn cung cấp được
**cơ chế đăng ký dọn dẹp chung**, dựa trên `request.addfinalizer` có sẵn của
pytest:

```python
import pytest


@pytest.fixture
def cleanup(request):
    """Goi cleanup(ham_xoa) trong test - core tu goi ham_xoa() sau khi test ket thuc."""

    def register(ham_xoa):
        request.addfinalizer(ham_xoa)

    return register
```

Cách dùng — vừa tạo, vừa đăng ký dọn, vừa xác nhận đã xoá thật:

```python
def test_created_booking_is_cleaned_up(rb_client, cleanup):
    response = rb_client.login("admin", "password123")
    rb_client.set_token(response.json()["token"])

    create_response = rb_client.create_booking({...})
    bookingid = create_response.json()["bookingid"]

    def delete_and_verify():
        assert rb_client.delete_booking(bookingid).status == 201       # xoa thanh cong
        assert rb_client.get_booking(bookingid).status == 404  # xac nhan da xoa that

    cleanup(delete_and_verify)   # chay sau khi test xong, du pass hay fail

    assert create_response.status == 200
```

Nếu bước dọn dẹp thất bại, pytest báo lỗi ở giai đoạn teardown — Lead biết
ngay dữ liệu có nguy cơ bị sót lại, không âm thầm trôi qua.

## A11. Đóng gói thành package cài đặt được

Đây là phần khiến `qa_automation_core` thật sự "dùng chung được cho nhiều
repo" thay vì chỉ là code copy-paste.

```toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "qa-automation-core"
version = "1.3.0"
requires-python = ">=3.10"
dependencies = [
    "pytest>=8.0",
    "pytest-playwright>=0.4",
    "playwright>=1.40",
    "allure-pytest>=2.13",
]

# Chi du an nao co test app NATIVE moi can cai them:
#   pip install "qa-automation-core[mobile]"
# Du an chi lam web KHONG phai cai Appium.
[project.optional-dependencies]
mobile = ["Appium-Python-Client>=4.0"]

[project.entry-points.pytest11]
qa_automation_core = "qa_automation_core.pytest_plugin"

[tool.setuptools.packages.find]
include = ["qa_automation_core*"]
```

**2 phần quan trọng nhất:**

1. **`[project.optional-dependencies]`** — Appium là phụ thuộc **tuỳ chọn**.
   Dự án chỉ làm web cài `qa-automation-core` (nhẹ), dự án có app native cài
   `qa-automation-core[mobile]`. Không ép ai cài thứ họ không dùng.

2. **`[project.entry-points.pytest11]`** — khai báo **1 pytest plugin thật
   sự** (giống cách `pytest-playwright` hoạt động). Khi dự án
   `pip install qa-automation-core`, pytest **tự động** nạp plugin, không cần
   dự án khai báo gì thêm trong `conftest.py`:

```python
import pytest

from qa_automation_core.responsive import VIEWPORTS


def pytest_addoption(parser):
    parser.addoption("--env", action="store", default="dev",
                     help="Moi truong chay test, vd: dev, staging")


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    rep = outcome.get_result()
    setattr(item, f"rep_{rep.when}", rep)


@pytest.fixture(scope="session")
def env_name(pytestconfig) -> str:
    return pytestconfig.getoption("--env")


@pytest.fixture
def viewport_name(request) -> str:
    """Kich thuoc man hinh dang chay - mac dinh 'desktop'."""
    return getattr(request, "param", "desktop")


@pytest.fixture
def browser_context_args(browser_context_args, viewport_name):
    """Ghi de fixture cua pytest-playwright de ap dung kich thuoc man hinh."""
    return {**browser_context_args, "viewport": VIEWPORTS[viewport_name]}
```

**Phát hành version:** `git commit`, gắn tag theo
[Semantic Versioning](https://semver.org) (`v0.2.0`), ghi `CHANGELOG.md`,
rồi `git push --tags`. Dự án nào muốn dùng thì ghim đúng tag đó trong
`requirements.txt` — **không ghim theo `main`**, để tránh bị ảnh hưởng bất
ngờ khi core đổi. Chi tiết quy trình ở Phần C mục C3.

## A12. Chứng minh dùng lại được — 2 repo dự án thật, tách biệt hoàn toàn

Nếu `qa-automation-core` thật sự tổng quát, nó phải cài được vào 2 **repo
Git riêng biệt, không liên quan gì nhau**, và cả 2 phải chạy đúng.

**`requirements.txt` của dự án:**
```
qa-automation-core @ git+https://github.com/<org>/qa-automation-core.git@v1.3.0
```

(Khi thử cục bộ trước khi có repo GitHub thật, dùng đường dẫn máy:
`git+file:///duong/dan/toi/qa-automation-core@v1.3.0` — `pip` xử lý giống
hệt, chỉ khác nguồn tải.)

Kết quả cài thật:

```
Building wheel for qa-automation-core (pyproject.toml): finished with status 'done'
Successfully installed qa-automation-core-1.3.0
```

**Dự án 1** — `project-restful-booker` (thuần API, xác thực Cookie):

```python
from qa_automation_core.base_api_client import BaseApiClient


class RestfulBookerClient(BaseApiClient):
    def __init__(self, api_context, token=None):
        super().__init__(api_context)
        self._token = token

    def set_token(self, token: str) -> None:
        self._token = token

    def _auth_headers(self) -> dict:
        """Override: Restful-Booker dung header Cookie chua token."""
        return {"Cookie": f"token={self._token}"} if self._token else {}

    def login(self, username, password):
        return self.post("/auth", data={"username": username, "password": password})

    def create_booking(self, payload):
        return self.post("/booking", data=payload)

    def delete_booking(self, bookingid):
        return self.delete(f"/booking/{bookingid}")
```

`conftest.py` của dự án — chỉ lo phần **riêng của mình**:

```python
import pytest

from qa_automation_core.config import load_config
from qa_automation_core.data_registry import cleanup  # noqa: F401
from qa_automation_core.fixtures import new_api_context

from api_client import RestfulBookerClient


@pytest.fixture(scope="session")
def api_context(playwright, env_name):
    cfg = load_config("config.json", env_name)
    context = new_api_context(playwright, cfg["base_url"])
    yield context
    context.dispose()


@pytest.fixture
def rb_client(api_context):
    """Moi test nhan 1 client RIENG (function-scope) - tranh set_token() cua
    test nay ro ri sang test khac. APIRequestContext (dat, ket noi mang) van
    duoc tai su dung qua ca session nho api_context o tren."""
    return RestfulBookerClient(api_context)
```

**Dự án 2** — `project-restful-booker-platform` (repo khác hẳn, web + API +
tích hợp), minh hoạ luôn cách dùng `Locator` thay vì chuỗi CSS:

```python
from qa_automation_core.base_page import BasePage

URL = "https://automationintesting.online/"


class HomePage(BasePage):
    def open_home(self) -> "HomePage":
        self.goto(URL)
        return self

    def submit_contact_form(self, name, email, phone, subject, message) -> "HomePage":
        self.fill("#name", name)
        self.fill("#email", email)
        self.fill("#phone", phone)
        self.fill("#subject", subject)
        self.fill("#description", message)
        self.click(self.page.get_by_role("button", name="Submit"))  # Locator, khong phai CSS
        return self

    def room_card_count(self) -> int:
        return self.count_of(".room-card")
```

Chạy từng repo **độc lập**, không cần cài gì của repo kia:

```
cd project-restful-booker && pytest -v --env=dev
cd project-restful-booker-platform && pytest -v --env=dev
```

Kết quả thật — chú ý dòng `plugins:` ở cả 2, `qa-automation-core-1.3.0`
**tự xuất hiện** dù không có dòng code nào trong 2 repo này đăng ký nó:

```
plugins: allure-pytest-2.16.1, ..., playwright-0.9.0, qa-automation-core-1.3.0
...
============================== 5 passed in 4.39s ==============================
```

```
plugins: allure-pytest-2.16.1, ..., playwright-0.9.0, qa-automation-core-1.3.0
...
============================== 7 passed in 16.67s ==============================
```

**Kết luận Phần A:** `qa-automation-core` là 1 **repo hoàn toàn tách biệt**,
không chứa 1 dòng nào nhắc tới "Restful-Booker". Hai repo dự án độc lập cùng
`pip install` đúng 1 package đó và chạy đúng — với đủ 3 loại test (web, app
native, API) và 4 cơ chế tự động (responsive, phiên đăng nhập, ảnh evidence,
dọn dữ liệu).

### Tầng app native đã chạy trên thiết bị thật

Bản đầu của phần này ghi "tầng `BaseScreen` chưa chạy thật" — vì cần Appium
server + thiết bị/emulator + file `.apk`. Nay đã chạy được, và có một mẹo
khiến việc đó dễ hơn tưởng: **dùng app Settings có sẵn của Android**, không
cần file `.apk` riêng của dự án nào.

```bash
emulator -avd Pixel_8 -no-window -no-audio -no-boot-anim
appium --port 4723
python scripts/verify_base_screen_on_device.py
```

Script kiểm 18 mục, chia 4 nhóm:

| Nhóm | Kiểm gì |
|---|---|
| Hành động | `wait_until_visible`, `tap`, `fill`, `get_text`, `count_of`, `is_visible` |
| Kiểm tra | cả 5 hàm `should_*` |
| **Báo lỗi đúng cách** | phải ném `AssertionError` đọc được, **không được âm thầm pass** |
| Đặc thù app | `swipe`, `save_screenshot` ra file ảnh thật |

Kết quả trên Pixel_8 / Android 16 / Appium 2.19 + uiautomator2 4.2.6:
**18/18 đạt.**

Nhóm thứ ba đáng lưu ý: nó không kiểm "hàm chạy được", mà kiểm **hàm biết báo
sai**. Một hàm `should_have_count` không bao giờ fail thì còn nguy hiểm hơn là
không có nó.

#### Hai lần sai khi viết script này — hữu ích hơn con số 18/18

**Lần 1: đoán locator.** Tôi viết `content-desc="Search settings"` theo cảm
giác. Bản Android trên emulator **không có `content-desc` nào** ở màn hình
đó, nên 3 mục kiểm cùng đỏ. Đọc `page_source` thật thì locator đúng là
`com.android.settings:id/search_action_bar`.

**Lần 2: chọn sai chỗ để kiểm.** Sửa locator xong còn 2 mục đỏ. Nguyên nhân:
ô tìm kiếm của Settings chuyển sang **một app khác**
(`com.google.android.settings.intelligence`) và kết quả phụ thuộc Play
Services — lúc có lúc không. Dùng nó làm mục tiêu kiểm thì test đỏ vì **môi
trường**, không phải vì code sai. Đưa các câu kiểm text về danh sách chính của
Settings — thứ luôn có mặt — thì đủ 18/18.

> Bài học cho dự án thật: khi một bài test app đỏ, câu hỏi đầu tiên không phải
> "code sai ở đâu" mà **"chỗ tôi đang kiểm có ổn định không"**. Hai lần sai ở
> trên đều trông giống lỗi framework, mà thực ra không phải.

**Phần vẫn chưa kiểm chứng được:** phía **iOS**. Script trên chỉ chạy Android
(driver `uiautomator2`). `BaseScreen` viết chung cho cả hai nền tảng, nhưng
muốn chứng minh phía iOS thì cần máy macOS + Xcode + driver `xcuitest`.

---

## A13. Review lại khung trước khi giao cho team

Khung chạy xanh **không có nghĩa là khung đạt chuẩn**. Test xanh chỉ chứng
minh code làm đúng việc nó đang làm — không nói gì về việc 6 tháng nữa có ai
sửa nổi nó không, hay member mới có dùng đúng cách không.

Đây là bước cuối của Phần A: dựng xong thì **tự soi lại khung bằng 4 tiêu
chuẩn**, mỗi tiêu chuẩn kèm **một cách kiểm chứng bằng lệnh** — không dựa vào
cảm giác "đọc thấy ổn".

### A13.1. Tám tiêu chuẩn và cách kiểm chứng

**Bốn tiêu chí về chất lượng code:**

| Tiêu chuẩn | Câu hỏi | Kiểm chứng bằng |
|---|---|---|
| **1. Chuẩn POM** | Test có chạm thẳng vào `page` / `driver` không? | `grep -rn "\.page\." tests/` — phải **không ra dòng nào** |
| **2. Chuẩn common hoá** | Hai tầng song song (web / app) có cùng bộ hàm không? | `grep -c "def should_" base_page.py base_screen.py` — hai số phải bằng nhau |
| **3. Chuẩn code sạch** | Linter đã **chạy** chưa, hay mới chỉ **cấu hình**? | `ruff check .` — phải ra `All checks passed!` |
| **4. Dễ maintain** | Thêm 1 hệ thống mới phải sửa bao nhiêu chỗ? | Đọc `conftest.py`: có khối nào lặp gần y hệt nhau không |

**Bốn tiêu chí về rủi ro** — nhóm này quan trọng ở chỗ: bốn tiêu chí trên
**không thể phát hiện ra chúng**. Code vi phạm cả bốn mục dưới đây vẫn đạt
POM, vẫn qua linter, vẫn dễ đọc, và test vẫn xanh.

| Tiêu chuẩn | Câu hỏi | Kiểm chứng bằng |
|---|---|---|
| **5. Bảo mật** | Secret có lọt vào log / ảnh / trace / git không? | 4 phép thử ở A13.3 |
| **6. Chống flaky** | Có chờ cứng theo số giây không? | `grep -rn "time.sleep\|wait_for_timeout"` — phải rỗng |
| **7. Chạy song song** | Hai tiến trình chạy cùng lúc có giẫm chân nhau? | `pytest -n 4` phải xanh y như chạy đơn |
| **8. Chạy được trên CI** | Repo nào cũng có workflow xanh chứ? | `ls .github/workflows` ở **từng** repo |

Điểm chung của cả tám dòng: mỗi tiêu chuẩn đều quy về **một lệnh có kết quả
đúng/sai rõ ràng**. Tiêu chuẩn nào không quy được về lệnh thì sẽ bị bỏ qua
ngay vòng review thứ hai.

### A13.2. Vòng 1 — chất lượng code: 4 lỗi

Chạy bốn lệnh của nhóm chất lượng code với khung vừa dựng ở A1–A12. Kết
quả: **cả 4 tiêu chuẩn đều lộ ra lỗi thật.** Phần này ghi lại nguyên văn, vì lỗi thật hữu ích
hơn checklist lý thuyết.

**Lỗi 1 — Test chạm thẳng vào `page` (vi phạm POM).**

```
tests/test_ui.py:12: expect(home_page.page.get_by_text("Thanks ...")).to_be_visible()
tests/test_responsive.py:12: actual_viewport = home_page.page.viewport_size
```

Test đang biết câu chữ hiển thị trên giao diện. Giao diện đổi chữ → phải sửa
test, đúng thứ POM sinh ra để tránh. Sửa: đẩy câu kiểm tra vào Page Object.

```python
# pages/home_page.py
def should_show_thank_you(self, name: str) -> "HomePage":
    """De o DAY chu khong de trong test: test khong duoc biet cau chu tren giao dien."""
    self.should_be_visible(self.page.get_by_text(f"Thanks for getting in touch {name}!"))
    return self

def viewport(self) -> dict:
    """Kich thuoc man hinh dang dung - de test responsive doi chieu."""
    return self.page.viewport_size
```

Test rút gọn còn `home_page.should_show_thank_you("Nguyen Van A")`.

**Lỗi 2 — Hai tầng nền không cân nhau (common hoá chưa xong).**

```
base_page.py   -> 5 ham should_*
base_screen.py -> 0 ham should_*
```

`BasePage` (web) có nhóm `should_*` tự thử lại; `BaseScreen` (app native) thì
không. Hệ quả: người viết test app buộc phải tự `assert get_text(...) == ...`
— cách đọc giá trị **ngay tại thời điểm gọi**, màn hình chậm một nhịp là báo
trượt oan. Đúng cái bẫy mà chính khung này cảnh báo ở A3.

Sửa: bổ sung nhóm `should_*` cho `BaseScreen`, tự thử lại bằng
`WebDriverWait` (bên web đã có `expect()` của Playwright lo việc này).

| BasePage (web) | BaseScreen (app native) |
|---|---|
| `should_be_visible` | `should_be_visible` |
| `should_be_hidden` | `should_not_be_visible` |
| `should_have_text` | `should_have_text` |
| `should_contain_text` | `should_contain_text` |

> Bảng này là **ảnh chụp sau vòng 1**. Nó vẫn còn hai chỗ lệch — thiếu hàm
> đếm, và cùng một khái niệm mang hai tên (`should_be_hidden` /
> `should_not_be_visible`). Vòng 3 ở A13.6 mới bắt được.

**Lỗi 3 — Linter đã cấu hình nhưng chưa từng chạy.**

```
$ pip show ruff
WARNING: Package(s) not found: ruff
```

Cấu hình `ruff` nằm trong `pyproject.toml` từ phiên bản v0.6.0, nhưng công cụ
chưa bao giờ được cài. Cài vào và chạy lần đầu: **5 lỗi**. Đây là dạng lỗi
đặc trưng của người dựng khung — viết cấu hình rồi coi như xong việc.

**Lỗi 4 — Fixture lặp lại (khó maintain).**

Hai fixture `merchant_orders` và `admin_merchants` trong `conftest.py` lặp
lại gần y hệt nhau, chỉ khác tên vai trò và lớp Page Object. Thêm hệ thống
thứ tư là chép thêm một khối nữa. Sửa bằng một khuôn chung:

```python
def _logged_in_page_object(browser, request, config, viewport_name, role, page_class):
    """Khuon chung cho moi he thong CAN dang nhap - them he thong moi
    chi con 3 dong khai bao fixture."""
    with _logged_in_page(browser, config, viewport_name, role) as page:
        yield from with_screenshot_on_failure(
            request, page_class(page, config[f"{role}_web_url"])
        )
```

### A13.3. Vòng 2 — rủi ro: thêm 5 lỗi bảo mật

Bốn tiêu chuẩn đầu đã sạch, nhưng đó mới là "code có đẹp không". Chạy tiếp
nhóm rủi ro, riêng bảo mật ra thêm **5 lỗi** — cả năm đều tái hiện được.

**Lỗi 5 — file trace lưu mật khẩu nguyên văn.** Chi tiết ở A9. Đây là lỗi
nặng nhất vì trace thường được đưa lên artifact CI, ai đọc được repo đều tải
về được, mặc định giữ 90 ngày.

**Lỗi 6 — `.gitignore` lệch tên thư mục.** Code ghi ảnh vào `report/`,
`.gitignore` còn ghi tên cũ `bao_cao/`. Kiểm chứng:

```
$ git check-ignore -v report/anh_loi/test_login_FAILED.png
(rỗng)  →  KHÔNG ignore, sẽ bị commit
```

**Lỗi 7 — file phiên đăng nhập không được bỏ qua ở 2/3 repo.**

```
project-restful-booker            >>> SE BI COMMIT
project-restful-booker-platform   >>> SE BI COMMIT
project-3-he-thong                ignored OK
```

**Lỗi 8 và 9 — hai lỗ hổng của hàm che secret.** Body dạng chuỗi JSON và
secret nằm trên URL đều lọt vào log. Chi tiết và cách vá ở A5.

Sau khi vá, kiểm lại bằng đúng phép thử đã phát hiện ra lỗi:

```
qa-automation-core                anh:OK  phien:OK  trace:OK
project-restful-booker            anh:OK  phien:OK  trace:OK
project-restful-booker-platform   anh:OK  phien:OK  trace:OK
project-3-he-thong                anh:OK  phien:OK  trace:OK
```

Và soát nốt lịch sử git xem trước đó đã lỡ commit gì chưa — vì `.gitignore`
chỉ chặn từ nay về sau, không xoá được thứ đã nằm trong lịch sử:

```
$ git log --all --name-only --pretty=format: | sort -u | grep -iE "report/|\.png$|\.zip$"
(cả 4 repo đều sạch)
```

**Ba tiêu chuẩn rủi ro còn lại:**

| Tiêu chuẩn | Kết quả |
|---|---|
| Chống flaky | ✅ sạch — không có dòng `sleep` nào trong cả 4 repo |
| Chạy song song | ✅ `pytest -n 4` xanh cả 4 repo (platform: 18,5s → 9,0s) |
| Chạy được trên CI | ⚠️ **2/4 repo không có workflow** → đã bổ sung |

Riêng mục CI còn kéo theo một lỗi âm thầm: workflow của dự án 3 hệ thống thu
ảnh lỗi ở `bao_cao/anh_loi` — cùng cái tên cũ như Lỗi 6. Nghĩa là **chưa bao
giờ thu được tấm ảnh nào**, mà workflow vẫn xanh vì có `if-no-files-found:
ignore`. Đổi tên một thư mục trong code thì phải soát lại cả `.gitignore` lẫn
file CI.

### A13.4. Kiểm lại chính bài test — mutation testing

Một câu hỏi ít người hỏi: **bài test đó có thật sự bắt được lỗi không?**

Cách kiểm rẻ nhất là **cố tình phá code rồi chạy lại test**. Test phải chuyển
sang FAILED. Nếu vẫn xanh → bài test đó vô nghĩa, xoá đi còn hơn giữ vì nó
tạo cảm giác an toàn giả.

Áp dụng cách này cho khung, phát hiện `test_default_timeout_is_applied_when_omitted`
vẫn xanh **ngay cả khi bỏ hẳn cơ chế timeout mặc định** — vì nó chạy qua lớp
giả, không chạm code thật. Đã viết lại để đi qua `wait_until_visible` thật, và
kiểm lại bằng đúng cách đó: phá code → test FAILED như mong đợi.

> **Nên làm khi nào:** không cần mutation test mọi bài. Chỉ áp dụng cho các
> bài kiểm chính cơ chế lõi của khung — đó là nhóm mà nếu sai thì mọi dự án
> dùng khung đều sai theo.

### A13.6. Vòng 3 — chạy lại đủ 8 tiêu chí

Hai vòng trước mỗi vòng chỉ chạy một nhóm tiêu chí. Vòng 3 chạy **cả 8 trên
cả 4 repo**. Kết quả: 5 đạt, 3 không — và đáng chú ý là **hai trong ba lỗi
nằm ngay trong code viết ra ở hai vòng review trước**.

**Lỗi 10 — hai tầng nền vẫn lệch, dù vòng 1 đã "sửa xong".**

```
base_page.py   (web) : 5 hàm should_*
base_screen.py (app) : 4 hàm should_*
```

Thiếu `count_of` và `should_have_count` ở tầng app. Đây không phải khác biệt
do nền tảng — "giỏ hàng có 3 món", "danh sách hiện 10 đơn" là câu kiểm rất
thường gặp trên app. Soát kỹ hơn còn ra một điểm nữa: cùng một khái niệm mà
tầng web gọi `should_be_hidden`, tầng app gọi `should_not_be_visible`.
Người chuyển từ test web sang test app phải nhớ hai tên cho một việc.

Sau khi sửa, hai tầng có **đúng cùng 5 hàm kiểm tra**; tên cũ giữ lại làm
alias nên dự án viết theo bản trước không hỏng.

**Lỗi 11 — quy ước đặt tên bị phá ở 14 chỗ.** `ruff` sạch cả 4 repo nhưng
linter không kiểm được ngôn ngữ đặt tên. Hai chỗ đáng lo nhất không phải số
lượng mà là **ví dụ trong docstring**:

```python
# ❌ evidence.py — bản CŨ, vi phạm quy ước đặt tên
def man_hinh_dang_nhap(driver, request):
    yield from with_screenshot_on_failure(request, ManHinhDangNhap(driver))
```

Đây là mẫu member sẽ copy. Một ví dụ sai quy ước lan nhanh hơn mười chỗ sai
nằm trong code nội bộ.

**Lỗi 12 — một job CI chưa bao giờ chạy.**

```yaml
on:
  push: ...
  workflow_dispatch:        # ← KHÔNG có schedule:

  e2e:
    if: github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
```

Chú thích ghi "chạy 1 lần/đêm" nhưng `on:` không có `schedule:`, nên điều
kiện đó không bao giờ đúng. Job bị bỏ qua, **và workflow vẫn xanh chính vì
nó không chạy gì**. Đây là dạng nguy hiểm nhất: bảng điều khiển toàn màu
xanh trong khi lớp test tốn kém nhất chưa từng được thực thi.

#### Bài test mới cũng phải qua mutation

Bài test đầu tiên tôi viết cho `should_have_count` là **test rỗng** — nó ép
hết giờ nên không bao giờ chạy qua phép so sánh thật:

```
-- phá code (điều kiện luôn đúng): 21 passed   ← test không bắt được gì
```

Viết lại cho đi qua phép so sánh thật, rồi kiểm lại bằng đúng cách đó:

```
-- code gốc                      : 21 passed
-- phá code (điều kiện luôn đúng): 1 failed, 20 passed   ← đã bắt được
```

> Lặp lại đúng sai lầm đã ghi ở A13.4, chỉ khác bài test. Cho thấy mutation
> không phải việc làm một lần cho xong — mỗi bài test kiểm cơ chế lõi đều
> phải qua bước này khi vừa viết.

### A13.5. Chốt lại

| # | Tiêu chuẩn | Trước review | Sau review |
|---|---|---|---|
| 1 | Chuẩn POM | 2 chỗ test chạm `page` | 0 |
| 2 | Common hoá | web 5 hàm / app 0 hàm | 4 hàm đối xứng |
| 3 | Code sạch | linter chưa chạy | `All checks passed!` cả 4 repo |
| 4 | Dễ maintain | 2 fixture trùng lặp | 1 khuôn chung |
| 5 | Bảo mật | 5 đường rò rỉ | đã vá, kiểm lại bằng chính phép thử cũ |
| 6 | Chống flaky | sạch sẵn | giữ nguyên |
| 7 | Chạy song song | chưa từng thử | `-n 4` xanh cả 4 repo |
| 8 | Chạy được trên CI | 2/4 repo không có | 4/4 repo có workflow **và job chạy thật** |

Hai mục 2 và 8 phải sửa **hai lần**: vòng 1 và vòng 2 đều tưởng đã xong, vòng
3 chạy lại đủ 8 tiêu chí mới lộ phần còn hụt.

Con số cuối cùng sau ba vòng review: **core 83 test xanh**, ba repo dự án
**5 / 7 / 8 test xanh** (phần skip là do `config.json` còn URL mẫu, đúng như
thiết kế ở A6). Chạy song song `-n 4` cho kết quả y hệt.

> **Bài học rút ra:** cả 12 lỗi trên đều **không** làm test đỏ. Chúng chỉ lộ
> ra khi có người đặt câu hỏi đúng và chạy đúng lệnh. Vì vậy bước review này
> phải là **một bước riêng có lịch**, không phải thứ trông chờ vào việc
> "lúc nào rảnh thì đọc lại code".
>
> Và bốn tiêu chuẩn về chất lượng code là **chưa đủ**. Rò rỉ dữ liệu không
> bao giờ làm test đỏ, cũng không bao giờ bị linter bắt — nó cần một tiêu
> chuẩn riêng với phép thử riêng.
>
> Điều thứ ba, rút ra ở vòng 3: **review một lần không đủ**. Hai trong ba lỗi
> của vòng 3 nằm ngay trong code viết ra để sửa vòng 1 và vòng 2. Người vừa
> sửa xong là người khó thấy lỗi mới nhất mình vừa tạo ra. Chạy lại đủ bộ
> tiêu chí sau mỗi đợt thay đổi lớn, đừng chỉ chạy nhóm tiêu chí liên quan.
