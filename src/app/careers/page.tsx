import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers | BITSOL Marketing | Join the Architects of Innovation",
  description: "Explore active job openings at BITSOL Marketing. We are hiring senior frontend engineers, AI architects, SEO growth hackers, and performance media buyers. Apply today!",
  alternates: {
    canonical: "https://bitsolmarketing.com/careers",
  },
  openGraph: {
    title: "Careers | BITSOL Marketing | Join the Architects of Innovation",
    description: "Build scalable digital ecosystems with us. Explore careers in engineering, artificial intelligence, and result-driven growth marketing.",
    url: "https://bitsolmarketing.com/careers",
    type: "website",
  },
};

export default function CareersPage() {
  return <CareersClient />;
}
