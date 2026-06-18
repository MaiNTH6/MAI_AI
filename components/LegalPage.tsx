import Link from "next/link";

export function LegalPage({
  title,
  emoji,
  lastUpdated,
  children,
}: {
  title: string;
  emoji: string;
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-content py-10 md:py-14">
      <nav className="text-sm text-slate-400 mb-4 max-w-3xl mx-auto">
        <Link href="/" className="hover:text-brand-300">
          Trang chủ
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-200">{title}</span>
      </nav>

      <article className="mx-auto max-w-3xl rounded-3xl bg-white text-slate-900 px-6 py-10 md:px-12 md:py-14 ring-1 ring-white/10 shadow-2xl shadow-black/40">
        <div className="text-4xl">{emoji}</div>
        <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          {title}
        </h1>
        {lastUpdated && (
          <div className="mt-2 text-sm text-slate-500">
            Cập nhật lần cuối: {lastUpdated}
          </div>
        )}
        <div className="mt-6 space-y-5 text-slate-700 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-8 [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_a]:text-brand-700 [&_a]:font-semibold hover:[&_a]:text-brand-800">
          {children}
        </div>
      </article>
    </div>
  );
}
