import { NextRequest, NextResponse } from "next/server";

// Helper to convert 2-letter ISO country code to emoji flag
function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌐";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export interface PlaceResult {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  state?: string;
  display: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() || "";

  if (!query || query.length < 1) {
    // Return default popular cities/countries
    const defaults: PlaceResult[] = [
      { id: "bh-manama", name: "Manama", country: "Bahrain", countryCode: "BH", flag: "🇧🇭", state: "Capital", display: "🇧🇭 Manama, Bahrain" },
      { id: "pk-islamabad", name: "Islamabad", country: "Pakistan", countryCode: "PK", flag: "🇵🇰", state: "Federal Capital", display: "🇵🇰 Islamabad, Pakistan" },
      { id: "pk-lahore", name: "Lahore", country: "Pakistan", countryCode: "PK", flag: "🇵🇰", state: "Punjab", display: "🇵🇰 Lahore, Pakistan" },
      { id: "pk-karachi", name: "Karachi", country: "Pakistan", countryCode: "PK", flag: "🇵🇰", state: "Sindh", display: "🇵🇰 Karachi, Pakistan" },
      { id: "pk-rawalpindi", name: "Rawalpindi", country: "Pakistan", countryCode: "PK", flag: "🇵🇰", state: "Punjab", display: "🇵🇰 Rawalpindi, Pakistan" },
      { id: "sa-riyadh", name: "Riyadh", country: "Saudi Arabia", countryCode: "SA", flag: "🇸🇦", state: "Riyadh Region", display: "🇸🇦 Riyadh, Saudi Arabia" },
      { id: "sa-jeddah", name: "Jeddah", country: "Saudi Arabia", countryCode: "SA", flag: "🇸🇦", state: "Makkah Region", display: "🇸🇦 Jeddah, Saudi Arabia" },
      { id: "ae-dubai", name: "Dubai", country: "United Arab Emirates", countryCode: "AE", flag: "🇦🇪", state: "Dubai", display: "🇦🇪 Dubai, UAE" },
      { id: "uk-london", name: "London", country: "United Kingdom", countryCode: "GB", flag: "🇬🇧", state: "England", display: "🇬🇧 London, United Kingdom" },
      { id: "es-madrid", name: "Madrid", country: "Spain", countryCode: "ES", flag: "🇪🇸", state: "Community of Madrid", display: "🇪🇸 Madrid, Spain" },
      { id: "tr-istanbul", name: "Istanbul", country: "Turkey", countryCode: "TR", flag: "🇹🇷", state: "Istanbul", display: "🇹🇷 Istanbul, Turkey" },
      { id: "my-kuala-lumpur", name: "Kuala Lumpur", country: "Malaysia", countryCode: "MY", flag: "🇲🇾", state: "Federal Territory", display: "🇲🇾 Kuala Lumpur, Malaysia" },
      { id: "th-bangkok", name: "Bangkok", country: "Thailand", countryCode: "TH", flag: "🇹🇭", state: "Central", display: "🇹🇭 Bangkok, Thailand" },
    ];
    return NextResponse.json({ success: true, results: defaults });
  }

  try {
    // Call Open-Meteo Worldwide Geocoding API (Fast, Free, covers all cities and countries on Earth)
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=15&language=en&format=json`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error(`Geocoding error: ${res.status}`);
    }

    const data = await res.json();
    const items = Array.isArray(data.results) ? data.results : [];

    const results: PlaceResult[] = items.map((item: any) => {
      const flag = getFlagEmoji(item.country_code);
      const statePart = item.admin1 && item.admin1 !== item.name ? `, ${item.admin1}` : "";
      const countryPart = item.country ? `, ${item.country}` : "";
      const display = `${flag} ${item.name}${statePart}${countryPart}`;

      return {
        id: `${item.id}-${item.name}`,
        name: item.name,
        country: item.country || "",
        countryCode: item.country_code || "",
        flag,
        state: item.admin1 || "",
        display,
      };
    });

    return NextResponse.json({ success: true, count: results.length, results });
  } catch (error: any) {
    console.error("Geocoding API error:", error);
    return NextResponse.json({ success: false, results: [] }, { status: 500 });
  }
}
