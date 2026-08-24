import { allVisasData, VisaDetail, businessDivisionsData, BusinessDivision } from "./data";

export interface LocalizedFaqItem {
  id: string;
  category: "all" | "travel" | "visas" | "cars" | "business" | "tech";
  categoryLabel: string;
  question: string;
  answer: string;
}

export const localizedFaqs: { [lang: string]: LocalizedFaqItem[] } = {
  en: [
    {
      id: "cr-setup",
      category: "business",
      categoryLabel: "Business in Bahrain",
      question: "Can foreign investors own 100% of a company in Bahrain without a local sponsor?",
      answer: "Yes, 100%. Under Bahrain Commercial Companies Law, foreign nationals and international corporations can own 100% of most commercial activities (WLL, SPC, or Branch) without requiring a local Bahraini partner or sponsor. Arizona handles the complete MOIC Commercial Registration (CR), memorandum drafting, and legal compliance.",
    },
    {
      id: "visa-timelines",
      category: "visas",
      categoryLabel: "Worldwide Visas",
      question: "What are the processing timelines for Bahrain, Schengen, UK, and USA visas?",
      answer: "Electronic eVisas (Kingdom of Bahrain, Malaysia, Azerbaijan, Thailand) are typically approved within 24 to 72 hours. Stamped embassy visas (Schengen European Countries, UK, USA, Canada, Australia) generally require 2 to 4 weeks depending on embassy appointment slots, biometrics, and official consular evaluation.",
    },
    {
      id: "car-rental-terms",
      category: "cars",
      categoryLabel: "Rent A Car",
      question: "What documents are required to rent a vehicle, and is insurance included?",
      answer: "For Bahrain & GCC residents: Valid Driving License and CPR/National ID. For international tourists: Passport, entry visa, and Home Country / International Driving Permit. Comprehensive standard insurance and 24/7 roadside assistance are fully included across our entire fleet.",
    },
    {
      id: "flight-rebooking",
      category: "travel",
      categoryLabel: "Travel & Tours",
      question: "Can you assist with immediate flight ticket bookings, date changes, and refunds?",
      answer: "Yes. Our dedicated travel desk operates around the clock to provide instant reservations across all major global airlines, convenient rebooking, flight date changes, refund processing, and excess baggage assistance.",
    },
    {
      id: "lmra-residency",
      category: "business",
      categoryLabel: "Business in Bahrain",
      question: "How do I obtain a 2-year Bahrain investor residency visa after company formation?",
      answer: "Once your Commercial Registration (CR) is officially issued by the Ministry of Industry & Commerce (MOIC), Arizona registers your firm with the Labour Market Regulatory Authority (LMRA) and submits your investor visa application to grant you and your family a renewable 2-year residency with multiple entry permits.",
    },
    {
      id: "genuine-smartphones",
      category: "tech",
      categoryLabel: "Mobiles & Tech",
      question: "Are all smartphones, GaN chargers, and audio accessories 100% genuine with warranty?",
      answer: "Every smartphone (Apple iPhone, Samsung Galaxy, Google Pixel) and accessory distributed by Arizona International is 100% authentic, factory sealed, and backed by brand manufacturer warranty with same-day express doorstep delivery in Bahrain.",
    },
    {
      id: "turnkey-office",
      category: "business",
      categoryLabel: "Business in Bahrain",
      question: "Does Arizona provide turnkey physical office spaces with EWA for CR compliance?",
      answer: "Yes. We offer fully furnished, municipality-approved commercial offices complete with Electricity & Water Authority (EWA) connections and lease agreements required for official MOIC Commercial Registration inspections.",
    },
    {
      id: "chauffeur-services",
      category: "cars",
      categoryLabel: "Rent A Car",
      question: "Do you offer executive VIP chauffeur and airport transfer services in Bahrain?",
      answer: "Yes. We provide uniformed, multilingual professional chauffeurs for corporate executives, VIP delegations, wedding occasions, and punctual 24/7 Bahrain International Airport transfers.",
    },
  ],
  ar: [
    {
      id: "cr-setup",
      category: "business",
      categoryLabel: "تأسيس الشركات بالبحرين",
      question: "هل يمكن للمستثمر الأجنبي تملك شركة بنسبة 100% في البحرين دون كفيل محلي؟",
      answer: "نعم، 100%. بموجب قانون الشركات التجارية البحريني، يحق للمستثمرين والشركات الأجنبية تملك 100% من أغلب الأنشطة التجارية (شركة ذات مسؤولية محدودة WLL أو فرع شركة) دون اشتراط شريك بحريني. تتولى أريزونا إصدار السجل التجاري (CR) وعقد التأسيس والتوافق القانوني بالكامل.",
    },
    {
      id: "visa-timelines",
      category: "visas",
      categoryLabel: "تأشيرات السفر حول العالم",
      question: "ما هي المدة المستغرقة لإصدار تأشيرات البحرين، الشنغن، بريطانيا، وأمريكا؟",
      answer: "التأشيرات الإلكترونية (مملكة البحرين، ماليزيا، أذربيجان، تايلاند) تستغرق عادة من 24 إلى 72 ساعة. أما تأشيرات السفارات المطبوعة (دول الشنغن الأوروبية، بريطانيا، أمريكا، كندا) فتستغرق عادة من أسبوعين إلى 4 أسابيع بحسب مواعيد المقابلات والبصمات والتقييم القنصلي.",
    },
    {
      id: "car-rental-terms",
      category: "cars",
      categoryLabel: "تأجير السيارات",
      question: "ما هي المستندات المطلوبة لاستئجار سيارة، وهل التأمين مشمول؟",
      answer: "لمواطني ومقيمي دول الخليج: رخصة قيادة سارية وبطاقة الهوية الوطنية/الذكية. للسياح الدوليين: جواز السفر، تأشيرة الدخول، ورخصة القيادة الدولية. يشمل أسطولنا تأميناً شاملاً وخدمة المساعدة على الطريق على مدار 24 ساعة.",
    },
    {
      id: "flight-rebooking",
      category: "travel",
      categoryLabel: "السياحة والسفر",
      question: "هل تقدمون خدمات حجز تذاكر الطيران الفورية وتعديل التواريخ والاسترجاع؟",
      answer: "نعم. يعمل مكتب حجوزات الطيران لدينا على مدار الساعة لتوفير حجوزات فورية على كافة خطوط الطيران العالمية، مع مرونة كاملة في تعديل التواريخ واسترجاع التذاكر وإضافة الأمتعة.",
    },
    {
      id: "lmra-residency",
      category: "business",
      categoryLabel: "تأسيس الشركات بالبحرين",
      question: "كيف يمكنني الحصول على إقامة مستثمر لمدة سنتين بعد تأسيس الشركة بالبحرين؟",
      answer: "بمجرد صدور السجل التجاري (CR) من وزارة الصناعة والتجارة، تقوم أريزونا بتسجيل منشأتك لدى هيئة تنظيم سوق العمل (LMRA) واستخراج إقامة المستثمر لك ولعائلتك لمدة سنتين قابلة للتجديد مع تأشيرة دخول متعددة.",
    },
    {
      id: "genuine-smartphones",
      category: "tech",
      categoryLabel: "الهواتف والتكنولوجيا",
      question: "هل كافة الهواتف والشواحن والملحقات أصلية 100% ومشمولة بالضمان؟",
      answer: "جميع الهواتف الذكية (آيفون، سامسونج جالاكسي، جوجل بكسل) والإكسسوارات الموزعة من قبل أريزونا أصلية 100% ومختومة بتغليف المصنع ومعتمدة بضمان رسمي مع خدمة التوصيل السريع إلى باب منزلك.",
    },
    {
      id: "turnkey-office",
      category: "business",
      categoryLabel: "تأسيس الشركات بالبحرين",
      question: "هل توفر أريزونا مكاتب فعلية مرخصة ومزودة بعداد كهرباء وماء EWA؟",
      answer: "نعم. نوفر مكاتب تجارية مؤثثة ومطابقة لاشتراطات البلدية ومزودة بحساب الكهرباء والماء (EWA) وعقود إيجار موثقة معتمدة لتفتيش وزارة الصناعة والتجارة.",
    },
    {
      id: "chauffeur-services",
      category: "cars",
      categoryLabel: "تأجير السيارات",
      question: "هل تتوفر لديكم خدمة السائق الخاص (Chauffeur) والتوصيل من وإلى المطار؟",
      answer: "نعم. نوفر سائقين محترفين بلباس رسمي لرجال الأعمال والوفود الدبلوماسية والمناسبات الخاصة، بالإضافة إلى استقبال وتوصيل دقيق من وإلى مطار البحرين الدولي على مدار 24 ساعة.",
    },
  ],
};

export const arabicVisaNames: { [slug: string]: { name: string; country: string; regionName: string; type: string; time: string; tagline: string; overview: string } } = {
  malaysia: {
    name: "تأشيرة ماليزيا السياحية والإلكترونية",
    country: "ماليزيا",
    regionName: "جنوب شرق آسيا",
    type: "تأشيرة سياحية وتجارية إلكترونية",
    time: "3 - 5 أيام عمل",
    tagline: "استكشف كوالالمبور، بينانغ، ولانكاوي مع تأشيرات سريعة",
    overview: "تقدم أريزونا خدمة شاملة لاستخراج تأشيرة ماليزيا الإلكترونية مع تجهيز حجوزات الطيران والفنادق وإصدار التأشيرة المعتمدة إلى بريدك الإلكتروني.",
  },
  spain: {
    name: "تأشيرة إسبانيا (منطقة الشنغن الأوروبية)",
    country: "إسبانيا",
    regionName: "أوروبا (الشنغن)",
    type: "تأشيرة إقامة قصيرة سياحية وتجارية",
    time: "15 - 20 يوم عمل",
    tagline: "سافر عبر 27 دولة أوروبية بتأشيرة الشنغن الإسبانية",
    overview: "نوفر تجهيزاً كاملاً لملف تأشيرة إسبانيا والشنغن، حجز مواعيد BLS، وثائق التأمين الصحي للسفر، وتنسيق كشف الحساب البنكي.",
  },
  bahrain: {
    name: "تأشيرة مملكة البحرين الإلكترونية للمقيمين والسياح",
    country: "مملكة البحرين",
    regionName: "الخليج العربي",
    type: "تأشيرة إلكترونية سياحية ومتعددة الدخول",
    time: "24 - 48 ساعة",
    tagline: "دخول سريع وسلس لمملكة البحرين للمقيمين بدول الخليج والزوار",
    overview: "إصدار رسمي معتمد لتأشيرة البحرين الإلكترونية للزيارة والسياحة والاستثمار مع موافقة سريعة عبر شؤون الجنسية والجوازات والإقامة (NPRA).",
  },
  uk: {
    name: "تأشيرة المملكة المتحدة (UK Standard Visitor)",
    country: "المملكة المتحدة",
    regionName: "أوروبا وبريطانيا",
    type: "تأشيرة سياحة وأعمال قياسية (6 أشهر إلى 10 سنوات)",
    time: "3 - 4 أسابيع",
    tagline: "استكشف لندن والمملكة المتحدة مع خدمة التأشيرات المتخصصة",
    overview: "تجهيز دقيق لنموذج تأشيرة بريطانيا، حجز مواعيد VFS Global للبصمات، وترجمة وتدقيق كافة المستندات المالية والوظيفية.",
  },
  usa: {
    name: "تأشيرة الولايات المتحدة الأمريكية (B1/B2 Visa)",
    country: "الولايات المتحدة",
    regionName: "الأمريكتين",
    type: "تأشيرة سياحة وأعمال B1/B2 متعددة السفرات",
    time: "حسب مواعيد السفارة",
    tagline: "تأشيرة أمريكا لمدة 5 إلى 10 سنوات مع تدريب المقابلة",
    overview: "تعبئة نموذج DS-160 باحترافية، سداد رسوم السفارة، حجز أقرب موعد مقابلة متاح، وتدريب شامل على أسئلة القنصلية الأمريكية.",
  },
  thailand: {
    name: "تأشيرة تايلاند السياحية",
    country: "تايلاند",
    regionName: "جنوب شرق آسيا",
    type: "تأشيرة سياحية وتأشيرة إلكترونية",
    time: "3 - 5 أيام عمل",
    tagline: "استمتع ببانكوك، بوكيت، وباتايا مع موافقات سريعة",
    overview: "تسهيل استخراج تأشيرات تايلاند السياحية مع حجوزات الطيران والفنادق المعتمدة وخدمات الدعم للمسافرين.",
  },
  azerbaijan: {
    name: "تأشيرة أذربيجان (ASAN Visa)",
    country: "أذربيجان",
    regionName: "القوقاز وآسيا",
    type: "تأشيرة إلكترونية سريعة",
    time: "24 - 72 ساعة",
    tagline: "استكشف باكو وجمال القوقاز مع تأشيرة ASAN الفورية",
    overview: "إصدار فوري لتأشيرة أذربيجان الإلكترونية عبر منصة ASAN الرسمية بدون تعقيدات.",
  },
  turkey: {
    name: "تأشيرة تركيا السياحية والإلكترونية",
    country: "تركيا",
    regionName: "أوروبا والشرق الأوسط",
    type: "تأشيرة إلكترونية وتأشيرة ملصق",
    time: "24 ساعة للإلكترونية / أسبوع للملصق",
    tagline: "عش سحر إسطنبول وكبادوكيا مع خدمات التأشيرات السريعة",
    overview: "إصدار فوري للتأشيرة الإلكترونية لحاملي إقامات الخليج وتأشيرات الشنغن، وتجهيز ملفات التأشيرة اللاصقة لمختلف الجنسيات.",
  },
};
