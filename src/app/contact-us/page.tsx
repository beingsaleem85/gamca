import Link from "next/link";
import { siteConfig } from "@/config/site";
import WhatsAppIcon from "@/components/common/WhatsAppIcon";
import { Phone, Mail, MapPin, Clock, MessageCircle, ShieldCheck, Send } from "lucide-react";

export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-14">
          <span className="px-3.5 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Concierge Support
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#061224] tracking-tight">
            Contact Gamca Centre
          </h1>
          <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Have questions about your Wafid medical token application? Get in touch with our team directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#061224] text-white p-8 rounded-3xl border border-amber-500/30 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-white border-l-2 border-amber-400 pl-3">
                Direct Touchpoints
              </h2>

              <ul className="space-y-6 text-sm">
                <li className="flex items-start gap-4">
                  <div className="p-3 bg-[#25D366]/20 text-[#25D366] rounded-xl">
                    <WhatsAppIcon className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">WhatsApp Assistance</span>
                    <a
                      href={siteConfig.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-[#25D366] hover:underline"
                    >
                      {siteConfig.contact.phoneDisplay}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Email Support</span>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-sm font-bold text-white hover:text-amber-400"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Concierge Hours</span>
                    <span className="text-xs text-slate-300 font-medium">{siteConfig.contact.workingHours}</span>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Location</span>
                    <span className="text-xs text-slate-300 font-medium leading-relaxed">
                      {siteConfig.contact.address}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-[#061224]">Send an Inquiry</h2>
              <p className="text-xs text-slate-500">Fill in your details below and our team will get back to you.</p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="text"
                    placeholder="Your phone number"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="example@domain.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Message / Question
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we assist you with your GAMCA / Wafid medical token?"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none"
                ></textarea>
              </div>

              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 transition-all"
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                Submit via WhatsApp Direct
              </a>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
