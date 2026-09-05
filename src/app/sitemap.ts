import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllMedicalCenters } from "@/lib/medical-centers";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/book-medical-token",
    "/medical-centers",
    "/medical-process",
    "/required-documents",
    "/medical-countries",
    "/faqs",
    "/about-us",
    "/contact-us",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const medicalCenterPages = getAllMedicalCenters().map((center) => ({
    url: `${baseUrl}/medical-centers/${center.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...medicalCenterPages];
}
