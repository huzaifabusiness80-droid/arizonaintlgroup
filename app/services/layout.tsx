import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Corporate & Travel Services | Bahrain & Pakistan",
  description:
    "Explore comprehensive services by Arizona International Group: Bahrain Company Formation, LMRA Work Permits & Legal Offense Clearance, Worldwide Visa Processing, Luxury Car Rentals, Flight Bookings, and Consumer Tech.",
  keywords: [
    "Bahrain business services",
    "CR formation Manama",
    "LMRA work permit services",
    "visa consultancy services",
    "rent a car services Bahrain Pakistan",
    "corporate travel management",
    "flight booking desk",
    "consumer tech store",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Corporate, Visa & Travel Services | Arizona International Group",
    description:
      "Full spectrum corporate, immigration, travel, and mobility solutions tailored for businesses and individuals in Bahrain, Pakistan, and worldwide.",
    url: "https://arizonaintlgroup.com/services",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
