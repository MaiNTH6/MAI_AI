import { listArticles } from "@/lib/db";
import { MetadataRoute } from "next";

const BASE = "https://maiqai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = listArticles();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/ai-qa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/db-testing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/kho-prompt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/kho-template-qa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/bai-viet/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...articleRoutes];
}
