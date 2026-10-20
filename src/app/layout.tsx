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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://theteritesh.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ritesh Thete | Software Developer, Pune | Java Full Stack & Spring Boot",
    template: "%s | Ritesh Thete",
  },
  description:
    "Ritesh Thete is a Software Developer in Pune with 1+ years experience building production web apps with Java, Spring Boot, React, MySQL, Docker, and AWS cloud.",
  keywords: [
    "Ritesh Thete",
    "theteritesh",
    "Ritesh Thete Portfolio",
    "Software Developer",
    "Software Engineer",
    "Java Full Stack Developer",
    "Java Developer Pune",
    "Software Developer Pune",
    "Backend Developer",
    "Spring Boot Developer",
    "React Developer",
    "Next.js Developer",
    "RESTful APIs",
    "Microservices",
    "Multi-Tenant SaaS",
    "MySQL",
    "PostgreSQL",
    "Docker",
    "Jenkins",
    "Nginx",
    "AWS Certified Cloud Practitioner",
    "SIMCA Pune",
    "MCA Pune",
    "Savitribai Phule Pune University",
    "Spicy Mango",
    "XpertBiz",
    "KnowlexaNext",
    "BulkTradeHub",
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
    title: "Ritesh Thete | Software Developer, Pune | Java Full Stack & Spring Boot",
    description:
      "Ritesh Thete is a Software Developer in Pune with 1+ years experience building production web apps with Java, Spring Boot, React, MySQL, Docker, and AWS cloud.",
    siteName: "Ritesh Thete Portfolio",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Ritesh Thete | Software Developer, Pune | Java Full Stack & Spring Boot",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ritesh Thete | Software Developer, Pune | Java Full Stack & Spring Boot",
    description:
      "Ritesh Thete is a Software Developer in Pune with 1+ years experience building production web apps with Java, Spring Boot, React, MySQL, Docker, and AWS cloud.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Ritesh Thete | Software Developer Portfolio",
        description:
          "Official developer portfolio for Ritesh Thete, Software Developer based in Pune, India.",
        publisher: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: "Ritesh Thete | Software Developer Portfolio",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        mainEntity: {
          "@id": `${siteUrl}/#person`,
        },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: portfolioData.personal.name,
        alternateName: ["theteritesh", "Ritesh"],
        jobTitle: portfolioData.personal.title,
        description:
          "Software Developer based in Pune with 1+ years experience engineering production web applications using Java, Spring Boot, React, MySQL, and AWS.",
        url: siteUrl,
        image: `${siteUrl}${portfolioData.personal.avatarUrl}`,
        email: `mailto:${portfolioData.contact.email}`,
        telephone: portfolioData.contact.phone,
        worksFor: {
          "@type": "Organization",
          name: "Mahendra Technosoft Pvt. Ltd.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            addressCountry: "India",
          },
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "India",
        },
        alumniOf: [
          {
            "@type": "CollegeOrUniversity",
            name: "Savitribai Phule Pune University",
            url: "http://www.unipune.ac.in/",
          },
          {
            "@type": "EducationalOrganization",
            name: "Sinhgad Institute of Management and Computer Application (SIMCA), Pune",
          },
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "AWS Certified Cloud Practitioner",
            credentialCategory: "Certification",
            recognizedBy: {
              "@type": "Organization",
              name: "Amazon Web Services (AWS)",
            },
          },
        ],
        sameAs: [
          portfolioData.contact.github,
          portfolioData.contact.linkedin,
          portfolioData.contact.instagram,
          portfolioData.contact.whatsapp,
        ].filter(Boolean),
        knowsAbout: [
          "Java",
          "Java 17 / Java 21",
          "Spring Boot",
          "Spring Security",
          "RESTful APIs",
          "Microservices",
          "React",
          "Next.js",
          "TypeScript",
          "JavaScript",
          "MySQL",
          "PostgreSQL",
          "MongoDB",
          "HikariCP",
          "Docker",
          "Jenkins",
          "Nginx",
          "AWS Cloud",
          "Multi-Tenant SaaS Systems",
          "WebSockets",
          "Git & GitHub",
        ],
      },
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
