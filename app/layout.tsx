import type { Metadata, Viewport } from "next";
import { Poppins, Cairo } from "next/font/google";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2563eb",
};

const siteUrl = "https://arizonaintlgroup.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arizona International Group | Bahrain Business Setup, LMRA, Visas & Luxury Travel",
    template: "%s | Arizona International Group",
  },
  description:
    "Arizona International Group is the leading corporate gateway in Bahrain & Pakistan. Specializing in CR Company Formation in Bahrain, LMRA Work Permits, Investor Visas, Legal Clearances, Worldwide Visa Facilitation (Schengen, UK, USA, Gulf), Luxury Travel, and Rent a Car.",
  applicationName: "Arizona International Group",
  authors: [{ name: "Arizona International Group", url: siteUrl }],
  generator: "Next.js",
  keywords: [
    // Bahrain Target Keywords
    "Bahrain company formation",
    "CR registration Bahrain",
    "LMRA work permit Bahrain",
    "Bahrain investor visa",
    "PRO services Bahrain",
    "business setup in Bahrain",
    "Sijilat Bahrain commercial registration",
    "LMRA runaway offense clearance",
    "workload offense Bahrain",
    "inspection clearance Bahrain",
    "ceiling visa increase Bahrain",
    "commercial bank account Bahrain",
    "audit and VAT services Bahrain",
    "rent a car Bahrain",
    "luxury car rental Manama",
    "travel agency Bahrain",
    "Manama business consultants",
    "Bahrain visa for Pakistani",
    // Pakistan Target Keywords
    "visa consultancy Islamabad",
    "visa consultants Pakistan",
    "Schengen visa from Pakistan",
    "UK visa consultancy Rawalpindi",
    "USA tourist visa Pakistan",
    "Canada visa assistance Islamabad",
    "Dubai visit visa Pakistan",
    "Malaysia eVisa Pakistan",
    "Turkey visa Pakistan",
    "Bahrain visit visa from Pakistan",
    "flight booking Pakistan",
    "cheap airline tickets Islamabad",
    "Umrah packages Islamabad Rawalpindi",
    "rent a car Islamabad Rawalpindi",
    "luxury tour packages Pakistan",
    // Brand & Global Keywords
    "Arizona International Group",
    "مجموعة أريزونا الدولية",
    "Arizona Travel & Tours",
    "Arizona Consultancy Bahrain",
    "worldwide visa processing",
    "5 star hotel booking",
    "corporate travel management",
    "foreign direct investment Bahrain",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Arizona International Group",
  publisher: "Arizona International Group",
  category: "Business, Travel & Corporate Services",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-BH": siteUrl,
      "ar-BH": `${siteUrl}?lang=ar`,
      "en-PK": siteUrl,
      "en-US": siteUrl,
      "x-default": siteUrl,
    },
  },
  openGraph: {
    title: "Arizona International Group | Bahrain Business Setup, LMRA, Visas & Travel",
    description:
      "Premier corporate partner in Bahrain & Pakistan for CR Company Formation, LMRA Visas, PRO solutions, Worldwide Visa Processing, Luxury Travel, and Rent a Car.",
    url: siteUrl,
    siteName: "Arizona International Group",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&q=85&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Arizona International Group Corporate Headquarters",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ar_BH", "en_PK", "ur_PK"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arizona International Group | Bahrain Business Setup & Global Visas",
    description:
      "Your trusted gateway for Bahrain Company Formation (CR/LMRA), Worldwide Visas, Flights, and Luxury Travel in Bahrain & Pakistan.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&q=85&auto=format&fit=crop",
    ],
    creator: "@arizonaintl",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "ZMWf1V-7wXldw5Pu1QB5W_0rOicz3QwYpOiYMK7FK6M",
    yandex: "yandex-verification-placeholder",
    other: {
      "msvalidate.01": "bing-verification-placeholder",
    },
  },
  other: {
    "google-adsense-account": "ca-pub-2984910261301996",
    "geo.region": "BH-13;PK-IS",
    "geo.placename": "Manama, Bahrain; Islamabad, Pakistan",
    "geo.position": "26.2285;50.5860",
    ICBM: "26.2285, 50.5860",
    "revisit-after": "1 days",
    "rating": "General",
    "distribution": "Global",
  },
};

import { GeoProvider } from "@/context/GeoContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import AiAssistant from "@/components/AiAssistant";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${cairo.variable} font-sans antialiased scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KX69P9668R"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KX69P9668R');
          `}
        </Script>

        {/* Google AdSense Meta & Script */}
        <meta name="google-adsense-account" content="ca-pub-2984910261301996" />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2984910261301996"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* Schema.org Structured Data (JSON-LD) */}
        <JsonLd type="home" />
      </head>
      <body className="min-h-screen bg-[#f8fafc] dark:bg-[#0b1120] text-[#0f172a] dark:text-slate-100 font-sans font-normal selection:bg-[#2563eb] selection:text-white">
        <ThemeProvider>
          <GeoProvider>
            <LanguageProvider>
              <AuthProvider>
                {children}
                <AiAssistant />
              </AuthProvider>
            </LanguageProvider>
          </GeoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
