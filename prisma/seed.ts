import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting Full Production Database Seeding...");

  // 1. Seed Admin User
  await prisma.adminUser.upsert({
    where: { email: "admin@arizonaintlgroup.com" },
    update: {
      name: "Arizona Administrator",
      password: process.env.ADMIN_PASSWORD || "Arizona@2024!",
      role: "SUPER_ADMIN",
    },
    create: {
      email: "admin@arizonaintlgroup.com",
      name: "Arizona Administrator",
      password: process.env.ADMIN_PASSWORD || "Arizona@2024!",
      role: "SUPER_ADMIN",
    },
  });
  console.log("✅ Super Admin verified (admin@arizonaintlgroup.com)");

  // 2. Comprehensive Visas Data with Dual Currency (PKR & BHD) & Packages
  const visas = [
    {
      slug: "bahrain",
      name: "Kingdom of Bahrain eVisa & Investor Residency",
      country: "Bahrain",
      flag: "🇧🇭",
      region: "gcc",
      regionName: "GCC & Middle East",
      type: "Tourist eVisa, Business & Investor Residency",
      processingTime: "1 - 3 Business Days",
      entryType: "Single & Multiple Entry",
      validity: "14 Days to 2 Years",
      heroImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1600&q=85&auto=format&fit=crop",
      cardImage: "https://images.unsplash.com/photo-1548013146-72479768bada?w=700&q=80&auto=format&fit=crop",
      tagline: "Direct Official Visa Clearance from Manama, Kingdom of Bahrain",
      overview: "Official government-accredited visa clearance for visiting Bahrain for tourism, business conferences, family visits, or establishing long-term residency. Arizona provides fast-track NPRA and LMRA approvals with zero hassle.",
      pricePkr: "PKR 28,000",
      priceBhd: "BHD 35",
      options: [
        { name: "14-Day Single Entry Tourist eVisa", price: "PKR 28,000", pricePkr: "PKR 28,000", priceBhd: "BHD 35", period: "14 days", capacity: "1 Applicant", badge: "Fast Track", desc: "Instant digital submission, fast approval, hotel and ticket voucher included." },
        { name: "1-Month Multiple Entry Business Visa", price: "PKR 55,000", pricePkr: "PKR 55,000", priceBhd: "BHD 70", period: "30 days", capacity: "Business", badge: "Popular", desc: "Multiple entries allowed, extended stay, official commercial invite processing." },
        { name: "3-Month Multiple Entry Extension Visa", price: "PKR 95,000", pricePkr: "PKR 95,000", priceBhd: "BHD 120", period: "90 days", capacity: "Extended", badge: "Flexible", desc: "Ideal for investors exploring the market and extended business negotiations." },
        { name: "2-Year Investor & Property Residency", price: "PKR 275,000", pricePkr: "PKR 275,000", priceBhd: "BHD 350", period: "2 years", capacity: "Residency", badge: "Investor VIP", desc: "Full LMRA investor residency, CPR card issuance, health insurance, and family sponsorship." }
      ],
      requirements: [
        "Passport copy with at least 6 months validity",
        "Clear passport-size photograph with white background",
        "Confirmed flight reservation and hotel voucher",
        "Copy of existing GCC residence permit (if applicable)",
      ],
      processSteps: [
        { step: "01", title: "Submit Passport Copy", desc: "Send your scanned documents directly via WhatsApp or online portal." },
        { step: "02", title: "Official NPRA Filing", desc: "Our Manama visa team processes your application through official immigration channels." },
        { step: "03", title: "eVisa Issuance", desc: "Receive your authentic government-approved eVisa PDF directly via WhatsApp & email." },
      ],
      included: [
        "Official Government Fee Submission",
        "Flight Reservation Itinerary",
        "Hotel Accommodation Voucher",
        "24/7 Application Status Tracking"
      ]
    },
    {
      slug: "spain",
      name: "Spain (Schengen Area) Visa",
      country: "Spain",
      flag: "🇪🇸",
      region: "europe",
      regionName: "Europe & Schengen",
      type: "Short-Stay Tourist & Business (Type C)",
      processingTime: "15 - 20 Working Days",
      entryType: "Single & Multiple Entry (27 Schengen Countries)",
      validity: "Up to 90 Days within 180-Day Period",
      heroImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1600&q=85&auto=format&fit=crop",
      cardImage: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=700&q=80&auto=format&fit=crop",
      tagline: "Travel Across 27 European Countries with Certified Schengen File Preparation",
      overview: "Arizona provides end-to-end Spain & Schengen visa application handling, including guaranteed BLS biometrics slot booking, €30,000 Schengen travel insurance, day-by-day travel itinerary, and financial document auditing for maximum approval success.",
      pricePkr: "PKR 185,000",
      priceBhd: "BHD 230",
      options: [
        { name: "Standard Schengen Tourist Package", price: "PKR 185,000", pricePkr: "PKR 185,000", priceBhd: "BHD 230", period: "per applicant", capacity: "Tourist", badge: "Best Seller", desc: "BLS appointment, €30,000 insurance, cover letter, verified hotel & flight reservations." },
        { name: "Executive Business Schengen Package", price: "PKR 250,000", pricePkr: "PKR 250,000", priceBhd: "BHD 310", period: "per applicant", capacity: "Corporate", badge: "VIP Fast Track", desc: "Priority slot booking, corporate invitation verification, customized cover letter." },
        { name: "Family Schengen Group Package", price: "PKR 490,000", pricePkr: "PKR 490,000", priceBhd: "BHD 610", period: "family of 3-4", capacity: "Family Group", badge: "Group Savings", desc: "Comprehensive family dossier, unified appointment slot, and shared itinerary." }
      ],
      requirements: [
        "Passport with at least 2 blank pages (valid 3+ months past travel date)",
        "Two Schengen-standard biometric photos (35x45mm white background)",
        "6-Month original bank statement with official bank stamp & maintenance letter",
        "Employment verification letter / No Objection Certificate (NOC) on letterhead",
        "Round-trip flight booking & verified hotel reservation voucher",
        "Schengen Travel Health Insurance covering minimum €30,000"
      ],
      processSteps: [
        { step: "01", title: "Consultation & Document Audit", desc: "We review your financial profile and prepare a custom checklist." },
        { step: "02", title: "BLS Appointment Slot", desc: "We secure your biometrics appointment date and time." },
        { step: "03", title: "File Submission & Biometrics", desc: "Attend appointment with pre-organized document dossier." },
        { step: "04", title: "Passport Stamping & Delivery", desc: "Receive your stamped passport delivered safely." }
      ],
      included: [
        "Guaranteed BLS Appointment Slot",
        "€30,000 Travel Health Insurance Certificate",
        "Cover Letter & Day-by-Day Travel Itinerary",
        "Confirmed Flight & Hotel Reservation Vouchers"
      ]
    },
    {
      slug: "dubai",
      name: "Dubai & United Arab Emirates (UAE) eVisa",
      country: "United Arab Emirates",
      flag: "🇦🇪",
      region: "gcc",
      regionName: "GCC & Middle East",
      type: "Tourist & Business eVisa",
      processingTime: "24 - 48 Hours",
      entryType: "Single & Multiple Entry",
      validity: "30 - 60 Days",
      heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=85&auto=format&fit=crop",
      cardImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80&auto=format&fit=crop",
      tagline: "Instant Approval UAE Tourist Visas with Express 24-Hour Issuance",
      overview: "Travel to Dubai, Abu Dhabi, and Sharjah effortlessly. Arizona delivers express electronic visas directly to your WhatsApp within 24 to 48 hours with guaranteed immigration submission and zero security deposit.",
      pricePkr: "PKR 35,000",
      priceBhd: "BHD 45",
      options: [
        { name: "30-Day Single Entry Tourist eVisa", price: "PKR 35,000", pricePkr: "PKR 35,000", priceBhd: "BHD 45", period: "30 days", capacity: "1 Person", badge: "Express 24h", desc: "Ideal for short vacations, shopping trips, and transit layovers in Dubai." },
        { name: "60-Day Single Entry Tourist eVisa", price: "PKR 65,000", pricePkr: "PKR 65,000", priceBhd: "BHD 80", period: "60 days", capacity: "1 Person", badge: "Popular", desc: "Extended stay for family visits and exploring business opportunities." },
        { name: "30-Day Multiple Entry Visa", price: "PKR 85,000", pricePkr: "PKR 85,000", priceBhd: "BHD 105", period: "30 days", capacity: "Multiple", badge: "Frequent Flyer", desc: "Unlimited entry and exit to all UAE emirates within 30 days." },
        { name: "60-Day Multiple Entry Visa", price: "PKR 125,000", pricePkr: "PKR 125,000", priceBhd: "BHD 155", period: "60 days", capacity: "Multiple", badge: "Corporate", desc: "Ideal for corporate executives and consultants visiting the UAE regularly." }
      ],
      requirements: [
        "Color scan of passport bio page valid for at least 6 months",
        "Recent passport-size photo with white background",
        "National ID copy",
      ],
      processSteps: [
        { step: "01", title: "Submit Passport Scan", desc: "Send clear photos of your passport and picture on WhatsApp." },
        { step: "02", title: "GDRFA Official Processing", desc: "Application submitted immediately to UAE immigration authorities." },
        { step: "03", title: "Receive eVisa PDF", desc: "Approved visa PDF sent directly to your phone within 24-48 hours." }
      ],
      included: [
        "Official Immigration Fee Filing",
        "Mandatory COVID & Travel Insurance",
        "24/7 WhatsApp Application Support"
      ]
    },
    {
      slug: "uk",
      name: "United Kingdom (UK) Standard Visitor Visa",
      country: "United Kingdom",
      flag: "🇬🇧",
      region: "europe",
      regionName: "Europe & UK",
      type: "Standard Visitor Visa (6 Months / 2 Years / 5 Years)",
      processingTime: "3 - 4 Weeks",
      entryType: "Multiple Entry",
      validity: "6 Months to 10 Years",
      heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1600&q=85&auto=format&fit=crop",
      cardImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=700&q=80&auto=format&fit=crop",
      tagline: "Visit London, Manchester & Edinburgh with Complete UKVI Filing Assistance",
      overview: "Comprehensive UK Visas and Immigration (UKVI) application handling. We organize your complete financial documentation, employment proof, UK invitation sponsor file, and VFS biometric appointment booking for maximum approval success.",
      pricePkr: "PKR 210,000",
      priceBhd: "BHD 260",
      options: [
        { name: "6-Month Standard Visitor Visa", price: "PKR 210,000", pricePkr: "PKR 210,000", priceBhd: "BHD 260", period: "6 months", capacity: "Multiple Entry", badge: "Most Popular", desc: "Full application filing, VFS appointment, cover letter, financial audit." },
        { name: "2-Year Long-Term Visitor Visa", price: "PKR 450,000", pricePkr: "PKR 450,000", priceBhd: "BHD 560", period: "2 years", capacity: "Frequent Traveler", badge: "Long-Term", desc: "Ideal for frequent UK visitors and business travelers with previous travel history." },
        { name: "Priority Fast-Track Visa Filing", price: "PKR 350,000", pricePkr: "PKR 350,000", priceBhd: "BHD 430", period: "5-7 days", capacity: "Urgent", badge: "Express UKVI", desc: "Includes official UKVI priority processing fee and expedited VFS slot." }
      ],
      requirements: [
        "Passport valid for at least 6 months beyond intended stay",
        "Bank statements for the last 6 months showing legitimate source of funds",
        "Employment letter, salary slips, and tax returns (NTN/TaxFilers)",
        "Property or asset documents demonstrating ties to home country",
        "UK hotel reservation or sponsor invitation letter with utility bill"
      ],
      processSteps: [
        { step: "01", title: "UKVI Profile & Form Filling", desc: "Our specialists complete your detailed online UK visa application form." },
        { step: "02", title: "Document Upload & VFS Slot", desc: "All supporting financial and personal documents uploaded digitally." },
        { step: "03", title: "Biometrics Submission", desc: "Visit VFS Global center for photograph and fingerprint scanning." },
        { step: "04", title: "Passport Collection", desc: "Approved visa stamped inside passport ready for collection." }
      ],
      included: [
        "Complete UKVI Online Filing",
        "VFS Appointment Scheduling",
        "Professional Cover Letter & Sponsorship File",
        "Document Scanning & Digital Upload"
      ]
    },
    {
      slug: "malaysia",
      name: "Malaysia Tourist & eVisa",
      country: "Malaysia",
      flag: "🇲🇾",
      region: "asia",
      regionName: "Southeast Asia",
      type: "Tourist & Business eVisa",
      processingTime: "3 - 5 Business Days",
      entryType: "Single & Multiple Entry",
      validity: "30 - 90 Days",
      heroImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1600&q=85&auto=format&fit=crop",
      cardImage: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=700&q=80&auto=format&fit=crop",
      tagline: "Explore Kuala Lumpur, Penang, and Langkawi with Fast-Track eVisa Approvals",
      overview: "Arizona provides end-to-end Malaysia visa processing with verified documentation, flight itinerary reservation, and electronic visa issuance directly to your email and WhatsApp.",
      pricePkr: "PKR 22,000",
      priceBhd: "BHD 28",
      options: [
        { name: "30-Day Single Entry eVisa", price: "PKR 22,000", pricePkr: "PKR 22,000", priceBhd: "BHD 28", period: "30 days", capacity: "Tourist", badge: "Fast Approval", desc: "Direct Malaysian immigration submission, flight and hotel vouchers included." },
        { name: "Multiple Entry eNTRI / Business Visa", price: "PKR 45,000", pricePkr: "PKR 45,000", priceBhd: "BHD 55", period: "90 days", capacity: "Multiple", badge: "Business", desc: "For frequent visitors, conference attendees, and commercial trading." }
      ],
      requirements: [
        "Original Passport valid for at least 6 months",
        "Recent passport-size photograph with white background",
        "Confirmed round-trip flight booking voucher",
        "Confirmed hotel reservation in Malaysia",
        "Bank statement showing sufficient travel funds"
      ],
      processSteps: [
        { step: "01", title: "Submit Passport & Photo", desc: "Send your scanned documents via WhatsApp or visit our office." },
        { step: "02", title: "Application Verification", desc: "Our visa specialists review and file your application with Malaysian Immigration." },
        { step: "03", title: "Receive eVisa PDF", desc: "Receive your official approved eVisa document within 3-5 working days." }
      ],
      included: [
        "Official Immigration Fee Submission",
        "Flight & Hotel Vouchers",
        "24/7 Application Status Tracking"
      ]
    },
    {
      slug: "azerbaijan",
      name: "Azerbaijan ASAN eVisa",
      country: "Azerbaijan",
      flag: "🇦🇿",
      region: "asia",
      regionName: "Caucasus & Asia",
      type: "Standard & Urgent ASAN eVisa",
      processingTime: "3 Hours to 3 Days",
      entryType: "Single Entry",
      validity: "30 Days (within 90-Day Window)",
      heroImage: "https://images.unsplash.com/photo-1584972191378-d70853fc47fc?w=1600&q=85&auto=format&fit=crop",
      cardImage: "https://images.unsplash.com/photo-1584972191378-d70853fc47fc?w=700&q=80&auto=format&fit=crop",
      tagline: "Discover Baku, Gabala, and Shahdag with Guaranteed 3-Hour ASAN eVisa",
      overview: "Official ASAN Visa electronic processing for tourism and business. 100% digital issuance with zero embassy visits and instant delivery to your WhatsApp.",
      pricePkr: "PKR 18,000",
      priceBhd: "BHD 22",
      options: [
        { name: "Standard ASAN eVisa (3 Days)", price: "PKR 18,000", pricePkr: "PKR 18,000", priceBhd: "BHD 22", period: "30 days", capacity: "1 Person", badge: "Standard", desc: "Official government electronic visa delivered in 3 working days." },
        { name: "Super Urgent ASAN eVisa (3 Hours)", price: "PKR 38,000", pricePkr: "PKR 38,000", priceBhd: "BHD 48", period: "30 days", capacity: "1 Person", badge: "Urgent 3-Hour", desc: "Emergency fast-track processing issued within 3-5 hours anytime." }
      ],
      requirements: [
        "Color scan of passport bio page valid for at least 6 months",
        "Travel dates and entry itinerary"
      ],
      processSteps: [
        { step: "01", title: "Submit Passport", desc: "Send passport photo on WhatsApp." },
        { step: "02", title: "ASAN Processing", desc: "Immediate submission on government portal." },
        { step: "03", title: "Receive eVisa PDF", desc: "Receive approved eVisa document ready to travel." }
      ],
      included: [
        "Government ASAN Fee",
        "Official Registration Support",
        "Instant WhatsApp PDF Delivery"
      ]
    }
  ];

  console.log(`Seeding ${visas.length} Visas into Database...`);
  for (let i = 0; i < visas.length; i++) {
    const v = visas[i];
    const pricingData = {
      items: v.included,
      pricePkr: v.pricePkr,
      priceBhd: v.priceBhd,
      options: v.options,
    };

    await prisma.visaListing.upsert({
      where: { slug: v.slug },
      update: {
        name: v.name,
        country: v.country,
        flag: v.flag,
        region: v.region,
        regionName: v.regionName,
        type: v.type,
        processingTime: v.processingTime,
        entryType: v.entryType,
        validity: v.validity,
        heroImage: v.heroImage,
        cardImage: v.cardImage,
        tagline: v.tagline,
        overview: v.overview,
        requirements: v.requirements,
        processSteps: v.processSteps,
        included: pricingData,
        sortOrder: i,
        isActive: true,
      },
      create: {
        slug: v.slug,
        name: v.name,
        country: v.country,
        flag: v.flag,
        region: v.region,
        regionName: v.regionName,
        type: v.type,
        processingTime: v.processingTime,
        entryType: v.entryType,
        validity: v.validity,
        heroImage: v.heroImage,
        cardImage: v.cardImage,
        tagline: v.tagline,
        overview: v.overview,
        requirements: v.requirements,
        processSteps: v.processSteps,
        included: pricingData,
        sortOrder: i,
        isActive: true,
      },
    });
  }
  console.log("✅ All Visas seeded successfully with dual pricing & package tiers!");

  // 3. Bahrain Business Services (Full 9 Services with Dual Pricing & Packages)
  const bahrainServices = [
    {
      slug: "foreign-ownership-cr",
      name: "100% Foreign Ownership (Commercial Registration)",
      description: "Establish W.L.L. companies, SPC, and foreign branches in Bahrain with 100% foreign ownership and zero local sponsor requirements.",
      tag: "100% Foreign Owned",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 280,000",
      priceBhd: "BHD 350",
      about: "Bahrain offers the most attractive regulatory environment in the GCC with 100% foreign ownership across 98% of commercial activities. Arizona manages your entire MOIC Sijilat registration, activity approvals, legal MOA drafting, and CR certificate issuance.",
      options: [
        { name: "With Limited Liability (W.L.L.) Formation", price: "BHD 450", pricePkr: "PKR 360,000", priceBhd: "BHD 450", period: "one-time setup", capacity: "1 - 50 Shareholders", badge: "Most Popular", desc: "Full corporate legal structure, 100% foreign owned, no local sponsor required, multi-activity registration." },
        { name: "Single Person Company (SPC) Setup", price: "BHD 350", pricePkr: "PKR 280,000", priceBhd: "BHD 350", period: "one-time setup", capacity: "Sole Entrepreneur", badge: "Fast Approval", desc: "Ideal for individual business owners, consultants, and IT service providers." },
        { name: "Foreign Company Branch Registration", price: "BHD 650", pricePkr: "PKR 520,000", priceBhd: "BHD 650", period: "one-time setup", capacity: "Global Firms", badge: "International", desc: "Direct legal branch of an international parent company operating in Bahrain and the GCC." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "workload-offense",
      name: "Workload Offense Clearance",
      description: "Legal resolution of LMRA workload ratio violations, labor quota reconciliation, and official administrative offense removal.",
      tag: "LMRA Offence Removal",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 60,000",
      priceBhd: "BHD 75",
      about: "Clear LMRA workload offences swiftly with Arizona International. We handle case reviews, client documentation, legal justification letters, and direct coordination with the Labour Market Regulatory Authority to normalize your company file.",
      options: [
        { name: "Workload Case Review & Audit", price: "BHD 75", pricePkr: "PKR 60,000", priceBhd: "BHD 75", period: "initial audit", capacity: "Full CR Audit", badge: "Express Review", desc: "Complete analysis of company labor files, employee ratios, and LMRA records." },
        { name: "Complete Workload Offense Removal", price: "BHD 180", pricePkr: "PKR 145,000", priceBhd: "BHD 180", period: "per case", capacity: "Direct Filing", badge: "Guaranteed Submission", desc: "Drafting appeals, reconciliation documentation, and securing LMRA clearance." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1600&q=85&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "inspection-offense",
      name: "Inspection Offense Resolution",
      description: "Legal rectifications for LMRA & Ministry of Industry and Commerce (MOIC) onsite inspection violations and CR unblocking.",
      tag: "Inspection Clearance",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 95,000",
      priceBhd: "BHD 120",
      about: "Resolve LMRA, Municipality, and MOIC inspection violations promptly. We assist in rectifying office discrepancies, organizing physical site compliance, and scheduling follow-up inspections to clear all administrative holds.",
      options: [
        { name: "Onsite Inspection Compliance Rectification", price: "BHD 120", pricePkr: "PKR 95,000", priceBhd: "BHD 120", period: "case assistance", capacity: "Commercial Site", badge: "Fast Action", desc: "Physical premise alignment, signboard compliance, EWA validation, and re-inspection filing." },
        { name: "MOIC Sijilat & LMRA Re-Opening", price: "BHD 220", pricePkr: "PKR 175,000", priceBhd: "BHD 220", period: "per CR", capacity: "Full Status Unlock", badge: "Official Removal", desc: "Removal of inspection flags and restoring your CR to normal active standing." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "ceiling-visa-increase",
      name: "Ceiling Visa Increase",
      description: "Expand your company's foreign worker quota and obtain additional LMRA work permit approvals.",
      tag: "Visa Quota Expansion",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 120,000",
      priceBhd: "BHD 150",
      about: "Grow your workforce in Bahrain without restrictions. We prepare justification files, corporate contracts, office space verification, and handle complete LMRA ceiling increase applications to secure the work permits your business requires.",
      options: [
        { name: "Visa Ceiling Increase Assessment", price: "BHD 50", pricePkr: "PKR 40,000", priceBhd: "BHD 50", period: "pre-evaluation", capacity: "Company Size", badge: "Quota Check", desc: "Evaluation of office size, contracts, and business volume against LMRA formula." },
        { name: "Additional Work Permit Ceiling Filing", price: "BHD 150", pricePkr: "PKR 120,000", priceBhd: "BHD 150", period: "per submission", capacity: "Multiple Permits", badge: "High Success", desc: "Submission of business expansion proof, project contracts, and securing expanded visa ceiling." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "turnkey-office-ewa",
      name: "Turnkey Office with EWA",
      description: "Fully compliant commercial workspaces with electricity and water connections approved for CR licensing.",
      tag: "Turnkey Office",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 95,000 / mo",
      priceBhd: "BHD 120 / mo",
      about: "Secure an official MOIC-approved office address in prime business districts (Diplomatic Area, Seef, Manama) equipped with active EWA electricity connections and municipality compliance.",
      options: [
        { name: "Business Incubator Address", price: "BHD 75", pricePkr: "PKR 60,000", priceBhd: "BHD 75", period: "per month", capacity: "Startups & Services", badge: "Cost Saver", desc: "MOIC-approved commercial address with municipality approval." },
        { name: "Furnished Executive Office", price: "BHD 180", pricePkr: "PKR 145,000", priceBhd: "BHD 180", period: "per month", capacity: "3 - 5 Workstations", badge: "EWA Included", desc: "Includes high-speed internet, meeting room access, receptionist, and EWA." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "corporate-bank-account",
      name: "Corporate Bank Account Opening",
      description: "Seamless business bank account opening support with top Bahrain & international banks.",
      tag: "Banking Support",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 120,000",
      priceBhd: "BHD 150",
      about: "We structure your business profile, proof of business, and documentation to pass compliance checks and open corporate multi-currency checking accounts with leading banks in Bahrain.",
      options: [
        { name: "Commercial Corporate Account Assistance", price: "BHD 150", pricePkr: "PKR 120,000", priceBhd: "BHD 150", period: "multi-currency", capacity: "WLL / SPC", badge: "Top Banks", desc: "Assistance with NBB, BBK, Al Salam Bank, AUB, and Standard Chartered." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "lmra-work-permits",
      name: "LMRA Work Permits & Investor Visas",
      description: "Labour Market Regulatory Authority registration, ceiling setup, employee work permits, and investor residency.",
      tag: "LMRA & Visas",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 200,000",
      priceBhd: "BHD 250",
      about: "Complete Labour Market Regulatory Authority (LMRA) enrollment, biometric scheduling, medical checkups, and Bahrain CPR cards for partners, executives, and employees.",
      options: [
        { name: "2-Year Investor Residency Visa", price: "BHD 350", pricePkr: "PKR 280,000", priceBhd: "BHD 350", period: "2-year renewable", capacity: "Business Owners", badge: "Residency", desc: "Includes Bahrain CPR identity card, health insurance, and family sponsorship rights." },
        { name: "LMRA Work Permit Allocation", price: "BHD 150", pricePkr: "PKR 120,000", priceBhd: "BHD 150", period: "per permit", capacity: "Employees", badge: "Work Permits", desc: "Audit and approval for hiring foreign staff and issuing work permits." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "cr-amendments",
      name: "CR Amendments & Annual Renewals",
      description: "Adding business activities, address amendments, shareholder modifications, and annual MOIC renewals.",
      tag: "MOIC Certified",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 80,000",
      priceBhd: "BHD 100",
      about: "Keep your commercial entity in full standing with prompt annual renewals, partner changes, capital increases, and activity amendments.",
      options: [
        { name: "Add/Remove Commercial Activities", price: "BHD 120", pricePkr: "PKR 95,000", priceBhd: "BHD 120", period: "per amendment", capacity: "CR Updates", badge: "MOIC Sijilat", desc: "Updating business scope with relevant ministry approvals." },
        { name: "Annual CR & Municipality Renewal", price: "BHD 95", pricePkr: "PKR 75,000", priceBhd: "BHD 95", period: "annual", capacity: "Compliance", badge: "Fast Renewal", desc: "Complete renewal filing with zero penalty guarantees." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "vat-tax-accounting",
      name: "VAT Registration & Corporate Accounting",
      description: "National Bureau for Revenue (NBR) VAT filing, monthly bookkeeping, audit preparation, and payroll.",
      tag: "VAT & Tax",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 40,000 / mo",
      priceBhd: "BHD 50 / mo",
      about: "Ensure full compliance with Bahrain tax regulations and statutory corporate financial reporting with our certified chartered accountants.",
      options: [
        { name: "NBR VAT Registration Certificate", price: "BHD 100", pricePkr: "PKR 80,000", priceBhd: "BHD 100", period: "one-time", capacity: "Tax ID", badge: "NBR Compliant", desc: "Official VAT registration and issuance of VAT certificate." },
        { name: "Monthly Bookkeeping & VAT Returns", price: "BHD 60", pricePkr: "PKR 48,000", priceBhd: "BHD 60", period: "per month", capacity: "Quarterly Returns", badge: "Accounting", desc: "Complete financial statement preparation, VAT return submissions, and audit prep." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=85&auto=format&fit=crop"
      ]
    }
  ];

  console.log(`Seeding ${bahrainServices.length} Bahrain Corporate Services...`);
  for (let i = 0; i < bahrainServices.length; i++) {
    const item = bahrainServices[i];
    const basePrice = JSON.stringify({
      pkr: item.pricePkr,
      bhd: item.priceBhd,
      text: item.priceBhd,
    });

    await prisma.bahrainService.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        description: item.description,
        tag: item.tag,
        image: item.image,
        basePrice,
        about: item.about,
        options: item.options,
        gallery: item.gallery,
        sortOrder: i,
        isActive: true,
      },
      create: {
        slug: item.slug,
        name: item.name,
        description: item.description,
        tag: item.tag,
        image: item.image,
        basePrice,
        about: item.about,
        options: item.options,
        gallery: item.gallery,
        sortOrder: i,
        isActive: true,
      },
    });
  }
  console.log("✅ All 9 Bahrain Business Services seeded successfully!");

  // 4. Travel & Tours Services
  const tourServices = [
    {
      slug: "flight-tickets",
      name: "Worldwide Flight Tickets & Bookings",
      description: "Instant airline reservations, business class upgrades, group bookings, and 24/7 rescheduling.",
      tag: "Best Airfares",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 45,000",
      priceBhd: "BHD 65",
      about: "Book domestic and international flights across 500+ global airlines with flexible date changes, exclusive corporate discounts, and 24/7 ticket support.",
      options: [
        { name: "Economy Class Seat Booking", price: "PKR 45,000", pricePkr: "PKR 45,000", priceBhd: "BHD 65", period: "one-way / return", capacity: "1 Passenger", badge: "Best Value", desc: "Standard seat, 20-30kg checked baggage, meal included, ticket change flexibility." },
        { name: "Premium Economy / Flex Ticket", price: "PKR 95,000", pricePkr: "PKR 95,000", priceBhd: "BHD 130", period: "flexible route", capacity: "1 Passenger", badge: "Flexible", desc: "Extra legroom, priority boarding, zero cancellation fee, 40kg baggage allowance." },
        { name: "VIP Business Class Suite", price: "PKR 240,000", pricePkr: "PKR 240,000", priceBhd: "BHD 320", period: "VIP journey", capacity: "Lie-Flat Bed", badge: "Luxury VIP", desc: "Lie-flat seating, airport VIP lounge access, gourmet dining, priority baggage handling." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "hotels-resorts",
      name: "Hotels & Luxury Resorts",
      description: "Curated 3-star to 5-star beachfront resorts, downtown executive suites, and private villas.",
      tag: "Verified Stays",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 18,000 / night",
      priceBhd: "BHD 25 / night",
      about: "Enjoy guaranteed lowest rates at top global hospitality chains (Marriott, Hilton, Four Seasons, Rotana) with complimentary breakfast and early check-in.",
      options: [
        { name: "Deluxe City View Room (4-Star)", price: "PKR 18,000", pricePkr: "PKR 18,000", priceBhd: "BHD 25", period: "per night", capacity: "2 Adults", badge: "Best Seller", desc: "King bed, buffet breakfast included, free cancellation up to 24h prior." },
        { name: "Executive Club Suite (5-Star)", price: "PKR 42,000", pricePkr: "PKR 42,000", priceBhd: "BHD 55", period: "per night", capacity: "2 Adults + 1 Child", badge: "Executive", desc: "Lounge access, complimentary evening cocktails, panoramic views, spa discount." },
        { name: "Private Beachfront Villa with Pool", price: "PKR 120,000", pricePkr: "PKR 120,000", priceBhd: "BHD 160", period: "per night", capacity: "4 - 6 Guests", badge: "Luxury VIP", desc: "Private infinity pool, direct beach access, personal butler service, full privacy." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "umrah-spiritual",
      name: "Umrah & Spiritual Journeys",
      description: "Comprehensive Umrah and Ziyarat packages with close-to-Haram hotels and VIP private transfers.",
      tag: "Spiritual Care",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 135,000",
      priceBhd: "BHD 170",
      about: "Our dedicated religious travel department ensures peace of mind for you and your family with verified hotel bookings near the Holy Mosques in Makkah and Madinah, ground transport, and complete visa processing.",
      options: [
        { name: "Economy Umrah Package (10 Days)", price: "PKR 135,000", pricePkr: "PKR 135,000", priceBhd: "BHD 170", period: "per pilgrim", capacity: "Quad Sharing", badge: "Budget Friendly", desc: "Umrah visa, return flights, 3-star hotel within walking distance, and Ziyarat." },
        { name: "Executive 4-Star Umrah (14 Days)", price: "PKR 210,000", pricePkr: "PKR 210,000", priceBhd: "BHD 265", period: "per pilgrim", capacity: "Double / Triple", badge: "Recommended", desc: "4-star hotels in Makkah & Madinah (Clock Tower proximity), GMC transfers." },
        { name: "VIP 5-Star Front Row Stay (10 Days)", price: "PKR 380,000", pricePkr: "PKR 380,000", priceBhd: "BHD 480", period: "per pilgrim", capacity: "Private Room", badge: "Haram View", desc: "Direct Haram view 5-star suite, private luxury SUV, VIP airport meet & assist." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1600&q=85&auto=format&fit=crop"
      ]
    }
  ];

  console.log(`Seeding ${tourServices.length} Tours...`);
  for (let i = 0; i < tourServices.length; i++) {
    const item = tourServices[i];
    const basePrice = JSON.stringify({
      pkr: item.pricePkr,
      bhd: item.priceBhd,
      text: item.pricePkr,
    });

    await prisma.tourService.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        description: item.description,
        tag: item.tag,
        image: item.image,
        basePrice,
        about: item.about,
        options: item.options,
        gallery: item.gallery,
        sortOrder: i,
        isActive: true,
      },
      create: {
        slug: item.slug,
        name: item.name,
        description: item.description,
        tag: item.tag,
        image: item.image,
        basePrice,
        about: item.about,
        options: item.options,
        gallery: item.gallery,
        sortOrder: i,
        isActive: true,
      },
    });
  }
  console.log("✅ Tours seeded successfully!");

  // 5. Rent A Car Services
  const carServices = [
    {
      slug: "daily-rentals",
      name: "Daily & Weekly Self-Drive Rentals",
      description: "Flexible self-drive fleet ranging from economy sedans to luxury SUVs and sports cars.",
      tag: "Flexible Plans",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 4,500 / day",
      priceBhd: "BHD 12 / day",
      about: "Choose from our pristine, late-model vehicle fleet. We deliver and collect directly to your home, office, or airport terminal with zero paperwork hassle.",
      options: [
        { name: "Economy Sedan (Toyota Yaris / Corolla)", price: "PKR 4,500", pricePkr: "PKR 4,500", priceBhd: "BHD 12", period: "per day", capacity: "4 Passengers", badge: "Best Value", desc: "Automatic, AC, Bluetooth, comprehensive insurance, unlimited mileage options." },
        { name: "Executive Sedan (Honda Civic / Camry)", price: "PKR 8,500", pricePkr: "PKR 8,500", priceBhd: "BHD 22", period: "per day", capacity: "5 Passengers", badge: "Executive", desc: "Spacious luxury interior, cruise control, reverse camera, leather seats." },
        { name: "Premium 4x4 (Toyota Prado / Fortuner)", price: "PKR 25,000", pricePkr: "PKR 25,000", priceBhd: "BHD 55", period: "per day", capacity: "7 Passengers", badge: "Family SUV", desc: "4WD luxury SUV, 7 seats, dual AC, perfect for highway and executive travel." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "airport-transfers",
      name: "Airport Meet & Greet Transfers",
      description: "Punctual terminal airport transfers with real-time flight tracking and luggage assistance.",
      tag: "24/7 Transfers",
      image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 5,000",
      priceBhd: "BHD 15",
      about: "Reliable airport pickups and drop-offs with professional drivers waiting for you with a personalized nameboard upon arrival.",
      options: [
        { name: "Sedan Airport Drop-off", price: "PKR 5,000", pricePkr: "PKR 5,000", priceBhd: "BHD 15", period: "one-way", capacity: "3 Passengers + 2 Bags", badge: "Standard", desc: "Punctual driver, direct highway route, air-conditioned comfortable ride." },
        { name: "SUV Airport Arrival Pickup", price: "PKR 8,500", pricePkr: "PKR 8,500", priceBhd: "BHD 22", period: "one-way", capacity: "5 Passengers + 4 Bags", badge: "Family SUV", desc: "Meet & greet with nameboard at arrivals hall, flight delay monitoring." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "vip-chauffeur",
      name: "VIP Uniformed Chauffeur Services",
      description: "Professional uniformed private drivers for corporate executives, VIP delegations, and events.",
      tag: "VIP Protocol",
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 25,000 / day",
      priceBhd: "BHD 45 / day",
      about: "Discreet, experienced multilingual chauffeurs driving Mercedes-Benz, BMW, and luxury SUVs for weddings, diplomatic missions, and corporate tours.",
      options: [
        { name: "Full-Day Chauffeur (Sedan)", price: "PKR 18,000", pricePkr: "PKR 18,000", priceBhd: "BHD 35", period: "10 hours", capacity: "4 Passengers", badge: "Corporate", desc: "Dedicated driver, fuel included within city, executive styling." },
        { name: "VIP Mercedes S-Class Chauffeur", price: "PKR 55,000", pricePkr: "PKR 55,000", priceBhd: "BHD 95", period: "10 hours", capacity: "VIP Executive", badge: "Luxury Elite", desc: "Uniformed driver, complimentary bottled water, onboard Wi-Fi, red carpet protocol." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1563720223185-11003d516935?w=1600&q=85&auto=format&fit=crop"
      ]
    }
  ];

  console.log(`Seeding ${carServices.length} Car Services...`);
  for (let i = 0; i < carServices.length; i++) {
    const item = carServices[i];
    const basePrice = JSON.stringify({
      pkr: item.pricePkr,
      bhd: item.priceBhd,
      text: item.pricePkr,
    });

    await prisma.carService.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        description: item.description,
        tag: item.tag,
        image: item.image,
        basePrice,
        about: item.about,
        options: item.options,
        gallery: item.gallery,
        sortOrder: i,
        isActive: true,
      },
      create: {
        slug: item.slug,
        name: item.name,
        description: item.description,
        tag: item.tag,
        image: item.image,
        basePrice,
        about: item.about,
        options: item.options,
        gallery: item.gallery,
        sortOrder: i,
        isActive: true,
      },
    });
  }
  console.log("✅ Car Services seeded successfully!");

  // 6. Mobiles & Tech Products
  const mobileProducts = [
    {
      slug: "flagship-smartphones",
      name: "Flagship Smartphones (Apple & Samsung)",
      brand: "Apple & Samsung",
      description: "100% genuine factory-sealed iPhone 16 Pro, Galaxy S25 Ultra, and Pixel flagships with official warranty.",
      tag: "100% Genuine",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 345,000",
      priceBhd: "BHD 420",
      about: "Get the latest official Apple iPhones and Samsung Galaxy devices delivered same-day with complete regional warranty and invoice.",
      options: [
        { name: "iPhone 16 Pro (256GB Natural Titanium)", price: "PKR 385,000", pricePkr: "PKR 385,000", priceBhd: "BHD 460", period: "sealed box", capacity: "256GB Storage", badge: "Apple Flagship", desc: "Factory sealed, official Apple warranty, same-day doorstep dispatch." },
        { name: "Samsung Galaxy S25 Ultra (512GB)", price: "PKR 395,000", pricePkr: "PKR 395,000", priceBhd: "BHD 480", period: "sealed box", capacity: "512GB Storage", badge: "AI Flagship", desc: "Galaxy AI onboard, titanium frame, 200MP camera, official Samsung warranty." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&q=85&auto=format&fit=crop"
      ]
    },
    {
      slug: "fast-chargers",
      name: "Certified GaN Fast Chargers & Braided Cables",
      brand: "Anker & Baseus",
      description: "65W to 140W multi-port GaN high-speed chargers and Kevlar-reinforced braided charging cables.",
      tag: "Certified Accessories",
      image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80&auto=format&fit=crop",
      pricePkr: "PKR 8,500",
      priceBhd: "BHD 12",
      about: "Charge laptops, tablets, and phones at maximum speed safely with temperature control and surge protection.",
      options: [
        { name: "65W 3-Port GaN Fast Charger", price: "PKR 8,500", pricePkr: "PKR 8,500", priceBhd: "BHD 12", period: "unit", capacity: "2x USB-C + 1x USB-A", badge: "Compact", desc: "Charges MacBook Pro, iPhone, and iPad simultaneously at full speed." },
        { name: "100W Braided 2-Meter Type-C Cable", price: "PKR 3,500", pricePkr: "PKR 3,500", priceBhd: "BHD 5", period: "unit", capacity: "100W PD", badge: "Heavy Duty", desc: "Reinforced Kevlar braided wire tested for 20,000+ bends." }
      ],
      gallery: [
        "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=1600&q=85&auto=format&fit=crop"
      ]
    }
  ];

  console.log(`Seeding ${mobileProducts.length} Tech Products...`);
  for (let i = 0; i < mobileProducts.length; i++) {
    const item = mobileProducts[i];
    const basePrice = JSON.stringify({
      pkr: item.pricePkr,
      bhd: item.priceBhd,
      text: item.pricePkr,
    });

    await prisma.mobileProduct.upsert({
      where: { slug: item.slug },
      update: {
        name: item.name,
        brand: item.brand,
        description: item.description,
        tag: item.tag,
        image: item.image,
        basePrice,
        about: item.about,
        options: item.options,
        gallery: item.gallery,
        sortOrder: i,
        isActive: true,
      },
      create: {
        slug: item.slug,
        name: item.name,
        brand: item.brand,
        description: item.description,
        tag: item.tag,
        image: item.image,
        basePrice,
        about: item.about,
        options: item.options,
        gallery: item.gallery,
        sortOrder: i,
        isActive: true,
      },
    });
  }
  console.log("✅ Mobile Products seeded successfully!");

  console.log("🎉 FULL PRODUCTION DATABASE SEEDING COMPLETED 100%!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
