import { NextRequest, NextResponse } from "next/server";
import { WORLDWIDE_COUNTRIES } from "@/lib/countries";

export interface ApiCountry {
  code: string;
  name: string;
  nameAr: string;
  flag: string;
  region: string;
  capital: string;
}

let cachedCountries: ApiCountry[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 1000 * 60 * 60 * 24; // 24 hours

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase().trim() || "";

  try {
    const now = Date.now();
    if (!cachedCountries || now - lastFetchTime > CACHE_TTL) {
      // Fetch from official REST Countries API
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,flag,translations,capital,region", {
        next: { revalidate: 86400 },
      });

      if (res.ok) {
        const rawData = await res.json();
        cachedCountries = rawData
          .map((c: any) => {
            const name = c.name?.common || "";
            const nameAr = c.translations?.ara?.common || c.name?.common || "";
            const flag = c.flag || "";
            const code = c.cca2 || "";
            const region = c.region || "";
            const capital = Array.isArray(c.capital) && c.capital[0] ? c.capital[0] : "";

            return {
              code,
              name,
              nameAr,
              flag,
              region,
              capital,
            };
          })
          .sort((a: ApiCountry, b: ApiCountry) => a.name.localeCompare(b.name));

        lastFetchTime = now;
      }
    }

    if (!cachedCountries || cachedCountries.length === 0) {
      cachedCountries = WORLDWIDE_COUNTRIES.map((c) => ({
        code: c.code,
        name: c.name,
        nameAr: c.nameAr,
        flag: c.flag,
        region: "",
        capital: "",
      }));
    }

    let results = cachedCountries || [];

    if (query) {
      results = results.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.nameAr.toLowerCase().includes(query) ||
          c.code.toLowerCase().includes(query) ||
          c.capital.toLowerCase().includes(query)
      );
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      countries: results,
    });
  } catch (error: any) {
    console.error("Countries API error:", error);
    const fallback = WORLDWIDE_COUNTRIES.map((c) => ({
      code: c.code,
      name: c.name,
      nameAr: c.nameAr,
      flag: c.flag,
      region: "",
      capital: "",
    }));
    return NextResponse.json({
      success: true,
      count: fallback.length,
      countries: fallback,
    });
  }
}
