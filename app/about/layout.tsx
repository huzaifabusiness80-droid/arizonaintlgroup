import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | 20+ Years Corporate Excellence in Bahrain & Pakistan",
  description:
    "Discover Arizona International Group: over 20 years of trusted authority in Bahrain CR Company Formation, LMRA compliance, worldwide visa consultancy in Pakistan, and luxury corporate travel.",
  keywords: [
    "About Arizona International Group",
    "Bahrain business consultants",
    "company formation experts Bahrain",
    "visa consultants Islamabad",
    "corporate PRO services Bahrain",
    "Arizona Group history",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Arizona International Group | Bahrain & Pakistan",
    description:
      "Over two decades of proven industry leadership in CR Company Formation, LMRA Work Permits, PRO solutions, and worldwide visa facilitations.",
    url: "https://arizonaintlgroup.com/about",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=630&q=85&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "About Arizona International Group",
      },
    ],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
