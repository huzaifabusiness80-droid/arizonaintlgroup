import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Bahrain & Pakistan Offices",
  description:
    "Connect with Arizona International Group. Contact our Bahrain headquarters (+973 32306963) or Pakistan offices (+92 313 5921434) for business setup, LMRA permits, visas, flights, and car rentals.",
  keywords: [
    "Contact Arizona International Group",
    "Bahrain business setup contact",
    "LMRA consultant phone number Bahrain",
    "visa consultancy office Islamabad Rawalpindi",
    "Arizona Group WhatsApp",
    "Manama office address",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Arizona International Group | Bahrain & Pakistan",
    description:
      "Get in touch with our expert consultants in Manama, Bahrain and Islamabad, Pakistan. 24/7 dedicated support via phone and WhatsApp.",
    url: "https://arizonaintlgroup.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
