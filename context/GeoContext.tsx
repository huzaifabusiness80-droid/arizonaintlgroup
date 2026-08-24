"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface GeoContextType {
  countryCode: string;
  isPakistan: boolean;
  isLoading: boolean;
  setCountryCode: (code: string) => void;
}

const GeoContext = createContext<GeoContextType>({
  countryCode: "PK",
  isPakistan: true,
  isLoading: true,
  setCountryCode: () => {},
});

export function GeoProvider({ children }: { children: ReactNode }) {
  const [countryCode, setCountryState] = useState<string>("PK");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user manually forced a selection in this session
    const manualOverride = sessionStorage.getItem("arizona_geo_manual_override");
    if (manualOverride) {
      setCountryState(manualOverride);
      setIsLoading(false);
      return;
    }

    // Always detect real live IP on load (works with VPNs like Netherlands NL, US, UK, BH etc.)
    const detectCountry = async () => {
      // 1. Try ipwho.is (fast & reliable without API key)
      try {
        const res = await fetch("https://ipwho.is/", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.country_code) {
            const code = data.country_code.toUpperCase();
            setCountryState(code);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Continue to fallback
      }

      // 2. Try api.country.is
      try {
        const res = await fetch("https://api.country.is", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.country) {
            const code = data.country.toUpperCase();
            setCountryState(code);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Continue to fallback
      }

      // 3. Try ipapi.co
      try {
        const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data && data.country_code) {
            const code = data.country_code.toUpperCase();
            setCountryState(code);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Fallback default
      }

      setIsLoading(false);
    };

    detectCountry();
  }, []);

  const setCountryCode = (code: string) => {
    const upper = code.toUpperCase();
    setCountryState(upper);
    sessionStorage.setItem("arizona_geo_manual_override", upper);
  };

  const isPakistan = countryCode === "PK";

  return (
    <GeoContext.Provider
      value={{
        countryCode,
        isPakistan,
        isLoading,
        setCountryCode,
      }}
    >
      {children}
    </GeoContext.Provider>
  );
}

export function useGeoLocation() {
  return useContext(GeoContext);
}
