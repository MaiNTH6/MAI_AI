# -*- coding: utf-8 -*-
"""Bài: Manual -> automation bằng Claude Code + Playwright (Python), test thật trên MAI.tools.
Ví dụ trong bài ĐÃ CHẠY THẬT bằng pytest trên https://maiqa.vercel.app (3 passed / 6 passed).
Chạy: python -X utf8 scripts/add-article-automation.py
"""
import json, io

P = "data/articles.json"
a = json.load(io.open(P, encoding="utf-8"))

SLUG = "ai-viet-script-automation-playwright-tu-test-case"

CODE_PROMPT1 = """Claude Code tạo file test (đã chạy thật, rút gọn):

# test_mai_tools.py
import re
from playwright.sync_api import Page, expect

class TrangChu:
    def __init__(self, page: Page):
        self.page = page
    def mo(self):
        self.page.goto("/")
    def tieu_de_hero(self):
        return self.page.get_by_role("heading", level=1)
    def menu_ai_cho_qa(self):
        return self.page.get_by_role("link", name="AI cho QA", exact=True)
    def o_tim_kiem(self):
        return self.page.locator('input[name="q"]')
    def nut_tim(self):
        return self.page.get_by_role("button", name="Tìm")
    def tim(self, tu_khoa: str):
        self.o_tim_kiem().fill(tu_khoa)
        self.nut_tim().click()

def test_trang_chu_hien_dung_hero(page: Page):
    home = TrangChu(page); home.mo()
    expect(home.tieu_de_hero()).to_contain_text("trợ lý đắc lực cho dân QA")

def test_menu_ai_cho_qa_chuyen_dung_trang(page: Page):
    home = TrangChu(page); home.mo()
    home.menu_ai_cho_qa().click()
    expect(page).to_have_url(re.compile(r"/ai-qa$"))

def test_tim_kiem_ra_ket_qua(page: Page):
    home = TrangChu(page); home.mo()
    home.tim("test case")
    expect(page).to_have_url(re.compile(r"/tim-kiem"))
    expect(page.get_by_role("heading", level=1)).to_contain_text("Kết quả cho")
    expect(page.locator('a[href^="/bai-viet/"]').first).to_be_visible()

# TODO: nếu test web nội bộ, xác nhận lại nhãn nút/menu và base URL với trang thật.

--- Chạy thử (đã chạy thật) ---
$ pytest --base-url https://maiqa.vercel.app -q
3 passed in 10.64s"""

CODE_PROMPT3 = """// test data-driven (đã chạy thật, rút gọn):

import re, pytest
from playwright.sync_api import Page, expect

@pytest.mark.parametrize("tu_khoa", ["test case", "requirement", "automation"])
def test_tim_kiem_co_ket_qua(page: Page, tu_khoa):
    page.goto("/")
    page.locator('input[name="q"]').fill(tu_khoa)
    page.get_by_role("button", name="Tìm").click()
    expect(page).to_have_url(re.compile(r"/tim-kiem"))
    expect(page.locator('a[href^="/bai-viet/"]').first).to_be_visible()

--- Chạy thử (đã chạy thật) cùng 3 test trước ---
$ pytest --base-url https://maiqa.vercel.app -q
6 passed in 7.06s
# pytest tự gắn tham số vào tên test: test_tim_kiem_co_ket_qua[automation] ..."""

CODE_PROMPT2 = """Claude Code chẩn đoán & sửa:

- Nguyên nhân: Playwright chạy ở "strict mode". Locator get_by_role("link", name="QA") khớp tới 13 liên kết — vì "QA" là khớp chuỗi con, xuất hiện ở cả menu, nút lẫn các thẻ bài viết "QA / Test" — nên nó báo lỗi thay vì bấm bừa.
- Sửa: thu hẹp cho khớp đúng MỘT phần tử. Playwright còn gợi ý sẵn ngay trong lỗi (dòng "aka ..."):
    # thay:  page.get_by_role("link", name="QA")
    # bằng:  page.get_by_role("link", name="AI cho QA", exact=True)
- Vì sao: thêm exact=True buộc khớp đúng nhãn "AI cho QA" thay vì mọi link chứa "QA". Strict mode chính là thứ ép locator phải rõ ràng, tránh test bấm nhầm phần tử rồi vẫn "xanh"."""

art = {
    "slug": SLUG,
    "title": "Manual sang automation: để Claude Code viết test Playwright + Python, chạy thật trên web của bạn",
    "excerpt": (
        "Biết viết kịch bản test nhưng ngại dựng automation vì phải code? Bài này dùng Claude Code sinh test Playwright "
        "bằng Python cho một trang web thật — chạy `pytest` ra kết quả ngay — kèm Page Object, cách sửa khi test đỏ, và "
        "những chỗ bạn phải tự rà thay vì tin AI."
    ),
    "category": "ai-qa",
    "readingTime": 11,
    "publishedAt": "2026-06-18",
    "cover": "🎭",
    "intro": {
        "problem": (
            "Nhiều tester thủ công nắm chắc kịch bản kiểm thử, nhưng đến bước automation thì khựng lại vì cú pháp, selector, "
            "xử lý bất đồng bộ — toàn thứ nghe như việc của lập trình viên. Viết tay từng test vừa lâu vừa dễ nản, trong khi "
            "tin tuyển dụng ngày càng đòi 'biết automation'. Cái khó thường không nằm ở kịch bản — cái đó bạn đã có — mà ở "
            "việc dịch nó sang code chạy được."
        ),
        "whatIs": (
            "Claude Code là công cụ AI chạy trong thư mục dự án, đọc được cấu trúc trang rồi tạo ra file test thật trong repo. "
            "Playwright hỗ trợ Python; kết hợp với pytest (qua gói pytest-playwright) là cách viết test web gọn gàng cho người "
            "dùng Python. Bài này lấy chính trang MAI.tools làm ví dụ — một web thật đang chạy — nên mọi test đều chạy lại và "
            "kiểm chứng được."
        ),
        "whyThis": (
            "So với việc dán từng đoạn vào ChatGPT, Claude Code thấy được cấu trúc trang thật nên đặt locator sát hơn, sinh nhiều "
            "file cùng lúc và sửa trực tiếp khi chạy lỗi. Toàn bộ ví dụ dưới đây đã được chạy thật bằng `pytest` trên "
            "maiqa.vercel.app — không phải code suông. Dù vậy, script AI sinh ra vẫn là bản nháp cần rà, không phải kết quả tin ngay."
        ),
    },
    "tldr": [
        "Bạn vẫn là người quyết định kiểm gì; AI chỉ chuyển kịch bản thành code Python.",
        "Claude Code đọc trang web rồi sinh test Playwright + pytest (Page Object + expect) chạy được.",
        "Ví dụ trong bài đã chạy thật trên trang MAI.tools — pytest báo 'passed', không phải code suông.",
        "Phần việc còn lại của bạn: rà selector cho hết mơ hồ, xử lý chờ, kiểm assertion đúng nghĩa.",
        "Cài nhanh: `pip install pytest-playwright` rồi `playwright install`.",
    ],
    "steps": [
        {
            "title": "Bước 1 — Cài Playwright cho Python",
            "body": (
                "Trong thư mục dự án test, chạy `pip install pytest-playwright` rồi `playwright install` (lệnh sau tải trình duyệt "
                "Chromium/Firefox/WebKit về). Đây cũng đúng là cách bài này đã cài để chạy các ví dụ bên dưới.\n"
                "[Chèn ảnh: terminal sau khi chạy pip install pytest-playwright và playwright install]"
            ),
        },
        {
            "title": "Bước 2 — Mở Claude Code, cho nó xem trang cần test",
            "body": (
                "Mở Claude Code tại thư mục test. Chỉ cho nó địa chỉ trang cần kiểm (ví dụ https://maiqa.vercel.app) và mô tả các "
                "phần chính: tiêu đề lớn, menu, ô tìm kiếm. Mục tiêu là để AI nắm cấu trúc trang trước khi sinh code, nhờ vậy "
                "locator sát thực tế hơn.\n"
                "[Chèn ảnh: Claude Code trong terminal, đang đọc/được mô tả trang chủ MAI.tools]"
            ),
        },
        {
            "title": "Bước 3 — Yêu cầu sinh test theo Page Object",
            "body": (
                "Lưu bộ test case của trang (mỗi case gồm Thao tác + Verify) thành một file, ví dụ `test-cases/trang-chu.md`. "
                "Rồi dùng Prompt 1 bên dưới để Claude Code đọc file đó và sinh file test: một class Page Object (gom locator + "
                "hành động của trang) và các hàm test (mỗi case một test, có assertion bằng expect). Tổ chức theo Page Object giúp "
                "khi giao diện đổi bạn chỉ sửa một chỗ. Bắt đầu với đúng một trang — trang chủ — cho dễ kiểm soát.\n"
                "[Chèn ảnh: file test-cases/trang-chu.md và file test sinh ra cạnh nhau]"
            ),
            "linkSlug": "ai-viet-test-case-tu-user-story",
            "linkLabel": "Cần kịch bản test trước? Xem bài Viết test case từ user story",
        },
        {
            "title": "Bước 4 — Chạy pytest, đọc kết quả, sửa khi đỏ",
            "body": (
                "Chạy `pytest --base-url https://maiqa.vercel.app -q`. Lần đầu thường gặp lỗi 'strict mode' (locator khớp nhiều phần "
                "tử) hoặc selector chưa đúng — dán lỗi cho Claude Code để nó sửa (Prompt 2). Thêm `--headed` để xem trình duyệt chạy "
                "trực tiếp, hoặc bật trace khi cần soi từng bước.\n"
                "[Chèn ảnh: kết quả pytest hiện '3 passed']"
            ),
        },
        {
            "title": "Bước 5 — Gộp data-driven & mở rộng, rồi mới tính CI",
            "body": (
                "Khi trang đầu đã xanh và bạn đã rà đúng, gộp các case cùng dạng (nhiều từ khóa, nhiều bộ dữ liệu) thành một test "
                "data-driven bằng `@pytest.mark.parametrize` cho gọn (Prompt 3), rồi mở rộng sang trang khác. Khi bộ test đủ ổn định "
                "mới đưa vào CI (GitHub Actions...) — đừng vội tự động hóa khi test còn chập chờn."
            ),
        },
    ],
    "prompts": [
        {
            "title": "Prompt 1 — Sinh test Playwright (Python) theo Page Object",
            "goal": "Biến bộ test case của trang chủ thành test Playwright + pytest chạy được, tổ chức theo Page Object.",
            "prompt": (
                "Đọc bộ test case cho trang chủ https://maiqa.vercel.app trong file `test-cases/trang-chu.md` "
                "(mỗi case gồm phần Thao tác và Verify), rồi viết test tự động bằng Playwright Python "
                "(pytest-playwright), tổ chức theo Page Object Model:\n"
                "- Một class TrangChu: gom locator và hành động (mở trang, lấy tiêu đề, bấm menu, nhập ô tìm kiếm rồi bấm Tìm).\n"
                "- Mỗi test case thành một hàm test_...: thực hiện đúng phần 'Thao tác', rồi dùng expect() để kiểm đúng phần 'Verify'.\n"
                "Ưu tiên locator theo vai trò/nhãn/nội dung (get_by_role, get_by_label); nếu phần tử không có vai trò/nhãn "
                "phù hợp (ví dụ ô tìm kiếm) thì dùng thuộc tính ổn định như name, tránh selector phụ thuộc class/style dễ vỡ. "
                "Mở trang để xác nhận selector trước khi viết; chỗ nào chưa chắc thì ghi TODO, đừng đoán bừa. "
                "Dùng base URL qua --base-url để goto('/')."
            ),
            "exampleInput": (
                "test-cases/trang-chu.md — bộ test case cho trang chủ https://maiqa.vercel.app:\n\n"
                "TC-01 — Tiêu đề trang chủ hiển thị đúng\n"
                "  Thao tác: Mở trang chủ (\"/\").\n"
                "  Verify: Tiêu đề lớn (h1) chứa \"trợ lý đắc lực cho dân QA\".\n\n"
                "TC-02 — Menu \"AI cho QA\" điều hướng đúng\n"
                "  Thao tác: Ở trang chủ, bấm liên kết \"AI cho QA\" trên thanh menu.\n"
                "  Verify: Trình duyệt chuyển sang trang có địa chỉ kết thúc bằng /ai-qa.\n\n"
                "TC-03 — Tìm kiếm trả về kết quả\n"
                "  Thao tác: Nhập \"test case\" vào ô tìm kiếm (input name=\"q\") rồi bấm nút \"Tìm\".\n"
                "  Verify: Chuyển sang /tim-kiem, có tiêu đề \"Kết quả cho: ...\" và hiển thị ít nhất một liên kết bài viết (/bai-viet/...)."
            ),
            "result": CODE_PROMPT1,
            "testerNote": (
                "AI hay đoán selector chưa khớp trang thật nên lần chạy đầu dễ đỏ — phải chạy thật rồi sửa. Locator get_by_role bền "
                "hơn CSS. Đừng tin 'passed' ngay: kiểm xem assertion có thật sự khẳng định đúng kết quả (vào đúng trang, đúng nội dung) "
                "chứ không chỉ 'có phần tử nào đó'."
            ),
        },
        {
            "title": "Prompt 2 — Sửa khi pytest báo đỏ (lỗi strict mode / selector)",
            "goal": "Khi test đỏ — nhất là lỗi strict mode do locator khớp nhiều phần tử — nhờ Claude Code đọc lỗi rồi sửa.",
            "prompt": (
                "Test Playwright của tôi chạy pytest bị lỗi. Hãy đọc thông báo lỗi ở dưới, chỉ ra nguyên nhân, sửa code cho "
                "đúng và giải thích ngắn gọn vì sao. Nếu lỗi do locator (sai hoặc khớp nhiều phần tử), ưu tiên locator rõ ràng, "
                "ổn định.\n\n"
                "Lỗi pytest:\n"
                "[DÁN LỖI VÀO ĐÂY]"
            ),
            "exampleInput": (
                "Lỗi khi chạy pytest (danh sách rút gọn):\n"
                "playwright._impl._errors.Error: Locator.click: Error: strict mode violation:\n"
                "get_by_role(\"link\", name=\"QA\") resolved to 13 elements:\n"
                "  1) <a href=\"/ai-qa\">AI cho QA</a>  aka get_by_role(\"link\", name=\"AI cho QA\", exact=True)\n"
                "  2) <a href=\"/ai-qa\">Bắt đầu với QA</a>\n"
                "  3) <a href=\"/ai-qa\">🧪 Hướng dẫn AI cho QA …</a>\n"
                "  … và 10 liên kết khác cũng chứa chữ \"QA\" (gồm các thẻ bài viết \"QA / Test\")"
            ),
            "result": CODE_PROMPT2,
            "testerNote": (
                "Lỗi strict mode rất hay gặp khi trang có nhiều liên kết/nút trùng chữ — đừng vá bằng .first cho qua chuyện, hãy đặt "
                "locator rõ ràng để không bấm nhầm. Mỗi lần sửa, chạy lại để chắc, đừng sửa hàng loạt rồi mới chạy."
            ),
        },
        {
            "title": "Prompt 3 — Gộp nhiều trường hợp thành test data-driven (parametrize)",
            "goal": (
                "Test data-driven = viết MỘT test rồi cho nó chạy lại với nhiều bộ dữ liệu khác nhau, thay vì chép test thành "
                "nhiều bản gần giống nhau. Ở đây: gộp các trường hợp tìm kiếm (nhiều từ khóa) thành một test lặp qua danh sách "
                "từ khóa — đỡ lặp code, dễ thêm trường hợp mới."
            ),
            "prompt": (
                "Gộp các trường hợp tìm kiếm cùng dạng thành MỘT test data-driven bằng @pytest.mark.parametrize, cho các từ khóa: "
                "\"test case\", \"requirement\", \"automation\". Với mỗi từ khóa: tìm trên trang chủ rồi khẳng định chuyển sang "
                "/tim-kiem và có ít nhất một kết quả bài viết. Giữ phong cách locator như các test trước. Đặt tên rõ để khi đỏ "
                "biết ngay từ khóa nào hỏng."
            ),
            "exampleInput": (
                "Các từ khóa cần kiểm tìm kiếm trên MAI.tools: \"test case\", \"requirement\", \"automation\".\n"
                "Kỳ vọng: mỗi từ khóa → chuyển sang /tim-kiem và hiện ít nhất một liên kết bài viết (/bai-viet/...)."
            ),
            "result": CODE_PROMPT3,
            "testerNote": (
                "Data-driven gọn, nhưng khi một từ khóa đỏ phải biết ngay từ nào — pytest tự gắn tham số vào tên test "
                "(test_tim_kiem_co_ket_qua[automation]). Cẩn thận phân biệt dữ liệu minh họa với dữ liệu thật; đừng để lộ tài khoản/dữ "
                "liệu nhạy cảm trong script."
            ),
        },
    ],
    "pros": [
        "Sinh test Python chạy được từ mô tả trang — không phải viết từ con số 0.",
        "Có cả Page Object lẫn test, cấu trúc dễ bảo trì.",
        "Hạ rào 'phải giỏi code' cho người mới chuyển sang automation.",
        "Sửa lỗi nhanh vì AI đọc được cả thông báo lỗi lẫn mã nguồn.",
    ],
    "cons": [
        "Vẫn phải đọc hiểu Python để rà và sửa — không phải 'bấm nút là xong'.",
        "Cần cài môi trường (Python, pytest-playwright, trình duyệt) ở bước đầu.",
        "Locator phụ thuộc HTML thật; nếu AI không thấy trang thì dễ đoán sai.",
    ],
    "bugs": [
        "AI thường đoán selector chưa khớp trang thật khiến test đỏ lần đầu — bắt buộc chạy thật rồi sửa.",
        "Lỗi 'strict mode' khi locator khớp nhiều phần tử là dấu hiệu locator còn mơ hồ — cần thu hẹp, đừng .first cho qua.",
        "Dễ lạm dụng chờ cứng (time.sleep / wait_for_timeout) làm test chậm và chập chờn — nên dùng expect auto-wait.",
        "Test 'passed' chưa chắc đúng: assertion yếu có thể luôn xanh — người phải xác nhận assertion kiểm đúng nghiệp vụ.",
    ],
    "faq": [
        {
            "question": "Không biết Python thì có làm theo được không?",
            "answer": (
                "Bắt đầu được, vì AI lo phần dựng code. Nhưng để rà và sửa khi test đỏ, bạn cần đọc hiểu Python cơ bản — nên học song "
                "song cú pháp Python và API của Playwright. Càng hiểu, bạn càng kiểm soát được chất lượng thay vì phụ thuộc AI."
            ),
        },
        {
            "question": "Vì sao chọn Playwright + Python, không phải Selenium?",
            "answer": (
                "Cách làm giống nhau — chỉ cần đổi yêu cầu trong prompt sang công cụ bạn dùng. Bài chọn Playwright vì nhanh, có "
                "auto-wait giúp test đỡ chập chờn, và gói pytest-playwright cài rất gọn cho người dùng Python."
            ),
        },
        {
            "question": "Test trong bài chạy ở đâu, tôi chạy lại được không?",
            "answer": (
                "Ví dụ demo trên trang công khai maiqa.vercel.app nên ai cũng chạy lại được (đã chạy thật: 3 và 6 test đều passed). "
                "Với web nội bộ, trỏ --base-url vào địa chỉ của bạn — có thể cần xử lý thêm bước đăng nhập."
            ),
        },
        {
            "question": "Có tốn phí không?",
            "answer": (
                "Playwright và pytest đều miễn phí (mã nguồn mở). Claude Code cần tài khoản để dùng — phần cài đặt và kết nối xem ở "
                "các bài hướng dẫn Claude Code khác trên trang."
            ),
        },
        {
            "question": "Script AI sinh ra dùng thẳng cho dự án thật được chưa?",
            "answer": (
                "Không nên. Hãy coi đó là bản nháp tốt: chạy thử, rà lại selector và assertion, kiểm dữ liệu test trước khi đưa vào "
                "bộ chạy chính thức. Test tự động mà sai còn nguy hơn không có, vì tạo cảm giác an toàn giả."
            ),
        },
    ],
    "finalThought": (
        "AI rút ngắn rất nhiều quãng đường từ kịch bản sang test chạy được, nhưng chọn cái gì đáng kiểm và xác nhận assertion đúng "
        "nghĩa nghiệp vụ vẫn là việc của con người. Toàn bộ ví dụ ở đây đã chạy thật trên một trang web thực — bạn hoàn toàn có thể "
        "làm lại. Hãy dùng AI để đi nhanh hơn, không phải để khỏi cần hiểu, vì một test tự động viết sai sẽ âm thầm bỏ lọt lỗi mà không ai hay."
    ),
}

if any(x["slug"] == SLUG for x in a):
    a = [x for x in a if x["slug"] != SLUG]
a.insert(0, art)

json.dump(a, io.open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Đã cập nhật bài (Python + MAI.tools):", SLUG)
print("Prompts:", len(art["prompts"]), "| Steps:", len(art["steps"]), "| FAQ:", len(art["faq"]))
