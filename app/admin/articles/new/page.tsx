import { ArticleForm } from "@/components/ArticleForm";
import { createArticleAction } from "../../actions";

export const metadata = { title: "Tạo bài viết mới" };

export default function NewArticlePage() {
  return (
    <div className="container-content py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Tạo bài viết mới</h1>
      <ArticleForm mode="create" action={createArticleAction} />
    </div>
  );
}
