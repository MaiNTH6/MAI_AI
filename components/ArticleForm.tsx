import { categories } from "@/lib/categories";
import type { Article } from "@/lib/types";

type Mode = "create" | "edit";

interface Props {
  mode: Mode;
  action: (formData: FormData) => void;
  article?: Article;
}

export function ArticleForm({ mode, action, article }: Props) {
  const a = article;
  return (
    <form action={action} className="space-y-8">
      {/* === META === */}
      <Section title="Thông tin chính" subtitle="Slug, tiêu đề, chuyên mục">
        <Grid2>
          <Field label="Slug (URL)" hint="Chỉ a-z, 0-9, dấu '-'. Không đổi sau khi tạo.">
            <input
              name="slug"
              required
              readOnly={mode === "edit"}
              defaultValue={a?.slug}
              placeholder="vd: gamma-ai-lam-slide"
              className={inputCls}
            />
          </Field>
          <Field label="Chuyên mục">
            <select name="category" required defaultValue={a?.category} className={inputCls}>
              <option value="">— Chọn —</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.emoji} {c.title}
                </option>
              ))}
            </select>
          </Field>
        </Grid2>

        <Field label="Tiêu đề bài viết">
          <input
            name="title"
            required
            defaultValue={a?.title}
            placeholder="Vd: Tôi đã thử dùng X để làm Y trong 5 phút..."
            className={inputCls}
          />
        </Field>

        <Field label="Excerpt (đoạn dẫn ngắn)" hint="2-3 câu, hiển thị ở card và meta description.">
          <textarea
            name="excerpt"
            required
            rows={3}
            defaultValue={a?.excerpt}
            className={inputCls}
          />
        </Field>

        <Grid3>
          <Field label="Ngày đăng">
            <input
              name="publishedAt"
              type="date"
              required
              defaultValue={a?.publishedAt}
              className={inputCls}
            />
          </Field>
          <Field label="Thời gian đọc (phút)">
            <input
              name="readingTime"
              type="number"
              min={1}
              defaultValue={a?.readingTime ?? 5}
              className={inputCls}
            />
          </Field>
          <Field label="Cover" hint="Emoji hoặc URL ảnh">
            <input
              name="cover"
              defaultValue={a?.cover ?? "📄"}
              className={inputCls}
            />
          </Field>
        </Grid3>
      </Section>

      {/* === TOOL LIÊN KẾT === */}
      <Section title="Liên kết với Tool" subtitle="Bài review tool cụ thể (để trống nếu là bài tổng hợp/so sánh)">
        <Grid2>
          <Field label="Tool slug" hint="Khớp với slug trong lib/tools.ts (vd: gamma-ai, canva-ai)">
            <input
              name="toolSlug"
              defaultValue={a?.toolSlug}
              placeholder="gamma-ai"
              className={inputCls}
            />
          </Field>
          <Field label="Affiliate URL" hint="Đầy đủ kèm ref ID">
            <input
              name="affiliateUrl"
              type="url"
              defaultValue={a?.affiliateUrl}
              placeholder="https://example.com/?ref=..."
              className={inputCls}
            />
          </Field>
        </Grid2>

        <Field label="Điểm đánh giá (0-10)" hint="Để trống nếu không phải bài review tool">
          <input
            name="rating"
            type="number"
            step="0.1"
            min={0}
            max={10}
            defaultValue={a?.rating}
            className={`${inputCls} max-w-[160px]`}
          />
        </Field>
      </Section>

      {/* === ƯU NHƯỢC === */}
      <Section title="Ưu / Nhược điểm" subtitle="Mỗi điểm 1 dòng. Cái đầu = lớn nhất (hiện trong Quick Verdict).">
        <Grid2>
          <Field label="✓ Ưu điểm">
            <textarea
              name="pros"
              rows={5}
              defaultValue={a?.pros?.join("\n")}
              placeholder={"Mỗi dòng 1 ưu điểm\n..."}
              className={inputCls}
            />
          </Field>
          <Field label="! Nhược điểm">
            <textarea
              name="cons"
              rows={5}
              defaultValue={a?.cons?.join("\n")}
              placeholder={"Mỗi dòng 1 nhược điểm\n..."}
              className={inputCls}
            />
          </Field>
        </Grid2>
      </Section>

      {/* === INTRO — Mở bài === */}
      <Section title="📝 Mở bài (Đặt vấn đề + Giới thiệu trợ lý)" subtitle="3 trường: Vấn đề người đọc đang gặp / Trợ lý là gì / Vì sao chọn nó. Hiển thị NGAY sau excerpt — bắt người đọc đồng cảm + biết tool.">
        <Field label="Đặt vấn đề (1-2 câu)">
          <textarea
            name="intro_problem"
            rows={3}
            defaultValue={a?.intro?.problem}
            placeholder="Mỗi mùa thi vào 10, cô giáo phải đối mặt cùng một bài toán..."
            className={inputCls}
          />
        </Field>
        <Field label="Trợ lý là gì (1-2 câu)">
          <textarea
            name="intro_whatIs"
            rows={3}
            defaultValue={a?.intro?.whatIs}
            placeholder="NotebookLM là tool miễn phí của Google — bạn upload tài liệu, nó 'đọc hộ'..."
            className={inputCls}
          />
        </Field>
        <Field label="Vì sao chọn nó (vd: vs ChatGPT)">
          <textarea
            name="intro_whyThis"
            rows={3}
            defaultValue={a?.intro?.whyThis}
            placeholder="ChatGPT có thể bịa. NotebookLM mọi câu trả lời đều có trích dẫn 'SGK trang 73'..."
            className={inputCls}
          />
        </Field>
      </Section>

      {/* === TLDR — Đọc 30 giây === */}
      <Section title="⚡ TLDR — Đọc 30 giây" subtitle="3-5 bullet siêu ngắn. Hiển thị NGAY sau Quick Verdict — bắt người đọc vội.">
        <Field label="Mỗi dòng 1 bullet">
          <textarea
            name="tldr"
            rows={5}
            defaultValue={a?.tldr?.join("\n")}
            placeholder={"NotebookLM miễn phí 99% tính năng\nTự tóm tắt SGK + tự sinh câu hỏi ôn tập\n..."}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* === BẢNG TRƯỚC/SAU === */}
      <Section title="📊 Bảng Trước & Sau" subtitle="Số liệu cụ thể — phụ huynh thích nhìn bảng so sánh.">
        <Field label="JSON array — {label, before, after}" hint='Vd: [{"label":"Điểm thi thử","before":"1/3","after":"2.5/3"}]'>
          <textarea
            name="comparisonTable"
            rows={8}
            defaultValue={a?.comparisonTable ? JSON.stringify(a.comparisonTable, null, 2) : ""}
            placeholder={`[
  {"label": "Điểm thi thử", "before": "1/3", "after": "2.5/3"},
  {"label": "Chi phí học/tháng", "before": "3 triệu", "after": "800k"}
]`}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
      </Section>

      {/* === VIDEO === */}
      <Section title="🎬 Video hướng dẫn" subtitle="YouTube watch URL hoặc embed. Tự quay 3-5 phút bằng điện thoại là đủ.">
        <Grid2>
          <Field label="URL video">
            <input
              name="videoUrl"
              type="url"
              defaultValue={a?.videoUrl}
              placeholder="https://www.youtube.com/watch?v=..."
              className={inputCls}
            />
          </Field>
          <Field label="Tiêu đề/caption video (tùy chọn)">
            <input
              name="videoTitle"
              defaultValue={a?.videoTitle}
              placeholder="Hướng dẫn 3 phút thiết lập NotebookLM"
              className={inputCls}
            />
          </Field>
        </Grid2>
      </Section>

      {/* === 5 BƯỚC THIẾT LẬP === */}
      <Section title="🚀 Các bước thiết lập" subtitle="Step-by-step cho phụ huynh / người mới. JSON array — {title, body}.">
        <Field label="JSON steps">
          <textarea
            name="steps"
            rows={10}
            defaultValue={a?.steps ? JSON.stringify(a.steps, null, 2) : ""}
            placeholder={`[
  {"title": "Tải tài liệu cần thiết", "body": "Tải SGK Toán 9 PDF + 10 đề thi vào 10 từ Violet, Loigiaihay..."},
  {"title": "Tạo tài khoản Google", "body": "Vào notebooklm.google.com, đăng nhập bằng Gmail."}
]`}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
      </Section>

      {/* === PROMPT MẪU === */}
      <Section title="💬 Prompt + Kết quả + Tester Note" subtitle="Phần này TĂNG LƯỢT VIEW NHẤT. JSON array. Mỗi prompt có: title, goal (mục tiêu — hiện trước prompt), prompt, result, testerNote (góc soi lỗi của tester — hiện cuối, kiểu warning box).">
        <Field label="JSON prompts">
          <textarea
            name="prompts"
            rows={18}
            defaultValue={a?.prompts ? JSON.stringify(a.prompts, null, 2) : ""}
            placeholder={`[
  {
    "title": "Tóm tắt hệ thống kiến thức",
    "goal": "Biến chương dài thành 1-2 trang đề cương cốt lõi",
    "prompt": "Hãy đóng vai giáo viên 10 năm kinh nghiệm...",
    "result": "NotebookLM trả về: ...",
    "testerNote": "Sau khi AI chạy, kiểm tra lỗi font tiếng Việt..."
  }
]`}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
      </Section>

      {/* === VISUAL FEATURES === */}
      <Section title="🎨 Tính năng Visual của tool" subtitle="Hướng dẫn các nút bấm tạo output trực quan (Mind Map, Blueprint, podcast, video). JSON array — {name, emoji, description, howTo[], useCase, tip}.">
        <Field label="JSON visualFeatures">
          <textarea
            name="visualFeatures"
            rows={14}
            defaultValue={a?.visualFeatures ? JSON.stringify(a.visualFeatures, null, 2) : ""}
            placeholder={`[
  {
    "name": "Mind Map",
    "emoji": "🗺️",
    "description": "Sơ đồ tư duy radial từ tài liệu.",
    "howTo": [
      "Panel Studio bên phải → tìm 'Mind Map'",
      "Bấm Generate → chờ 30-60 giây"
    ],
    "useCase": "Slide đầu bài giảng, in A3 dán bảng lớp.",
    "tip": "Notebook nhỏ → Mind Map gọn hơn."
  }
]`}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
      </Section>

      {/* === USE CASE === */}
      <Section title="Use-case (Quá trình test thực tế)" subtitle="Phần kể chuyện chính — đánh trúng tâm lý người đọc.">
        <Field label="JSON (title + paragraphs)" hint='Vd: {"title": "Bài toán...", "paragraphs": ["Đoạn 1", "Đoạn 2"]}'>
          <textarea
            name="useCase"
            rows={8}
            defaultValue={a?.useCase ? JSON.stringify(a.useCase, null, 2) : ""}
            placeholder='{"title": "...", "paragraphs": ["...", "..."]}'
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
      </Section>

      {/* === BUGS === */}
      <Section title="🐞 Góc nhìn Tester (Bugs)" subtitle="Nêu 2-3 hạn chế/lỗi thật của AI → tăng niềm tin.">
        <Field label="Bugs / giới hạn">
          <textarea
            name="bugs"
            rows={5}
            defaultValue={a?.bugs?.join("\n")}
            placeholder={"Mỗi dòng 1 bug/giới hạn\n..."}
            className={inputCls}
          />
        </Field>
      </Section>

      {/* === PRICING === */}
      <Section title="💰 Bảng giá" subtitle="JSON array. Mỗi gói: name, price, forWho, features[], recommended? (optional)">
        <Field label="JSON pricing plans">
          <textarea
            name="pricing"
            rows={12}
            defaultValue={a?.pricing ? JSON.stringify(a.pricing, null, 2) : ""}
            placeholder={`[
  {
    "name": "Free",
    "price": "0đ",
    "forWho": "Người mới thử",
    "features": ["Tính năng A", "Tính năng B"]
  },
  {
    "name": "Pro",
    "price": "~200k/tháng",
    "forWho": "Dùng đều đều",
    "features": ["Tính năng X"],
    "recommended": true
  }
]`}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
      </Section>

      {/* === FAQ === */}
      <Section title="❓ FAQ — Phụ huynh hay hỏi" subtitle="5-7 câu hỏi + trả lời ngắn gọn. JSON array — {question, answer}.">
        <Field label="JSON FAQ">
          <textarea
            name="faq"
            rows={10}
            defaultValue={a?.faq ? JSON.stringify(a.faq, null, 2) : ""}
            placeholder={`[
  {"question": "NotebookLM có miễn phí thật không?", "answer": "Có. Gói free đủ cho hầu hết HS — 100 notebook, 50 nguồn mỗi notebook."},
  {"question": "Con tôi dùng iPhone — dùng được không?", "answer": "Được. Có app trên iOS + Android, hoặc dùng trình duyệt."}
]`}
            className={`${inputCls} font-mono text-xs`}
          />
        </Field>
      </Section>

      {/* === CHỐT === */}
      <Section title="🎯 Tôi khuyên gì?" subtitle="1-2 câu chốt. Hiện ở khối đen cuối bài, kèm CTA affiliate.">
        <Field label="Final thought">
          <textarea
            name="finalThought"
            rows={3}
            defaultValue={a?.finalThought}
            className={inputCls}
          />
        </Field>
      </Section>

      <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
        <a href="/admin" className="btn-outline-dark">
          Hủy
        </a>
        <button type="submit" className="btn-cta">
          {mode === "create" ? "Tạo bài" : "Lưu thay đổi"}
        </button>
      </div>
    </form>
  );
}

/* ---------- helpers ---------- */

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100";

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-white p-6 ring-1 ring-white/10 shadow-xl shadow-black/30 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="text-sm font-semibold text-slate-700 mb-1">{label}</div>
      {hint && <div className="text-xs text-slate-500 mb-1.5">{hint}</div>}
      {children}
    </label>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}
function Grid3({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-3">{children}</div>;
}
