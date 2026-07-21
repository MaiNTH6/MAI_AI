import Link from "next/link";
import { logoutAction } from "./actions";

export const metadata = {
  title: "Quản trị",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="container-content flex h-14 items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-md bg-brand-600 text-sm">
              ⚙
            </span>
            Trang quản trị
          </Link>

          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/admin"
              className="rounded-md px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white"
            >
              Danh sách bài
            </Link>
            <Link
              href="/admin/articles/new"
              className="rounded-md px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white"
            >
              + Bài mới
            </Link>
            <Link
              href="/"
              target="_blank"
              className="rounded-md px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white"
            >
              Xem site ↗
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-md px-3 py-1.5 text-slate-300 hover:bg-white/5 hover:text-white"
              >
                Đăng xuất
              </button>
            </form>
          </nav>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
}
