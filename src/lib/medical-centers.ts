import medicalCentersData from "@/data/medical-centers.json";

export interface MedicalCenter {
  id: string;
  name: string;
  slug: string;
  country: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  phone: string;
  email?: string;
  website?: string;
  rating?: number;
  workingHours?: string;
  source?: string;
}

export function getAllMedicalCenters(): MedicalCenter[] {
  return medicalCentersData as MedicalCenter[];
}

export function getMedicalCenterBySlug(slug: string): MedicalCenter | undefined {
  return getAllMedicalCenters().find((center) => center.slug === slug);
}

/**
 * Dynamically extract unique cities from the medical center dataset,
 * sort them alphabetically, and place "All Cities" as the first option.
 */
export function getAvailableCities(): string[] {
  const centers = getAllMedicalCenters();
  const citySet = new Set<string>();
  
  centers.forEach((center) => {
    if (center.city && center.city.trim() !== "") {
      citySet.add(center.city.trim());
    }
  });

  const sortedCities = Array.from(citySet).sort((a, b) => a.localeCompare(b));
  return ["All Cities", ...sortedCities];
}

/**
 * Filter medical centers by city dropdown selection and optional text search query
 */
export function filterMedicalCenters(selectedCity: string, searchQuery: string): MedicalCenter[] {
  let list = getAllMedicalCenters();

  if (selectedCity && selectedCity !== "All Cities") {
    list = list.filter(
      (center) => center.city.toLowerCase() === selectedCity.toLowerCase()
    );
  }

  if (searchQuery && searchQuery.trim() !== "") {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(
      (center) =>
        center.name.toLowerCase().includes(q) ||
        center.city.toLowerCase().includes(q) ||
        center.addressLine1.toLowerCase().includes(q) ||
        (center.addressLine2 && center.addressLine2.toLowerCase().includes(q))
    );
  }

  return list;
}
