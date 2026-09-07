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

/**
 * Convert a city name to a clean URL slug (e.g. "Lahore" -> "lahore", "D.G. Khan" -> "d-g-khan")
 */
export function slugifyCity(cityName: string): string {
  return cityName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * Return all city objects with original name and URL slug
 */
export function getAllCitySlugs(): { city: string; slug: string }[] {
  const cities = getAvailableCities().filter((c) => c !== "All Cities");
  return cities.map((city) => ({
    city,
    slug: slugifyCity(city),
  }));
}

/**
 * Find city name by its slug
 */
export function getCityBySlug(slug: string): string | undefined {
  const cityObj = getAllCitySlugs().find((item) => item.slug === slug);
  return cityObj ? cityObj.city : undefined;
}

/**
 * Return tailored 100-200 word unique guide for each Pakistani city
 */
export function getCityGuide(cityName: string): {
  overview: string;
  districts: string;
  bookingNote: string;
} {
  const centers = getAllMedicalCenters().filter(
    (c) => c.city.toLowerCase() === cityName.toLowerCase()
  );
  const count = centers.length;

  const cityGuides: Record<string, { overview: string; districts: string; bookingNote: string }> = {
    Lahore: {
      overview: `Lahore is one of Pakistan's primary Wafid GAMCA medical hubs, hosting ${count} accredited diagnostic clinics. Candidates traveling from Central Punjab, Sheikhupura, Kasur, and Okara frequently select Lahore as their preferred examination city.`,
      districts: `Clinics are conveniently concentrated around key medical corridors including Jail Road, Gulberg, Johar Town, and Ferozepur Road, accessible from major bus terminals and transit arteries.`,
      bookingNote: `Under Wafid regulations, your appointment token will assign you to one of the ${count} approved centers in Lahore at random. Once booked, you must take your original passport, CNIC, and printed token slip directly to the assigned clinic.`,
    },
    Karachi: {
      overview: `Karachi features ${count} official Wafid-approved medical centers providing visa health screening for candidates across Sindh and Balochistan. It is the premier examination hub for expatriates traveling to Saudi Arabia, UAE, Oman, and Qatar.`,
      districts: `Approved diagnostic centers are situated in central commercial areas such as PECHS, Saddar, Clifton, and Shahrah-e-Faisal, making them easily reachable via public transport and intercity routes.`,
      bookingNote: `Applicants cannot pick a particular Karachi diagnostic clinic manually; the central Wafid digital system automatically allocates one of the ${count} authorized facilities upon token issuance.`,
    },
    Islamabad: {
      overview: `Islamabad operates ${count} accredited GAMCA Wafid examination clinics serving applicants from the Islamabad Capital Territory (ICT), northern Punjab districts, and Azad Jammu & Kashmir (AJK).`,
      districts: `Centers are located in prominent administrative and commercial sectors including Blue Area, G-8 Markaz, and I-8, providing modern diagnostic labs and fast test processing.`,
      bookingNote: `Select Islamabad on the medical token booking form to be assigned an appointment at one of the capital's authorized Wafid medical centers.`,
    },
    Rawalpindi: {
      overview: `Rawalpindi hosts ${count} approved Wafid diagnostic clinics, functioning as a vital examination center for candidates from Rawalpindi division, Attock, Chakwal, Jhelum, and AJK expatriates.`,
      districts: `Facilities are primarily located along Murree Road, Saddar Cantonment, and Peshawar Road with direct access from the Rawalpindi railway station and regional bus stands.`,
      bookingNote: `Token issuance assigns candidates to an authorized Rawalpindi clinic. Be sure to verify your appointment date and arrive early with your original documents.`,
    },
    Peshawar: {
      overview: `Peshawar is the foremost Wafid medical screening hub in Khyber Pakhtunkhwa (KPK), with ${count} accredited examination centers catering to thousands of overseas workers annually.`,
      districts: `Clinics are concentrated around University Road, Dabgari Gardens, and Hayatabad, providing accessible healthcare screening for candidates from Peshawar, Mardan, Charsadda, and the merged tribal districts.`,
      bookingNote: `Your Wafid token will designate one of Peshawar's ${count} certified centers. Ensure that your candidate name and passport number match your token slip exactly.`,
    },
    Multan: {
      overview: `Multan serves as the major Gulf medical examination destination for South Punjab, housing ${count} certified Wafid centers. It accommodates candidates from Khanewal, Muzaffargarh, Lodhran, and Vehari.`,
      districts: `Centers are strategically located around Abdali Road, Nishtar Road, and Bosan Road, close to medical institutions and major city highways.`,
      bookingNote: `Wafid system rules designate an authorized Multan medical center automatically upon booking. Candidates must attend their appointed clinic in Multan for laboratory and physical evaluations.`,
    },
    Gujranwala: {
      overview: `Gujranwala features ${count} official Wafid medical examination clinics, catering to expatriates from the industrial Golden Triangle including Hafizabad and surrounding rural zones.`,
      districts: `Accredited clinics are located along the main GT Road, Model Town, and Civil Lines areas, making arrival simple from nearby towns.`,
      bookingNote: `Your GAMCA appointment slip will identify the exact Gujranwala clinic assigned to you. Prepare your original passport, CNIC, and fee confirmation before your visit.`,
    },
    Faisalabad: {
      overview: `Faisalabad provides ${count} authorized Wafid diagnostic centers servicing the industrial workforce and candidates from Jhang, Toba Tek Singh, and Chiniot.`,
      districts: `The approved centers are positioned in central commercial zones including Civil Lines and Jaranwala Road, close to district healthcare hubs.`,
      bookingNote: `Applicants choosing Faisalabad as their examination city receive an automated assignment to an approved clinic. Test results are uploaded digitally to the Wafid portal.`,
    },
    Chakdara: {
      overview: `Chakdara hosts ${count} accredited Wafid medical centers in Lower Dir, providing an essential local testing facility for workers from Malakand, Swat, Dir, and northern KPK regions.`,
      districts: `Centers are located along the main GT Road and University Road corridor, saving northern candidates long travel times to Peshawar or Islamabad.`,
      bookingNote: `When applying for your token, select Chakdara as your examination city to receive an appointment at one of Lower Dir's certified Wafid clinics.`,
    },
    Sialkot: {
      overview: `Sialkot has ${count} Wafid-approved diagnostic clinics designed to serve expatriates and overseas professionals from Sialkot, Daska, Pasrur, and Narowal.`,
      districts: `The clinics are situated near Paris Road and Kashmir Road, easily reachable from the city center and Sambrial dry port corridors.`,
      bookingNote: `Select Sialkot during online token application to receive your Wafid appointment slip for medical and laboratory examinations.`,
    },
    Bahawalpur: {
      overview: `Bahawalpur houses ${count} certified Wafid centers serving overseas candidates from Bahawalpur division, Lodhran, and Rahim Yar Khan districts.`,
      districts: `The centers are located in accessible urban sectors including Model Town A and Circular Road near the central commercial hub.`,
      bookingNote: `Your Wafid appointment token will specify your designated Bahawalpur center. Ensure you bring all mandatory documents on your test day.`,
    },
  };

  if (cityGuides[cityName]) {
    return cityGuides[cityName];
  }

  return {
    overview: `${cityName} offers ${count} official Wafid-approved medical examination centers providing pre-departure health screenings for Pakistani candidates traveling to GCC countries.`,
    districts: `Centers in ${cityName} are equipped with standard diagnostic laboratories meeting Gulf Health Council (GHC) specifications.`,
    bookingNote: `Under Wafid regulations, your appointment center is assigned automatically when booking your token online. Carry your original passport and CNIC on the appointment date.`,
  };
}

/**
 * Return nearby cities for contextual cross-linking
 */
export function getNearbyCities(cityName: string): { city: string; slug: string }[] {
  const nearbyMap: Record<string, string[]> = {
    Lahore: ["Gujranwala", "Faisalabad", "Sialkot"],
    Karachi: ["Multan", "Lahore", "Rawalpindi"],
    Islamabad: ["Rawalpindi", "Peshawar", "Gujranwala"],
    Rawalpindi: ["Islamabad", "Peshawar", "Gujranwala"],
    Peshawar: ["Rawalpindi", "Islamabad", "Chakdara"],
    Multan: ["Bahawalpur", "Faisalabad", "Lahore"],
    Gujranwala: ["Sialkot", "Lahore", "Faisalabad"],
    Faisalabad: ["Lahore", "Gujranwala", "Multan"],
    Chakdara: ["Peshawar", "Islamabad", "Rawalpindi"],
    Sialkot: ["Gujranwala", "Lahore", "Faisalabad"],
    Bahawalpur: ["Multan", "Faisalabad", "Lahore"],
  };

  const targets = nearbyMap[cityName] || ["Lahore", "Karachi", "Islamabad"];
  return targets.map((c) => ({
    city: c,
    slug: slugifyCity(c),
  }));
}
