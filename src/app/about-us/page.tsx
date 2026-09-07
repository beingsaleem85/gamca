import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ShieldCheck, MessageCircle } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "About Us | Gamca Centre",
  description:
    "Learn about Gamca Centre, Pakistan's leading concierge service for Wafid/GAMCA medical appointment token booking.",
  path: "/about-us",
});

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

          <div className="space-y-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div>
              <h3 className="text-lg font-bold text-[#061224] mb-2">Who We Are & What We Do</h3>
              <p>
                Gamca Centre is an independent Pakistani facilitation service dedicated to assisting expatriates and overseas job candidates with their Wafid (formerly GAMCA) medical appointment token booking. Our dedicated concierge team helps candidates navigate the online token generation system, verify passport parameters, and coordinate appointments in compliance with Gulf Health Council standards.
              </p>
            </div>

            {/* Independent Disclaimer Callout */}
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
              <h4 className="font-bold text-amber-950 text-xs sm:text-sm mb-1">
                Important Independent Service Positioning
              </h4>
              <p className="text-xs text-amber-900 leading-relaxed">
                Gamca Centre is a private, third-party concierge assistance service. <strong>We are NOT the government Wafid portal and are not affiliated with the Gulf Health Council (GHC).</strong> Official medical tokens are issued through the central Wafid digital infrastructure (<a href="https://wafid.com" target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-amber-700">wafid.com</a>), and examination centers in Pakistan are automatically assigned by the official system according to your selected city.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#061224] mb-2">Our Operating Standards</h3>
              <ul className="space-y-2 text-slate-700 list-disc list-inside">
                <li><strong>Pre-Submission Verification:</strong> Rigorous validation of candidate names, passport numbers, issue/expiry dates, and destination country rules to prevent clinic registration rejections.</li>
                <li><strong>Concierge Communication:</strong> Instant status updates, receipts, and instructions delivered directly via WhatsApp.</li>
                <li><strong>Fair & Transparent Pricing:</strong> Fixed facilitation fee of Rs 4,500 with zero hidden consultation charges.</li>
              </ul>
            </div>

            {/* Verified Business Contact Details */}
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-[#061224]">Official Contact & Operational Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div>
                  <span className="font-bold text-slate-900 block">Customer Support / WhatsApp:</span>
                  <a href={siteConfig.contact.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-amber-700 font-semibold hover:underline">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Email Support:</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-amber-700 font-semibold hover:underline">
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Support Operating Hours:</span>
                  <span>{siteConfig.contact.workingHours}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Registered Office / Operational Base:</span>
                  <span>{siteConfig.contact.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book-medical-token"
              className="gold-btn px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4" />
              Book Wafid Token Online
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
