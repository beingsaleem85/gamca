"use client";

import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { siteConfig } from "@/config/site";

export default function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Hover Tooltip */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 bg-[#061224] text-white text-xs font-semibold rounded-lg shadow-xl border border-[#25D366]/40 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with us on WhatsApp
      </span>

      {/* Button */}
      <a
        href={siteConfig.contact.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/40 hover:scale-105 transition-all duration-300 animate-whatsapp border-2 border-white/40"
        aria-label="Chat with us on WhatsApp"
      >
        <WhatsAppIcon className="w-8 h-8 fill-current" />
      </a>
    </div>
  );
}
