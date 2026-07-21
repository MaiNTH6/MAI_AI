"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  getAdminPassword,
  makeAdminCookieValue,
} from "@/lib/auth";
import {
  createArticle,
  deleteArticle as dbDelete,
  updateArticle,
  getArticleBySlug,
} from "@/lib/db";
import type {
  Article,
  CategorySlug,
  ComparisonRow,
  FAQItem,
  PricingPlan,
  PromptExample,
  SetupStep,
  VisualFeature,
} from "@/lib/types";

/* --------------------------------- AUTH --------------------------------- */

export async function loginAction(formData: FormData) {
  const pw = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/admin");

  if (pw !== getAdminPassword()) {
    redirect(`/admin/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const value = await makeAdminCookieValue();
  const store = await cookies();
  store.set(ADMIN_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 ngày
  });

  redirect(next);
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

/* --------------------------------- CRUD --------------------------------- */

function parseLines(value: FormDataEntryValue | null): string[] | undefined {
  if (typeof value !== "string") return undefined;
  const lines = value
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
  return lines.length ? lines : undefined;
}

function parseJSONOrUndefined<T>(value: FormDataEntryValue | null): T | undefined {
  if (typeof value !== "string" || !value.trim()) return undefined;
  try {
    return JSON.parse(value) as T;
  } catch {
    throw new Error("JSON không hợp lệ ở một trường bên dưới — kiểm tra lại");
  }
}

function buildArticleFromForm(formData: FormData): Article {
  const slug = String(formData.get("slug") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const category = String(formData.get("category") || "") as CategorySlug;
  const toolSlug = String(formData.get("toolSlug") || "").trim() || undefined;
  const readingTime = Number(formData.get("readingTime") || 5);
  const publishedAt = String(formData.get("publishedAt") || "").trim();
  const cover = String(formData.get("cover") || "📄").trim();
  const ratingRaw = String(formData.get("rating") || "").trim();
  const rating = ratingRaw ? Number(ratingRaw) : undefined;
  const affiliateUrl =
    String(formData.get("affiliateUrl") || "").trim() || undefined;
  const finalThought =
    String(formData.get("finalThought") || "").trim() || undefined;

  if (!slug) throw new Error("Slug bắt buộc");
  if (!title) throw new Error("Tiêu đề bắt buộc");
  if (!excerpt) throw new Error("Excerpt bắt buộc");
  if (!category) throw new Error("Category bắt buộc");
  if (!publishedAt) throw new Error("Ngày đăng bắt buộc");
  if (!/^[a-z0-9-]+$/.test(slug))
    throw new Error("Slug chỉ chứa a-z, 0-9 và dấu '-'");

  const videoUrl =
    String(formData.get("videoUrl") || "").trim() || undefined;
  const videoTitle =
    String(formData.get("videoTitle") || "").trim() || undefined;

  const introProblem =
    String(formData.get("intro_problem") || "").trim() || undefined;
  const introWhatIs =
    String(formData.get("intro_whatIs") || "").trim() || undefined;
  const introWhyThis =
    String(formData.get("intro_whyThis") || "").trim() || undefined;
  const intro =
    introProblem || introWhatIs || introWhyThis
      ? {
          problem: introProblem,
          whatIs: introWhatIs,
          whyThis: introWhyThis,
        }
      : undefined;

  return {
    slug,
    title,
    excerpt,
    category,
    toolSlug,
    readingTime,
    publishedAt,
    cover,
    rating,
    affiliateUrl,
    pros: parseLines(formData.get("pros")),
    cons: parseLines(formData.get("cons")),
    bugs: parseLines(formData.get("bugs")),
    useCase: parseJSONOrUndefined<Article["useCase"]>(formData.get("useCase")),
    pricing: parseJSONOrUndefined<PricingPlan[]>(formData.get("pricing")),
    finalThought,
    // === Phần mới ===
    intro,
    tldr: parseLines(formData.get("tldr")),
    comparisonTable: parseJSONOrUndefined<ComparisonRow[]>(
      formData.get("comparisonTable")
    ),
    videoUrl,
    videoTitle,
    steps: parseJSONOrUndefined<SetupStep[]>(formData.get("steps")),
    prompts: parseJSONOrUndefined<PromptExample[]>(formData.get("prompts")),
    visualFeatures: parseJSONOrUndefined<VisualFeature[]>(
      formData.get("visualFeatures")
    ),
    faq: parseJSONOrUndefined<FAQItem[]>(formData.get("faq")),
  };
}

export async function createArticleAction(formData: FormData) {
  const article = buildArticleFromForm(formData);
  createArticle(article);
  revalidatePath("/", "layout");
  redirect(`/admin?ok=created`);
}

export async function updateArticleAction(formData: FormData) {
  const article = buildArticleFromForm(formData);
  const existing = getArticleBySlug(article.slug);
  if (!existing) throw new Error(`Không có bài: ${article.slug}`);
  updateArticle(article.slug, article);
  revalidatePath("/", "layout");
  redirect(`/admin?ok=updated`);
}

export async function deleteArticleAction(formData: FormData) {
  const slug = String(formData.get("slug") || "");
  if (!slug) throw new Error("Slug bắt buộc");
  dbDelete(slug);
  revalidatePath("/", "layout");
  redirect("/admin?ok=deleted");
}
