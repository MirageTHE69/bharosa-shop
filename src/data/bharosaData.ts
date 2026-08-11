export interface Category {
  id: string;
  nameEn: string;
  nameHi: string;
  description: string;
  image: string;
  itemCount: number;
  featuredProduct: string;
  labTestCertificate: string;
  slug: string;
}

export interface Vendor {
  id: string;
  name: string;
  hindiName: string;
  location: string;
  state: string;
  certification: string;
  certificationId: string;
  verifiedYear: string;
  rating: number;
  reviewCount: number;
  productCount: number;
  specialty: string;
  avatar: string;
  farmImage: string;
  story: string;
  pesticideFreeScore: string;
}

export interface Product {
  id: string;
  title: string;
  hindiTitle: string;
  category: string;
  vendorId: string;
  vendorName: string;
  price: number;
  originalPrice: number;
  weight: string;
  image: string;
  rating: number;
  reviews: number;
  badge: string;
  batchCode: string;
  labPesticidePpm: string;
  labPurityScore: string;
  harvestDate: string;
  farmOrigin: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'spices',
    nameEn: 'Hand-Ground Spices',
    nameHi: 'शुद्ध खड़े एवं पिसे मसाले',
    description: 'Single-origin Lakadong turmeric, Malabar black pepper & aromatic spices with high essential oils.',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    itemCount: 24,
    featuredProduct: 'High-Curcumin Lakadong Turmeric Powder',
    labTestCertificate: 'LAB-2026-SP-904',
    slug: 'spices',
  },
  {
    id: 'ghee',
    nameEn: 'A2 Desi Cow Ghee',
    nameHi: 'A2 देसी गाय का बिलोना घी',
    description: 'Traditional Bilona churned ghee from free-grazing Gir and Sahiwal cows.',
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80',
    itemCount: 12,
    featuredProduct: 'Gir Cow Vedic Bilona A2 Ghee',
    labTestCertificate: 'LAB-2026-GH-112',
    slug: 'ghee',
  },
  {
    id: 'honey',
    nameEn: 'Pure Wild Raw Honey',
    nameHi: 'जंगली प्राकृतिक कच्चा शहद',
    description: 'Unfiltered, unheated forest honey collected by traditional tribal honey gatherers.',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
    featuredProduct: 'Wayanad Wild Forest Mustard Blossom Honey',
    labTestCertificate: 'LAB-2026-HN-441',
    slug: 'honey',
  },
  {
    id: 'oils',
    nameEn: 'Cold-Pressed Oils',
    nameHi: 'लकड़ी की घानी का शुद्ध तेल',
    description: 'Wood-pressed (Kachi Ghani) mustard, sesame, and coconut oil under 45°C.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    itemCount: 18,
    featuredProduct: 'Cold Pressed Black Mustard Oil',
    labTestCertificate: 'LAB-2026-OL-882',
    slug: 'oils',
  },
  {
    id: 'grains',
    nameEn: 'Organic Grains & Millets',
    nameHi: 'देशी अनाज एवं रागी-बाजरा',
    description: 'Unpolished Khapli wheat, organic Ragi, Foxtail millet, and heritage rice varieties.',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    itemCount: 32,
    featuredProduct: 'Ancient Khapli Emmer Wheat Flour',
    labTestCertificate: 'LAB-2026-GR-309',
    slug: 'grains',
  },
  {
    id: 'pulses',
    nameEn: 'Unpolished Organic Dals',
    nameHi: 'बिना पॉलिश की जैविक दालें',
    description: 'Hand-split organic Toor, Chana, Moong, and Urad dal grown without chemical fertilizers.',
    image: 'https://images.unsplash.com/photo-1585994191611-72d373321524?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
    featuredProduct: 'Hand-Milled Desi Unpolished Toor Dal',
    labTestCertificate: 'LAB-2026-DL-710',
    slug: 'pulses',
  },
  {
    id: 'teas',
    nameEn: 'Artisanal Herbal Teas',
    nameHi: 'पारंपरिक जड़ी-बूटी चाय',
    description: 'Whole leaf green tea, Tulsi infusions, and spiced Chai blends from Kangra & Wayanad.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    itemCount: 15,
    featuredProduct: 'Pahadi Tulsi Lemongrass Herbal Tea',
    labTestCertificate: 'LAB-2026-TE-229',
    slug: 'teas',
  },
  {
    id: 'dryfruits',
    nameEn: 'Sun-Dried Fruits & Nuts',
    nameHi: 'कश्मीर के प्राकृतिक मेवे',
    description: 'Kashmiri Mamra almonds, organic walnuts, and sun-dried figs direct from growers.',
    image: 'https://images.unsplash.com/photo-1508061252966-f7274022b54d?auto=format&fit=crop&w=800&q=80',
    itemCount: 14,
    featuredProduct: 'Kashmiri Organic Mamra Badam',
    labTestCertificate: 'LAB-2026-DF-551',
    slug: 'dryfruits',
  },
];

export const VENDORS: Vendor[] = [
  {
    id: 'v1',
    name: "Hari's Organic Apiary & Farms",
    hindiName: 'हरीश प्राकृतिक मधुमक्खी फार्म',
    location: 'Wayanad District',
    state: 'Kerala',
    certification: 'NPOP Organic Verified',
    certificationId: 'NPOP/IND/2024/99182',
    verifiedYear: '2021',
    rating: 4.9,
    reviewCount: 420,
    productCount: 14,
    specialty: 'Wild Forest Raw Honey & Herbal Tea',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    farmImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    story: 'Hari has maintained chemical-free bee corridors across Western Ghats forests for over 18 years, preserving biodiversity.',
    pesticideFreeScore: '100% Zero Residue',
  },
  {
    id: 'v2',
    name: 'Kisan Samriddhi Farmers Co-op',
    hindiName: 'किसान समृद्धि जैविक समिति',
    location: 'Satara',
    state: 'Maharashtra',
    certification: 'PGS-India Organic Certified',
    certificationId: 'PGS-IN/MH/44201',
    verifiedYear: '2020',
    rating: 4.95,
    reviewCount: 890,
    productCount: 28,
    specialty: 'A2 Gir Cow Bilona Ghee & Jaggery',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    farmImage: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    story: 'A collective of 42 small-holder dairy farmers following ancient Vedic bilona techniques using native Gir cow herds.',
    pesticideFreeScore: '100% Zero Residue',
  },
  {
    id: 'v3',
    name: 'Himachal Orchard & Spices',
    hindiName: 'हिमाचल बागवानी संग्रह',
    location: 'Kotgarh Valley',
    state: 'Himachal Pradesh',
    certification: 'FSSAI Organic Certified',
    certificationId: 'FSSAI-ORG-119281',
    verifiedYear: '2022',
    rating: 4.88,
    reviewCount: 310,
    productCount: 16,
    specialty: 'Single-Estate Walnuts & Wild Honey',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    farmImage: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    story: 'High-altitude organic farming nourished strictly by glacier meltwaters and natural compost.',
    pesticideFreeScore: '100% Zero Residue',
  },
  {
    id: 'v4',
    name: 'Pahadi Swad Women Self-Help Group',
    hindiName: 'पहाड़ी स्वाद महिला स्वयं सहायता समूह',
    location: 'Almora',
    state: 'Uttarakhand',
    certification: 'PGS-India Certified',
    certificationId: 'PGS-IN/UT/88902',
    verifiedYear: '2023',
    rating: 4.92,
    reviewCount: 540,
    productCount: 22,
    specialty: 'Hand-Milled Dal & Stone Ground Spices',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    farmImage: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    story: 'Empowering 65 rural women artisans in Kumaon hills producing stone-ground turmeric and unpolished pulses.',
    pesticideFreeScore: '100% Zero Residue',
  },
];

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Vedic Bilona A2 Gir Cow Ghee',
    hindiTitle: 'वैदिक बिलोना A2 गिर गाय घी',
    category: 'ghee',
    vendorId: 'v2',
    vendorName: 'Kisan Samriddhi Co-op',
    price: 1450,
    originalPrice: 1690,
    weight: '500 ml',
    image: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    reviews: 312,
    badge: 'Bharosa Verified',
    batchCode: 'BHAROSA-2026-GHEE-14',
    labPesticidePpm: '0.00 ppm (Not Detected)',
    labPurityScore: '99.9% Pure Fatty Acid Standard',
    harvestDate: 'July 2026',
    farmOrigin: 'Satara, Maharashtra',
    description: 'Made from curd churned bi-directionally with wooden bilona. Rich granular texture and natural golden aroma.',
  },
  {
    id: 'p2',
    title: 'High-Curcumin Lakadong Turmeric Powder',
    hindiTitle: 'उच्च करक्यूमिन लाकाडोंग हल्दी पाउडर',
    category: 'spices',
    vendorId: 'v4',
    vendorName: 'Pahadi Swad Group',
    price: 380,
    originalPrice: 450,
    weight: '250 g',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 184,
    badge: 'Bharosa Verified',
    batchCode: 'BHAROSA-2026-TURM-88',
    labPesticidePpm: '0.00 ppm (Not Detected)',
    labPurityScore: '7.8% Natural Curcumin Level',
    harvestDate: 'June 2026',
    farmOrigin: 'Jaintia Hills, Meghalaya',
    description: 'Organically grown Lakadong turmeric containing over 7.5% natural curcumin. No synthetic color or lead chromate.',
  },
  {
    id: 'p3',
    title: 'Unfiltered Wild Forest Raw Honey',
    hindiTitle: 'कच्चा और प्राकृतिक वन शहद',
    category: 'honey',
    vendorId: 'v1',
    vendorName: "Hari's Organic Apiary",
    price: 650,
    originalPrice: 750,
    weight: '500 g',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    reviews: 240,
    badge: 'Bharosa Verified',
    batchCode: 'BHAROSA-2026-HONEY-09',
    labPesticidePpm: '0.00 ppm (Zero C-4 Sugar Adulteration)',
    labPurityScore: '100% Raw Bee Pollen Intact',
    harvestDate: 'May 2026',
    farmOrigin: 'Wayanad Forest, Kerala',
    description: '100% raw, unpasteurized forest honey filled with natural pollen, enzymes, and medicinal flora notes.',
  },
  {
    id: 'p4',
    title: 'Wood Pressed Mustard Oil (Kachi Ghani)',
    hindiTitle: 'लकड़ी की घानी का कच्चा सरसों का तेल',
    category: 'oils',
    vendorId: 'v2',
    vendorName: 'Kisan Samriddhi Co-op',
    price: 340,
    originalPrice: 400,
    weight: '1 Litre',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    rating: 4.87,
    reviews: 198,
    badge: 'Bharosa Verified',
    batchCode: 'BHAROSA-2026-OIL-02',
    labPesticidePpm: '0.00 ppm (No Hexane or Solvent)',
    labPurityScore: '100% Cold Extracted',
    harvestDate: 'June 2026',
    farmOrigin: 'Alwar & Satara Farms',
    description: 'Extracted slowly in traditional wooden kolhu without heating. Retains natural pungent pungency and heart-healthy Omega 3.',
  },
];

export const TRUST_STEPS = [
  {
    stepNumber: '①',
    titleEn: 'Vendor Vetting & Land Audit',
    titleHi: 'किसान सत्यापन एवं प्रमाण-पत्र जांच',
    description: 'Sellers submit organic certifications (NPOP/PGS), land ownership proofs, and soil audit records. We perform physical farm visits.',
    iconName: 'ShieldCheck',
  },
  {
    stepNumber: '②',
    titleEn: 'Independent Lab Quality Testing',
    titleHi: 'स्वतंत्र लैब जांच एवं गुणवत्ता परीक्षा',
    description: 'Randomized sample testing for 230+ chemical pesticides, heavy metals, adulterants, and artificial preservatives in NABL-accredited labs.',
    iconName: 'Microscope',
  },
  {
    stepNumber: '③',
    titleEn: 'Bharosa Seal & Batch Traceability',
    titleHi: 'भरोसा सील एवं क्यूआर कोड ट्रैकिंग',
    description: 'Approved batches earn the Bharosa Verified Seal. Every package carries a unique QR code linking directly to its lab test report.',
    iconName: 'Award',
  },
];

export const VALUE_PROPOSITIONS = [
  {
    id: 'purity',
    titleEn: 'Pure & Certified',
    headlineHi: 'शुद्ध, सुरक्षित और गुणवत्तापूर्ण',
    description: 'Every item is lab-tested organic with zero chemical residue. We guarantee absolute purity or 100% money back.',
    icon: 'Sparkles',
  },
  {
    id: 'fair',
    titleEn: 'Local & Fair',
    headlineHi: 'आपनों के लिए, बेहतरीन चीज़ें',
    description: 'Products sourced directly from Indian organic farmers with fair price guarantee. Up to 82% of revenue returns to farm families.',
    icon: 'HeartHandshake',
  },
  {
    id: 'fresh',
    titleEn: 'Fresh & Transparent',
    headlineHi: 'भरोसे का वादा, हर बार आपके साथ',
    description: 'Harvested in micro-batches and shipped directly from farms. Scan any package QR code for full farm-to-table traceability.',
    icon: 'ScanLine',
  },
  {
    id: 'eco',
    titleEn: 'Community & Eco-friendly',
    headlineHi: 'हर दिन बेहतर, मिलकर आगे बढ़ें',
    description: 'Supports sustainable soil regeneration, plastic-free eco packaging, and rural livelihoods across 12 Indian states.',
    icon: 'Leaf',
  },
];
