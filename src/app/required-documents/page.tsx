import Link from "next/link";
import { siteConfig } from "@/config/site";
import { FileCheck, ShieldCheck, MessageCircle, CheckCircle2, FileText, AlertCircle } from "lucide-react";

export default function RequiredDocumentsPage() {
  const documents = [
    {
      title: "Original Passport",
      badge: "Mandatory",
      desc: "Original machine-readable passport valid for at least 6 months from the date of medical examination.",
    },
    {
      title: "Passport Photocopies",
      badge: "Mandatory",
      desc: "At least 2 clear photocopies of the main bio page of your original passport.",
    },
    {
      title: "Original CNIC (Computerized National Identity Card)",
      badge: "Mandatory",
      desc: "Original NADRA CNIC or Smart Card alongside 2 clear front/back photocopies.",
    },
    {
      title: "Passport-Size Photographs",
      badge: "Mandatory",
      desc: "4 to 6 recent passport-size photographs taken against a plain white background.",
    },
    {
      title: "Visa Advice / Offer Letter / Visa Copy",
      badge: "Required if available",
      desc: "Work visa slip, embassy visa advice, or employment contract copy from your Gulf employer.",
    },
    {
      title: "Wafid Appointment Token Slip",
      badge: "Mandatory",
      desc: "Printed copy of your official Wafid medical token slip generated through your appointment booking.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Checklist & Guidelines
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#061224] tracking-tight">
            Required Documents for Wafid Medical
          </h1>
          <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Ensure you bring all required original documents and copies when visiting your assigned Wafid medical center in Pakistan.
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-500/40 transition-all space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-amber-500/10 text-amber-700 rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="px-2.5 py-1 bg-slate-100 text-[#061224] rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {doc.badge}
                </span>
              </div>
              <h3 className="text-base font-bold text-[#061224]">{doc.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{doc.desc}</p>
            </div>
          ))}
        </div>

        {/* Pro Tips Box */}
        <div className="p-6 bg-[#061224] text-white rounded-2xl border border-amber-500/30 mb-10 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <CheckCircle2 className="w-5 h-5" />
            <span>Document Verification Tips:</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Spelling of your first name, last name, date of birth, and passport number on your visa recommendation must match your original passport exactly. Any discrepancy will prevent the medical center from completing your registration.
          </p>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-[#061224]">Get Your Wafid Appointment Token</h3>
          <p className="text-xs text-slate-600">Submit candidate information online with instant concierge assistance.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
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
