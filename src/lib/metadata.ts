import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export interface ConstructMetadataProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  path = "",
  image = "/logo.png",
  noIndex = false,
}: ConstructMetadataProps): Metadata {
  const baseUrl = siteConfig.url;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}${cleanPath === "/" ? "" : cleanPath}`;
  const imageUrl = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: title,
        },
      ],
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
