"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { HelpCircle, ChevronDown, ShieldCheck, MessageCircle, Search } from "lucide-react";

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      q: "What is Wafid?",
      a: "Wafid is the official digital portal launched by the Gulf Health Council (GHC) to streamline medical examination appointment bookings for expatriates traveling to GCC nations.",
    },
    {
      q: "What was GAMCA?",
      a: "GAMCA stands for Gulf Approved Medical Centers Association. It was the legacy system used for Gulf medical tokens, which has now been upgraded into the Wafid platform.",
    },
    {
      q: "How do I get a medical token?",
      a: "Visit our 'Book Medical Token' page, complete Step 1 with your candidate and passport information, proceed to Step 2 to view account verification details, attach your payment screenshot, and submit your request.",
    },
    {
      q: "Which countries are supported?",
      a: "We provide token booking assistance for all GCC member states: Saudi Arabia (KSA), United Arab Emirates (UAE), Qatar, Kuwait, Bahrain, Oman, and Yemen.",
    },
    {
      q: "How do I select my examination city?",
      a: "On the booking form under Section A (Appointment Information), choose your preferred city in Pakistan from the city dropdown menu (e.g. Lahore, Karachi, Islamabad, Rawalpindi, Peshawar, Multan, Faisalabad, etc.).",
    },
    {
      q: "Can I choose a specific medical center?",
      a: "No. According to official Wafid regulations, applicants select their examination city, and the Wafid system automatically generates and assigns the medical center.",
    },
    {
      q: "What documents do I need?",
      a: "You need your Original Passport (valid for at least 6 months), Original CNIC, passport-size photographs with a white background, visa copy/advice, and your printed Wafid appointment slip.",
    },
    {
      q: "How do I submit payment proof?",
      a: "During Step 2 of the booking process, scan the provided payment QR code or transfer funds via online banking to our displayed bank account, then upload the receipt screenshot in the screenshot uploader field.",
    },
    {
      q: "How do I upload the payment screenshot?",
      a: "Click or drag your payment confirmation image (PNG, JPG, or WEBP under 5MB) into the upload area on Step 2. You will see a live preview confirming that the file is attached before clicking submit.",
    },
    {
      q: "How will I be contacted?",
      a: "Once your application and payment screenshot are submitted, our concierge team will review your application and send your appointment confirmation details directly to your WhatsApp number and email.",
    },
    {
      q: "How can I contact Gamca Centre?",
      a: `You can reach Gamca Centre anytime via WhatsApp at ${siteConfig.contact.phoneDisplay}, call us directly, or email us at ${siteConfig.contact.email}.`,
    },
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Clear Answers
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#061224] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Everything you need to know about Wafid/GAMCA medical appointment token processing in Pakistan.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8 relative max-w-xl mx-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. Wafid, documents, payment)..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 shadow-sm focus:ring-2 focus:ring-amber-500/50 outline-none"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-12">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#061224] hover:text-amber-700 transition-colors"
                  >
                    <span className="flex items-center gap-3 text-sm sm:text-base">
                      <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "transform rotate-180 text-amber-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed pl-12">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-slate-200 text-slate-500 text-xs">
              No matching questions found for &quot;{searchQuery}&quot;.
            </div>
          )}
        </div>

        {/* Contact Banner */}
        <div className="text-center bg-[#061224] text-white p-8 sm:p-10 rounded-3xl border border-amber-500/30 space-y-4">
          <h3 className="text-xl font-bold text-white">Still Have Questions?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Our Pakistani concierge support agents are ready to assist you directly on WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
            <Link
              href="/book-medical-token"
              className="gold-btn px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Book Token Now
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
