import type { Metadata } from "next";
import Link from "next/link";
import { BookOrderForm } from "@/components/BookOrderForm";

// ===========================================================================
// ⚙️  CẦN ĐIỀN — chủ trang sửa các giá trị dưới đây (không cần biết code):
//     • price, bankName, bankAccount, accountHolder: thông tin nhận tiền
//     • qrImage: đặt ảnh QR VietQR của bạn tại public/books/vietqr.png
//     • email: nơi khách gửi xác nhận (đang dùng email đã công khai trên site)
//   Số tài khoản NHẬN tiền không phải thông tin bí mật — an toàn khi hiển thị.
// ===========================================================================
const SELLER = {
  priceLabel: "199.000đ", // TODO: đổi thành giá bạn muốn bán
  bankName: "___ NGÂN HÀNG (VD: Vietcombank) ___",
  bankAccount: "___ SỐ TÀI KHOẢN ___",
  accountHolder: "___ TÊN CHỦ TÀI KHOẢN (IN HOA) ___",
  transferNote: "MUASACH + email của bạn",
  qrImage: "/books/vietqr.png", // đặt ảnh QR tại public/books/vietqr.png
  email: "mnguyenthihoang99@gmail.com",
  deliveryTime: "trong vòng 12 giờ (thường nhanh hơn)",
};

export const metadata: Metadata = {
  title: "Cẩm nang 50 câu lệnh SQL săn Bug thực chiến cho QA",
  description:
    "Ebook 50 câu lệnh SQL giúp QA tự tay vào database tìm những lỗi giao diện không phơi bày — kèm database mẫu 19 bug, bài tập có đáp án và case study điều tra.",
};

const included = [
  {
    icon: "📘",
    title: "50 câu lệnh SQL thực chiến",
    desc: "Chia 6 phần: toàn vẹn dữ liệu, ràng buộc nghiệp vụ, đối soát, biên & bất thường, audit/log, truy vấn nâng cao.",
  },
  {
    icon: "🔬",
    title: "Mỗi câu mổ xẻ 5 tầng",
    desc: "Tình huống → phân tích từng mệnh đề → kết quả mẫu → Góc soi lỗi của Tester. Không chỉ đưa câu lệnh, mà dạy cách tư duy.",
  },
  {
    icon: "🗄️",
    title: "Database mẫu 19 bug cài sẵn",
    desc: "File SQL tạo sẵn cơ sở dữ liệu thương mại điện tử có lỗi để bạn chạy thử từng câu và thấy kết quả thật.",
  },
  {
    icon: "✍️",
    title: "16 bài tập có lời giải",
    desc: "Tự luyện cuối mỗi phần, đáp án đã kiểm chứng trên chính database mẫu.",
  },
  {
    icon: "🕵️",
    title: "Case study điều tra thật",
    desc: "Một ngày QA lần theo dấu vết dữ liệu để tìm ra nguyên nhân gốc — sáu câu lệnh nối thành một cuộc điều tra.",
  },
  {
    icon: "🛡️",
    title: "Chạy SQL an toàn trên production",
    desc: "Nguyên tắc read-only, quyền riêng tư khi query dữ liệu thật, và cách kiểm thử ghi dữ liệu (hành động → xác minh DB).",
  },
];

const forWho = [
  "QA / Tester muốn tự tay kiểm thử ở tầng cơ sở dữ liệu, không phụ thuộc dev.",
  "Người mới với SQL cần một lộ trình thực chiến thay vì học cú pháp khô khan.",
  "Dev / BA muốn hiểu cách dữ liệu bẩn lọt vào hệ thống và cách phát hiện sớm.",
];

const faqs = [
  {
    q: "Sau khi chuyển khoản, nhận sách thế nào?",
    a: `Bạn điền form xác nhận (hoặc gửi email). Sách bản PDF + file SQL sẽ được gửi tới email của bạn ${SELLER.deliveryTime}.`,
  },
  {
    q: "Định dạng sách là gì?",
    a: "File PDF (khoảng 110 trang) đọc được trên mọi thiết bị, kèm file ecommerce_test_setup.sql để dựng database thực hành.",
  },
  {
    q: "Cần cài phần mềm gì để thực hành?",
    a: "Khuyến nghị MySQL 8.0+ và một công cụ như MySQL Workbench. Phần lớn nội dung chạy được cả trên MySQL 5.7.",
  },
  {
    q: "Có được cập nhật khi sách sửa lỗi/bổ sung không?",
    a: "Có. Khi có bản cập nhật, bạn gửi lại email đã mua để nhận bản mới, không tính thêm phí.",
  },
];

export default function Page() {
  return (
    <div className="container-content py-12 sm:py-16">
      {/* Hero */}
      <div className="mx-auto max-w-3xl text-center">
        <span className="badge">📗 Sách trả phí · bản PDF</span>
        <h1 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
          Cẩm nang 50 câu lệnh SQL săn Bug thực chiến cho QA
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-300">
          Bộ 50 câu lệnh giúp người làm kiểm thử tự tay đi vào database và tìm ra
          những lỗi mà giao diện không phơi bày — mỗi câu đều có tình huống, phân
          tích từng mệnh đề, kết quả mẫu và góc soi lỗi của Tester.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-400">
          <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
            📄 ~110 trang PDF
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
            🗄️ DB mẫu 19 bug
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
            ✍️ 16 bài tập có đáp án
          </span>
        </div>
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="text-4xl font-bold text-white">
            {SELLER.priceLabel}
          </div>
          <a href="#dat-sach" className="btn-cta-lg mt-2">
            Đặt sách ngay
          </a>
        </div>
      </div>

      {/* Bạn nhận được gì */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold text-white">
          Bạn nhận được gì
        </h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {included.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-white/10 bg-slate-900/40 p-6"
            >
              <div className="text-2xl">{it.icon}</div>
              <h3 className="mt-3 font-semibold text-white">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {it.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Dành cho ai */}
      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-white">
          Sách phù hợp với ai
        </h2>
        <ul className="mt-6 space-y-3">
          {forWho.map((t) => (
            <li
              key={t}
              className="flex gap-3 rounded-xl border border-white/10 bg-slate-900/40 p-4 text-slate-300"
            >
              <span className="text-brand-400">✓</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Đặt sách — thanh toán QR + form */}
      <section id="dat-sach" className="mt-20 scroll-mt-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-10">
          <h2 className="text-center text-2xl font-bold text-white">
            Đặt sách — chuyển khoản &amp; nhận qua email
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-400">
            Thanh toán một lần bằng chuyển khoản ngân hàng. Sau khi chuyển, gửi
            xác nhận — sách sẽ tới email của bạn {SELLER.deliveryTime}.
          </p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Cột trái: QR + thông tin chuyển khoản */}
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Bước 1 · Chuyển khoản
              </div>
              <div className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                {/* Đặt ảnh QR tại public/books/vietqr.png */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SELLER.qrImage}
                  alt="Mã QR chuyển khoản VietQR"
                  width={220}
                  height={220}
                  className="rounded-xl bg-white p-2"
                />
                <dl className="w-full space-y-2 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Ngân hàng</dt>
                    <dd className="text-right font-medium text-slate-200">
                      {SELLER.bankName}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Số tài khoản</dt>
                    <dd className="text-right font-mono font-semibold text-white">
                      {SELLER.bankAccount}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Chủ tài khoản</dt>
                    <dd className="text-right font-medium text-slate-200">
                      {SELLER.accountHolder}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Số tiền</dt>
                    <dd className="text-right font-semibold text-white">
                      {SELLER.priceLabel}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-slate-500">Nội dung CK</dt>
                    <dd className="text-right font-medium text-brand-300">
                      {SELLER.transferNote}
                    </dd>
                  </div>
                </dl>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                Ghi email vào nội dung chuyển khoản giúp đối chiếu nhanh hơn. Đây
                là tài khoản nhận tiền — người khác có số tài khoản này không thể
                rút tiền của bạn.
              </p>
            </div>

            {/* Cột phải: form xác nhận */}
            <div>
              <div className="text-sm font-semibold uppercase tracking-wide text-slate-400">
                Bước 2 · Gửi xác nhận
              </div>
              <div className="mt-4">
                <BookOrderForm
                  sellerEmail={SELLER.email}
                  priceLabel={SELLER.priceLabel}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="text-center text-2xl font-bold text-white">
          Câu hỏi thường gặp
        </h2>
        <div className="mt-6 space-y-4">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-xl border border-white/10 bg-slate-900/40 p-5"
            >
              <h3 className="font-semibold text-white">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Ghi chú trung thực */}
      <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-slate-500">
        Toàn bộ SQL trong sách đã được chạy kiểm chứng trên database mẫu. Đây là
        tài liệu tự viết của maiqai.com — có thắc mắc trước khi mua, cứ email{" "}
        <a
          href={`mailto:${SELLER.email}`}
          className="text-brand-300 underline underline-offset-2"
        >
          {SELLER.email}
        </a>
        .{" "}
        <Link
          href="/db-testing"
          className="text-brand-300 underline underline-offset-2"
        >
          Xem thêm bài viết DB Testing miễn phí
        </Link>
        .
      </p>
    </div>
  );
}
