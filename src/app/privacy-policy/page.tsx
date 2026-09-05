import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h1 className="text-3xl font-extrabold text-[#061224] border-b pb-4">Privacy Policy</h1>
          <p>Last updated: September 2026</p>

          <p>
            At <strong>{siteConfig.name}</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, process, and safeguard the data you provide when applying for Wafid GAMCA medical appointment token assistance.
          </p>

          <h2 className="text-base font-bold text-[#061224] pt-4">1. Information We Collect</h2>
          <p>
            When you complete our online appointment assistance form, we collect personal information necessary to facilitate your medical token request:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>Candidate Full Name, Date of Birth, Gender, and Marital Status</li>
            <li>Passport Number, Issue Date, Issue Place, and Expiry Date</li>
            <li>Contact Information (Email Address, Phone Number, CNIC)</li>
            <li>Visa category and target GCC destination country</li>
            <li>Payment verification screenshots attached during Step 2</li>
          </ul>

          <h2 className="text-base font-bold text-[#061224] pt-4">2. How We Use Your Information</h2>
          <p>Your information is strictly used for the following operational purposes:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>To process your Wafid medical token request and verify candidate eligibility</li>
            <li>To communicate appointment updates, receipts, and instructions directly to your WhatsApp or email</li>
            <li>To comply with regulatory standards and prevent fraudulent duplicate submissions</li>
          </ul>

          <h2 className="text-base font-bold text-[#061224] pt-4">3. Data Security & Storage</h2>
          <p>
            We implement strict technical safeguards to protect your personal information against unauthorized access, disclosure, or alteration. Screenshots uploaded for payment verification are stored securely and encrypted in transit.
          </p>

          <h2 className="text-base font-bold text-[#061224] pt-4">4. Third-Party Sharing</h2>
          <p>
            We do not sell, trade, or rent candidate personal data to marketing third parties. Data is shared exclusively with official Gulf medical council portals (Wafid) for the sole purpose of issuing your medical examination appointment token.
          </p>

          <h2 className="text-base font-bold text-[#061224] pt-4">5. Contact Information</h2>
          <p>
            If you have any questions regarding this Privacy Policy, please contact us at <a href={`mailto:${siteConfig.contact.email}`} className="text-amber-700 font-bold underline">{siteConfig.contact.email}</a> or via WhatsApp at {siteConfig.contact.phoneDisplay}.
          </p>
        </div>
      </div>
    </div>
  );
}
