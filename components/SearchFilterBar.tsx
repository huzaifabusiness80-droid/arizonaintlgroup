"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Calendar as CalendarIcon,
  User,
  ChevronDown,
  MapPin,
  Minus,
  Plus,
  Check,
} from "lucide-react";

const popularDestinations = [
  { name: "Bali, Indonesia", tag: "Tropical Beach" },
  { name: "Swiss Alps, Switzerland", tag: "Mountain Escape" },
  { name: "Kyoto & Tokyo, Japan", tag: "Cultural Discovery" },
  { name: "Maldives Atolls", tag: "Luxury Island" },
  { name: "Amalfi Coast, Italy", tag: "Scenic Coastal" },
  { name: "Santorini, Greece", tag: "Mediterranean" },
];

const dateOptions = [
  "Flexible Dates",
  "Aug 28 - Sep 05, 2026",
  "Sep 10 - Sep 18, 2026",
  "Oct 01 - Oct 10, 2026",
  "Winter Holiday 2026",
];

export default function SearchFilterBar() {
  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [activeTravelerTab, setActiveTravelerTab] = useState<"adults" | "children">("adults");

  // Dropdown states
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchSuccess, setSearchSuccess] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const guestRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setIsDestOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target as Node)) {
        setIsGuestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setSearchSuccess(true);
      setTimeout(() => setSearchSuccess(false), 3000);
    }, 800);
  };

  const totalGuests = adults + children;

  return (
    <div className="w-full bg-white rounded-3xl sm:rounded-[28px] p-5 sm:p-6 lg:p-7 shadow-xl border border-neutral-100/80 transition-all duration-300">
      <form onSubmit={handleSearch}>
        {/* Top 3 Field Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pb-5">
          {/* Destination */}
          <div className="relative" ref={destRef}>
            <label className="block text-sm font-medium text-neutral-800 mb-2 tracking-tight">
              Destination?
            </label>
            <div
              onClick={() => setIsDestOpen(!isDestOpen)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-neutral-200/90 hover:border-neutral-400 bg-neutral-50/50 hover:bg-white transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Search className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors shrink-0" />
                <span
                  className={`text-sm truncate ${destination ? "text-neutral-900 font-normal" : "text-neutral-400"
                    }`}
                >
                  {destination || "Origin"}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${isDestOpen ? "rotate-180" : ""
                  }`}
              />
            </div>

            {/* Destination Popover */}
            {isDestOpen && (
              <div className="absolute left-0 top-full mt-2 w-full sm:w-80 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-3 z-50 animate-fade-scale">
                <div className="p-2">
                  <input
                    type="text"
                    placeholder="Type city, island or country..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    autoFocus
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <p className="text-[11px] font-medium text-neutral-400 px-2.5 pt-2 uppercase tracking-wider">
                  Popular Escapes
                </p>
                <div className="mt-1 space-y-1 max-h-48 overflow-y-auto">
                  {popularDestinations.map((item) => (
                    <button
                      type="button"
                      key={item.name}
                      onClick={() => {
                        setDestination(item.name);
                        setIsDestOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-xl text-xs hover:bg-neutral-100 flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                        <span className="font-normal text-neutral-800">{item.name}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400">{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* When Start? */}
          <div className="relative" ref={dateRef}>
            <label className="block text-sm font-medium text-neutral-800 mb-2 tracking-tight">
              When Start?
            </label>
            <div
              onClick={() => setIsDateOpen(!isDateOpen)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-neutral-200/90 hover:border-neutral-400 bg-neutral-50/50 hover:bg-white transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <CalendarIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors shrink-0" />
                <span
                  className={`text-sm truncate ${selectedDate ? "text-neutral-900 font-normal" : "text-neutral-400"
                    }`}
                >
                  {selectedDate || "Select date"}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${isDateOpen ? "rotate-180" : ""
                  }`}
              />
            </div>

            {/* Date Popover */}
            {isDateOpen && (
              <div className="absolute left-0 top-full mt-2 w-full sm:w-72 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-3 z-50 animate-fade-scale">
                <p className="text-[11px] font-medium text-neutral-400 px-2 py-1 uppercase tracking-wider">
                  Upcoming Travel Windows
                </p>
                <div className="space-y-1 mt-1">
                  {dateOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => {
                        setSelectedDate(opt);
                        setIsDateOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${selectedDate === opt
                          ? "bg-neutral-900 text-white font-normal"
                          : "hover:bg-neutral-100 text-neutral-700"
                        }`}
                    >
                      <span>{opt}</span>
                      {selectedDate === opt && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Many People? */}
          <div className="relative" ref={guestRef}>
            <label className="block text-sm font-medium text-neutral-800 mb-2 tracking-tight">
              Many People?
            </label>
            <div
              onClick={() => setIsGuestOpen(!isGuestOpen)}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-neutral-200/90 hover:border-neutral-400 bg-neutral-50/50 hover:bg-white transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <User className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors shrink-0" />
                <span className="text-sm truncate text-neutral-900 font-normal">
                  {totalGuests === 1 ? "1 Guest" : `${totalGuests} Guests`}
                  <span className="text-xs text-neutral-400 ml-1">
                    ({adults}A, {children}C)
                  </span>
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${isGuestOpen ? "rotate-180" : ""
                  }`}
              />
            </div>

            {/* Guests Popover */}
            {isGuestOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-neutral-100 p-4 z-50 animate-fade-scale">
                {/* Adults counter */}
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <div>
                    <p className="text-xs font-medium text-neutral-900">Adults</p>
                    <p className="text-[10px] text-neutral-400">Age 13 and above</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={adults <= 1}
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                      className="p-1 rounded-full border border-neutral-200 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-medium w-4 text-center">{adults}</span>
                    <button
                      type="button"
                      onClick={() => setAdults(adults + 1)}
                      className="p-1 rounded-full border border-neutral-200 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children counter */}
                <div className="flex items-center justify-between py-2 mt-1">
                  <div>
                    <p className="text-xs font-medium text-neutral-900">Children</p>
                    <p className="text-[10px] text-neutral-400">Ages 0 to 12</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={children <= 0}
                      onClick={() => setChildren(Math.max(0, children - 1))}
                      className="p-1 rounded-full border border-neutral-200 hover:bg-neutral-100 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-medium w-4 text-center">{children}</span>
                    <button
                      type="button"
                      onClick={() => setChildren(children + 1)}
                      className="p-1 rounded-full border border-neutral-200 hover:bg-neutral-100 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuestOpen(false)}
                  className="w-full mt-3 py-2 bg-neutral-900 hover:bg-black text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Travelers Section & Search Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Travelers Pill Selector */}
          <div>
            <span className="block text-xs font-medium text-neutral-700 mb-2 tracking-tight">
              Travelers
            </span>
            <div className="flex items-center gap-2">
              {/* Adults Pill */}
              <button
                type="button"
                onClick={() => {
                  setActiveTravelerTab("adults");
                  setIsGuestOpen(true);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${activeTravelerTab === "adults"
                    ? "bg-[#18181b] text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
              >
                <span>Adults</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTravelerTab === "adults" ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"
                    }`}
                >
                  {adults}
                </span>
              </button>

              {/* Children Pill */}
              <button
                type="button"
                onClick={() => {
                  setActiveTravelerTab("children");
                  setIsGuestOpen(true);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${activeTravelerTab === "children"
                    ? "bg-[#18181b] text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
              >
                <span>Children</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTravelerTab === "children" ? "bg-white/20 text-white" : "bg-neutral-200 text-neutral-700"
                    }`}
                >
                  {children}
                </span>
              </button>
            </div>
          </div>

          {/* Search Button */}
          <div className="self-end sm:self-center">
            <button
              type="submit"
              disabled={isSearching}
              className="px-8 py-2.5 rounded-full bg-[#18181b] hover:bg-black text-white text-sm font-medium shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 flex items-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSearching ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : searchSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Found 24 Trips</span>
                </>
              ) : (
                <span>Search</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
