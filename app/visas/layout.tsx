import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Worldwide Visa Services | Tourist, Business & Schengen Visas",
  description:
    "Fast-track worldwide visa processing with Arizona International Group. Expert file preparation for Schengen, UK, USA, Canada, Bahrain, Malaysia, Turkey, UAE, and GCC visas with top approval rates.",
  keywords: [
    "Worldwide visa processing",
    "Schengen visa consultancy",
    "UK tourist visa from Pakistan",
    "USA visa appointment help",
    "Bahrain visa for Pakistani",
    "Malaysia eVisa",
    "Turkey visa assistance",
    "Dubai visit visa 30 days 60 days",
    "visa agents Islamabad Rawalpindi",
    "visa agents Bahrain",
  ],
  alternates: {
    canonical: "/visas",
  },
  openGraph: {
    title: "Worldwide Visa Facilitation | Arizona International Group",
    description:
      "High-approval visa solutions for over 25+ top global destinations. Complete embassy file preparation, flight vouchers, hotel bookings, and verified submissions.",
    url: "https://arizonaintlgroup.com/visas",
  },
};

export default function VisasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
