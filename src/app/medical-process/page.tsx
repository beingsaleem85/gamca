import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShieldCheck, MessageCircle, FileText, CheckCircle2, Building2, UserCheck, AlertTriangle } from "lucide-react";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata({
  title: "Wafid Medical Examination Process Step by Step | Gamca Centre",
  description:
    "Learn the complete Wafid/GAMCA medical examination process for Pakistani candidates — from token booking to lab tests and fitness status, explained step by step.",
  path: "/medical-process",
});

export default function MedicalProcessPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.gamcacentre.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Medical Process",
        item: "https://www.gamcacentre.com/medical-process",
      },
    ],
  };
  const steps = [
    {
      num: "01",
      title: "Token Assistance Application",
      desc: "Candidate submits basic appointment parameters including preferred examination city (e.g. Lahore, Karachi, Islamabad), passport details, and target GCC destination country.",
    },
    {
      num: "02",
      title: "Account Verification & Payment Proof",
      desc: "Complete the account verification instructions and attach your payment confirmation screenshot. Our concierge team validates your application parameters.",
    },
    {
      num: "03",
      title: "Wafid Token Issuance",
      desc: "The official Wafid system processes your appointment request and assigns an authorized medical diagnostic center in your selected examination city.",
    },
    {
      num: "04",
      title: "Medical Examination Visit",
      desc: "Visit the assigned medical center with your original Passport, original CNIC, passport-size photographs (white background), and printed Wafid appointment slip.",
    },
    {
      num: "05",
      title: "Laboratory & Physical Examinations",
      desc: "Undergo standard medical screening tests including blood tests, chest X-ray, vision check, physical exam, and infectious disease screenings as mandated by GCC health regulations.",
    },
    {
      num: "06",
      title: "Medical Fitness Status Update",
      desc: "Once laboratory results are finalized, your medical fitness status (FIT / UNFIT) is uploaded directly to the central Wafid online portal for embassy and visa processing.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-10">
          <span className="px-3.5 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Step-by-Step Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#061224] tracking-tight">
            Wafid Medical Examination Process
          </h1>
          <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Understand how Wafid GAMCA medical appointment token processing works for Pakistani candidates traveling to the Gulf.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span>Reviewed by the Gamca Centre team</span>
            <span>•</span>
            <span>Last updated September 2026</span>
          </div>
        </div>

        {/* Table of Contents / Quick Jump Links */}
        <div className="mb-10 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Process Navigation — Quick Jump to Step</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {steps.map((s) => (
              <a
                key={s.num}
                href={`#step-${s.num}`}
                className="text-xs px-3 py-2 bg-slate-50 hover:bg-amber-500/10 hover:text-amber-800 text-slate-700 rounded-lg font-medium transition-colors border border-slate-100 flex items-center gap-2"
              >
                <span className="font-mono font-bold text-amber-600">{s.num}</span>
                <span className="truncate">{s.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Process Timeline */}
        <div className="space-y-6 mb-12">
          {steps.map((s) => (
            <div
              key={s.num}
              id={`step-${s.num}`}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start gap-6 scroll-mt-28"
            >
              <div className="w-14 h-14 bg-[#061224] text-amber-400 rounded-2xl flex items-center justify-center font-mono font-black text-xl flex-shrink-0 shadow-md border border-amber-500/30">
                {s.num}
              </div>
              <div className="space-y-2 flex-1">
                <h2 className="text-lg font-bold text-[#061224] m-0 p-0">
                  Step {s.num}: {s.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                {s.num === "04" && (
                  <p className="text-xs text-amber-800 pt-1 font-medium">
                    Ensure you review the complete{" "}
                    <Link
                      href="/required-documents"
                      className="underline font-bold hover:text-amber-600"
                    >
                      checklist of required documents for your Wafid medical test
                    </Link>{" "}
                    before visiting the diagnostic center.
                  </p>
                )}
                {s.num === "06" && (
                  <p className="text-xs text-slate-500 pt-1">
                    Candidates can verify their medical status online on the official Wafid platform at{" "}
                    <a
                      href="https://wafid.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 underline font-semibold hover:text-amber-900"
                    >
                      wafid.com (Official Portal)
                    </a>
                    .
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Important Guidelines Banner */}
        <div className="p-6 bg-[#061224] text-white rounded-2xl border border-amber-500/30 mb-10 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5" />
            <span>Important Examination Day Guidelines</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
            <li>Arrive at your assigned Wafid medical center 15 to 30 minutes before your scheduled appointment time.</li>
            <li>Carry your <strong>Original Passport</strong> (must be valid for at least 6 months) and <strong>Original CNIC</strong>.</li>
            <li>Fast for 8 to 10 hours before morning blood test samples if instructed by your clinic.</li>
            <li>Do not bring unauthorized third parties into the laboratory testing area.</li>
          </ul>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-[#061224]">Ready to Start Your Medical Token Request?</h3>
          <p className="text-xs text-slate-600">Apply online in 2 quick steps with Gamca Centre concierge support.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
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
    </>
  );
}
