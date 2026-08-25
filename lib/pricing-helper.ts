/**
 * Helper to display the correct country-specific price:
 * - If Visitor is in Pakistan: Show ONLY PKR price.
 * - If Visitor is in Bahrain/Global: Show ONLY BHD price.
 */
export function getLocalizedPrice(
  item: {
    pricePkr?: string;
    priceBhd?: string;
    basePricePkr?: string;
    basePriceBhd?: string;
    price?: string;
    basePrice?: string;
  },
  isPakistan: boolean
): string {
  if (isPakistan) {
    if (item.pricePkr && item.pricePkr.trim()) return formatPkr(item.pricePkr);
    if (item.basePricePkr && item.basePricePkr.trim()) return formatPkr(item.basePricePkr);
    
    // Check if basePrice contains PKR or BHD
    const raw = item.price || item.basePrice || "";
    if (raw.toLowerCase().includes("bhd") && !raw.toLowerCase().includes("pkr")) {
      return ""; // Don't show BHD in Pakistan
    }
    return raw;
  } else {
    if (item.priceBhd && item.priceBhd.trim()) return formatBhd(item.priceBhd);
    if (item.basePriceBhd && item.basePriceBhd.trim()) return formatBhd(item.basePriceBhd);
    
    // Check if basePrice contains PKR
    const raw = item.price || item.basePrice || "";
    if (raw.toLowerCase().includes("pkr") || raw.toLowerCase().includes("rs")) {
      return ""; // Don't show PKR in Bahrain
    }
    return raw;
  }
}

function formatPkr(val: string): string {
  const clean = val.trim();
  if (clean.toUpperCase().startsWith("PKR") || clean.toUpperCase().startsWith("RS")) {
    return clean;
  }
  return `PKR ${clean}`;
}

function formatBhd(val: string): string {
  const clean = val.trim();
  if (clean.toUpperCase().startsWith("BHD") || clean.toUpperCase().endsWith("BHD")) {
    return clean;
  }
  return `BHD ${clean}`;
}
