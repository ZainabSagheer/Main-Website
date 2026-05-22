import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Entropy } from "@/components/ClientDynamics";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bitsolmarketing.com"),
  title: {
    default: "BITSOL Marketing | AI Digital Marketing Agency Pakistan",
    template: "%s | BITSOL Marketing",
  },
  description:
    "BITSOL Marketing is a full-service AI digital marketing agency in Pakistan. We deliver AI SEO, chatbot development, Meta ads, automation, and growth marketing globally.",
  keywords: [
    "AI digital marketing agency",
    "AI marketing agency Pakistan",
    "AI SEO services",
    "AI chatbot development",
    "digital marketing agency Pakistan",
    "WhatsApp AI automation",
    "Meta ads agency",
    "growth marketing agency",
    "web development Pakistan",
    "BITSOL Marketing",
  ],
  authors: [{ name: "BITSOL Marketing Team" }],
  creator: "BITSOL Marketing PVT LTD",
  publisher: "BITSOL Marketing PVT LTD",
  alternates: {
    canonical: "https://bitsolmarketing.com",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bitsolmarketing.com",
    siteName: "BITSOL Marketing",
    title: "BITSOL Marketing | AI Digital Marketing Agency Pakistan",
    description:
      "Full-service AI digital marketing agency offering SEO, chatbot development, Meta ads, automation and growth marketing for businesses in Pakistan and globally.",
    images: [
      {
        url: "https://bitsolmarketing.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "BITSOL Marketing — AI Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BITSOL Marketing | AI Digital Marketing Agency",
    description:
      "AI SEO, chatbot development, Meta ads & automation for businesses in Pakistan and worldwide.",
    images: ["https://bitsolmarketing.com/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

import { ContactPopup, FloatingDock } from "@/components/ClientDynamics";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KMPSR8SX');`,
          }}
        />
        <Script
          id="json-ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "ProfessionalService"],
              "name": "BITSOL Marketing PVT LTD",
              "alternateName": "BITSOL Marketing",
              "url": "https://bitsolmarketing.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://bitsolmarketing.com/logo.png",
                "width": 200,
                "height": 60
              },
              "description": "Pakistan's premier AI digital marketing agency offering SEO, Meta Ads, AI automation, web development, mobile apps, and algorithmic trading technology.",
              "foundingDate": "2023",
              "areaServed": [
                { "@type": "Country", "name": "Pakistan" },
                { "@type": "City", "name": "Karachi" },
                { "@type": "City", "name": "Lahore" },
                { "@type": "City", "name": "Islamabad" }
              ],
              "serviceType": [
                "AI Digital Marketing",
                "SEO Services",
                "Meta Ads Management",
                "Google Ads Management",
                "AI Automation",
                "Web Development",
                "Mobile App Development",
                "Algorithmic Trading Software"
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "BITSOL Marketing Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Automation" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Digital Marketing" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SEO Optimization" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile Apps" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Trading Tech" } }
                ]
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+92-310-317-5175",
                "contactType": "customer service",
                "areaServed": ["PK", "AE", "GB", "US"],
                "availableLanguage": ["English", "Urdu"]
              },
              "sameAs": [
                "https://www.facebook.com/bitsolmarketing/",
                "https://www.linkedin.com/company/bitsolpvtltd/",
                "https://www.instagram.com/bitsolmarketing"
              ]
            }),
          }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "BITSOL Marketing",
              "url": "https://bitsolmarketing.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://bitsolmarketing.com/blog?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-J473YSMZKE"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-J473YSMZKE');
          `}
        </Script>
      </head>
      <body
        className={`${montserrat.variable} font-sans antialiased bg-white dark:bg-[#050816] text-slate-900 dark:text-white transition-colors duration-300`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KMPSR8SX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen">
            <Entropy className="opacity-40" />
            <SmoothScroll>
              <div className="flex min-h-screen flex-col relative z-10">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </SmoothScroll>
            <ContactPopup />
            <FloatingDock />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
