# MAI.tools — Review AI cho người Việt

Website affiliate / review công cụ AI dành cho người dùng đại chúng. Cấu trúc & nội dung được xây dựng để **tối đa hóa tỷ lệ click affiliate**: Quick Verdict ở đầu bài, Use-case thực chiến, Bug trung thực, bảng giá kèm tư vấn.

## Tech stack

- **Next.js 16** (App Router + Turbopack) — SEO mạnh, deploy 1-click lên Vercel
- **Tailwind CSS** — styling
- **TypeScript** — type safe
- **JSON file** `data/articles.json` làm lớp lưu trữ MVP (CRUD qua admin UI). Production: migrate sang SQLite/Postgres/Turso.

## Cách chạy lần đầu

```powershell
# 1. Cài Node.js >= 18 từ https://nodejs.org (nếu chưa có)
node --version

# 2. Vào thư mục dự án và cài dependencies
cd D:\MAI\MAI-AI-TOOL
npm install

# 3. (Tùy chọn) Set mật khẩu admin trong file .env.local — nếu không set, dùng default "admin123"
echo "ADMIN_PASSWORD=motMatKhauKhoDoan" > .env.local

# 4. Chạy dev server
npm run dev
```

- Site công khai: <http://localhost:3000>
- Trang quản trị: <http://localhost:3000/admin> (nhập mật khẩu)

## Kho Template QA (file Excel tải về)

Trang `/kho-template-qa` cho tải file Excel mẫu (Test Scenario, Test Case, Checklist) — có header định dạng + cột Kết quả/Trạng thái có dropdown chọn (Pass/Fail/...).

- Nội dung template: `data/qa-templates.json` (1 nguồn dùng chung cho web + script).
- File Excel: `public/templates/*.xlsx`, tạo bằng script Python.
- **Sửa template → tạo lại file Excel:**
  ```powershell
  # cần: pip install openpyxl
  python scripts/gen-templates.py
  ```
  Script đọc `data/qa-templates.json`, ghi đè `public/templates/<slug>.xlsx` cho mọi template dạng bảng.

## Trang quản trị (CMS mini)

| Đường dẫn | Chức năng |
|---|---|
| `/admin/login` | Form đăng nhập (mật khẩu = env `ADMIN_PASSWORD`, mặc định `admin123`) |
| `/admin` | Danh sách tất cả bài viết, kèm nút Sửa / Xóa / Xem |
| `/admin/articles/new` | Form tạo bài mới — có sẵn các trường: tiêu đề, excerpt, slug, chuyên mục, tool liên kết, affiliate URL, điểm đánh giá, ưu/nhược, use-case, bug, bảng giá, final thought |
| `/admin/articles/[slug]` | Sửa một bài cụ thể |

**Lưu ý:**
- Mọi thay đổi ghi trực tiếp vào `data/articles.json`. File này được commit vào git → backup tự động.
- Trường phức tạp (`useCase`, `pricing`) yêu cầu nhập JSON đúng cú pháp — có placeholder mẫu sẵn trong form.
- Auth chỉ dùng cookie + hash — đủ chặn truy cập tình cờ trong dev. **Production phải nâng cấp** sang [iron-session](https://github.com/vvo/iron-session) hoặc [NextAuth](https://authjs.dev).

## Tính năng search

Thanh tìm kiếm ở Hero (và `/tim-kiem`) match **tương đối theo tiêu đề + excerpt**:
- Bỏ dấu tiếng Việt (`"làm slide"` ≡ `"lam slide"`)
- Lowercase, bỏ ký tự đặc biệt
- Match nguyên cụm: 100 điểm. Match từng từ: 10 điểm/từ. Sắp xếp theo điểm.
- Logic ở [lib/normalize.ts](lib/normalize.ts) — dễ nâng cấp lên fuse.js / meilisearch sau.

## Cấu trúc thư mục

```
app/
  layout.tsx                  # Root layout (chỉ html/body)
  globals.css                 # Tailwind + custom classes
  (site)/                     # Route group cho site công khai (có Header+Footer)
    layout.tsx
    page.tsx                  # Trang chủ
    ai-van-phong/page.tsx
    ai-hinh-anh/page.tsx
    goc-tester/page.tsx
    kho-prompt/page.tsx
    tim-kiem/page.tsx         # Trang kết quả search
    review/[slug]/page.tsx    # Bài review (dynamic)
  admin/                      # Route group quản trị (có admin layout riêng + middleware bảo vệ)
    layout.tsx
    page.tsx                  # Dashboard
    actions.ts                # Server Actions (login/logout/CRUD)
    login/page.tsx
    articles/
      new/page.tsx
      [slug]/page.tsx         # Edit form

components/
  Header.tsx                  # Public nav
  Footer.tsx
  Hero.tsx                    # Banner trang chủ với search bar
  EditorsChoice.tsx
  CategoryPage.tsx
  ArticleCard.tsx
  Newsletter.tsx
  QuickVerdict.tsx            # Hộp tóm tắt đầu bài review
  PricingTable.tsx
  AffiliateButton.tsx
  ArticleForm.tsx             # Form dùng chung cho create/edit bài

lib/
  types.ts                    # TypeScript types
  categories.ts               # 4 chuyên mục
  tools.ts                    # Danh sách AI tool + affiliate URL
  articles.ts                 # Backward-compat — delegate sang db.ts
  db.ts                       # CRUD đọc/ghi data/articles.json
  normalize.ts                # Helper bỏ dấu tiếng Việt + match score
  auth.ts                     # Cookie helpers

data/
  articles.json               # Storage cho bài viết (admin sửa được)

middleware.ts                 # Bảo vệ /admin/*
```

## Việc cần làm tiếp (để go live)

### Cấp 1 — Bắt buộc trước khi public

- [ ] Set `ADMIN_PASSWORD` trong `.env.local` (mặc định `admin123` không an toàn).
- [ ] Đổi tất cả `?ref=YOUR_AFFILIATE_ID` trong `lib/tools.ts` và bên trong các bài qua admin UI.
- [ ] Nối form newsletter `components/Newsletter.tsx`:
  - Cách nhanh nhất: tạo tài khoản [Formspree](https://formspree.io) (free 50 submission/tháng), dán endpoint vào hàm `handleSubmit`.
  - Hoặc dùng [Mailchimp](https://mailchimp.com), [ConvertKit](https://convertkit.com).
- [ ] Đăng ký các chương trình affiliate:
  - Canva Partners — <https://www.canva.com/affiliates/>
  - Gamma — đăng ký qua [PartnerStack](https://partnerstack.com)
  - CapCut, Otter, ChatPDF — kiểm tra trang Partners/Affiliate của từng tool.
- [ ] Thêm trang `/gioi-thieu`, `/tiet-lo-affiliate` (FTC compliance) — quan trọng để Google không phạt SEO.

### Cấp 2 — Tăng conversion

- [ ] **Đổi ảnh banner Hero**: thay file `public/images/hero-bg.svg` bằng ảnh JPG/PNG. Đổi đường dẫn trong [Hero.tsx](components/Hero.tsx) nếu dùng đuôi khác.
- [ ] Đổi emoji cover (`📄`, `🥊`...) sang ảnh thật (screenshot tool). Upload vào `public/images/` và dán URL vào trường Cover khi tạo bài.
- [ ] Viết tiếp các bài còn lại qua admin UI (hiện 4 bài chỉ có excerpt, 2 bài full).
- [ ] Thêm Google Analytics 4 + Search Console.
- [ ] Tạo `sitemap.xml` (Next.js có thể auto: thêm `app/sitemap.ts`).

### Cấp 3 — Production-grade

- [ ] **Storage**: Migrate `data/articles.json` sang DB thật. Khuyến nghị: [Turso](https://turso.tech) (SQLite trên cloud, free tier rộng) + [Drizzle ORM](https://orm.drizzle.team). Lý do: filesystem trên Vercel là read-only → admin save sẽ fail trên production.
- [ ] **Auth**: thay cookie-based auth bằng [iron-session](https://github.com/vvo/iron-session) hoặc [NextAuth](https://authjs.dev). Hỗ trợ rate limit, CSRF, multi-user.
- [ ] **Editor giàu format** cho excerpt/use-case/finalThought: dùng [Tiptap](https://tiptap.dev) hoặc [Editor.js].
- [ ] Thêm trang so sánh trực diện (vd: `/so-sanh/chatgpt-vs-claude`).

## Triết lý viết bài (đã cấy sẵn vào template)

1. **Tiêu đề kể chuyện**, không liệt kê tính năng:
   `"Tôi đã thử dùng Gamma AI để làm slide trong 5 phút..."`
2. **Hộp Quick Verdict ở đầu**: điểm + ưu lớn nhất + nhược lớn nhất + CTA to → bắt người lười đọc.
3. **Use-case thật**: ảnh chụp màn hình, số liệu thật, thời gian thật.
4. **Góc nhìn Tester**: phơi bày 2-3 bug → tăng niềm tin → tăng conversion.
5. **Pricing kèm tư vấn**: "ai nên dùng Free, ai nên Pro" → CTA affiliate lần 2.
6. **Tránh thuật ngữ**: dùng "AI bịa thông tin" thay vì "hallucination".

## Deploy

```powershell
# 1. Push lên GitHub
# 2. Vào https://vercel.com → Import project → tự detect Next.js
# 3. Trong Environment Variables, thêm:
#    ADMIN_PASSWORD=motMatKhauThatKho
# 4. Click Deploy
```

Domain free trên Vercel: `mai-tools.vercel.app`. Mua domain riêng (vd `mai.tools`, `aithucchien.com`) để tăng uy tín.

⚠️ **Trước khi deploy production**, đọc lại Cấp 3 — đặc biệt là phần Storage (JSON file không hoạt động trên Vercel serverless).
