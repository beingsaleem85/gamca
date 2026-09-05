import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-[#061224] border-b pb-4">Terms & Conditions</h1>
          <p>Last updated: September 2026</p>

          <p>
            Welcome to <strong>{siteConfig.name}</strong> (&quot;Website&quot;, &quot;Platform&quot;). By accessing or utilizing our medical token appointment assistance services, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h2 className="text-base font-bold text-[#061224] pt-4">1. Scope of Services</h2>
          <p>
            Gamca Centre provides online concierge assistance for candidates seeking Wafid GAMCA medical tokens in Pakistan. We assist candidates in submitting their appointment information to official portals.
          </p>

          <h2 className="text-base font-bold text-[#061224] pt-4">2. Wafid Center Assignment Rules</h2>
          <p>
            As per official Wafid regulations, candidates select their <strong>Examination City</strong>, while the specific medical center is automatically assigned by the official Wafid system. Gamca Centre does not choose or alter assigned medical centers.
          </p>

          <h2 className="text-base font-bold text-[#061224] pt-4">3. Accuracy of Candidate Information</h2>
          <p>
            Candidates are solely responsible for ensuring that all entered passport numbers, names, dates of birth, and nationality parameters are 100% accurate. Gamca Centre is not liable for errors resulting from incorrect data provided by the applicant.
          </p>

          <h2 className="text-base font-bold text-[#061224] pt-4">4. Payment & Verification</h2>
          <p>
            Submission requests require payment verification. Applicants must upload a valid transaction screenshot upon completing Step 2. Requests without valid proof of payment will not be processed.
          </p>

          <h2 className="text-base font-bold text-[#061224] pt-4">5. Disclaimer</h2>
          <p>
            Gamca Centre is an independent assistance provider. Medical center directory records are referenced from Wafid official sources. We do not own or operate third-party medical diagnostic centers.
          </p>

          <h2 className="text-base font-bold text-[#061224] pt-4">6. Contact</h2>
          <p>
            For questions regarding these terms, please email <a href={`mailto:${siteConfig.contact.email}`} className="text-amber-700 font-bold underline">{siteConfig.contact.email}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
