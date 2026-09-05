import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] text-slate-700 border-t border-amber-500/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-xl p-1 border border-amber-500/40 shadow-sm">
                <Image
                  src={siteConfig.logo.src}
                  alt={siteConfig.logo.alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-[#061224] tracking-tight">
                  {siteConfig.name}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Premium GAMCA & Wafid medical appointment token assistance service for Pakistani expatriates travelling to GCC nations. Fast, reliable, and corporate concierge support.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-[#061224] font-bold text-base mb-4 border-l-3 border-amber-500 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/book-medical-token" className="hover:text-amber-700 transition-colors flex items-center gap-1.5 text-amber-800 font-bold">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Get Medical Token
                </Link>
              </li>
              <li>
                <Link href="/medical-centers" className="hover:text-amber-700 transition-colors">
                  Wafid Medical Centers
                </Link>
              </li>
              <li>
                <Link href="/medical-process" className="hover:text-amber-700 transition-colors">
                  Medical Process Guide
                </Link>
              </li>
              <li>
                <Link href="/required-documents" className="hover:text-amber-700 transition-colors">
                  Required Documents
                </Link>
              </li>
              <li>
                <Link href="/medical-countries" className="hover:text-amber-700 transition-colors">
                  GCC Destination Countries
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-amber-700 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Destination GCC Countries */}
          <div>
            <h3 className="text-[#061224] font-bold text-base mb-4 border-l-3 border-amber-500 pl-3">
              GCC Destinations
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
              {siteConfig.destinationCountries.map((c) => (
                <Link
                  key={c.code}
                  href="/medical-countries"
                  className="flex items-center gap-2 p-2 rounded-xl bg-white hover:bg-amber-500/10 border border-slate-200 hover:border-amber-500/40 text-slate-800 hover:text-amber-800 transition-all shadow-sm"
                >
                  <span className="text-base">{c.flag}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Support */}
          <div>
            <h3 className="text-[#061224] font-bold text-base mb-4 border-l-3 border-amber-500 pl-3">
              Contact Concierge
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</span>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-[#061224] font-bold hover:text-amber-600">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Email Support</span>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-[#061224] font-semibold hover:text-amber-600">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Operating Hours</span>
                  <span className="text-slate-600 font-medium text-xs">{siteConfig.contact.workingHours}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                <span className="text-xs text-slate-600 font-medium leading-normal">
                  {siteConfig.contact.address}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Disclaimer Note */}
        <div className="py-6 border-b border-slate-200 text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-2xl my-6 border shadow-sm">
          <p className="font-bold text-[#061224] mb-1">Important Notice & Legal Positioning:</p>
          Gamca Centre provides independent appointment booking assistance and consultation services for medical token applicants in Pakistan. Medical center details are referenced from the official Wafid medical center directory. As per official Wafid guidelines, medical examination centers are automatically generated by the Wafid system based on city selection. Gamca Centre is an independent assistance platform.
        </div>

        {/* Bottom copyright & legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-amber-700 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-amber-700 transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact-us" className="hover:text-amber-700 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
