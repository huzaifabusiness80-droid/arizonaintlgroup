"use client";

import React, { useState, useEffect, useRef } from "react";
import { LucideIcon, Loader2 } from "lucide-react";

export interface PlaceItem {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  state?: string;
  display: string;
}

interface CountrySearchInputProps {
  label: string;
  value: string;
  onChange: (val: string, place?: PlaceItem) => void;
  placeholder: string;
  icon: LucideIcon;
  id?: string;
}

export default function CountrySearchInput({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  id,
}: CountrySearchInputProps) {
  const [results, setResults] = useState<PlaceItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    fetch("/api/places")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.results)) {
          setResults(d.results);
        }
      })
      .catch(() => { });
  }, []);

  const searchPlaces = (q: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (!q.trim()) {
      fetch("/api/places")
        .then((r) => r.json())
        .then((d) => {
          if (d.success && Array.isArray(d.results)) setResults(d.results);
        })
        .catch(() => { });
      return;
    }

    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/places?q=${encodeURIComponent(q.trim())}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.results)) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 150);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (place: PlaceItem) => {
    const displayName = `${place.flag} ${place.name}, ${place.country}`;
    setSearchTerm(displayName);
    onChange(displayName, place);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    onChange(val);
    setIsOpen(true);
    searchPlaces(val);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative p-2.5 rounded-md bg-slate-50 border border-slate-200 focus-within:border-[#2563eb] transition-colors"
    >
      <label className="block text-[10px] font-medium uppercase tracking-wider text-slate-500 mb-0.5">
        {label}
      </label>

      <div className="flex items-center gap-2">
        <Icon className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
        <input
          id={id}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => {
            setIsOpen(true);
            if (!results.length) searchPlaces(searchTerm);
          }}
          className="w-full bg-transparent text-xs sm:text-sm font-normal text-slate-900 focus:outline-none placeholder:text-slate-400"
          placeholder={placeholder}
          autoComplete="off"
        />
        {loading && <Loader2 className="w-3 h-3 animate-spin text-[#2563eb] shrink-0" />}
      </div>

      {/* Autocomplete Dropdown List */}
      {isOpen && (
        <div
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-y-auto py-1 text-left"
          style={{ minWidth: 260 }}
        >
          {loading && results.length === 0 ? (
            <div className="px-3 py-2 text-xs text-slate-400 text-center flex items-center justify-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin text-[#2563eb]" />
              <span>Searching cities & countries...</span>
            </div>
          ) : results.length === 0 ? (
            <div className="px-3 py-2 text-xs text-slate-400 text-center">
              No matching location found
            </div>
          ) : (
            results.map((place) => (
              <button
                key={place.id}
                type="button"
                onClick={() => handleSelect(place)}
                className="w-full px-3 py-2 flex items-center justify-between gap-2 text-xs hover:bg-slate-50 transition-colors text-slate-800 cursor-pointer border-b border-slate-100 last:border-none text-left"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0">{place.flag}</span>
                  <div className="min-w-0">
                    <span className="font-medium text-slate-900 block truncate">
                      {place.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {place.state ? `${place.state}, ` : ""}{place.country}
                    </span>
                  </div>
                </div>
                <span className="text-[9px] uppercase font-mono text-slate-400 shrink-0">
                  {place.countryCode}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
