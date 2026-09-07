import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllMedicalCenters, getAllCitySlugs } from "@/lib/medical-centers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/book-medical-token", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/medical-centers", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/medical-process", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/required-documents", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/faqs", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/contact-us", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/medical-countries", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/about-us", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/privacy-policy", priority: 0.3, changeFrequency: "monthly" as const },
    { path: "/terms-and-conditions", priority: 0.3, changeFrequency: "monthly" as const },
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const cityPages: MetadataRoute.Sitemap = getAllCitySlugs().map((cityObj) => ({
    url: `${baseUrl}/medical-centers/${cityObj.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const medicalCenterPages: MetadataRoute.Sitemap = getAllMedicalCenters().map((center) => ({
    url: `${baseUrl}/medical-centers/${center.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...cityPages, ...medicalCenterPages];
}
