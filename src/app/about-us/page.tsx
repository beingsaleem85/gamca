import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ShieldCheck, MessageCircle, Building2, Award, Users, CheckCircle2 } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-14">
          <span className="px-3.5 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            About Concierge Platform
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#061224] tracking-tight">
            About {siteConfig.name}
          </h1>
          <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Your trusted assistance partner for Wafid/GAMCA medical appointment token processing in Pakistan.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-8 mb-12">
          
          <div className="flex flex-col sm:flex-row items-center gap-8 pb-8 border-b border-slate-100">
            <div className="relative w-32 h-32 bg-[#061224] rounded-2xl p-2 border-2 border-amber-400/50 flex-shrink-0 flex items-center justify-center shadow-lg">
              <Image
                src={siteConfig.logo.src}
                alt={siteConfig.logo.alt}
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-[#061224]">{siteConfig.name}</h2>
              <p className="text-xs text-amber-600 font-bold uppercase tracking-widest">{siteConfig.tagline}</p>
              <p className="text-xs text-slate-600 leading-relaxed">
                We specialize in simplifying the complex medical appointment token process for Pakistani expatriates travelling to Saudi Arabia, UAE, Qatar, Kuwait, Bahrain, Oman, and Yemen.
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h3 className="text-lg font-bold text-[#061224]">Our Mission</h3>
            <p>
              Navigating Gulf medical regulations can be confusing and time-consuming. Gamca Centre was founded to provide a premium, transparent, and fast assistance platform. We ensure that candidates submit accurate passport and appointment data so their Wafid tokens are processed without registration errors.
            </p>

            <h3 className="text-lg font-bold text-[#061224] pt-4">Our Commitment</h3>
            <ul className="space-y-2 text-slate-700 list-disc list-inside">
              <li><strong>Accuracy & Verification:</strong> Live validation of passport numbers, date matching, and candidate credentials.</li>
              <li><strong>Speed:</strong> Dedicated priority assistance to deliver updates directly to candidates via WhatsApp.</li>
              <li><strong>Transparency:</strong> Clear guidance regarding official Wafid medical center assignment rules in Pakistan.</li>
            </ul>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-medical-token"
              className="gold-btn px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4" />
              Get Medical Token
            </Link>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-600 text-white rounded-xl text-xs uppercase tracking-wider font-bold flex items-center gap-2 hover:bg-emerald-500 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
