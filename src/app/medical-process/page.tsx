import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ShieldCheck, MessageCircle, FileText, CheckCircle2, Building2, UserCheck, AlertTriangle } from "lucide-react";

export default function MedicalProcessPage() {
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
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-12">
          <span className="px-3.5 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Step-by-Step Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#061224] tracking-tight">
            Wafid Medical Examination Process
          </h1>
          <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Understand how Wafid GAMCA medical appointment token processing works for Pakistani candidates traveling to the Gulf.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="space-y-6 mb-12">
          {steps.map((s) => (
            <div
              key={s.num}
              className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start gap-6"
            >
              <div className="w-14 h-14 bg-[#061224] text-amber-400 rounded-2xl flex items-center justify-center font-mono font-black text-xl flex-shrink-0 shadow-md border border-amber-500/30">
                {s.num}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-[#061224]">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{s.desc}</p>
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
