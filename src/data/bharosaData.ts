// Category/Vendor/Product mock data has moved to MongoDB — see src/types/database.ts
// for the real shapes and src/lib/data/*.ts for how they're fetched. TRUST_STEPS and
// VALUE_PROPOSITIONS below are static marketing copy with no database backing.

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
