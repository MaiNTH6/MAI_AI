// Cấu trúc chuyên mục Automation Testing — hub nhiều tầng, chuyển thể từ Sách 4
// "Automation API với Python + Playwright" (book4/drafts/*.md, xem book4/README).
// 16 chương → các mục con, bám sát đúng cấu trúc chương/mục của sách gốc.
// Nội dung từng mục để ở content/automation-testing (registry) — viết dần, chương
// nào chưa viết thì sections đánh dấu hasContent: false (trang chương vẫn hiện
// "đang biên soạn", không lỗi 404).

export interface AutomationSection {
  slug: string;
  code: string; // mã theo chương, vd "2.1"
  title: string;
  hasContent?: boolean; // đã viết nội dung web chưa
}

export interface AutomationChapter {
  slug: string;
  num: number;
  title: string;
  emoji: string;
  minutes: number;
  summary: string;
  sections: AutomationSection[];
}

export const automationChapters: AutomationChapter[] = [
  {
    slug: "cai-python-venv-script-dau-tien",
    num: 1,
    title: "Cài Python, tạo môi trường ảo, viết script đầu tiên",
    emoji: "🐍",
    minutes: 60,
    summary:
      "Cài Python + VS Code, tạo và kích hoạt môi trường ảo (venv), viết file Python đầu tiên với 4 kiểu dữ liệu cơ bản.",
    sections: [
      { slug: "cai-python", code: "1.1", title: "Cài Python", hasContent: true },
      { slug: "cai-vscode-mo-terminal", code: "1.2", title: "Cài VS Code và mở Terminal", hasContent: true },
      { slug: "moi-truong-ao-venv", code: "1.3", title: "Cài đặt môi trường ảo (venv)", hasContent: true },
      { slug: "viet-script-dau-tien", code: "1.4", title: "Viết script đầu tiên — biến và kiểu dữ liệu", hasContent: true },
    ],
  },
  {
    slug: "ham-list-dict-json",
    num: 2,
    title: "Hàm, danh sách/từ điển, đọc-ghi JSON",
    emoji: "🧩",
    minutes: 60,
    summary:
      "Viết hàm để gói code dùng lại nhiều lần, dùng list/dict — 2 kiểu dữ liệu gặp liên tục khi làm API — và chuyển đổi dict Python với JSON.",
    sections: [
      { slug: "ham-function", code: "2.1", title: "Hàm (function)", hasContent: true },
      { slug: "list-vong-lap-for", code: "2.2", title: "List (danh sách) và vòng lặp for", hasContent: true },
      { slug: "dict-tu-dien", code: "2.3", title: "Dict (từ điển) trong Python", hasContent: true },
      { slug: "json-cau-noi-python-api", code: "2.4", title: "Làm việc với JSON trong Python", hasContent: true },
    ],
  },
  {
    slug: "cai-playwright-pytest-dau-tien",
    num: 3,
    title: "Cài Playwright, chạy test pytest đầu tiên",
    emoji: "🧪",
    minutes: 60,
    summary:
      "Cài Playwright cho Python + Chromium, hiểu vì sao dùng pytest thay vì chạy trực tiếp bằng python, viết và chạy test Playwright đầu tiên.",
    sections: [
      { slug: "tao-du-an-cai-dat", code: "3.1", title: "Tạo dự án và cài đặt", hasContent: true },
      { slug: "vi-sao-dung-pytest", code: "3.2", title: "Vì sao dùng pytest", hasContent: true },
      { slug: "viet-test-dau-tien", code: "3.3", title: "Viết test đầu tiên", hasContent: true },
      { slug: "chay-test", code: "3.4", title: "Chạy test", hasContent: true },
    ],
  },
  {
    slug: "kien-truc-browser-context-page",
    num: 4,
    title: "Playwright là gì, kiến trúc Browser → Context → Page",
    emoji: "🌐",
    minutes: 45,
    summary:
      "3 lớp kiến trúc của Playwright (Browser → Context → Page), tự viết script mở trình duyệt thật bằng sync_playwright, chụp ảnh màn hình bằng code.",
    sections: [
      { slug: "kien-truc-browser-context-page", code: "4.1", title: "Kiến trúc Browser → Context → Page", hasContent: true },
      { slug: "tu-mo-trinh-duyet-bang-code", code: "4.2", title: "Tự mở trình duyệt bằng code", hasContent: true },
      { slug: "chup-anh-man-hinh", code: "4.3", title: "Chụp ảnh màn hình", hasContent: true },
    ],
  },
  {
    slug: "locator-fill-click",
    num: 5,
    title: "Locator — cách Playwright tìm phần tử, thao tác cơ bản",
    emoji: "🎯",
    minutes: 45,
    summary:
      "Locator là gì và vì sao Playwright ít bị \"flaky\" hơn công cụ cũ, dùng fill()/click() để điền form và bấm nút, viết bài test UI đầu tiên.",
    sections: [
      { slug: "locator-la-gi", code: "5.1", title: "Locator là gì", hasContent: true },
      { slug: "vi-sao-it-flaky", code: "5.2", title: "Vì sao Playwright ít bị \"flaky\"", hasContent: true },
      { slug: "viet-bai-test-ui-dau-tien", code: "5.3", title: "Viết bài test UI đầu tiên", hasContent: true },
    ],
  },
  {
    slug: "assertion-expect",
    num: 6,
    title: "Assertion cơ bản — expect() trong Playwright",
    emoji: "✅",
    minutes: 45,
    summary:
      "Web-first assertion của Playwright khác assert thường của Python thế nào, thêm bài test thứ 2, vài assertion hay dùng khác ngoài to_be_visible().",
    sections: [
      { slug: "assert-thuong-vs-expect", code: "6.1", title: "Phân biệt assert và expect", hasContent: true },
      { slug: "them-bai-test-thu-2", code: "6.2", title: "Thêm bài test thứ 2", hasContent: true },
      { slug: "vai-assertion-hay-dung-khac", code: "6.3", title: "Vài assertion hay dùng khác", hasContent: true },
    ],
  },
  {
    slug: "apirequestcontext",
    num: 7,
    title: "APIRequestContext — gọi API bằng Playwright",
    emoji: "🔌",
    minutes: 60,
    summary:
      "APIRequestContext khác Page ở chỗ nào, gọi API thật bằng .get(), đọc response.status và response.json() — bắt đầu chuyển hướng sang test API.",
    sections: [
      { slug: "apirequestcontext-la-gi", code: "7.1", title: "APIRequestContext là gì", hasContent: true },
      { slug: "tao-apirequestcontext-bang-fixture", code: "7.2", title: "Tạo APIRequestContext bằng fixture", hasContent: true },
      { slug: "goi-get-don-gian", code: "7.3", title: "Gọi GET đơn giản", hasContent: true },
      { slug: "doc-du-lieu-tu-response", code: "7.4", title: "Đọc dữ liệu từ response", hasContent: true },
    ],
  },
  {
    slug: "assertion-response",
    num: 8,
    title: "expect(response) và cách đọc lỗi test",
    emoji: "🔍",
    minutes: 45,
    summary:
      "expect(response) có gì và không có gì, kiểm tra 1 status code cụ thể bằng assert thường, đọc hiểu thông báo lỗi thật khi test API FAILED.",
    sections: [
      { slug: "expect-response-chi-co-2-viec", code: "8.1", title: "2 assertion của expect(response)", hasContent: true },
      { slug: "kiem-tra-status-code-cu-the", code: "8.2", title: "Kiểm tra 1 status code cụ thể", hasContent: true },
      { slug: "doc-loi-test-khi-failed", code: "8.3", title: "Đọc lỗi test khi FAILED", hasContent: true },
    ],
  },
  {
    slug: "fixture",
    num: 9,
    title: "Fixture — vì sao không cần tự tạo lại mỗi test",
    emoji: "🔁",
    minutes: 60,
    summary:
      "Fixture giải quyết vấn đề gì, phân biệt scope=\"session\" và mặc định, setup/teardown qua yield, và cách 1 fixture dùng lại fixture khác.",
    sections: [
      { slug: "setup-teardown-voi-yield", code: "9.1", title: "Setup/teardown với yield", hasContent: true },
      { slug: "scope-tao-moi-hay-dung-lai", code: "9.2", title: "scope — tạo mới hay dùng lại", hasContent: true },
      { slug: "fixture-dung-fixture-khac", code: "9.3", title: "Fixture dùng fixture khác", hasContent: true },
      { slug: "doc-loi-khi-go-sai-ten-fixture", code: "9.4", title: "Đọc lỗi khi gõ sai tên fixture", hasContent: true },
    ],
  },
  {
    slug: "lap-test-case",
    num: 10,
    title: "Lập danh sách test case cho Restful-Booker",
    emoji: "📋",
    minutes: 45,
    summary:
      "Đọc tài liệu API chính thức, gọi thử bằng curl để xác nhận hành vi thật thay vì đoán theo tài liệu, lập bảng test case hoàn chỉnh cho các chương sau.",
    sections: [
      { slug: "doc-tai-lieu-api-chinh-thuc", code: "10.1", title: "Đọc tài liệu API chính thức", hasContent: true },
      { slug: "goi-thu-bang-curl", code: "10.2", title: "Gọi thử bằng curl để xác nhận hành vi thật", hasContent: true },
      { slug: "bang-test-case-hoan-chinh", code: "10.3", title: "Bảng test case hoàn chỉnh", hasContent: true },
    ],
  },
  {
    slug: "test-auth",
    num: 11,
    title: "Viết bộ test đầy đủ cho POST /auth",
    emoji: "🔐",
    minutes: 60,
    summary:
      "Viết đủ 5 test case AUTH-01 → AUTH-05, thêm fixture auth_token đăng nhập 1 lần dùng lại token cho các chương sau.",
    sections: [
      { slug: "fixture-auth-token", code: "11.1", title: "Fixture auth_token", hasContent: true },
      { slug: "auth-01-dang-nhap-dung", code: "11.2", title: "AUTH-01: đăng nhập đúng", hasContent: true },
      { slug: "auth-02-den-05-sai-thieu", code: "11.3", title: "AUTH-02 → AUTH-05: các trường hợp sai/thiếu", hasContent: true },
      { slug: "xac-nhan-fixture-dung-lai-duoc", code: "11.4", title: "Xác nhận fixture auth_token dùng lại được", hasContent: true },
    ],
  },
  {
    slug: "crud-booking",
    num: 12,
    title: "Bộ test CRUD đầy đủ cho /booking",
    emoji: "🗂️",
    minutes: 60,
    summary:
      "Viết đủ test GET/POST/PUT/PATCH/DELETE cho /booking, thêm fixture tạo booking riêng cho từng test, phát hiện 2 hành vi thật thú vị của API.",
    sections: [
      { slug: "get-danh-sach-va-tim-theo-id", code: "12.1", title: "GET — danh sách và tìm theo id", hasContent: true },
      { slug: "post-tao-booking", code: "12.2", title: "POST — tạo booking, và 2 phát hiện thật", hasContent: true },
      { slug: "put-patch-sua-booking", code: "12.3", title: "PUT/PATCH — sửa booking, cần token", hasContent: true },
      { slug: "delete-xoa-booking", code: "12.4", title: "DELETE — xoá booking, cần token", hasContent: true },
    ],
  },
  {
    slug: "chuan-hoa-framework",
    num: 13,
    title: "Chuẩn hoá thành framework nhỏ",
    emoji: "🏗️",
    minutes: 75,
    summary:
      "Nhận ra chỗ code lặp, tách class api_client.py dùng chung, gộp các test AUTH giống khuôn bằng @pytest.mark.parametrize.",
    sections: [
      { slug: "nhan-ra-cho-lap-code", code: "13.1", title: "Nhận ra chỗ lặp code", hasContent: true },
      { slug: "tach-api-client", code: "13.2", title: "Tách api_client.py", hasContent: true },
      { slug: "fixture-client", code: "13.3", title: "Fixture client", hasContent: true },
      { slug: "refactor-test-put-patch-delete", code: "13.4", title: "Refactor các test PUT/PATCH/DELETE", hasContent: true },
      { slug: "gop-auth-bang-parametrize", code: "13.5", title: "Gộp AUTH-02 → AUTH-05 bằng parametrize", hasContent: true },
    ],
  },
  {
    slug: "gioi-thieu-ket-hop-ui-api",
    num: 14,
    title: "Vì sao cần kết hợp UI + API",
    emoji: "🔗",
    minutes: 45,
    summary:
      "Vì sao đôi khi cần test UI và API trong cùng 1 bài kiểm tra, tìm endpoint API thật để dùng cho chương sau.",
    sections: [
      { slug: "vi-sao-can-ket-hop-ui-api", code: "14.1", title: "Vì sao cần kết hợp UI + API", hasContent: true },
      { slug: "dung-api-lam-nguon-su-that", code: "14.2", title: "Dùng API làm nguồn sự thật", hasContent: true },
    ],
  },
  {
    slug: "viet-test-ket-hop-ui-api",
    num: 15,
    title: "Viết test đối chiếu UI với API",
    emoji: "🧵",
    minutes: 45,
    summary:
      "Viết 1 test dùng cả page (UI) và APIRequestContext (API) trong cùng 1 hàm, vì sao không nên assert tổng số lượng trên dữ liệu demo dùng chung.",
    sections: [
      { slug: "fixture-restful-booker-platform", code: "15.1", title: "Fixture cho Restful-Booker Platform", hasContent: true },
      { slug: "viet-test-doi-chieu", code: "15.2", title: "Viết test đối chiếu", hasContent: true },
      { slug: "phat-hien-du-lieu-demo-dung-chung", code: "15.3", title: "Phát hiện: dữ liệu demo công khai dùng chung", hasContent: true },
    ],
  },
  {
    slug: "report-ci",
    num: 16,
    title: "Báo cáo kết quả và chạy tự động bằng CI",
    emoji: "📊",
    minutes: 45,
    summary:
      "Xuất báo cáo test dạng HTML (và Allure Report), cho GitHub Actions tự động chạy toàn bộ test mỗi khi có code mới.",
    sections: [
      { slug: "xuat-bao-cao-html", code: "16.1", title: "Xuất báo cáo HTML", hasContent: true },
      { slug: "nang-cap-allure-report", code: "16.2", title: "Nâng cấp: báo cáo trực quan hơn với Allure Report", hasContent: true },
      { slug: "chay-tu-dong-github-actions-ci", code: "16.3", title: "Chạy tự động bằng GitHub Actions (CI)", hasContent: true },
    ],
  },
];

export function getChapter(slug: string): AutomationChapter | undefined {
  return automationChapters.find((c) => c.slug === slug);
}

export function getSection(chapterSlug: string, sectionSlug: string) {
  const chapter = getChapter(chapterSlug);
  const section = chapter?.sections.find((s) => s.slug === sectionSlug);
  if (!chapter || !section) return undefined;
  return { chapter, section };
}

// Danh sách phẳng mọi mục (theo thứ tự) để tính Trước/Sau.
export function flatSections() {
  return automationChapters.flatMap((c) =>
    c.sections.map((s) => ({ chapter: c, section: s }))
  );
}

export function adjacentSections(chapterSlug: string, sectionSlug: string) {
  const flat = flatSections();
  const i = flat.findIndex(
    (x) => x.chapter.slug === chapterSlug && x.section.slug === sectionSlug
  );
  return {
    prev: i > 0 ? flat[i - 1] : undefined,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : undefined,
  };
}
