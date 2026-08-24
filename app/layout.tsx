import type { Metadata } from "next";
import { DM_Sans, Cairo } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arizona - Experience The World With Arizona",
  description: "Curating seamless worldwide voyages, private escapes, and bespoke itineraries. From exotic tropical retreats to alpine adventures, travel with unmatched elegance.",
};

import { GeoProvider } from "@/context/GeoContext";
import { LanguageProvider } from "@/context/LanguageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cairo.variable} font-sans antialiased scroll-smooth`}>
      <body className="min-h-screen bg-[#f8f9fa] text-[#111827] font-sans font-normal selection:bg-[#dfb141] selection:text-white">
        <GeoProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </GeoProvider>
      </body>
    </html>
  );
}
