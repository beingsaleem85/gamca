import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Globe, ShieldCheck, MessageCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MedicalCountriesPage() {
  const countryDetails = [
    {
      name: "Saudi Arabia (KSA)",
      flag: "🇸🇦",
      code: "KSA",
      desc: "Mandatory Wafid GAMCA medical fitness examination token required for all employment, residence, and work visa applicants travelling to the Kingdom of Saudi Arabia.",
    },
    {
      name: "United Arab Emirates (UAE)",
      flag: "🇦🇪",
      code: "UAE",
      desc: "Medical fitness token screening assistance for Dubai, Abu Dhabi, Sharjah, and northern emirates work visas.",
    },
    {
      name: "Qatar",
      flag: "🇶🇦",
      code: "QAT",
      desc: "Official Wafid medical token booking for Qatar work permit and residence visa candidates in Pakistan.",
    },
    {
      name: "Kuwait",
      flag: "🇰🇼",
      code: "KWT",
      desc: "Comprehensive Wafid medical examination assistance for Kuwait work visas and family residency visas.",
    },
    {
      name: "Bahrain",
      flag: "🇧🇭",
      code: "BHR",
      desc: "Wafid medical fitness token assistance for Bahrain work permits and expatriate employment.",
    },
    {
      name: "Oman",
      flag: "🇴🇲",
      code: "OMN",
      desc: "Official Wafid medical token booking for Sultanate of Oman employment visa candidates.",
    },
    {
      name: "Yemen",
      flag: "🇾🇪",
      code: "YEM",
      desc: "Medical examination token processing assistance for Yemen travel candidates.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center mb-14">
          <span className="px-3.5 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block">
            Gulf Health Council Members
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#061224] tracking-tight">
            GCC Destination Countries
          </h1>
          <p className="mt-3 text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Gamca Centre provides Wafid medical appointment token assistance for all 7 GCC member states.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {countryDetails.map((c) => (
            <div
              key={c.code}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{c.flag}</span>
                  <span className="text-xs font-bold text-amber-800 bg-amber-500/10 px-3 py-1 rounded-full">
                    {c.code}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#061224] mb-2">{c.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{c.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/book-medical-token?country=${encodeURIComponent(c.name)}`}
                  className="gold-btn px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Apply for {c.code}
                </Link>
                <a
                  href={`${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
                    `Hi Gamca Centre, I need medical token assistance for ${c.name}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
