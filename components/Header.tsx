import Link from "next/link";

const nav = [
  { href: "/ai-qa", label: "AI cho QA", short: "🧪 QA / Test" },
  { href: "/kho-template-qa", label: "Kho Template", short: "🧩 Template" },
  { href: "/kho-prompt", label: "Kho Prompt", short: "📚 Prompt" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30">
            M
          </span>
          <span>
            MAI<span className="text-brand-400">.tools</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
          <Link href="/" className="rounded-md px-3 py-2 hover:bg-white/5 hover:text-white">
            Trang chủ
          </Link>
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-2 hover:bg-white/5 hover:text-white"
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
      <nav className="md:hidden border-t border-white/10 overflow-x-auto">
        <div className="container-content flex gap-1 py-2 text-sm font-medium text-slate-300 whitespace-nowrap">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-md px-3 py-1.5 hover:bg-white/5 hover:text-white"
            >
              {n.short}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
