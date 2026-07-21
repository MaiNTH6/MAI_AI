import { loginAction } from "../actions";

interface PageProps {
  searchParams: Promise<{ next?: string; error?: string }>;
}

export const metadata = { title: "Đăng nhập quản trị" };

export default async function LoginPage({ searchParams }: PageProps) {
  const { next = "/admin", error } = await searchParams;

  return (
    <div className="min-h-[70vh] grid place-items-center px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 ring-1 ring-white/10 shadow-2xl shadow-black/40">
        <div className="text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white text-xl font-bold">
            🔐
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">
            Đăng nhập quản trị
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Nhập mật khẩu admin để vào trang quản lý.
          </p>
        </div>

        <form action={loginAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={next} />
          <div>
            <label className="block text-sm font-semibold mb-1 text-slate-700">
              Mật khẩu
            </label>
            <input
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-slate-900"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-rose-50 border border-rose-200 px-3 py-2 text-sm text-rose-700">
              Sai mật khẩu. Thử lại.
            </div>
          )}

          <button type="submit" className="btn-cta w-full">
            Đăng nhập
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-500 text-center">
          Mặc định dev: <code className="bg-slate-100 px-1 rounded">admin123</code>.
          <br />
          Đổi bằng cách set env <code>ADMIN_PASSWORD</code>.
        </p>
      </div>
    </div>
  );
}
