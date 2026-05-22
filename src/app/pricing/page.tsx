import type { Metadata } from "next";
import PricingClient from "./PricingClient";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pricing | AI Marketing & Automation Packages",
  description:
    "Transparent pricing for BITSOL Marketing's AI automation, SEO, digital marketing, and web development services. Starter, Growth, and Enterprise packages for every budget.",
  alternates: { canonical: "https://bitsolmarketing.com/pricing" },
  openGraph: {
    title: "Pricing | BITSOL Marketing Packages",
    description:
      "Flexible AI marketing packages — SEO, automation, ads, and web development for businesses in Pakistan and globally.",
    url: "https://bitsolmarketing.com/pricing",
  },
};

const offerSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "BITSOL Marketing Service Packages",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Offer",
        name: "Starter Package",
        description:
          "Entry-level AI marketing package for startups and small businesses. Includes SEO audit, basic automation, and social media management.",
        price: "500",
        priceCurrency: "USD",
        seller: { "@type": "Organization", name: "BITSOL Marketing PVT LTD" },
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Offer",
        name: "Growth Package",
        description:
          "Full-stack AI marketing for growing businesses. Includes SEO, paid ads, AI automation workflows, and web development.",
        price: "1500",
        priceCurrency: "USD",
        seller: { "@type": "Organization", name: "BITSOL Marketing PVT LTD" },
        availability: "https://schema.org/InStock",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Offer",
        name: "Enterprise Package",
        description:
          "Custom AI systems, enterprise automation, multi-channel paid media, and dedicated account management for large organisations.",
        seller: { "@type": "Organization", name: "BITSOL Marketing PVT LTD" },
        availability: "https://schema.org/InStock",
      },
    },
  ],
};

export default function PricingPage() {
  return (
    <>
      <Script
        id="pricing-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
      />
      <PricingClient />
    </>
  );
}