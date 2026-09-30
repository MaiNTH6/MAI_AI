# Phần C: Vận hành chung cả team

📌 **Tóm tắt phần này** — sau phần này, Lead có:
- Quy ước đặt tên + checklist review code test của Member.
- Báo cáo Allure có ảnh evidence tự động gắn kèm (nối tiếp mục A9).
- CI (GitHub Actions) chạy tự động cho từng repo dự án.
- Quy trình phát hành version mới của `qa-automation-core`, nguyên tắc bảo trì
  dài hạn, và 2 cái bẫy vận hành khiến bộ test mất giá trị.
  khi nào nên đưa 1 thứ lên package dùng chung, khi nào chỉ để riêng ở 1
  dự án.

## C1. Quy ước đặt tên và review code test

**Quy ước đặt tên** (áp dụng cho mọi repo dự án đang cài `qa-automation-core`):

| Loại | Quy ước | Ví dụ |
|---|---|---|
| File Page Object (web) | `<ten_trang>_page.py` trong `pages/` | `admin_login_page.py` |
| Class Page Object (web) | `PascalCase`, kết thúc bằng `Page` | `AdminLoginPage` |
| File Screen Object (app native) | `<ten_man_hinh>.py` trong `screens/` | `home_screen.py` |
| Class Screen Object (app native) | `PascalCase`, bắt đầu bằng `ManHinh` | `HomeScreen` |
| File API client | `api_client.py` (1 file / repo dự án) | `project-restful-booker/api_client.py` |
| Class API client | `PascalCase`, kết thúc bằng `Client` | `RestfulBookerClient` |
| File test | `test_<chuc_nang>.py` | `test_admin_login.py` |
| Hàm test | `test_<hanh_dong>_<ket_qua_mong_doi>` | `test_login_with_wrong_credentials_shows_error` |
| Tiếng Việt | Không dấu, ngăn cách bằng `_` (snake_case) | `list_bookings` |

**Checklist Lead review code test của Member** (đối chiếu với checklist tự
kiểm ở mục B5 — Lead xác nhận lại, không phải làm lại từ đầu):

1. Test có nằm đúng trong repo dự án, không đụng vào code của package
   `qa-automation-core` (repo riêng)?
2. Có test nào tạo dữ liệu mà thiếu `cleanup` để dọn không?
3. Tên hàm/file có theo đúng quy ước ở bảng trên không?
4. Test có đang assert vào dữ liệu **không kiểm soát được** không (vd tổng
   số lượng trên dữ liệu dùng chung — bài học từ Sách 4, Chương 15.3)?
5. `requirements.txt` có ghim đúng **tag phiên bản** của `qa-automation-core`
   (vd `@v1.0.0`), không ghim theo `main`?
6. Nếu Member đề xuất cần đổi gì đó trong `qa-automation-core` — xem xét
   theo quy trình ở mục C3 trước khi đồng ý.

## C2. Báo cáo Allure + CI tự động

**Allure Report** — dựng báo cáo trực quan cho từng repo dự án, đã tích hợp
sẵn ảnh evidence tự động (mục A9):

```
pytest --alluredir=allure-results
allure generate allure-results -o allure-report --clean
allure open allure-report
```

**Đã kiểm chứng thật:** chạy 1 test cố ý FAILED trong
`project-restful-booker-platform`, sinh báo cáo, mở file dữ liệu thô trong
`allure-results/` — xác nhận ảnh chụp lỗi được gắn đúng vào bước fixture,
tên `anh_loi`, định dạng `image/png`:

```json
{
  "name": "home_page::1",
  "status": "passed",
  "attachments": [
    {"name": "anh_loi", "source": "....attachment.png", "type": "image/png"}
  ]
}
```

→ Vào Allure Report, mở đúng test FAILED đó, tab fixture `home_page` sẽ
hiện sẵn ảnh chụp màn hình — không cần tìm file riêng trong
`report/anh_loi/`. Cơ chế này nằm trong `qa_automation_core/evidence.py`
(mục A9) — mọi repo dự án cài package đều có sẵn, không cần viết lại.

**CI (GitHub Actions)** — mỗi **repo dự án** có 1 workflow riêng (không
phải 1 workflow chung cho tất cả), chạy đúng theo mô hình đã dùng ở Sách 4:

Tạo file `.github/workflows/tests.yml` **trong từng repo dự án**:

```yaml
name: Chay test tu dong

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Lay code ve
        uses: actions/checkout@v4

      - name: Cai Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.13"

      - name: Cai thu vien Python (bao gom qa-automation-core qua git)
        run: pip install -r requirements.txt

      - name: Cai trinh duyet cho Playwright
        run: playwright install --with-deps chromium

      - name: Chay toan bo test, xuat du lieu Allure
        run: pytest --env=dev --alluredir=allure-results

      - name: Luu ket qua Allure lam artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: allure-results
          path: allure-results

      - name: Luu anh loi (neu co test FAILED) lam artifact
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: anh-loi
          path: report/anh_loi
          if-no-files-found: ignore
```

Bước `pip install -r requirements.txt` sẽ tự tải `qa-automation-core` từ
Git theo đúng tag đã ghim — nghĩa là CI của từng dự án **tự kiểm tra luôn**
việc cài package core có còn hoạt động đúng hay không mỗi lần chạy.

**Riêng test app native không chạy được trên CI thường.** Máy chủ GitHub
Actions không có điện thoại hay emulator. 3 cách xử lý, chọn theo ngân sách:

| Cách | Ưu | Nhược |
|---|---|---|
| Dịch vụ device farm (BrowserStack, Sauce Labs, Firebase Test Lab) | Có sẵn hàng trăm loại máy thật, không phải tự dựng | Tốn phí theo phút chạy |
| Máy CI tự dựng (self-hosted runner) có emulator | Không tốn phí dịch vụ | Phải tự cài, tự bảo trì máy |
| Chạy tay định kỳ trước mỗi lần phát hành | Không tốn gì | Không tự động, dễ quên |

Dù chọn cách nào, **test web vẫn nên chạy tự động mỗi lần đẩy code** — đừng
để phần app native chưa dựng được làm chậm luôn cả phần web.

> **Lưu ý trung thực:** phần `pytest --alluredir` và `allure generate` ở
> trên đã chạy thật trên máy (cả 2 repo dự án), kết quả là thật. Riêng file
> YAML này dùng đúng các bước đã chạy thật trên GitHub Actions ở dự án Sách
> 4 (`book4-api-automation`) — 3 repo của Sách 5 tại thời điểm viết chưa
> được đẩy lên GitHub nên chưa tự kiểm tra lại lần nữa trên CI thật. Khi
> Lead đẩy lên GitHub, nhớ mở tab **Actions** xác nhận chạy xanh.

### Bản thân `qa-automation-core` cũng phải có bộ test riêng

Đây là điểm rất hay bị bỏ qua: package dùng chung mà **không có test cho
chính nó** thì mỗi lần Lead sửa core là một lần đánh cược — chỉ phát hiện
hỏng khi các dự án đã cài về và đỏ hàng loạt.

Repo `qa-automation-core` có **65 test cho chính nó**, chạy hoàn toàn
offline (không gọi ra internet):

| Nhóm test | Kiểm chứng gì |
|---|---|
| Che dữ liệu nhạy cảm | Mật khẩu/token không lọt vào log |
| `BaseApiClient` (dùng **API context giả**) | Gọi đúng method, gộp đúng header auth |
| `BaseScreen` (dùng **driver giả**) | Logic tầng app native — verify được dù chưa có thiết bị thật |
| Config + phiên đăng nhập | Đọc config, hạn phiên, thông báo lỗi rõ ràng |
| `BasePage` (Playwright thật, **HTML nội bộ**) | Nhóm `kiem_tra_*` tự thử lại đúng thiết kế |
| Plugin pytest (dùng `pytester`) | `--env`, `viewport_name`, evidence không đẻ lỗi giả |

**2 nguyên tắc khi viết test cho chính framework:**

1. **Không gọi ra internet.** Test của core dùng `page.set_content()` với
   HTML tự viết — trang demo bên ngoài đổi hay sập thì test core không được
   đỏ theo.
2. **Dùng đối tượng giả cho thứ chưa có.** Không có điện thoại thật vẫn
   test được phần lớn `BaseScreen` bằng driver giả: gọi đúng hàm chưa, tính
   đúng toạ độ vuốt chưa, tạo đúng đường dẫn ảnh chưa. Phần còn lại mới cần
   thiết bị thật.

CI của repo core chạy bộ test này trên nhiều bản Python, **và kiểm tra thêm
1 điều quan trọng**: bản cài tối thiểu (không có `[mobile]`) phải **không
kéo theo Appium** — để dự án chỉ làm web không bị bắt cài thừa:

```yaml
  cai_dat_toi_thieu:
    steps:
      - run: pip install .
      - name: Xac nhan import duoc va KHONG can Appium
        run: |
          python -c "import qa_automation_core.base_page, qa_automation_core.base_screen; print('OK')"
          python -c "import importlib.util; assert importlib.util.find_spec('selenium') is None; print('OK')"
```

**Quy tắc:** bộ test này phải xanh **trước khi gắn tag phiên bản mới** —
mọi dự án trong công ty đều phụ thuộc vào package này.

## C3. Quy trình thay đổi `qa-automation-core` — khi nào, làm sao

Vì `qa-automation-core` giờ là 1 **repo/package riêng**, thay đổi nó không
còn là "sửa 1 file trong cùng repo" như bản mono-repo — mà là 1 **quy trình
phát hành version mới**, ảnh hưởng mọi dự án đang phụ thuộc vào nó.

**Khi nào đưa 1 thứ lên `qa-automation-core`, khi nào để riêng ở 1 dự án:**

| Tình huống | Xử lý ở đâu | Vì sao |
|---|---|---|
| Cần 1 trang mới, 1 test mới cho **1 dự án cụ thể** | Trong repo dự án đó — Member tự làm | Không ảnh hưởng dự án khác |
| Cần 1 hành động UI **hoàn toàn mới** nhưng **chỉ 1 dự án** cần (vd kéo-thả) | Thêm hàm riêng trong Page Object của dự án đó, **không** đẩy lên `BasePage` | Chưa chắc dự án khác cần — đẩy sớm dễ làm core phình to không cần thiết |
| Cùng 1 hành động UI/API **được ít nhất 2 dự án khác nhau cần lặp lại** | Đề xuất thêm vào `qa-automation-core` (`BasePage`/`BaseApiClient`) | Dấu hiệu rõ ràng nhất của "dùng chung thật sự", không phải đoán trước |
| Đổi cách xác thực, cách chụp ảnh, cách dọn dữ liệu... (ảnh hưởng **mọi dự án**) | Lead sửa trong repo `qa-automation-core`, phát hành version mới theo quy trình dưới | Rủi ro cao nhất — 1 lỗi ở đây ảnh hưởng mọi dự án khi họ nâng cấp |
| Thêm 1 dự án hoàn toàn mới (app thứ 3, thứ 4...) | Tạo 1 repo mới, tự viết `config.json` riêng, cài `qa-automation-core` qua `requirements.txt` | Đúng quy trình đã chứng minh ở mục A12 — không cần sửa gì trong `qa-automation-core` |

**Quy trình phát hành version mới của `qa-automation-core`:**

1. Sửa code trong repo `qa-automation-core`, chạy thử với ít nhất 1 dự án
   thật (trỏ tạm `requirements.txt` của dự án đó vào nhánh đang sửa) để
   chắc chắn không phá vỡ hành vi cũ.
2. Tăng version trong `pyproject.toml` theo
   [Semantic Versioning](https://semver.org):
   - Sửa lỗi nhỏ, không đổi cách gọi hàm → tăng số cuối (`0.1.0` → `0.1.1`).
   - Thêm hàm mới, không ảnh hưởng code cũ → tăng số giữa (`0.1.1` → `0.2.0`).
   - Đổi tên hàm, đổi tham số bắt buộc (code cũ gọi sẽ lỗi) → tăng số đầu
     (`0.2.0` → `1.0.0`), và ghi rõ **BREAKING CHANGE** trong `CHANGELOG.md`.
3. `git commit`, `git tag vX.Y.Z`, `git push && git push --tags`.
4. Thông báo cho các dự án đang dùng — **không tự động áp dụng** cho dự án
   nào cả, mỗi dự án tự sửa `requirements.txt` sang tag mới khi họ sẵn sàng.

**Quy tắc ghi nhớ ngắn gọn:** *"Lặp lại ở 2 dự án trở lên mới đưa vào
`qa-automation-core`. Còn nghi ngờ thì cứ để riêng ở dự án trước, chuyển lên
sau cũng không muộn — nhưng đẩy lên core quá sớm rồi phải rút xuống thì khó
hơn nhiều, vì lúc đó có thể đã có dự án khác lỡ phụ thuộc vào nó."*

## C4. Viết sao cho 6 tháng nữa còn sửa được

Chi phí lớn nhất của bộ test tự động **không phải lúc viết**, mà là lúc bảo
trì: dev đổi giao diện, đổi môi trường, người cũ nghỉ việc. 4 quy tắc dưới
đây quyết định bộ test sống được bao lâu.

### Quy tắc 1: locator khai báo thành hằng số ở đầu class

Đây là thứ đổi thường xuyên nhất. Viết locator rải rác trong thân hàm thì
mỗi lần dev đổi tên class CSS, người bảo trì phải đọc hết từng hàm để dò.

```python
# ❌ Locator nam rai rac trong than ham - doi 1 locator phai do tim khap file
class AdminLoginPage(BasePage):
    def login(self, username, password):
        self.fill("#username", username)
        self.fill("#password", password)
        self.click("#doLogin")

    def should_show_error(self, expected):
        self.should_have_text(".alert-danger", expected)

    def error_message(self):
        return self.get_text(".alert-danger")   # lap lan 2!
```

```python
# ✅ Gom o dau class - doi giao dien chi sua 1 dong, nhin phat thay ngay
class AdminLoginPage(BasePage):
    # ----- locator: doi giao dien chi sua o day -----
    USERNAME_INPUT = "#username"
    PASSWORD_INPUT = "#password"
    LOGIN_BUTTON = "#doLogin"
    ERROR_ALERT = ".alert-danger"

    def login(self, username, password):
        self.fill(self.USERNAME_INPUT, username)
        self.fill(self.PASSWORD_INPUT, password)
        self.click(self.LOGIN_BUTTON)
```

Lợi ích kèm theo: mở 1 file Page Object là **thấy ngay toàn bộ locator của
trang đó**, không phải đọc hết code mới biết trang này phụ thuộc vào những
phần tử nào.

### Quy tắc 2: KHÔNG hardcode URL trong Page Object

```python
# ❌ Hai nguon su that: config.json noi 1 dang, Page Object noi 1 dang
URL = "https://automationintesting.online/"

class HomePage(BasePage):
    def open_home(self):
        self.goto(URL)
```

Chạy `pytest --env=staging` mà Page Object vẫn trỏ **production** — lỗi này
rất nguy hiểm: test xanh nhưng đang test nhầm môi trường, thậm chí tạo dữ
liệu rác lên production.

```python
# ✅ Nhan base_url tu config, 1 nguon su that duy nhat
class HomePage(BasePage):
    def __init__(self, page, base_url: str):
        super().__init__(page)
        self.base_url = base_url

    def open_home(self) -> "HomePage":
        self.goto(self.base_url)
```

### Quy tắc 3: không để 1 quy ước tồn tại ở 2 nơi

Trong `qa-automation-core` từng có hằng số `DEFAULT_SCREENSHOT_DIR` khai
báo **trùng** ở cả `base_page.py` lẫn `base_screen.py`, kèm đoạn code tạo
thư mục giống hệt nhau. Đổi quy ước phải nhớ sửa 2 chỗ — kiểu gì cũng có lần
quên, rồi 2 bên lệch nhau mà không ai biết.

Đã tách ra 1 file riêng `screenshots.py`, cả 2 cùng import. **Dấu hiệu
nhận biết:** thấy mình copy-paste 1 hằng số hay 1 đoạn logic sang file thứ
hai → dừng lại, tách ra chỗ dùng chung.

### Quy tắc 4: phân biệt "lỗi dựng dữ liệu" với "bài test thất bại"

```python
# ❌ Dung assert - bao cao hien "test FAILED", nguoi doc tuong ung dung sai
response = admin_api.create_merchant(payload)
assert response.status in (200, 201)
```

```python
# ✅ Nem loi rieng - doc bao cao la biet ngay day la loi CHUAN BI
if response.status not in (200, 201):
    raise TestDataError(
        f"Khong dung duoc du lieu dau vao (tao merchant): HTTP {response.status}. "
        f"Day la loi CHUAN BI, khong phai bai test that bai."
    )
```

Người bảo trì đọc báo cáo lúc 2h sáng sẽ biết ngay nên đi tìm bug ứng dụng
hay đi kiểm tra môi trường/dữ liệu.

### Bảng tổng kết

| Quy tắc | Nếu làm sai thì 6 tháng sau |
|---|---|
| Locator thành hằng số đầu class | Dò tìm locator trong từng hàm; 1 locator lặp ở nhiều chỗ, sửa sót |
| URL lấy từ config | Chạy staging nhưng test nhầm production |
| Không lặp quy ước ở 2 nơi | 2 bản lệch nhau, hành vi khác nhau giữa web và app |
| Tách lỗi dựng dữ liệu khỏi lỗi test | Mất công điều tra nhầm hướng mỗi lần đỏ |

Thêm 2 thứ nhỏ nhưng đáng làm ngay từ đầu cho package dùng chung:
**`py.typed`** (để IDE của mọi dự án gợi ý được tên hàm, bắt lỗi gõ sai ngay
khi viết) và **cấu hình `ruff`** (giữ style đồng nhất khi nhiều người cùng
sửa core qua thời gian).

## C5. Hai cái bẫy vận hành khiến bộ test mất giá trị

### Bẫy 1: test đỏ vì môi trường bên ngoài hỏng

Chuyện có thật khi viết sách này: đang chạy hồi quy thì 4 test đỏ. Điều tra
ra: trang demo công khai **tạm thời không còn phòng nào** (`/api/room` trả
403). Ứng dụng không sai, test không sai — **môi trường bên ngoài hỏng**.

Nếu cứ để đỏ, hậu quả rất tệ: người xem báo cáo mất thời gian điều tra nhầm,
rồi dần dần quen với việc "có mấy test hay đỏ, kệ nó" — và đó là lúc bộ test
mất sạch giá trị.

Cách xử lý: thêm 1 fixture **kiểm tra điều kiện tiên quyết**, thiếu thì
**BỎ QUA kèm lý do** chứ không báo đỏ:

```python
@pytest.fixture(scope="session")
def rooms_available(api_context) -> None:
    """BO QUA (khong phai FAIL) khi trang demo cong khai khong con phong nao."""
    response = RestfulBookerPlatformClient(api_context).list_rooms()
    if response.status != 200:
        pytest.skip(
            f"Trang demo dang khong phuc vu /api/room (HTTP {response.status}) - "
            f"bo qua test can du lieu phong."
        )
    if not response.json().get("rooms"):
        pytest.skip("Trang demo hien khong con phong nao - bo qua test can du lieu phong.")
```

Test nào cần dữ liệu đó thì khai báo thêm tham số:

```python
def test_room_on_ui_exists_in_api(home_page, rbp_client, rooms_available):
    ...
```

**Đã kiểm chứng:** mô phỏng API phòng không phục vụ, kết quả đúng như mong đợi —

```
SKIPPED [1] tests\test_tich_hop.py:1: Trang demo dang khong phuc vu /api/room (HTTP 404) - bo qua test can du lieu phong.
SKIPPED [1] tests\test_ui.py:15: Trang demo dang khong phuc vu /api/room (HTTP 404) - bo qua test can du lieu phong.
```

> **Ranh giới cần giữ:** chỉ skip khi **điều kiện tiên quyết** không có (môi
> trường, dữ liệu nền). Tuyệt đối **không** skip để né một bài test hay đỏ —
> đó là giấu lỗi, khác hẳn về bản chất.

### Bẫy 2: code trong tài liệu lệch với code thật

Tài liệu chép tay code từ repo. Sửa code mà quên sửa tài liệu thì người đọc
làm theo sẽ ra kết quả khác. Trong lúc viết Sách 5, chuyện này xảy ra **6
lần** — đủ để kết luận: trông chờ vào trí nhớ là không đủ.

Giải pháp: 1 script đối chiếu tự động, lấy mọi dòng `def`/`class` trong các
khối code của sách rồi kiểm tra chúng có tồn tại **đúng nguyên văn** trong mã
nguồn thật không:

```
python book5/scripts/kiem_tra_dong_bo.py
```

```
Da quet 84 dinh nghia trong sach.
OK - sach va ma nguon khop nhau.
```

Script trả về mã thoát khác 0 khi phát hiện lệch, nên cắm thẳng vào CI được.
Lần chạy đầu tiên nó bắt được **9 điểm lệch**, trong đó có 2 lỗi thật sự
nguy hiểm: một hàm đã đổi tham số, và một ví dụ trong sách dạy ngược lại
chính quy tắc mà sách đặt ra ở mục C4.

Script cố tình **bỏ qua** các khối có dấu ❌ (ví dụ cố ý sai để dạy "đừng
viết thế này"), và chỉ đối chiếu chữ ký hàm chứ không so toàn bộ thân hàm —
vì sách hay lược bớt bằng `...`. Nó không bắt được mọi kiểu lệch, nhưng bắt
được **kiểu lệch nguy hiểm nhất**: đổi tên hàm, thêm/bớt tham số.
