import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/metadata";
import { slugifyCity } from "@/lib/medical-centers";
import MedicalCentersClient from "./MedicalCentersClient";

export const revalidate = 86400; // Cache and revalidate daily

export const metadata = constructMetadata({
  title: "Wafid Medical Centers in Pakistan – Find Your City | Gamca Centre",
  description:
    "Browse official Wafid/GAMCA approved medical centers across 14+ Pakistani cities including Lahore, Karachi, Islamabad, Multan & more. Find your nearest center and book your token.",
  path: "/medical-centers",
});

interface PageProps {
  searchParams: Promise<{ city?: string }>;
}

export default async function MedicalCentersDirectoryPage({ searchParams }: PageProps) {
  const { city } = await searchParams;

  if (city && city !== "All Cities") {
    const cleanCitySlug = slugifyCity(city);
    redirect(`/medical-centers/${cleanCitySlug}`);
  }

  return <MedicalCentersClient initialCity="All Cities" />;
}
