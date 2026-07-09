"use client";

import { useState } from "react";

/**
 * Form đặt sách Mức 0 — KHÔNG backend, KHÔNG lưu dữ liệu.
 * Khi bấm gửi, nó mở sẵn ứng dụng email của NGƯỜI MUA với nội dung điền trước,
 * gửi tới email người bán. Không có server nào của bạn chạm vào dữ liệu khách.
 */
export function BookOrderForm({
  sellerEmail,
  priceLabel,
}: {
  sellerEmail: string;
  priceLabel: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");

  const disabled = !name.trim() || !email.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `Đặt sách SQL cho QA — ${name.trim()}`;
    const body = [
      "Tôi đã chuyển khoản mua sách và muốn nhận file.",
      "",
      `Họ tên: ${name.trim()}`,
      `Email nhận sách: ${email.trim()}`,
      `Số tiền: ${priceLabel}`,
      note.trim() ? `Ghi chú / mã giao dịch: ${note.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${sellerEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">
          Họ tên
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nguyễn Văn A"
          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">
          Email nhận sách
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@cua-ban.com"
          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-300">
          Ghi chú / mã giao dịch{" "}
          <span className="text-slate-500">(không bắt buộc)</span>
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="6 số cuối mã giao dịch chuyển khoản"
          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-100 placeholder-slate-500 outline-none focus:border-brand-400 focus:ring-1 focus:ring-brand-400"
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="btn-cta w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        Tôi đã chuyển khoản — gửi xác nhận
      </button>

      <p className="text-xs leading-relaxed text-slate-500">
        Nút này mở sẵn ứng dụng email của bạn với nội dung điền trước — bạn chỉ
        cần bấm Gửi. Nếu máy không tự mở, hãy gửi email tới{" "}
        <a
          href={`mailto:${sellerEmail}`}
          className="text-brand-300 underline underline-offset-2"
        >
          {sellerEmail}
        </a>{" "}
        kèm họ tên + email nhận sách.
      </p>
    </form>
  );
}
