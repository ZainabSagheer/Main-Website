import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | Book a Free AI Marketing Strategy Call",
  description:
    "Get in touch with BITSOL Marketing. Book a free 30-minute strategy call and receive a custom AI marketing audit for your business. Pakistan & global clients welcome.",
  alternates: { canonical: "https://bitsolmarketing.com/contact" },
  openGraph: {
    title: "Contact BITSOL Marketing | Free Strategy Call",
    description:
      "Book a free AI marketing strategy call with BITSOL Marketing. Get a custom audit and 90-day growth roadmap for your business.",
    url: "https://bitsolmarketing.com/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
