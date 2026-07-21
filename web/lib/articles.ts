/**
 * Giữ API cũ cho các trang đang dùng — delegate sang lib/db.ts.
 * Có thể xóa file này và import trực tiếp từ db.ts trong tương lai.
 */
import type { Article } from "./types";
import {
  listArticles,
  getArticleBySlug,
  listByCategory,
  listLatest,
} from "./db";

export function getArticle(slug: string): Article | undefined {
  return getArticleBySlug(slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return listByCategory(category);
}

export function getLatestArticles(limit = 6): Article[] {
  return listLatest(limit);
}

// re-export để code cũ dùng `import { articles } from "..."` vẫn chạy
export const articles = listArticles();
