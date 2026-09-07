import { siteConfig } from "@/config/site";

export interface FaqItem {
  q: string;
  a: string;
}

export const faqsData: FaqItem[] = [
  {
    q: "What is Wafid?",
    a: "Wafid is the official digital portal launched by the Gulf Health Council (GHC) to streamline medical examination appointment bookings for expatriates traveling to GCC nations. The official platform can be accessed at wafid.com.",
  },
  {
    q: "What was GAMCA?",
    a: "GAMCA stands for Gulf Approved Medical Centers Association. It was the legacy system used for Gulf medical tokens, which has now been upgraded into the official Wafid platform under the Gulf Health Council (ghc.sa).",
  },
  {
    q: "Is Gamca Centre affiliated with the official Wafid government portal?",
    a: "No. Gamca Centre is an independent concierge assistance service in Pakistan. We help candidates verify parameters, eliminate submission errors, and coordinate token appointments. Medical centers are assigned directly by the central Wafid system.",
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
