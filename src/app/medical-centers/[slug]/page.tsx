import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getMedicalCenterBySlug,
  getAllMedicalCenters,
  getCityBySlug,
  getAllCitySlugs,
  slugifyCity,
} from "@/lib/medical-centers";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/metadata";
import MedicalCentersClient from "../MedicalCentersClient";
import LazyMapEmbed from "@/components/common/LazyMapEmbed";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  ShieldCheck,
  MessageCircle,
  ExternalLink,
  Info,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export const revalidate = 86400; // Cache and revalidate daily

export async function generateStaticParams() {
  const centers = getAllMedicalCenters();
  const centerParams = centers.map((center) => ({ slug: center.slug }));
  const cityParams = getAllCitySlugs().map((c) => ({ slug: c.slug }));
  return [...centerParams, ...cityParams];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (city) {
    return constructMetadata({
      title: `Wafid Medical Centers in ${city} | GAMCA Approved Clinics – Gamca Centre`,
      description: `Find Wafid/GAMCA approved medical examination centers in ${city}, Pakistan. Get your medical appointment token for Saudi Arabia, UAE, Qatar & other GCC countries with Gamca Centre.`,
      path: `/medical-centers/${slug}`,
    });
  }

  const center = getMedicalCenterBySlug(slug);

  if (!center) {
    return constructMetadata({
      title: "Medical Center Not Found | Gamca Centre",
      description: "The requested medical center could not be found.",
      path: `/medical-centers/${slug}`,
      noIndex: true,
    });
  }

  return constructMetadata({
    title: `${center.name} – Wafid Medical Center in ${center.city} | Gamca Centre`,
    description: `${center.name} is an official Wafid/GAMCA medical examination center in ${center.city}, Pakistan. Address, contact details & appointment booking assistance for GCC visa medical tests.`,
    path: `/medical-centers/${center.slug}`,
  });
}

export default async function MedicalCenterSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const city = getCityBySlug(slug);

  if (city) {
    const citySlug = slugifyCity(city);
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Medical Centers",
          item: `${siteConfig.url}/medical-centers`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: city,
          item: `${siteConfig.url}/medical-centers/${citySlug}`,
        },
      ],
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <MedicalCentersClient
          initialCity={city}
          pageTitle={`Wafid Medical Centers in ${city}`}
          pageSubtitle={`Find Wafid/GAMCA approved medical examination centers in ${city}, Pakistan. Get your medical appointment token for Saudi Arabia, UAE, Qatar & other GCC countries with Gamca Centre.`}
        />
      </>
    );
  }

  const center = getMedicalCenterBySlug(slug);

  if (!center) {
    notFound();
  }

  const citySlug = slugifyCity(center.city);
  const fullAddress = [center.addressLine1, center.addressLine2, center.city, "Pakistan"]
    .filter(Boolean)
    .join(", ");

  const medicalClinicSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    name: center.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: [center.addressLine1, center.addressLine2].filter(Boolean).join(", "),
      addressLocality: center.city,
      addressCountry: "PK",
    },
    telephone: center.phone,
    ...(center.website ? { url: center.website } : {}),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Medical Centers",
        item: `${siteConfig.url}/medical-centers`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: center.city,
        item: `${siteConfig.url}/medical-centers/${citySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: center.name,
        item: `${siteConfig.url}/medical-centers/${center.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalClinicSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Visible Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-amber-700 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link href="/medical-centers" className="hover:text-amber-700 transition-colors">
              Medical Centers
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <Link href={`/medical-centers/${citySlug}`} className="hover:text-amber-700 transition-colors">
              {center.city}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-800 font-semibold truncate max-w-[180px] sm:max-w-xs">{center.name}</span>
          </nav>

          {/* Details Hero Header */}
          <div className="bg-[#061224] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-500/30 mb-8 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/medical-centers/${citySlug}`}
                  className="px-3.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-amber-500/30 transition-colors"
                >
                  📍 {center.city}, Pakistan
                </Link>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {center.name}
              </h1>

              {fullAddress && (
                <p className="text-sm text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{fullAddress}</span>
                </p>
              )}
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200 space-y-8">
            
            {/* Contact Details Grid */}
            <div>
              <h2 className="text-lg font-bold text-[#061224] mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-600" />
                Medical Center Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                {center.phone && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Telephone</span>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-amber-600" />
                      <a href={`tel:${center.phone}`} className="font-bold text-[#061224] hover:text-amber-600">
                        {center.phone}
                      </a>
                    </div>
                  </div>
                )}

                {center.email && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Email Address</span>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-amber-600" />
                      <a href={`mailto:${center.email}`} className="font-semibold text-slate-800 hover:text-amber-600 truncate">
                        {center.email}
                      </a>
                    </div>
                  </div>
                )}

                {center.website && (
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 sm:col-span-2">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Official Reference Portal / Website</span>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-amber-600" />
                      <a href={center.website} target="_blank" rel="noopener noreferrer" className="font-semibold text-amber-700 underline flex items-center gap-1 truncate">
                        {center.website} <ExternalLink className="w-3 h-3 flex-shrink-0" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Map & Directions Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#061224] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  Clinic Location &amp; Directions
                </h2>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${center.name}, ${center.addressLine1}, ${center.city}, Pakistan`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 hover:underline"
                >
                  Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <LazyMapEmbed
                query={`${center.name}, ${center.addressLine1}, ${center.city}, Pakistan`}
                centerName={center.name}
                cityName={center.city}
                address={fullAddress}
              />
              <p className="text-xs text-slate-500 italic">
                {center.name} is located at {fullAddress}. For route planning and navigation, use the interactive map above or open in Google Maps.
              </p>
            </div>

            {/* Essential Candidate Guidance & Contextual Internal Links */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <h2 className="text-sm font-bold text-[#061224] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Candidate Preparation for {center.name}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Before visiting {center.name} in {center.city}, please make sure your Wafid appointment token is officially confirmed and printed. Candidates must present valid identity documents and adhere to GCC Health Council pre-departure screening protocols.
              </p>
              
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <Link
                  href="/required-documents"
                  className="p-3 bg-white rounded-xl border border-slate-200/90 hover:border-amber-500/50 text-slate-800 hover:text-amber-800 font-semibold transition-all shadow-sm flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Required Documents Checklist</span>
                </Link>
                <Link
                  href="/medical-process"
                  className="p-3 bg-white rounded-xl border border-slate-200/90 hover:border-amber-500/50 text-slate-800 hover:text-amber-800 font-semibold transition-all shadow-sm flex items-center gap-2"
                >
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Medical Examination Process</span>
                </Link>
                <Link
                  href={`/medical-centers/${citySlug}`}
                  className="p-3 bg-white rounded-xl border border-slate-200/90 hover:border-amber-500/50 text-slate-800 hover:text-amber-800 font-semibold transition-all shadow-sm flex items-center gap-2"
                >
                  <Building2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>All {center.city} Medical Centers</span>
                </Link>
              </div>
            </div>

            {/* Wafid Medical Token Rule Notice */}
            <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-xs text-amber-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <Info className="w-4 h-4 text-amber-700" />
                Appointment Assignment Policy:
              </div>
              <p className="leading-relaxed">
                Medical center information is referenced directly from Wafid official records. Applicants select <strong>{center.city}</strong> as their examination city on the booking form. The Wafid portal assigns candidate medical centers automatically.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <a
                href={`${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
                  `Hi Gamca Centre, I need assistance for Wafid medical token booking in ${center.city} (${center.name}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Chat on WhatsApp
              </a>

              <Link
                href={`/book-medical-token?city=${encodeURIComponent(center.city)}`}
                className="w-full sm:w-auto gold-btn px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-lg"
              >
                <ShieldCheck className="w-4 h-4" />
                Get Medical Token Now
              </Link>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
