import Link from "next/link";

const footerNav = [
  { href: "/ai-qa", label: "AI cho QA / Kiểm thử" },
  { href: "/db-testing", label: "DB Testing" },
  { href: "/kho-template-qa", label: "Kho Template QA" },
  { href: "/kho-prompt", label: "Kho Prompt" },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="container-content py-12 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30">
              M
            </span>
            <span>
              MAI<span className="text-brand-400">.tools</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Ứng dụng AI vào công việc kiểm thử (QA) cho người Việt: thực chiến,
            từng bước, có template &amp; prompt sẵn.
          </p>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3 text-white">Khám phá</div>
          <ul className="space-y-2 text-sm text-slate-400">
            {footerNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-brand-300">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3 text-white">Về trang</div>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/gioi-thieu" className="hover:text-brand-300">
                Giới thiệu
              </Link>
            </li>
            <li>
              <Link href="/dieu-khoan" className="hover:text-brand-300">
                Điều khoản &amp; Miễn trừ trách nhiệm
              </Link>
            </li>
            <li>
              <Link href="/quyen-rieng-tu" className="hover:text-brand-300">
                Chính sách quyền riêng tư
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-semibold mb-3 text-white">Cam kết</div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Prompt và quy trình đều được chạy thử trước khi đăng; ví dụ kết quả
            là minh họa dựng từ đầu vào mẫu. Chỉ rõ chỗ AI hay &quot;bịa&quot;
            để bạn không bị bất ngờ. Không quảng cáo trá hình, không affiliate.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-content py-4 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 justify-between">
          <div>© {new Date().getFullYear()} maiqai.com — Made with ❤ in Vietnam.</div>
          <div>Không thu thập email hay dữ liệu cá nhân của bạn.</div>
        </div>
      </div>
    </footer>
  );
}
