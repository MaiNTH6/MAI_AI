# -*- coding: utf-8 -*-
"""Thêm bài: Manual -> automation bằng Claude Code + Playwright.
Chạy: python -X utf8 scripts/add-article-automation.py
"""
import json, io

P = "data/articles.json"
a = json.load(io.open(P, encoding="utf-8"))

SLUG = "ai-viet-script-automation-playwright-tu-test-case"

art = {
    "slug": SLUG,
    "title": "Manual sang automation: để Claude Code viết script Playwright từ bộ test case sẵn có",
    "excerpt": (
        "Bạn đã có bộ test case tốt nhưng mỗi lần dựng automation lại ngại vì phải viết code từ đầu? "
        "Bài này hướng dẫn để Claude Code đọc thẳng test case trong dự án rồi sinh ra script Playwright "
        "chạy được — kèm Page Object và assertion — cùng cách rà soát lại cho đúng thay vì tin AI hoàn toàn."
    ),
    "category": "ai-qa",
    "readingTime": 11,
    "publishedAt": "2026-06-18",
    "cover": "🎭",
    "intro": {
        "problem": (
            "Nhiều tester thủ công viết test case rất chắc, nhưng đến bước chuyển sang automation thì khựng lại: "
            "cú pháp framework, selector, xử lý bất đồng bộ — toàn thứ nghe như việc của lập trình viên. "
            "Viết tay từng script vừa lâu vừa dễ nản, trong khi tin tuyển dụng ngày càng đòi 'biết automation'. "
            "Cái khó thường không nằm ở kịch bản test — cái đó bạn đã có — mà ở việc dịch kịch bản ấy sang code chạy được."
        ),
        "whatIs": (
            "Claude Code là công cụ AI chạy ngay trong thư mục dự án (qua terminal hoặc trình soạn thảo), đọc được cả "
            "bộ test case lẫn mã nguồn rồi tạo ra file script automation thật trong repo — không phải dán qua lại trong "
            "khung chat. Playwright là framework kiểm thử web hiện đại, mã nguồn mở, đang được nhiều đội ở Việt Nam ưu tiên "
            "nhờ nhanh và ổn định."
        ),
        "whyThis": (
            "So với việc dán từng đoạn vào ChatGPT, Claude Code thấy được toàn bộ ngữ cảnh: bộ test case, cấu trúc thư mục, "
            "trang cần kiểm — nên sinh nhiều file một lúc (Page Object + test) và sửa trực tiếp khi chạy lỗi. Bạn vẫn là người "
            "quyết định kiểm cái gì; AI chỉ rút ngắn quãng từ kịch bản sang code. Và như mọi việc với AI, script sinh ra là "
            "bản nháp tốt cần rà lại, không phải kết quả tin ngay."
        ),
    },
    "tldr": [
        "Bạn vẫn là người thiết kế kịch bản test; AI chỉ chuyển kịch bản đó thành code.",
        "Claude Code đọc file test case + trang web rồi sinh script Playwright (Page Object + assertion) chạy được.",
        "Bắt đầu từ một luồng nhỏ (đăng nhập), chạy thử, rồi mở rộng — đừng sinh hàng loạt rồi tin ngay.",
        "Phần việc còn lại của bạn: rà selector, xử lý chờ bất đồng bộ, kiểm assertion đúng nghĩa — chỗ AI hay sai.",
        "Không cần giỏi code mới bắt đầu, nhưng cần đọc hiểu để sửa.",
    ],
    "steps": [
        {
            "title": "Bước 1 — Chuẩn bị: cài Playwright + đặt test case thành file trong repo",
            "body": (
                "Trong thư mục dự án, khởi tạo Playwright: chạy lệnh `npm init playwright@latest` (cần Node.js). "
                "Lệnh này tạo sẵn cấu trúc thư mục `tests/` và file cấu hình. Sau đó đặt bộ test case của bạn dưới dạng "
                "file văn bản trong repo — mỗi màn hình một file, ví dụ `test-cases/dang-nhap.md` — để Claude Code đọc trực tiếp.\n"
                "[Chèn ảnh: terminal sau khi chạy npm init playwright, hiện thư mục tests/ và playwright.config]"
            ),
            "linkSlug": "ai-viet-test-case-tu-user-story",
            "linkLabel": "Chưa có bộ test case? Xem bài Viết test case từ user story",
        },
        {
            "title": "Bước 2 — Mở Claude Code trong thư mục dự án, cho nó đọc test case + trang cần kiểm",
            "body": (
                "Mở Claude Code ngay tại thư mục dự án. Chỉ cho nó file test case và nơi có giao diện đăng nhập (đường dẫn "
                "component, hoặc URL trang). Mục tiêu là để AI nắm được vừa kịch bản (cần kiểm gì) vừa ngữ cảnh trang "
                "(có những ô/nút nào) trước khi sinh code.\n"
                "[Chèn ảnh: Claude Code đang đọc file test-cases/dang-nhap.md trong terminal]"
            ),
        },
        {
            "title": "Bước 3 — Yêu cầu sinh script cho một luồng, theo cấu trúc Page Object",
            "body": (
                "Dùng Prompt 1 bên dưới để AI sinh hai file: một Page Object (gom locator + hành động của trang) và một file "
                "test (mỗi case một test, có assertion). Tổ chức theo Page Object giúp khi giao diện đổi, bạn chỉ sửa một chỗ. "
                "Bắt đầu với đúng một luồng — đăng nhập — cho dễ kiểm soát.\n"
                "[Chèn ảnh: file pages/LoginPage.ts và tests/dang-nhap.spec.ts vừa được sinh ra]"
            ),
        },
        {
            "title": "Bước 4 — Chạy thử, đọc lỗi, nhờ AI sửa selector / xử lý chờ",
            "body": (
                "Chạy `npx playwright test`. Lần đầu thường có test đỏ vì selector AI đoán chưa khớp trang thật, hoặc chờ "
                "chưa đúng. Đây là bước quan trọng nhất: dán thông báo lỗi cho Claude Code (Prompt 2) để nó đọc lỗi + code + "
                "trang rồi sửa. Xem thêm báo cáo `npx playwright show-report` để biết test dừng ở đâu.\n"
                "[Chèn ảnh: kết quả chạy playwright test, một test pass một test fail + trace]"
            ),
        },
        {
            "title": "Bước 5 — Mở rộng dần & gộp dữ liệu, rồi mới tính đến CI",
            "body": (
                "Khi luồng đầu đã xanh và bạn đã rà đúng, mở rộng sang các luồng khác theo cùng cấu trúc. Với các case cùng dạng "
                "(nhiều bộ email/mật khẩu), gộp thành một test data-driven cho gọn (Prompt 3). Khi bộ test đủ ổn định mới đưa vào "
                "CI (GitHub Actions...) để chạy tự động — đừng vội tự động hóa khi test còn chập chờn."
            ),
        },
    ],
    "prompts": [
        {
            "title": "Prompt 1 — Sinh script Playwright từ test case, theo Page Object",
            "goal": "Biến một test case (luồng đăng nhập) thành script Playwright chạy được, tổ chức theo Page Object.",
            "prompt": (
                "Đọc file test case `test-cases/dang-nhap.md` và giao diện trang đăng nhập của dự án. "
                "Viết script Playwright (TypeScript) cho các case trong file, tổ chức theo Page Object Model:\n"
                "- Tạo `pages/LoginPage.ts`: gom locator và hành động (mở trang, nhập email/mật khẩu, bấm Đăng nhập).\n"
                "- Tạo `tests/dang-nhap.spec.ts`: mỗi case một test, gọi Page Object, có assertion rõ ràng.\n"
                "Ưu tiên locator theo vai trò/nhãn/nội dung (getByRole, getByLabel, getByText), hạn chế CSS/XPath dễ vỡ. "
                "Dùng auto-wait của Playwright (expect(...).toBeVisible()) thay cho chờ thời gian cứng. "
                "Chỗ nào chưa chắc selector hay đường dẫn thì ghi TODO, đừng đoán bừa."
            ),
            "exampleInput": (
                "test-cases/dang-nhap.md\n"
                "TC-01  Đăng nhập email + mật khẩu đúng → vào trang chủ (thấy menu \"Tài khoản\")\n"
                "TC-02  Mật khẩu sai → hiện thông báo \"Vui lòng kiểm tra lại thông tin\"\n"
                "TC-03  Bỏ trống email → nút \"Đăng nhập\" bị mờ (disabled)\n\n"
                "Trang đăng nhập có: ô Email, ô Mật khẩu, nút \"Đăng nhập\". Đường dẫn trang: /login"
            ),
            "result": (
                "Claude Code tạo 2 file (rút gọn):\n\n"
                "// pages/LoginPage.ts\n"
                "import { Page, expect } from '@playwright/test';\n"
                "export class LoginPage {\n"
                "  constructor(private page: Page) {}\n"
                "  async goto() { await this.page.goto('/login'); }\n"
                "  email()    { return this.page.getByLabel('Email'); }\n"
                "  password() { return this.page.getByLabel('Mật khẩu'); }\n"
                "  submit()   { return this.page.getByRole('button', { name: 'Đăng nhập' }); }\n"
                "  async login(email: string, pass: string) {\n"
                "    await this.email().fill(email);\n"
                "    await this.password().fill(pass);\n"
                "    await this.submit().click();\n"
                "  }\n"
                "}\n\n"
                "// tests/dang-nhap.spec.ts\n"
                "import { test, expect } from '@playwright/test';\n"
                "import { LoginPage } from '../pages/LoginPage';\n\n"
                "test('TC-01 đăng nhập đúng → vào trang chủ', async ({ page }) => {\n"
                "  const login = new LoginPage(page);\n"
                "  await login.goto();\n"
                "  await login.login('user@mail.com', 'MatKhau@123');\n"
                "  await expect(page.getByRole('link', { name: 'Tài khoản' })).toBeVisible();\n"
                "});\n\n"
                "test('TC-02 mật khẩu sai → báo lỗi', async ({ page }) => {\n"
                "  const login = new LoginPage(page);\n"
                "  await login.goto();\n"
                "  await login.login('user@mail.com', 'sai-mat-khau');\n"
                "  await expect(page.getByText('Vui lòng kiểm tra lại thông tin')).toBeVisible();\n"
                "});\n\n"
                "test('TC-03 bỏ trống email → nút Đăng nhập mờ', async ({ page }) => {\n"
                "  const login = new LoginPage(page);\n"
                "  await login.goto();\n"
                "  await login.password().fill('MatKhau@123');\n"
                "  await expect(login.submit()).toBeDisabled();\n"
                "});\n\n"
                "// TODO: xác nhận lại nhãn ô input (\"Email\" / \"Mật khẩu\") và route \"/login\" với trang thật."
            ),
            "testerNote": (
                "AI hay đoán selector chưa tồn tại (class/id tự nghĩ ra) nên lần chạy đầu dễ đỏ — phải chạy thật rồi sửa theo "
                "HTML thực tế. Locator theo vai trò/nhãn bền hơn CSS. Đừng tin test xanh ngay: kiểm xem assertion có thật sự "
                "kiểm đúng kết quả nghiệp vụ không (vào đúng trang chủ chứ không chỉ là 'có chữ nào đó')."
            ),
        },
        {
            "title": "Prompt 2 — Sửa khi test chạy đỏ (đọc lỗi + sửa selector/chờ)",
            "goal": "Khi script chạy lỗi, nhờ Claude Code đọc thông báo lỗi + trang thật để sửa selector hoặc cách chờ.",
            "prompt": (
                "Chạy `npx playwright test` ra lỗi dưới đây. Đọc lỗi + file `pages/LoginPage.ts` và giao diện trang thật, "
                "chỉ ra nguyên nhân và sửa:\n"
                "- Nếu locator không khớp: đổi sang locator theo vai trò/nhãn (getByRole/getByLabel) bền hơn.\n"
                "- Nếu do chờ: dùng auto-wait (expect(...).toBeVisible()) thay vì chờ thời gian cứng (waitForTimeout).\n"
                "Giải thích ngắn gọn vì sao sửa như vậy."
            ),
            "exampleInput": (
                "Lỗi khi chạy npx playwright test:\n"
                "TimeoutError: locator.click: Timeout 30000ms exceeded.\n"
                "Call log: waiting for locator('.btn-login')\n"
                "  tại tests/dang-nhap.spec.ts:8"
            ),
            "result": (
                "Claude Code chẩn đoán & sửa:\n\n"
                "- Nguyên nhân: locator '.btn-login' không khớp phần tử nào (nút không có class đó, hoặc class đã đổi). "
                "Test chờ đủ 30 giây rồi timeout.\n"
                "- Sửa locator — dùng vai trò + nhãn hiển thị thay cho class:\n"
                "    // thay:  await page.locator('.btn-login').click();\n"
                "    // bằng:  await page.getByRole('button', { name: 'Đăng nhập' }).click();\n"
                "- Sau khi submit, thay vì chờ cứng:\n"
                "    // bỏ:    await page.waitForTimeout(3000);\n"
                "    // dùng:  await expect(page.getByRole('link', { name: 'Tài khoản' })).toBeVisible();\n\n"
                "Vì sao: getByRole bám theo nội dung hiển thị nên ít vỡ khi đổi CSS; expect(...).toBeVisible() tự chờ đến khi "
                "phần tử xuất hiện, không phải đoán thời gian — test vừa ổn định vừa nhanh hơn."
            ),
            "testerNote": (
                "Lỗi timeout phần lớn do selector sai hoặc chờ chưa đúng, không phải do trang chậm — đừng vá bằng cách tăng "
                "thời gian chờ cứng (gây test chậm và chập chờn). Mỗi lần sửa, chạy lại để chắc chắn, đừng sửa hàng loạt rồi mới chạy."
            ),
        },
        {
            "title": "Prompt 3 — Gộp nhiều case cùng dạng thành một test data-driven",
            "goal": "Gom các case cùng dạng (nhiều bộ email/mật khẩu) thành một test lặp qua dữ liệu, đỡ lặp code.",
            "prompt": (
                "Từ file `test-cases/dang-nhap.md`, gom các case kiểm tra validate đăng nhập thành MỘT test Playwright "
                "data-driven: khai báo một mảng dữ liệu {tên, email, mật khẩu, kết quả mong đợi} rồi lặp để sinh test. "
                "Giữ nguyên Page Object đã có. Đặt tên mỗi test kèm dữ liệu để khi đỏ biết ngay dòng nào hỏng. "
                "Case đặc thù (không submit, ví dụ kiểm nút mờ) thì để riêng, đừng ép vào vòng lặp."
            ),
            "exampleInput": (
                "test-cases/dang-nhap.md — các case validate đăng nhập:\n"
                "- email đúng + mật khẩu đúng → vào trang chủ\n"
                "- email đúng + mật khẩu sai → \"Vui lòng kiểm tra lại thông tin\"\n"
                "- email sai định dạng → \"Email không hợp lệ\"\n"
                "- bỏ trống email → nút Đăng nhập mờ"
            ),
            "result": (
                "// tests/dang-nhap.data.spec.ts (rút gọn)\n"
                "import { test, expect } from '@playwright/test';\n"
                "import { LoginPage } from '../pages/LoginPage';\n\n"
                "const cases = [\n"
                "  { ten: 'đúng → vào trang chủ',     email: 'user@mail.com', pass: 'MatKhau@123', moDoi: 'home' },\n"
                "  { ten: 'mật khẩu sai → báo lỗi',  email: 'user@mail.com', pass: 'sai',         moDoi: 'Vui lòng kiểm tra lại thông tin' },\n"
                "  { ten: 'email sai định dạng',      email: 'abc',           pass: 'MatKhau@123', moDoi: 'Email không hợp lệ' },\n"
                "];\n\n"
                "for (const c of cases) {\n"
                "  test(`Đăng nhập: ${c.ten}`, async ({ page }) => {\n"
                "    const login = new LoginPage(page);\n"
                "    await login.goto();\n"
                "    await login.login(c.email, c.pass);\n"
                "    if (c.moDoi === 'home') {\n"
                "      await expect(page.getByRole('link', { name: 'Tài khoản' })).toBeVisible();\n"
                "    } else {\n"
                "      await expect(page.getByText(c.moDoi)).toBeVisible();\n"
                "    }\n"
                "  });\n"
                "}\n\n"
                "// Case \"bỏ trống email → nút mờ\" giữ ở file spec riêng (không submit) — không gộp vào vòng lặp này."
            ),
            "testerNote": (
                "Data-driven gọn nhưng khi một dòng đỏ phải biết ngay dòng nào — vì vậy đặt tên test kèm dữ liệu. Cẩn thận phân "
                "biệt dữ liệu giả để minh họa với dữ liệu thật của hệ thống; đừng để lộ tài khoản/dữ liệu nhạy cảm trong script."
            ),
        },
    ],
    "pros": [
        "Tận dụng bộ test case đã có — không viết script từ con số 0.",
        "Sinh cả Page Object lẫn test cùng lúc, đúng cấu trúc dễ bảo trì.",
        "Hạ rào 'phải giỏi code' cho người mới chuyển sang automation.",
        "Sửa lỗi nhanh vì AI đọc được cả thông báo lỗi lẫn mã nguồn.",
    ],
    "cons": [
        "Vẫn phải đọc hiểu code để rà và sửa — không phải 'bấm nút là xong'.",
        "Cần môi trường (Node.js, Playwright) nên có bước cài đặt ban đầu.",
        "Selector phụ thuộc HTML thật; nếu AI không thấy trang thì dễ đoán sai.",
    ],
    "bugs": [
        "AI thường bịa selector chưa tồn tại (tự nghĩ ra class/id) khiến test đỏ ngay lần đầu — bắt buộc chạy thật rồi sửa theo trang.",
        "Dễ lạm dụng chờ thời gian cứng (waitForTimeout) làm test chậm và chập chờn — nên ép dùng auto-wait của Playwright.",
        "Assertion 'trông có vẻ đúng' nhưng kiểm sai thứ (chỉ kiểm có chữ, không kiểm đã chuyển trang) — người phải xác nhận assertion đúng nghĩa nghiệp vụ.",
        "Test xanh chưa chắc đúng: AI có thể viết assertion yếu khiến test luôn pass — đừng tin mỗi màu xanh.",
    ],
    "faq": [
        {
            "question": "Không biết code thì có làm theo được không?",
            "answer": (
                "Bắt đầu được, vì AI lo phần dựng code. Nhưng để rà và sửa khi test đỏ, bạn cần đọc hiểu cơ bản — nên học song song "
                "nền JavaScript/TypeScript và cú pháp Playwright. Càng hiểu, bạn càng kiểm soát được chất lượng thay vì phụ thuộc AI."
            ),
        },
        {
            "question": "Phải dùng Playwright à? Selenium hay Cypress được không?",
            "answer": (
                "Cách làm giống nhau — chỉ cần đổi tên framework trong prompt sang công cụ bạn đang dùng. Bài này lấy Playwright vì "
                "phổ biến, miễn phí và đang được nhiều đội ở Việt Nam ưu tiên."
            ),
        },
        {
            "question": "Script AI sinh ra dùng thẳng cho dự án thật được chưa?",
            "answer": (
                "Không nên. Hãy coi đó là bản nháp tốt: phải chạy thử, rà lại selector và assertion, kiểm dữ liệu test trước khi đưa "
                "vào bộ chạy chính thức. Test tự động mà sai thì còn nguy hơn không có, vì tạo cảm giác an toàn giả."
            ),
        },
        {
            "question": "Có tốn phí không?",
            "answer": (
                "Playwright miễn phí (mã nguồn mở). Claude Code cần tài khoản để dùng — phần cài đặt và kết nối xem ở các bài hướng dẫn "
                "Claude Code khác trên trang."
            ),
        },
        {
            "question": "Bộ test case dài thì xử lý thế nào?",
            "answer": (
                "Lưu mỗi màn hình thành một file riêng trong thư mục (ví dụ test-cases/), rồi để Claude Code đọc cả thư mục thay vì dán "
                "vào chat. Cách tổ chức này cũng giúp bước viết và review test case gọn hơn."
            ),
        },
    ],
    "finalThought": (
        "AI rút ngắn rất nhiều quãng đường từ test case sang script chạy được, nhưng tư duy chọn cái gì đáng kiểm, thiết kế kịch bản "
        "và xác nhận assertion đúng nghĩa nghiệp vụ vẫn là việc của con người. Hãy dùng AI để đi nhanh hơn, không phải để khỏi cần hiểu — "
        "vì test tự động viết sai sẽ âm thầm bỏ lọt lỗi mà không ai hay."
    ),
}

if any(x["slug"] == SLUG for x in a):
    a = [x for x in a if x["slug"] != SLUG]  # ghi đè nếu chạy lại
a.insert(0, art)

json.dump(a, io.open(P, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
print("Đã thêm bài:", SLUG)
print("Tổng số bài:", len(a))
print("Prompts:", len(art["prompts"]), "| Steps:", len(art["steps"]), "| FAQ:", len(art["faq"]))
