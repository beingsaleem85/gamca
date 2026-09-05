import Link from "next/link";
import { notFound } from "next/navigation";
import { getMedicalCenterBySlug, getAllMedicalCenters } from "@/lib/medical-centers";
import { siteConfig } from "@/config/site";
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
} from "lucide-react";

export async function generateStaticParams() {
  const centers = getAllMedicalCenters();
  return centers.map((center) => ({
    slug: center.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function MedicalCenterDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const center = getMedicalCenterBySlug(slug);

  if (!center) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/medical-centers"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#061224] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Medical Centers
          </Link>
        </div>

        {/* Details Hero Header */}
        <div className="bg-[#061224] text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-amber-500/30 mb-8 relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-full text-xs font-bold uppercase tracking-wider">
                📍 {center.city}, Pakistan
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {center.name}
            </h1>

            {(center.addressLine1 || center.addressLine2) && (
              <p className="text-sm text-slate-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{center.addressLine1}{center.addressLine2 ? `, ${center.addressLine2}` : ""}, {center.city}, Pakistan</span>
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
  );
}
