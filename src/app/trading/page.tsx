import type { Metadata } from "next";
import TradingClient from "./TradingClient";

export const metadata: Metadata = {
  title: "Algorithmic Trading Technology | PSX, PMEX & Crypto Pakistan",
  description:
    "BITSOL Marketing builds precision algorithmic trading systems for PSX, PMEX, Binance, and crypto markets in Pakistan. AI-driven risk management and trading signals.",
  alternates: { canonical: "https://bitsolmarketing.com/trading" },
  openGraph: {
    title: "Algorithmic Trading Technology | BITSOL Marketing",
    description:
      "High-frequency trading systems, AI risk management, and automated bots for PSX, PMEX, and crypto markets built by BITSOL Marketing Pakistan.",
    url: "https://bitsolmarketing.com/trading",
  },
};

export default function TradingSolutionsPage() {
  return <TradingClient />;
}
