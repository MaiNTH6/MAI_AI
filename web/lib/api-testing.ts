// Cấu trúc chuyên mục API Testing — hub nhiều tầng, tự biên soạn (không gắn chứng chỉ chính thức nào).
// 7 chương → các mục con. Khung chương bám theo dữ liệu khảo sát thực tế:
// - Tỷ lệ dùng từng loại test: Postman State of the API Report (functional 68%, integration 66%,
//   performance 48%→57%, security 35.8%, contract 17%).
// - Chương "Bảo mật API" theo đúng 10 hạng mục OWASP API Security Top 10 (2023).
// Nội dung từng mục để ở content/api-testing (registry).

export interface ApiSection {
  slug: string;
  code: string; // mã theo chương, vd "2.1"
  title: string;
  hasContent?: boolean; // đã viết nội dung chưa
}

export interface ApiChapter {
  slug: string;
  num: number;
  title: string;
  emoji: string;
  minutes: number;
  summary: string;
  sections: ApiSection[];
}

export const apiChapters: ApiChapter[] = [
  {
    slug: "nen-tang-api-http",
    num: 1,
    title: "Nền tảng API & HTTP",
    emoji: "🌐",
    minutes: 45,
    summary:
      "Khái niệm nền trước khi test: API/REST là gì, cấu trúc request/response, status code, các header thường gặp.",
    sections: [
      { slug: "api-va-rest-la-gi", code: "1.1", title: "API và REST là gì", hasContent: true },
      { slug: "cau-truc-request-response", code: "1.2", title: "Cấu trúc 1 HTTP Request/Response", hasContent: true },
      { slug: "status-code-phan-nhom", code: "1.3", title: "Status code — phân nhóm và ý nghĩa", hasContent: true },
      { slug: "header-thuong-gap", code: "1.4", title: "Header thường gặp (Content-Type, Authorization...)", hasContent: true },
    ],
  },
  {
    slug: "test-theo-http-method",
    num: 2,
    title: "Test theo từng HTTP Method",
    emoji: "🧭",
    minutes: 90,
    summary:
      "GET, POST, PUT/PATCH, DELETE mỗi loại một trọng tâm kiểm tra khác nhau — kèm ví dụ endpoint/response thực tế.",
    sections: [
      { slug: "ngu-nghia-http-method", code: "2.1", title: "Ngữ nghĩa HTTP Method: Idempotent, Safe, Side-effect", hasContent: true },
      { slug: "test-api-get", code: "2.2", title: "Test API loại GET", hasContent: true },
      { slug: "test-api-post", code: "2.3", title: "Test API loại POST", hasContent: true },
      { slug: "test-api-put-patch", code: "2.4", title: "Test API loại PUT & PATCH", hasContent: true },
      { slug: "test-api-delete", code: "2.5", title: "Test API loại DELETE", hasContent: true },
    ],
  },
  {
    slug: "integration-testing",
    num: 3,
    title: "Integration Testing",
    emoji: "🔗",
    minutes: 60,
    summary:
      "Test API phổ biến thứ 2 theo khảo sát (66%) — kiểm tra API trong luồng nghiệp vụ thật, khi phối hợp với service/hệ thống khác.",
    sections: [
      { slug: "test-luong-nghiep-vu-da-buoc", code: "3.1", title: "Test luồng nghiệp vụ đa bước (multi-step workflow)", hasContent: true },
      { slug: "test-tich-hop-giua-cac-service", code: "3.2", title: "Test tích hợp giữa các service (service-to-service)", hasContent: true },
      { slug: "test-dong-bo-du-lieu-db-queue", code: "3.3", title: "Test đồng bộ dữ liệu giữa API, DB và message queue", hasContent: true },
      { slug: "test-theo-moi-truong", code: "3.4", title: "Test theo môi trường: mock, sandbox, staging", hasContent: true },
    ],
  },
  {
    slug: "bao-mat-api-owasp",
    num: 4,
    title: "Bảo mật API theo OWASP API Security Top 10",
    emoji: "🔐",
    minutes: 90,
    summary:
      "10 hạng mục rủi ro bảo mật API phổ biến nhất theo OWASP API Security Top 10 (bản 2023) — chuẩn được ngành công nghiệp dùng rộng rãi.",
    sections: [
      { slug: "broken-object-level-authorization", code: "4.1", title: "Broken Object Level Authorization (BOLA/IDOR)", hasContent: true },
      { slug: "broken-authentication", code: "4.2", title: "Broken Authentication", hasContent: true },
      { slug: "broken-object-property-level-authorization", code: "4.3", title: "Broken Object Property Level Authorization (BOPLA)", hasContent: true },
      { slug: "unrestricted-resource-consumption", code: "4.4", title: "Unrestricted Resource Consumption", hasContent: true },
      { slug: "security-misconfiguration", code: "4.5", title: "Security Misconfiguration", hasContent: true },
      { slug: "unrestricted-access-sensitive-business-flows", code: "4.6", title: "Unrestricted Access to Sensitive Business Flows", hasContent: true },
      { slug: "improper-inventory-management", code: "4.7", title: "Improper Inventory Management", hasContent: true },
      { slug: "server-side-request-forgery", code: "4.8", title: "Server-Side Request Forgery (SSRF)", hasContent: true },
      { slug: "broken-function-level-authorization", code: "4.9", title: "Broken Function Level Authorization (BFLA)", hasContent: true },
      { slug: "unsafe-consumption-of-apis", code: "4.10", title: "Unsafe Consumption of APIs", hasContent: true },
    ],
  },
  {
    slug: "performance-testing",
    num: 5,
    title: "Performance Testing",
    emoji: "⚡",
    minutes: 60,
    summary:
      "Loại test tăng trưởng nhanh nhất theo khảo sát (48%→57%) — response time, throughput, load test, và các rủi ro đồng thời (race condition).",
    sections: [
      { slug: "response-time-throughput", code: "5.1", title: "Response time & throughput cơ bản", hasContent: true },
      { slug: "load-test-vs-stress-test", code: "5.2", title: "Load test vs. Stress test — khác nhau ra sao", hasContent: true },
      { slug: "race-condition-lost-update", code: "5.3", title: "Race condition & lost update", hasContent: true },
      { slug: "idempotency-key", code: "5.4", title: "Idempotency key & chống trùng request", hasContent: true },
    ],
  },
  {
    slug: "contract-testing",
    num: 6,
    title: "Contract Testing",
    emoji: "📜",
    minutes: 45,
    summary:
      "Loại test còn ít được dùng (17%) nhưng khảo sát nhấn mạnh là khoảng trống quan trọng — đặc biệt khi API được cả AI agent tiêu thụ.",
    sections: [
      { slug: "contract-testing-la-gi", code: "6.1", title: "Contract testing là gì, khác gì Integration testing", hasContent: true },
      { slug: "validate-theo-openapi-swagger", code: "6.2", title: "Validate theo đặc tả OpenAPI/Swagger", hasContent: true },
      { slug: "consumer-driven-contract", code: "6.3", title: "Consumer-driven contract (khái niệm, ví dụ Pact)", hasContent: true },
    ],
  },
  {
    slug: "automation-tich-hop-ci",
    num: 7,
    title: "Automation & tích hợp CI",
    emoji: "🤖",
    minutes: 60,
    summary:
      "Mô hình 3 tầng test thực tế: test trước khi commit, test trong pipeline CI/CD, và giám sát liên tục ở production.",
    sections: [
      { slug: "tang-1-unit-contract-truoc-commit", code: "7.1", title: "Tầng 1: Unit & contract test trước khi commit", hasContent: true },
      { slug: "tang-2-integration-security-performance-ci", code: "7.2", title: "Tầng 2: Integration/security/performance test trong CI/CD", hasContent: true },
      { slug: "tang-3-giam-sat-production", code: "7.3", title: "Tầng 3: Giám sát liên tục (synthetic monitoring) ở production", hasContent: true },
      { slug: "ket-noi-db-de-verify", code: "7.4", title: "Kết nối DB để verify kết quả trong automation", hasContent: true },
    ],
  },
];

export function getChapter(slug: string): ApiChapter | undefined {
  return apiChapters.find((c) => c.slug === slug);
}

export function getSection(chapterSlug: string, sectionSlug: string) {
  const chapter = getChapter(chapterSlug);
  const section = chapter?.sections.find((s) => s.slug === sectionSlug);
  if (!chapter || !section) return undefined;
  return { chapter, section };
}

// Danh sách phẳng mọi mục (theo thứ tự) để tính Trước/Sau.
export function flatSections() {
  return apiChapters.flatMap((c) =>
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
