import { constructMetadata } from "@/lib/metadata";
import FaqsClient from "./FaqsClient";
import { faqsData } from "@/data/faqs";

export const metadata = constructMetadata({
  title: "Wafid & GAMCA Medical Token FAQs | Gamca Centre Pakistan",
  description:
    "Common questions about Wafid/GAMCA medical token booking, supported GCC countries, document requirements and the appointment process for candidates in Pakistan — answered.",
  path: "/faqs",
});

export default function FAQsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FaqsClient />
    </>
  );
}
