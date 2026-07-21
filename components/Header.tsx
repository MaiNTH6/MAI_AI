import Link from "next/link";

const nav = [
  { href: "/ai-qa", label: "AI cho QA", short: "🧪 QA / Test" },
  { href: "/db-testing", label: "DB Testing", short: "🗄️ DB Testing" },
  { href: "/kho-template-qa", label: "Kho Template", short: "🧩 Template" },
  { href: "/kho-prompt", label: "Kho Prompt", short: "📚 Prompt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--line2)] bg-[#0e131c]/85 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-[color:var(--ink)]">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#fbefcb] via-[#e6ce93] to-[#c6a25c] text-[#1b1608] font-extrabold shadow-[0_5px_16px_-5px_rgba(230,206,147,0.6)]">
            M
          </span>
          <span>
            maiqai<span className="metal-text">.com</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-[color:var(--muted)]">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-[color:var(--metal)] hover:bg-white/5"
          >
            Trang chủ
          </Link>
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 hover:bg-white/5 hover:text-[color:var(--ink)]"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link href="/ai-qa" className="btn-cta hidden sm:inline-flex !py-2 !px-4 text-sm">
          Bắt đầu với QA
        </Link>
      </div>

      {/* mobile nav */}
      <nav className="md:hidden border-t border-[color:var(--line)] overflow-x-auto">
        <div className="container-content flex gap-1 py-2 text-sm font-medium text-[color:var(--muted)] whitespace-nowrap">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-1.5 hover:bg-white/5 hover:text-[color:var(--ink)]"
            >
              {n.short}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
