import type { Metadata } from "next";
import CoursesClient from "./CoursesClient";

export const metadata: Metadata = {
  title: "BITSOL Academy | Digital Marketing & AI Courses Pakistan",
  description:
    "Enroll in BITSOL Academy's online courses covering digital marketing, AI automation, and PSX trading. Expert-led programs with verified certificates for professionals in Pakistan.",
  alternates: { canonical: "https://bitsolmarketing.com/courses" },
  openGraph: {
    title: "BITSOL Academy | Online Courses in Pakistan",
    description:
      "Master digital marketing, AI automation, and trading with BITSOL Academy's expert-led online courses.",
    url: "https://bitsolmarketing.com/courses",
  },
};

export default function CoursesPage() {
  return <CoursesClient />;
}
