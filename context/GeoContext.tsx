"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ContactInfo {
  phone: string;
  phoneTel: string;
  phoneSecondary?: string;
  phoneSecondaryTel?: string;
  whatsappNumber: string;
  whatsappSecondaryNumber?: string;
  whatsappLink: (msg?: string) => string;
  whatsappSecondaryLink?: (msg?: string) => string;
  email: string;
  emailLink: string;
  locationEn: string;
  locationAr: string;
}

export const PAKISTAN_CONTACT: ContactInfo = {
  phone: "+92 313 5921434",
  phoneTel: "+923135921434",
  phoneSecondary: "+92 302 9795921",
  phoneSecondaryTel: "+923029795921",
  whatsappNumber: "923135921434",
  whatsappSecondaryNumber: "923029795921",
  whatsappLink: (msg?: string) =>
    msg
      ? `https://wa.me/923135921434?text=${encodeURIComponent(msg)}`
      : "https://wa.me/923135921434",
  whatsappSecondaryLink: (msg?: string) =>
    msg
      ? `https://wa.me/923029795921?text=${encodeURIComponent(msg)}`
      : "https://wa.me/923029795921",
  email: "arizonaintlservices@gmail.com",
  emailLink: "mailto:arizonaintlservices@gmail.com",
  locationEn: "Islamabad / Rawalpindi, Pakistan & Global",
  locationAr: "إسلام آباد / راولبندي، باكستان والمكاتب العالمية",
};

export const BAHRAIN_CONTACT: ContactInfo = {
  phone: "+973 32306963",
  phoneTel: "+97332306963",
  whatsappNumber: "97332306963",
  whatsappLink: (msg?: string) =>
    msg
      ? `https://wa.me/97332306963?text=${encodeURIComponent(msg)}`
      : "https://wa.me/97332306963",
  email: "Arizona.consultancy@yahoo.com",
  emailLink: "mailto:Arizona.consultancy@yahoo.com",
  locationEn: "Manama, Kingdom of Bahrain & Global Support Centers",
  locationAr: "المنامة، مملكة البحرين ومراكز الدعم العالمية",
};

interface GeoContextType {
  countryCode: string;
  isPakistan: boolean;
  isLoading: boolean;
  contact: ContactInfo;
  setCountryCode: (code: string) => void;
}

const GeoContext = createContext<GeoContextType>({
  countryCode: "BH",
  isPakistan: false,
  isLoading: true,
  contact: BAHRAIN_CONTACT,
  setCountryCode: () => {},
});

export function GeoProvider({ children }: { children: ReactNode }) {
  // Default to non-Pakistan until live IP confirms PK, or detect immediately
  const [countryCode, setCountryState] = useState<string>("BH");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Clear any old stuck override so live VPN / IP detection always works accurately
    let isCancelled = false;

    const detectCountry = async () => {
      const cb = Date.now();
      
      // Fast parallel IP detection across multiple high-availability endpoints
      const fetchIpwho = async () => {
        const r = await fetch(`https://ipwho.is/?_t=${cb}`, { cache: "no-store" });
        const d = await r.json();
        if (d && d.success !== false && d.country_code) return d.country_code.toUpperCase();
        throw new Error("ipwho failed");
      };

      const fetchCountryIs = async () => {
        const r = await fetch(`https://api.country.is/?_t=${cb}`, { cache: "no-store" });
        const d = await r.json();
        if (d && d.country) return d.country.toUpperCase();
        throw new Error("country.is failed");
      };

      const fetchFreeIp = async () => {
        const r = await fetch(`https://freeipapi.com/api/json?_t=${cb}`, { cache: "no-store" });
        const d = await r.json();
        if (d && d.countryCode) return d.countryCode.toUpperCase();
        throw new Error("freeipapi failed");
      };

      const fetchIpApi = async () => {
        const r = await fetch(`https://ipapi.co/json/?_t=${cb}`, { cache: "no-store" });
        const d = await r.json();
        if (d && !d.error && d.country_code) return d.country_code.toUpperCase();
        throw new Error("ipapi failed");
      };

      try {
        // Run fastest answering API first
        const detectedCode = await Promise.any([
          fetchIpwho(),
          fetchCountryIs(),
          fetchFreeIp(),
          fetchIpApi(),
        ]);

        if (!isCancelled && detectedCode) {
          console.log("[GeoContext] Live IP Detected Country:", detectedCode);
          setCountryState(detectedCode);
          setIsLoading(false);
          return;
        }
      } catch (err) {
        console.warn("[GeoContext] All IP detection endpoints failed, defaulting to Bahrain/Global", err);
      }

      if (!isCancelled) {
        setIsLoading(false);
      }
    };

    detectCountry();

    return () => {
      isCancelled = true;
    };
  }, []);

  const setCountryCode = (code: string) => {
    const upper = code.toUpperCase();
    setCountryState(upper);
  };

  const isPakistan = countryCode === "PK";
  const contact = isPakistan ? PAKISTAN_CONTACT : BAHRAIN_CONTACT;

  return (
    <GeoContext.Provider
      value={{
        countryCode,
        isPakistan,
        isLoading,
        contact,
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

