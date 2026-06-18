# MAI.tools — Rule dự án (áp dụng cho mọi bài viết & tính năng)

> Đây là website **hướng dẫn ứng dụng AI vào công việc kiểm thử (QA)** cho người Việt — KHÔNG phải site review affiliate, KHÔNG đa đối tượng.
> Mọi bài viết & tài nguyên mới PHẢI theo chuẩn dưới đây.

## 1. Định hướng nội dung

- **Tập trung 100% vào QA / Kiểm thử** (đối tượng: dân QA/test, dev, người làm phần mềm). Đã bỏ các mảng Giáo viên/Học sinh.
  - `ai-qa` — chuyên mục bài hướng dẫn (đọc requirement, đọc code, viết test case, sinh test data, automation...)
  - `kho-prompt` — prompt cho QA + văn phòng (free)
  - `kho-template-qa` — template Excel: Test Scenario, Test Case, Checklist, Bug Report, RTM, Defect Log... (free)
- Bài mới mặc định thuộc QA. Nếu sau này mở mảng khác → thêm category mới + bàn lại với user trước.
- **KHÔNG** dùng: `rating`, `pricing`, `affiliateUrl`, bán khóa học, CTA mua hàng. Không tô hồng.
- Tài nguyên (prompt, template) **luôn miễn phí, không gate email** — liệt kê thẳng theo chủ đề, mỗi item có nút Copy / Tải về.

## 2. Bố cục chuẩn 1 bài hướng dẫn (`/bai-viet/[slug]`)

Thứ tự khối (bật/tắt tùy bài, nhưng giữ đúng trình tự này):

1. **Tiêu đề** — kể chuyện / nêu lợi ích cụ thể + hook (vd "...(3 prompt sẵn)"). KHÔNG liệt kê tính năng.
2. **Excerpt** — 2-3 câu đánh trúng "nỗi đau" + nêu cái người đọc sẽ nhận được.
3. **Intro** (`intro`): Đặt vấn đề → Giới thiệu trợ lý là gì → Vì sao chọn nó (so với ChatGPT...).
4. **TLDR** (`tldr`) — "Đọc 30 giây", 3-5 bullet.
5. **Bảng Trước/Sau** (`comparisonTable`) — so sánh phương pháp (KHÔNG so tiền/điểm số).
6. **Các bước** (`steps`) — 3-5 bước; chèn `[Chèn ảnh: ...]` ở chỗ cần screenshot thật.
7. **Prompts** (`prompts`) — mỗi prompt gồm: `goal` (Mục tiêu) + `prompt` (copy-paste) + `exampleInput` (📥 Đầu vào dùng cho ví dụ) + `result`/`resultGroups` (kết quả mẫu) + `testerNote` (🔍 Góc soi lỗi của Tester).
   - **Kết quả mẫu phải truy ngược được từ `exampleInput`** — không bịa số/ID/nguồn không có trong đầu vào hiển thị. Nhãn hiển thị là "ví dụ **minh họa**" (KHÔNG dùng "ví dụ thực tế" — tránh nói quá là đã chạy production).
8. **Visual features** (`visualFeatures`) — nếu tool có (Mind Map, Blueprint, podcast...).
9. **Pros / Cons + Bugs** — phơi bày 2-3 hạn chế thật ("Góc soi lỗi"). Tăng niềm tin.
10. **FAQ** (`faq`) — câu hỏi thật người đọc hay hỏi: miễn phí?, dùng điện thoại?, áp dụng môn/ngành nào?, bảo mật?, bắt đầu từ đâu?
11. **Final thought** — tiêu đề "📌 Tóm lại" (vì không affiliate). Chốt: AI hỗ trợ chứ không thay tư duy con người.

## 3. Tone & ngôn ngữ

- ⛔ **NỘI DUNG PHẢI TỰ VIẾT — TUYỆT ĐỐI KHÔNG copy từ nguồn khác** (bài viết, blog, khóa học, tài liệu của người/đơn vị khác). Có thể tham khảo để hiểu vấn đề, nhưng phải diễn đạt lại hoàn toàn bằng lời của mình + ví dụ riêng. Không sao chép câu chữ, không "viết lại nhẹ" (paraphrase sát). Đây là quy tắc bắt buộc — tránh vi phạm bản quyền và giữ giọng riêng của site.
- **Giọng chuyên nghiệp, trang nhã** — rõ ràng, đĩnh đạc, KHÔNG khẩu ngữ/suồng sã. Tránh các từ kiểu: "chạy luôn", "lòi ra", "đọc cho có", "đọc hộ", "ngáo", "đẻ ra", "phát chán", "nặng đầu", "dùng mãi", "mỏi mắt". Vẫn dễ đọc, không cứng nhắc — chỉ là không tếu táo.
- Tiếng Việt, **tránh thuật ngữ kỹ thuật** với người ngoài ngành: dùng "AI bịa thông tin" thay "hallucination". (Với bài QA chuyên môn thì giữ thuật ngữ ngành: test case, requirement, regression... là bình thường.)
- **Trung thực tuyệt đối**: luôn có phần hạn chế/bug. Đã test thật trước khi viết.
- **Scannable**: chia khối có icon + box màu, câu ngắn, dễ đọc lướt. Front-load giá trị (TLDR/bảng lên sớm), tránh đoạn văn dài lê thê.
- **Ví dụ cụ thể, bám ngữ cảnh VN**: vd chuyên đề Lượng giác lớp 9, đề thi vào 10 Hà Nội/HCM, requirement đăng nhập/OTP...
- **Ảnh/tài nguyên** dùng kèm: chỉ dùng ảnh license-free (Unsplash/Pexels) hoặc tự tạo. Không lấy ảnh có bản quyền của người khác.

## 4. Quy ước hiển thị bảng & tài nguyên

- **Bảng** (comparison, template): render HTML `<table>` thật — KHÔNG để markdown thô `| ... |`.
- **Cột nhóm lặp** (vd cột "Nhóm"): gộp ô bằng `rowSpan` khi các dòng liền nhau trùng giá trị — chỉ hiện nhãn 1 lần.
- **Copy bảng** = TSV (tab giữa cột, newline giữa dòng) → dán vào Excel tự tách cột. Không copy markdown.
- **File Excel tải về**: header định dạng (font Arial) + cột Kết quả/Trạng thái/Ưu tiên/Loại có **dropdown chọn sẵn** (Data Validation) để tick được trên mọi phiên bản Excel. Chừa sẵn dòng trống.
- **Checklist**: dùng dạng bảng có cột "Kết quả" để trống (KHÔNG dùng ký tự ☐ vì dán Excel không tick được).

## 5. Kiến trúc kỹ thuật (giữ nguyên tắc)

- Nội dung bài: `data/articles.json` ⇄ CRUD qua `/admin` (`lib/db.ts`). Render qua `components/ArticleSections.tsx`. Schema ở `lib/types.ts`.
- Tài nguyên (prompt/template): data ở `lib/prompts.ts` và `data/qa-templates.json` (**1 nguồn dùng chung** web + script).
- File Excel sinh bằng `scripts/gen-templates.py` (đọc `data/qa-templates.json` → `public/templates/*.xlsx`). Sửa template → chạy lại script.
- Chuyên mục ở `lib/categories.ts` — Header/Footer/Homepage tự đọc. Thêm chuyên mục = thêm vào đây + tạo folder `app/(site)/<slug>/page.tsx`.
- Mỗi lần đổi: `npx tsc --noEmit` phải sạch trước khi coi là xong.

## 6. Khi thêm bài / tài nguyên mới — checklist nhanh

- [ ] **Nội dung 100% tự viết, KHÔNG copy nguồn khác** (xem mục 3).
- [ ] Đúng 1 trong 3 trụ (GV / HS / QA) hoặc tài nguyên.
- [ ] Theo đủ bố cục mục 2, tone mục 3.
- [ ] Có ít nhất 1 phần hạn chế/bug trung thực.
- [ ] Prompt (nếu có) kèm Mục tiêu + Kết quả mẫu + Góc soi lỗi Tester.
- [ ] Bảng render đúng (HTML table, gộp ô nhóm, copy TSV).
- [ ] Không có rating/pricing/affiliate.
- [ ] `npx tsc --noEmit` sạch + smoke test route 200.

## 7. Vận hành dev

- Chạy: `npm run dev` (port 3000). Admin: `/admin` (mật khẩu env `ADMIN_PASSWORD`, mặc định `admin123`).
- ⚠️ Production: `data/articles.json` không ghi được trên Vercel (filesystem read-only) — cần migrate sang Turso/SQLite trước khi deploy.
