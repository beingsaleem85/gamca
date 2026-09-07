import { constructMetadata } from "@/lib/metadata";
import BookMedicalTokenClient from "./BookMedicalTokenClient";

export const metadata = constructMetadata({
  title: "Book Wafid Medical Token Online – All Pakistan | Gamca Centre",
  description:
    "Apply for your Wafid/GAMCA medical token in 3 easy steps: enter passport & visa details, upload payment proof, and get your appointment fast — service available across Pakistan.",
  path: "/book-medical-token",
});

export default function BookMedicalTokenPage() {
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
        name: "Book Medical Token",
        item: "https://www.gamcacentre.com/book-medical-token",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BookMedicalTokenClient />
    </>
  );
}
