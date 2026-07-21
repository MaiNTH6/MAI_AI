import fs from "node:fs";
import path from "node:path";
import type { Article } from "./types";
import bundledArticles from "../data/articles.json";

/**
 * Storage: file JSON tại data/articles.json (mô hình "Cách 0").
 * - Production (Vercel): ĐỌC từ bản JSON đã đóng gói lúc build (bundledArticles)
 *   → ổn định, không phụ thuộc filesystem (Vercel read-only/ephemeral).
 *   GHI bị chặn — muốn đổi nội dung thì sửa data/articles.json rồi git push, Vercel build lại.
 * - Dev (local): đọc/ghi thẳng file để sửa qua /admin thấy ngay.
 */

const DATA_FILE = path.join(process.cwd(), "data", "articles.json");
const IS_PROD = process.env.NODE_ENV === "production";

function readAll(): Article[] {
  if (IS_PROD) return bundledArticles as unknown as Article[];
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as Article[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      // file chưa có — khởi tạo rỗng
      fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
      fs.writeFileSync(DATA_FILE, "[]", "utf-8");
      return [];
    }
    throw err;
  }
}

function writeAll(arr: Article[]): void {
  if (IS_PROD) {
    throw new Error(
      "Bản deploy không ghi trực tiếp được. Sửa data/articles.json ở máy rồi git push để Vercel build lại."
    );
  }
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), "utf-8");
}

export function listArticles(): Article[] {
  return readAll();
}

export function getArticleBySlug(slug: string): Article | undefined {
  return readAll().find((a) => a.slug === slug);
}

export function getArticleByToolSlug(toolSlug: string): Article | undefined {
  return readAll().find((a) => a.toolSlug === toolSlug);
}

export function listByCategory(category: string): Article[] {
  return readAll().filter((a) => a.category === category);
}

export function listLatest(limit = 6): Article[] {
  return [...readAll()]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}

export function createArticle(article: Article): void {
  const all = readAll();
  if (all.some((a) => a.slug === article.slug)) {
    throw new Error(`Slug đã tồn tại: ${article.slug}`);
  }
  all.unshift(article);
  writeAll(all);
}

export function updateArticle(slug: string, patch: Partial<Article>): void {
  const all = readAll();
  const idx = all.findIndex((a) => a.slug === slug);
  if (idx === -1) throw new Error(`Không tìm thấy slug: ${slug}`);
  all[idx] = { ...all[idx], ...patch, slug: all[idx].slug }; // không cho đổi slug
  writeAll(all);
}

export function deleteArticle(slug: string): void {
  const all = readAll();
  writeAll(all.filter((a) => a.slug !== slug));
}
