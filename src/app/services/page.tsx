import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "AI Marketing Services | SEO, Chatbots, Ads & Automation",
  description:
    "Explore BITSOL Marketing's full suite of AI-powered services — SEO, AI chatbot development, Meta ads, social media management, web development, and business automation.",
  alternates: { canonical: "https://bitsolmarketing.com/services" },
  openGraph: {
    title: "AI Marketing Services | BITSOL Marketing",
    description:
      "Full-service AI marketing: SEO, chatbots, Meta ads, automation, web development. Serving Pakistan and global markets.",
    url: "https://bitsolmarketing.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
