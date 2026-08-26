import React from "react";

interface JsonLdProps {
  type?: "home" | "visa" | "service" | "item" | "about" | "contact";
  data?: Record<string, any>;
}

export default function JsonLd({ type = "home", data }: JsonLdProps) {
  const siteUrl = "https://arizonaintlgroup.com";

  // Corporate Organization & Dual-Headquarter LocalBusiness Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Corporation",
    "@id": `${siteUrl}/#organization`,
    name: "Arizona International Group",
    alternateName: ["مجموعة أريزونا الدولية", "Arizona Group", "Arizona Consultancy"],
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    image: `${siteUrl}/icon.svg`,
    description:
      "Premier international corporate solutions firm specializing in Bahrain Company Formation (CR/MOIC), LMRA Work Permits & Legal Clearances, Worldwide Visa Facilitation (Schengen, UK, USA, Gulf), Luxury Travel, Rent A Car, and Consumer Tech across Bahrain and Pakistan.",
    email: "arizonaintlservices@gmail.com",
    telephone: ["+97332306963", "+923135921434"],
    foundingDate: "2004",
    areaServed: [
      {
        "@type": "Country",
        name: "Bahrain",
      },
      {
        "@type": "Country",
        name: "Pakistan",
      },
      {
        "@type": "Country",
        name: "Saudi Arabia",
      },
      {
        "@type": "Country",
        name: "United Arab Emirates",
      },
      {
        "@type": "Country",
        name: "United Kingdom",
      },
      {
        "@type": "Country",
        name: "United States",
      },
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "Government Avenue, Diplomatic Area",
        addressLocality: "Manama",
        addressRegion: "Capital Governorate",
        addressCountry: "BH",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Blue Area / Sector F-7",
        addressLocality: "Islamabad",
        addressRegion: "Federal Capital Territory",
        addressCountry: "PK",
      },
    ],
    location: [
      {
        "@type": "Place",
        name: "Arizona International Group - Bahrain Headquarters",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Manama",
          addressCountry: "BH",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 26.2285,
          longitude: 50.586,
        },
        telephone: "+97332306963",
      },
      {
        "@type": "Place",
        name: "Arizona International Group - Pakistan Office",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Islamabad",
          addressCountry: "PK",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 33.6844,
          longitude: 73.0479,
        },
        telephone: "+923135921434",
      },
    ],
    sameAs: [
      "https://facebook.com/arizonaintlgroup",
      "https://instagram.com/arizonaintlgroup",
      "https://linkedin.com/company/arizonaintlgroup",
      "https://wa.me/97332306963",
      "https://wa.me/923135921434",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Arizona Core Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Bahrain Business & Corporate Services",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Company Formation & CR Registration Bahrain" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "LMRA Work Permit & Investor Visa Processing" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "LMRA Runaway & Workload Offense Removal" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "PRO Services & Commercial Bank Account Opening" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Worldwide Visa Consultancy",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Schengen Visa Consultation & Dossier" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "UK, USA & Canada Visa Processing" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Bahrain, UAE, Malaysia & Turkey eVisa" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Travel & Tours and Car Rental",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Flight Ticket Booking & Hotel Stays" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Luxury Rent A Car & Monthly Fleet Lease" } },
          ],
        },
      ],
    },
  };

  // WebSite Schema with SearchAction
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: "Arizona International Group",
    description: "Official Portal of Arizona International Group - Bahrain Business Setup, Visas, Travel & Car Rental.",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: ["en-US", "ar-BH", "ur-PK"],
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/visas?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // Frequently Asked Questions Schema for rich Google FAQ SERP snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can foreigners own 100% of a company in Bahrain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, under Bahrain commercial law, foreign investors can own 100% of most commercial activities with zero local sponsor requirements.",
        },
      },
      {
        "@type": "Question",
        name: "How fast can Arizona process Bahrain CR Company Formation and LMRA Visa?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Commercial Registration (CR) is typically issued within 3 to 7 working days, followed by swift LMRA Investor Visa or Work Permit issuance.",
        },
      },
      {
        "@type": "Question",
        name: "How do I apply for Schengen, UK, USA, or Bahrain visas through Arizona from Pakistan or Bahrain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Arizona directly via WhatsApp (+973 32306963 for Bahrain or +92 313 5921434 for Pakistan) or submit your inquiry online for instant document evaluation and embassy file preparation.",
        },
      },
      {
        "@type": "Question",
        name: "Can Arizona resolve LMRA runaway offenses and workload ceiling restrictions in Bahrain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Arizona specializes in official LMRA dispute resolution, runaway offense removals, and work permit ceiling quota increases with high success rates.",
        },
      },
      {
        "@type": "Question",
        name: "Does Arizona provide Rent A Car and flight booking services in Bahrain and Pakistan?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Arizona provides luxury sedan and SUV rentals, monthly fleet leases, airport transfers, and worldwide airline ticketing at best guaranteed rates.",
        },
      },
    ],
  };

  let specificSchema = null;

  if (type === "visa" && data) {
    specificSchema = {
      "@context": "https://schema.org",
      "@type": "GovernmentService",
      name: `${data.name} Processing`,
      serviceType: "Visa & Immigration Consultation",
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: ["Bahrain", "Pakistan", "Global"],
      description: data.overview || data.tagline,
      offers: {
        "@type": "Offer",
        priceCurrency: data.priceBhd ? "BHD" : "PKR",
        price: data.priceBhd || data.pricePkr || "0",
        availability: "https://schema.org/InStock",
      },
    };
  }

  if (type === "service" && data) {
    specificSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: data.title || data.name,
      description: data.overview || data.description,
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      serviceType: data.category || "Corporate & Travel Services",
      areaServed: ["Bahrain", "Pakistan", "GCC"],
    };
  }

  if (type === "item" && data) {
    specificSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: data.name,
      description: data.description || data.about,
      image: data.image,
      brand: {
        "@type": "Brand",
        name: data.brand || "Arizona International Group",
      },
      offers: {
        "@type": "Offer",
        priceCurrency: data.priceBhd ? "BHD" : "PKR",
        price: data.priceBhd || data.pricePkr || "0",
        availability: "https://schema.org/InStock",
        seller: {
          "@id": `${siteUrl}/#organization`,
        },
      },
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {type === "home" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      {specificSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(specificSchema) }}
        />
      )}
    </>
  );
}
