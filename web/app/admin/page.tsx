import Link from "next/link";
import { listArticles } from "@/lib/db";
import { getCategory } from "@/lib/categories";
import { deleteArticleAction } from "./actions";

interface PageProps {
  searchParams: Promise<{ ok?: string }>;
}

const flashMessages: Record<string, string> = {
  created: "✓ Đã tạo bài mới",
  updated: "✓ Đã cập nhật bài",
  deleted: "✓ Đã xóa bài",
};

export default async function AdminDashboard({ searchParams }: PageProps) {
  const { ok } = await searchParams;
  const all = listArticles();

  return (
    <div className="container-content py-8">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-3xl font-bold text-white">Quản lý bài viết</h1>
          <p className="mt-1 text-slate-400 text-sm">
            Tổng số: <strong className="text-white">{all.length}</strong> bài
          </p>
        </div>
        <Link href="/admin/articles/new" className="btn-cta">
          + Tạo bài mới
        </Link>
      </div>

      {ok && flashMessages[ok] && (
        <div className="mb-5 rounded-lg bg-emerald-500/15 border border-emerald-400/40 px-4 py-2.5 text-emerald-200 text-sm">
          {flashMessages[ok]}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-white/10 shadow-xl shadow-black/30">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-left">
            <tr>
              <th className="px-4 py-3 font-semibold">Tiêu đề</th>
              <th className="px-4 py-3 font-semibold">Chuyên mục</th>
              <th className="px-4 py-3 font-semibold">Tool</th>
              <th className="px-4 py-3 font-semibold">Đăng</th>
              <th className="px-4 py-3 font-semibold w-px">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {all.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-500">
                  Chưa có bài viết nào. Bấm &ldquo;Tạo bài mới&rdquo; để bắt đầu.
                </td>
              </tr>
            ) : (
              all.map((a) => {
                const cat = getCategory(a.category);
                return (
                  <tr key={a.slug} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900 line-clamp-2">
                        {a.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        /{a.slug}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-700 whitespace-nowrap">
                      {cat.emoji} {cat.shortTitle}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {a.toolSlug ?? <span className="text-slate-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      {a.publishedAt}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/articles/${a.slug}`}
                          className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                        >
                          Sửa
                        </Link>
                        <Link
                          href={`/bai-viet/${a.slug}`}
                          target="_blank"
                          className="rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                        >
                          Xem ↗
                        </Link>
                        <form action={deleteArticleAction}>
                          <input type="hidden" name="slug" value={a.slug} />
                          <button
                            type="submit"
                            className="rounded-md bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                            // eslint-disable-next-line react/no-unknown-property
                          >
                            Xóa
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
