import { listArticles } from "@/lib/db";
import { apiChapters, flatSections } from "@/lib/api-testing";
import { MetadataRoute } from "next";

const BASE = "https://maiqai.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = listArticles();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/ai-qa`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/db-testing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/api-testing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/kho-prompt`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/kho-template-qa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE}/bai-viet/${a.slug}`,
    lastModified: new Date(a.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const apiTestingChapterRoutes: MetadataRoute.Sitemap = apiChapters.map((ch) => ({
    url: `${BASE}/api-testing/${ch.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const apiTestingSectionRoutes: MetadataRoute.Sitemap = flatSections()
    .filter(({ section }) => section.hasContent)
    .map(({ chapter, section }) => ({
      url: `${BASE}/api-testing/${chapter.slug}/${section.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

  return [
    ...staticRoutes,
    ...articleRoutes,
    ...apiTestingChapterRoutes,
    ...apiTestingSectionRoutes,
  ];
}
