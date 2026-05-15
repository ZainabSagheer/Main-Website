import type { Metadata } from "next";
import PortfolioClient from "./PortfolioClient";

export const metadata: Metadata = {
  title: "Portfolio | AI & Web Development Case Studies",
  description:
    "Browse BITSOL Marketing's portfolio of AI automation systems, high-performance websites, trading platforms, and digital marketing campaigns for clients worldwide.",
  alternates: { canonical: "https://bitsolmarketing.com/portfolio" },
  openGraph: {
    title: "Portfolio | BITSOL Marketing Case Studies",
    description:
      "AI systems, web platforms, trading tech, and digital marketing campaigns. See what BITSOL Marketing builds for ambitious businesses.",
    url: "https://bitsolmarketing.com/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
