import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/ArticleForm";
import { getArticleBySlug } from "@/lib/db";
import { updateArticleAction } from "../../actions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return { title: `Sửa: ${slug}` };
}

export default async function EditArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <div className="container-content py-8">
      <h1 className="text-3xl font-bold text-white mb-1">Sửa bài viết</h1>
      <p className="text-slate-400 mb-6 text-sm">
        Slug: <code className="text-brand-300">/{article.slug}</code>
      </p>
      <ArticleForm mode="edit" action={updateArticleAction} article={article} />
    </div>
  );
}
