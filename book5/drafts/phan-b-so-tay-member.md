# Phần B: Sổ tay cho Member (chưa biết code)

📌 **Tóm tắt phần này** — sau phần này, Member (chưa biết code, chỉ mới học
theo Sách 4) có thể tự làm 4 việc thường gặp nhất mà **không cần hiểu bên
trong package `qa_automation_core`** — chỉ cần copy đúng khuôn, điền chỗ
trống:
- B1. Thêm 1 trang web mới
- B2. Thêm 1 màn hình app native mới
- B3. Thêm 1 test giao diện mới (kể cả test responsive)
- B4. Thêm 1 test API mới
- B5. Thêm 1 test tích hợp (giao diện + API)
- B6. Test đỏ thì làm gì — quy trình 4 bước
- B7. Checklist trước khi nộp code

Nguyên tắc chung xuyên suốt Phần B: **chỉ sửa trong repo dự án của mình**
(vd `project-restful-booker-platform`), **không bao giờ sửa trong repo
`qa-automation-core`.** Nếu thấy cần sửa `qa-automation-core` để làm được
việc gì đó, hãy hỏi Lead trước — xem lý do ở mục C3 (Phần C).

## B1. Thêm 1 trang web mới

**Ví dụ thật:** cần test trang đăng nhập Admin (`/admin`) — trang này chưa
có Page Object nào cả.

**Bước 1** — Trong repo `project-restful-booker-platform`, tạo file mới
trong `pages/`, đặt tên theo khuôn `<ten_trang>_page.py`:

```python
"""Page Object cho trang dang nhap Admin - vi du "Member tu them 1 trang moi" (Phan B).

Ke thua BasePage tu package qa_automation_core giong het cach HomePage da
lam - khong sua gi trong package.
"""

from qa_automation_core.base_page import BasePage


class AdminLoginPage(BasePage):
    # ----- locator: doi giao dien chi sua o day -----
    USERNAME_INPUT = "#username"
    PASSWORD_INPUT = "#password"
    LOGIN_BUTTON = "#doLogin"
    ERROR_ALERT = ".alert-danger"

    PATH = "/admin"

    def __init__(self, page, base_url: str):
        super().__init__(page)
        self.base_url = base_url

    def open_login(self) -> "AdminLoginPage":
        self.goto(f"{self.base_url.rstrip('/')}{self.PATH}")
        return self

    def login(self, username: str, password: str) -> "AdminLoginPage":
        self.fill(self.USERNAME_INPUT, username)
        self.fill(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)
        return self

    def should_show_error(self, expected: str) -> "AdminLoginPage":
        """Dung should_have_text (tu thu lai) thay vi get_text + assert.

        Thong bao loi chi hien SAU khi API tra ve - doc ngay se doc trung
        trang thai cu, test do oan du ung dung khong sai.
        """
        self.should_have_text(self.ERROR_ALERT, expected)
        return self
```

**4 điều luôn đúng khi tạo trang mới — copy y hệt khuôn này:**

| Việc | Cách làm |
|---|---|
| Kế thừa | `class TenTrangPage(BasePage):` — luôn kế thừa `BasePage` từ package `qa_automation_core` |
| **Locator thành hằng số ở đầu class** | Dev đổi giao diện thì sửa đúng 1 dòng, không phải dò trong thân hàm (Phần C mục C4, quy tắc 1) |
| **KHÔNG hardcode URL** | Nhận `base_url` qua `__init__` từ config — nếu không, chạy `--env=staging` mà trang vẫn trỏ production (C4, quy tắc 2) |
| Hành động | Chỉ dùng lại các hàm có sẵn từ `BasePage`: `self.goto()`, `self.fill()`, `self.click()`, `self.should_have_text()`... — không tự viết `self.page.locator(...)` nếu `BasePage` đã có hàm tương đương |

**Bước 2** — Đăng ký fixture trong `conftest.py` của repo dự án (Lead làm 1
lần, hoặc Member tự thêm nếu Lead cho phép), theo đúng khuôn của `home_page`
đã có sẵn — tự động có luôn cả chụp ảnh khi lỗi (mục A9):

```python
@pytest.fixture
def admin_login_page(page, request, base_url_web):
    yield from with_screenshot_on_failure(request, AdminLoginPage(page, base_url_web))
```

## B2. Thêm 1 màn hình app native mới

Giống hệt B1 về cách làm, chỉ khác **3 điểm** vì app native dùng Appium chứ
không phải Playwright:

| | Web (B1) | App native (B2) |
|---|---|---|
| Thư mục | `pages/` | `screens/` |
| Kế thừa | `BasePage` | `BaseScreen` |
| Locator | `"#username"` (chuỗi CSS) | `(AppiumBy.ACCESSIBILITY_ID, "o_tim_kiem")` (tuple) |

```python
"""Screen Object man hinh chinh cua APP NATIVE khach hang (iOS/Android).

TODO cua du an: thay accessibility id mau ben duoi bang id that trong app.
"""

from qa_automation_core.base_screen import BaseScreen
from appium.webdriver.common.appiumby import AppiumBy

SEARCH_INPUT = (AppiumBy.ACCESSIBILITY_ID, "o_tim_kiem")
SEARCH_BUTTON = (AppiumBy.ACCESSIBILITY_ID, "nut_tim")
PRODUCT_CARD = (AppiumBy.ACCESSIBILITY_ID, "the_san_pham")


class HomeScreen(BaseScreen):
    def search_product(self, keyword: str) -> "HomeScreen":
        self.fill(SEARCH_INPUT, keyword)
        self.tap(SEARCH_BUTTON)
        return self

    def has_product(self) -> bool:
        return self.is_visible(PRODUCT_CARD)
```

**Mẹo xin locator:** đừng tự đoán. Hỏi đội phát triển app đặt
`accessibility id` (hoặc `resource-id` trên Android) cho các phần tử cần
test — đây là cách bền nhất, không vỡ khi giao diện đổi. Nếu app chưa có,
đề nghị bổ sung; đó là việc của đội phát triển, không phải việc của tester
đi mò XPath.

Đăng ký fixture giống hệt B1, chỉ thay `page` bằng `app_driver`:

```python
@pytest.fixture
def home_screen(app_driver, request):
    yield from with_screenshot_on_failure(request, HomeScreen(app_driver))
```

## B3. Thêm 1 test giao diện mới

Có `admin_login_page` từ B1 rồi, viết test mới trong `tests/test_admin_login.py`
(vẫn trong repo `project-restful-booker-platform`):

```python
"""Test cho AdminLoginPage - vi du minh hoa Phan B (member tu them trang + test moi)."""


def test_login_with_wrong_credentials_shows_error(admin_login_page):
    admin_login_page.open_login().login("sai_user", "sai_pass")
    admin_login_page.should_show_error("Invalid credentials")
```

> ⚠️ **Tuyệt đối không viết** `assert trang.error_message() == "..."`.
> Kiểu đó đọc giá trị ngay lập tức, thông báo hiện chậm 1 nhịp là test đỏ
> oan. Luôn dùng nhóm hàm `kiem_tra_*` (tự thử lại) — xem mục A3 có kết quả
> kiểm chứng cụ thể.

Đã chạy thật — **PASSED**:
```
test_admin_login.py::test_login_with_wrong_credentials_shows_error[chromium] PASSED
```

**Khuôn chung của 1 test UI mới:**
1. Tên hàm bắt đầu bằng `test_`, mô tả rõ **đang kiểm tra cái gì** (không viết `test_1`, `test_2`).
2. Tham số hàm = tên fixture Page Object cần dùng (`admin_login_page`).
3. Dòng đầu tiên: gọi các hành động trên Page Object (nối chuỗi `.goto(...).login(...)`).
4. Dòng cuối: `assert` — so khớp kết quả thật với kết quả mong đợi.

> Chú ý: ví dụ này chỉ test được trường hợp đăng nhập **sai** — vì trang demo
> công khai này không công bố mật khẩu admin thật đáng tin cậy (đã ghi nhận
> từ Sách 4). Với dự án thật của công ty, member sẽ có tài khoản thật để
> test luôn cả trường hợp đăng nhập **đúng**.

**Muốn test chạy trên nhiều kích thước màn hình (responsive)?** Thêm đúng
1 dòng đánh dấu ở trên hàm test, và thêm tham số `viewport_name`:

```python
from qa_automation_core.responsive import for_viewports


@for_viewports("desktop", "tablet", "mobile")
def test_home_shows_rooms_on_every_viewport(home_page, viewport_name, rooms_available):
    home_page.open_home().wait_for_rooms()
    assert home_page.room_card_count() >= 1
```

Test này sẽ **tự chạy 3 lần**, mỗi lần 1 kích thước — không phải viết 3 hàm.
Chỉ ghi `@for_viewports("mobile")` nếu test đó chỉ có ý nghĩa trên điện
thoại (vd nút menu hamburger).

**Test app native** viết y hệt, chỉ khác tên fixture:

```python
def test_search_product_on_app(home_screen):
    home_screen.search_product("ao thun")
    assert home_screen.has_product()
```

## B4. Thêm 1 test API mới

Client `RestfulBookerClient` (repo `project-restful-booker`) đã có sẵn hàm
`list_bookings(**filters)` nhưng **chưa có test nào dùng tới** — đây
là tình huống rất thường gặp: hàm đã có sẵn trong client, member chỉ cần
viết thêm test gọi tới, không cần đụng vào `api_client.py`:

```python
def test_filter_bookings_by_name(rb_client, cleanup):
    """Vi du them 1 test API moi (Phan B) - dung ham list_bookings co san trong client."""
    create_response = rb_client.create_booking(
        {
            "firstname": "Loc",
            "lastname": "TheoTen",
            "totalprice": 1,
            "depositpaid": False,
            "bookingdates": {"checkin": "2026-12-01", "checkout": "2026-12-02"},
        }
    )
    bookingid = create_response.json()["bookingid"]
    cleanup(lambda: rb_client.delete_booking(bookingid))  # nho don du lieu (muc A10)

    response = rb_client.list_bookings(firstname="Loc", lastname="TheoTen")
    assert response.status == 200
    returned_ids = [item["bookingid"] for item in response.json()]
    assert bookingid in returned_ids  # booking vua tao phai nam trong ket qua loc
```

Đã chạy thật — **PASSED**.

**Khuôn chung của 1 test API mới:** giống hệt B3, chỉ khác tham số hàm là
tên fixture API client (`rb_client` thay vì `admin_login_page`). Nếu test có
tạo dữ liệu mới (`create_booking`), **luôn** thêm `cleanup` để dọn lại — xem
mục A10 vì sao.

## B5. Thêm 1 test tích hợp (giao diện + API)

Test tích hợp là test dùng **cả 2 loại fixture cùng lúc** trong 1 hàm — 1
fixture UI (Page Object) và 1 fixture API (client) — để đối chiếu dữ liệu
qua lại giữa 2 bên. Ví dụ đã có sẵn từ Sách 4, giờ viết lại bằng framework
mới:

```python
def test_room_on_ui_exists_in_api(home_page, rbp_client, rooms_available):
    response = rbp_client.list_rooms()
    assert response.status == 200
    rooms_from_api = {p["roomid"]: p for p in response.json()["rooms"]}

    home_page.open_home().wait_until_visible(".room-card")
    roomid = home_page.room_id_at(0)

    assert roomid in rooms_from_api  # phong dau tien tren UI phai co that trong API
```

Đã chạy thật — **PASSED**.

**Khuôn chung của 1 test tích hợp:** hàm nhận **2 tham số fixture trở lên**
— 1 (hoặc nhiều) fixture Page Object và 1 (hoặc nhiều) fixture API client.
Thứ tự thường gặp: gọi API trước để lấy "dữ liệu gốc đáng tin", rồi mới thao
tác UI, cuối cùng đối chiếu 2 bên.

## B6. Test đỏ thì làm gì — quy trình 4 bước

Khi CI báo đỏ, thứ tự việc cần làm (đừng vội sửa test):

**Bước 1 — Đọc thông báo lỗi.** Với nhóm hàm `kiem_tra_*`, thông báo đã nói
rõ mong đợi gì, thực tế nhận gì, và đã thử lại bao lâu:

```
Expected string: "Invalid credentials"
Actual value: "Dang xu ly..."
Call log: waiting for locator(".alert-danger")
```

**Bước 2 — Mở "đoạn phim" của lần chạy đó.** Mỗi lần test web FAILED, hệ
thống tự lưu lại 2 thứ trong `test-results/` (đã bật sẵn trong `pytest.ini`):

| File | Dùng để làm gì |
|---|---|
| `trace.zip` | Xem lại **từng bước**: DOM lúc đó, network, console log, ảnh trước/sau mỗi thao tác |
| `video.webm` | Xem lại như một đoạn phim — nhanh, dễ hình dung |

Mở trace bằng lệnh:

```
playwright show-trace test-results/<name-test>/trace.zip
```

Đây là công cụ mạnh nhất để debug: thấy đúng khoảnh khắc lỗi, xem được lúc
đó API trả về gì, có lỗi JavaScript nào không.

**Bước 3 — Phân loại lỗi.** Trả lời 1 câu hỏi: *"ứng dụng sai, hay cách test
sai?"*

| Dấu hiệu | Loại | Xử lý |
|---|---|---|
| Chạy lại vẫn đỏ y hệt, trace cho thấy ứng dụng hiện sai | **Bug thật** | Báo đội phát triển, kèm trace |
| Chạy lại lúc xanh lúc đỏ | **Test đỏ oan (flaky)** | Sửa cách test — thường do dùng `get_text` + assert thay vì `kiem_tra_*`, hoặc assert vào dữ liệu dùng chung |
| Đỏ đúng lúc môi trường vừa deploy / mất mạng | **Môi trường** | Chạy lại, không sửa gì |

**Bước 4 — Chỉ khi chắc chắn là "test sai" mới sửa test.** Sửa test để làm
nó xanh trong khi ứng dụng đang sai thật là việc tệ nhất một tester có thể
làm — bộ test mất hết ý nghĩa.

## B7. Checklist trước khi nộp code test

| # | Việc cần kiểm tra | Vì sao |
|---|---|---|
| 1 | Tên hàm test bắt đầu bằng `test_`, mô tả rõ ràng | pytest chỉ nhận diện hàm bắt đầu bằng `test_`; tên rõ giúp đọc báo cáo lỗi biết ngay đang test gì |
| 2 | Test có tạo dữ liệu mới → có dùng `cleanup` để dọn | Tránh để lại rác dữ liệu trong hệ thống test dùng chung (mục A10) |
| 3 | Chạy lại **toàn bộ** `pytest -v`, không chỉ file vừa sửa | Đảm bảo không vô tình làm hỏng test khác |
| 4 | Nếu test FAILED, đọc kỹ thông báo lỗi + ảnh chụp trong `report/anh_loi/` trước khi hỏi Lead | Ảnh chụp tự động sinh ra ngay khi FAILED (mục A9) — thường đã đủ để tự tìm ra nguyên nhân |
| 5 | Không sửa bất kỳ file nào trong repo `qa-automation-core` | Sửa `qa-automation-core` ảnh hưởng MỌI dự án khác đang cài package này — luôn hỏi Lead trước (mục C3) |
| 6 | Đặt tên file/hàm bằng tiếng Việt không dấu, nhất quán với style đã có trong dự án | Đồng bộ style giúp cả team đọc code của nhau dễ hơn |

Làm đủ 6 bước trên trước khi báo Lead review — hầu hết lỗi thường gặp
(rác dữ liệu, sửa nhầm repo `qa-automation-core`, quên chạy lại toàn bộ) đều
bị chặn lại ở đây.
