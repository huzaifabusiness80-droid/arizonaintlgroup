export interface CountryItem {
  code: string;
  name: string;
  nameAr: string;
  flag: string;
}

export const WORLDWIDE_COUNTRIES: CountryItem[] = [
  // GCC & Middle East
  { code: "BH", name: "Bahrain", nameAr: "مملكة البحرين", flag: "🇧🇭" },
  { code: "SA", name: "Saudi Arabia", nameAr: "المملكة العربية السعودية", flag: "🇸🇦" },
  { code: "AE", name: "United Arab Emirates (UAE)", nameAr: "الإمارات العربية المتحدة", flag: "🇦🇪" },
  { code: "QA", name: "Qatar", nameAr: "قطر", flag: "🇶🇦" },
  { code: "KW", name: "Kuwait", nameAr: "الكويت", flag: "🇰🇼" },
  { code: "OM", name: "Oman", nameAr: "سلطنة عمان", flag: "🇴🇲" },
  { code: "TR", name: "Turkey", nameAr: "تركيا", flag: "🇹🇷" },
  { code: "EG", name: "Egypt", nameAr: "مصر", flag: "🇪🇬" },
  { code: "JO", name: "Jordan", nameAr: "الأردن", flag: "🇯🇴" },
  { code: "LB", name: "Lebanon", nameAr: "لبنان", flag: "🇱🇧" },
  
  // Asia
  { code: "PK", name: "Pakistan", nameAr: "باكستان", flag: "🇵🇰" },
  { code: "MY", name: "Malaysia", nameAr: "ماليزيا", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", nameAr: "تايلاند", flag: "🇹🇭" },
  { code: "SG", name: "Singapore", nameAr: "سنغافورة", flag: "🇸🇬" },
  { code: "ID", name: "Indonesia", nameAr: "إندونيسيا", flag: "🇮🇩" },
  { code: "JP", name: "Japan", nameAr: "اليابان", flag: "🇯🇵" },
  { code: "CN", name: "China", nameAr: "الصين", flag: "🇨🇳" },
  { code: "KR", name: "South Korea", nameAr: "كوريا الجنوبية", flag: "🇰🇷" },
  { code: "VN", name: "Vietnam", nameAr: "فيتنام", flag: "🇻🇳" },
  { code: "PH", name: "Philippines", nameAr: "الفلبين", flag: "🇵🇭" },
  { code: "AZ", name: "Azerbaijan", nameAr: "أذربيجان", flag: "🇦🇿" },
  { code: "GE", name: "Georgia", nameAr: "جورجيا", flag: "🇬🇪" },
  { code: "KZ", name: "Kazakhstan", nameAr: "كازاخستان", flag: "🇰🇿" },
  { code: "UZ", name: "Uzbekistan", nameAr: "أوزبكستان", flag: "🇺🇿" },
  { code: "MV", name: "Maldives", nameAr: "جزر المالديف", flag: "🇲🇻" },
  { code: "LK", name: "Sri Lanka", nameAr: "سريلانكا", flag: "🇱🇰" },

  // Europe & Schengen
  { code: "ES", name: "Spain (Schengen)", nameAr: "إسبانيا (الشنغن)", flag: "🇪🇸" },
  { code: "GB", name: "United Kingdom (UK)", nameAr: "المملكة المتحدة (بريطانيا)", flag: "🇬🇧" },
  { code: "FR", name: "France (Schengen)", nameAr: "فرنسا (الشنغن)", flag: "🇫🇷" },
  { code: "DE", name: "Germany (Schengen)", nameAr: "ألمانيا (الشنغن)", flag: "🇩🇪" },
  { code: "IT", name: "Italy (Schengen)", nameAr: "إيطاليا (الشنغن)", flag: "🇮🇹" },
  { code: "NL", name: "Netherlands (Schengen)", nameAr: "هولندا (الشنغن)", flag: "🇳🇱" },
  { code: "CH", name: "Switzerland (Schengen)", nameAr: "سويسرا (الشنغن)", flag: "🇨🇭" },
  { code: "AT", name: "Austria (Schengen)", nameAr: "النمسا (الشنغن)", flag: "🇦🇹" },
  { code: "BE", name: "Belgium (Schengen)", nameAr: "بلجيكا (الشنغن)", flag: "🇧🇪" },
  { code: "PT", name: "Portugal (Schengen)", nameAr: "البرتغال (الشنغن)", flag: "🇵🇹" },
  { code: "GR", name: "Greece (Schengen)", nameAr: "اليونان (الشنغن)", flag: "🇬🇷" },
  { code: "SE", name: "Sweden (Schengen)", nameAr: "السويد (الشنغن)", flag: "🇸🇪" },
  { code: "NO", name: "Norway (Schengen)", nameAr: "النرويج (الشنغن)", flag: "🇳🇴" },
  { code: "DK", name: "Denmark (Schengen)", nameAr: "الدنمارك (الشنغن)", flag: "🇩🇰" },
  { code: "FI", name: "Finland (Schengen)", nameAr: "فنلندا (الشنغن)", flag: "🇫🇮" },
  { code: "PL", name: "Poland (Schengen)", nameAr: "بولندا (الشنغن)", flag: "🇵🇱" },
  { code: "CZ", name: "Czech Republic", nameAr: "التشيك", flag: "🇨🇿" },
  { code: "HU", name: "Hungary", nameAr: "المجر", flag: "🇭🇺" },
  { code: "IE", name: "Ireland", nameAr: "أيرلندا", flag: "🇮🇪" },
  { code: "CY", name: "Cyprus", nameAr: "قبرص", flag: "🇨🇾" },
  { code: "RO", name: "Romania", nameAr: "رومانيا", flag: "🇷🇴" },

  // Americas & Oceania
  { code: "US", name: "United States (USA)", nameAr: "الولايات المتحدة (أمريكا)", flag: "🇺🇸" },
  { code: "CA", name: "Canada", nameAr: "كندا", flag: "🇨🇦" },
  { code: "AU", name: "Australia", nameAr: "أستراليا", flag: "🇦🇺" },
  { code: "NZ", name: "New Zealand", nameAr: "نيوزيلندا", flag: "🇳🇿" },
  { code: "BR", name: "Brazil", nameAr: "البرازيل", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", nameAr: "المكسيك", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", nameAr: "الأرجنتين", flag: "🇦🇷" },

  // Africa
  { code: "ZA", name: "South Africa", nameAr: "جنوب إفريقيا", flag: "🇿🇦" },
  { code: "MA", name: "Morocco", nameAr: "المغرب", flag: "🇲🇦" },
  { code: "KE", name: "Kenya", nameAr: "كينيا", flag: "🇰🇪" },
  { code: "TZ", name: "Tanzania (Zanzibar)", nameAr: "تنزانيا (زنجبار)", flag: "🇹🇿" },
  { code: "MU", name: "Mauritius", nameAr: "موريشيوس", flag: "🇲🇺" },
  { code: "SC", name: "Seychelles", nameAr: "سيشل", flag: "🇸🇨" },
];
