import Link from "next/link";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/metadata";
import { AlertCircle, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Page Not Found | Gamca Centre",
  description:
    "The page you're looking for doesn't exist. Return to Gamca Centre's homepage to book your Wafid/GAMCA medical token in Pakistan.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-amber-500/10 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-500/30">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#061224] tracking-tight mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-600 text-sm leading-relaxed mb-8">
          The page you are looking for does not exist or may have been moved. Return to the homepage to book your Wafid/GAMCA medical token.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[#061224] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            href="/book-medical-token"
            className="w-full sm:w-auto gold-btn px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            Book Token
          </Link>
        </div>
      </div>
    </div>
  );
}
