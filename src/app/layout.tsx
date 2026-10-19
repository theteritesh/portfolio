import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";
import { portfolioData } from "@/data/portfolio";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const materialSymbols = localFont({
  src: "./fonts/material-symbols-outlined.ttf",
  variable: "--font-material-symbols",
  display: "swap",
  weight: "100 700",
  style: "normal",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ritesh Thete | Java Full Stack Developer, Pune",
    template: "%s | Ritesh Thete",
  },
  description:
    "Ritesh Thete is a Java Full Stack Developer in Pune specializing in multi-tenant SaaS platforms, ERP/CRM architectures, Spring Boot, React, MySQL, Jenkins, Docker, and Nginx.",
  keywords: [
    "Ritesh Thete",
    "Java Full Stack Developer",
    "Pune Developer",
    "Spring Boot",
    "React",
    "Next.js",
    "SaaS Multi-Tenant",
    "CRM",
    "ERP",
    "MySQL",
    "Jenkins",
    "Docker",
    "Nginx",
    "Java Developer Pune",
    "AWS Certified",
    "Software Engineer",
  ],
  authors: [{ name: "Ritesh Thete", url: siteUrl }],
  creator: "Ritesh Thete",
  alternates: {
    canonical: "/",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Ritesh Thete | Java Full Stack Developer, Pune",
    description:
      "Ritesh Thete is a Java Full Stack Developer in Pune specializing in multi-tenant SaaS platforms, ERP/CRM architectures, Spring Boot, React, MySQL, Jenkins, Docker, and Nginx.",
    siteName: "Ritesh Thete Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ritesh Thete | Java Full Stack Developer, Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritesh Thete | Java Full Stack Developer, Pune",
    description:
      "Ritesh Thete is a Java Full Stack Developer in Pune specializing in multi-tenant SaaS platforms, ERP/CRM architectures, Spring Boot, React, MySQL, Jenkins, Docker, and Nginx.",
    images: ["/opengraph-image"],
    creator: "@theteritesh",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioData.personal.name,
    jobTitle: portfolioData.personal.title,
    url: siteUrl,
    image: portfolioData.personal.avatarUrl,
    sameAs: [
      portfolioData.contact.github,
      portfolioData.contact.linkedin,
      portfolioData.contact.twitter,
    ].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Savitribai Phule Pune University",
    },
    knowsAbout: [
      "Java",
      "Spring Boot",
      "React",
      "Next.js",
      "TypeScript",
      "SaaS Multi-Tenant Systems",
      "MySQL",
      "PostgreSQL",
      "Docker",
      "Jenkins",
      "Nginx",
      "AWS",
      "RESTful APIs",
      "Git",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${materialSymbols.variable} antialiased`}
    >
      <body className="min-h-screen bg-surface text-on-surface flex flex-col font-sans selection:bg-primary-container selection:text-on-primary-container transition-colors duration-300">
        <ThemeProvider>
          {/* Accessible Skip to Content Landmark Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-container focus:text-on-primary-container focus:rounded-md focus:font-mono focus:shadow-xl focus:border focus:border-white/20"
          >
            Skip to content
          </a>
          {children}
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
