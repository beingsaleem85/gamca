"use client";

import { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, ShieldCheck, MessageCircle, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import { faqsData } from "@/data/faqs";

export default function FaqsClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqsData.filter(
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
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>Reviewed by the Gamca Centre team</span>
            <span>•</span>
            <span>Last updated September 2026</span>
          </div>
        </div>

        {/* Table of Contents / Quick Jump Links */}
        <div className="mb-8 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Table of Contents — Quick Jump</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {faqsData.map((faq, i) => (
              <a
                key={i}
                href={`#faq-${i + 1}`}
                onClick={() => setOpenIndex(i)}
                className="text-xs px-3 py-1.5 bg-slate-100 hover:bg-amber-500/10 hover:text-amber-800 text-slate-700 rounded-lg font-medium transition-colors"
              >
                {i + 1}. {faq.q.length > 32 ? `${faq.q.substring(0, 32)}...` : faq.q}
              </a>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="mb-8 relative max-w-xl mx-auto">
          <label htmlFor="faq-search-input" className="sr-only">
            Search FAQs
          </label>
          <input
            id="faq-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs (e.g. Wafid cost, documents, GAMCA difference)..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-800 shadow-sm focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 outline-none"
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
                  id={`faq-${index + 1}`}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all scroll-mt-28"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#061224] hover:text-amber-700 transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <h2 className="flex items-center gap-3 text-sm sm:text-base font-bold text-[#061224] m-0 p-0 text-left">
                      <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
                      {faq.q}
                    </h2>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? "transform rotate-180 text-amber-600" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 border-t border-slate-100 leading-relaxed pl-12 space-y-3">
                      <p>{faq.a}</p>
                      {faq.q.toLowerCase().includes("token") || faq.q.toLowerCase().includes("wafid") ? (
                        <p className="text-xs font-semibold text-amber-800 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/50">
                          Need an appointment? You can{" "}
                          <Link
                            href="/book-medical-token"
                            className="text-amber-900 underline hover:text-amber-700 font-bold"
                          >
                            book your Wafid medical token online
                          </Link>{" "}
                          through our step-by-step concierge assistance form.
                        </p>
                      ) : null}
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
              Book Wafid Token Online
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
