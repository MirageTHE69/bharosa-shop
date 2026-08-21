// Seeds the 4 demo vendors + 4 demo products from the original mock data as
// already-verified/approved rows, so the storefront isn't empty on day one
// and there are ready-made demo logins for manual QA.
// Run with: npm run seed:data
// (after `npm run seed:categories` and `npm run seed:admin`)

import { config } from 'dotenv';
config({ path: '.env.local' });

import bcrypt from 'bcryptjs';
import { connectDB } from '../src/lib/db/connect';
import { User } from '../src/lib/db/models/User';
import { Vendor } from '../src/lib/db/models/Vendor';
import { Product } from '../src/lib/db/models/Product';
import { Category } from '../src/lib/db/models/Category';
import { slugify } from '../src/lib/slugify';

const DEMO_PASSWORD = 'BharosaDemo123!';

const VENDORS = [
  {
    email: 'haris.apiary@bharosa.seed',
    name: "Hari's Organic Apiary & Farms",
    hindi_name: 'हरीश प्राकृतिक मधुमक्खी फार्म',
    location: 'Wayanad District',
    state: 'Kerala',
    certification: 'NPOP Organic Verified',
    certification_id: 'NPOP/IND/2024/99182',
    certification_type: 'NPOP Organic',
    specialty: 'Wild Forest Raw Honey & Herbal Tea',
    avatar_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=300&q=80',
    farm_image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    story: 'Hari has maintained chemical-free bee corridors across Western Ghats forests for over 18 years, preserving biodiversity.',
    pesticide_free_score: '100% Zero Residue',
    rating: 4.9,
    review_count: 420,
  },
  {
    email: 'kisan.samriddhi@bharosa.seed',
    name: 'Kisan Samriddhi Farmers Co-op',
    hindi_name: 'किसान समृद्धि जैविक समिति',
    location: 'Satara',
    state: 'Maharashtra',
    certification: 'PGS-India Organic Certified',
    certification_id: 'PGS-IN/MH/44201',
    certification_type: 'PGS-India',
    specialty: 'A2 Gir Cow Bilona Ghee & Jaggery',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    farm_image_url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=800&q=80',
    story: 'A collective of 42 small-holder dairy farmers following ancient Vedic bilona techniques using native Gir cow herds.',
    pesticide_free_score: '100% Zero Residue',
    rating: 4.95,
    review_count: 890,
  },
  {
    email: 'himachal.orchard@bharosa.seed',
    name: 'Himachal Orchard & Spices',
    hindi_name: 'हिमाचल बागवानी संग्रह',
    location: 'Kotgarh Valley',
    state: 'Himachal Pradesh',
    certification: 'FSSAI Organic Certified',
    certification_id: 'FSSAI-ORG-119281',
    certification_type: 'FSSAI Organic',
    specialty: 'Single-Estate Walnuts & Wild Honey',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    farm_image_url: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=800&q=80',
    story: 'High-altitude organic farming nourished strictly by glacier meltwaters and natural compost.',
    pesticide_free_score: '100% Zero Residue',
    rating: 4.88,
    review_count: 310,
  },
  {
    email: 'pahadi.swad@bharosa.seed',
    name: 'Pahadi Swad Women Self-Help Group',
    hindi_name: 'पहाड़ी स्वाद महिला स्वयं सहायता समूह',
    location: 'Almora',
    state: 'Uttarakhand',
    certification: 'PGS-India Certified',
    certification_id: 'PGS-IN/UT/88902',
    certification_type: 'PGS-India',
    specialty: 'Hand-Milled Dal & Stone Ground Spices',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    farm_image_url: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=800&q=80',
    story: 'Empowering 65 rural women artisans in Kumaon hills producing stone-ground turmeric and unpolished pulses.',
    pesticide_free_score: '100% Zero Residue',
    rating: 4.92,
    review_count: 540,
  },
];

const PRODUCTS = [
  {
    vendorEmail: 'kisan.samriddhi@bharosa.seed',
    categorySlug: 'ghee',
    title: 'Vedic Bilona A2 Gir Cow Ghee',
    hindi_title: 'वैदिक बिलोना A2 गिर गाय घी',
    price: 1450,
    original_price: 1690,
    weight: '500 ml',
    image_url: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    reviews: 312,
    batch_code: 'BHAROSA-2026-GHEE-14',
    lab_pesticide_ppm: '0.00 ppm (Not Detected)',
    lab_purity_score: '99.9% Pure Fatty Acid Standard',
    harvest_date: 'July 2026',
    farm_origin: 'Satara, Maharashtra',
    description: 'Made from curd churned bi-directionally with wooden bilona. Rich granular texture and natural golden aroma.',
  },
  {
    vendorEmail: 'pahadi.swad@bharosa.seed',
    categorySlug: 'spices',
    title: 'High-Curcumin Lakadong Turmeric Powder',
    hindi_title: 'उच्च करक्यूमिन लाकाडोंग हल्दी पाउडर',
    price: 380,
    original_price: 450,
    weight: '250 g',
    image_url: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    reviews: 184,
    batch_code: 'BHAROSA-2026-TURM-88',
    lab_pesticide_ppm: '0.00 ppm (Not Detected)',
    lab_purity_score: '7.8% Natural Curcumin Level',
    harvest_date: 'June 2026',
    farm_origin: 'Jaintia Hills, Meghalaya',
    description: 'Organically grown Lakadong turmeric containing over 7.5% natural curcumin. No synthetic color or lead chromate.',
  },
  {
    vendorEmail: 'haris.apiary@bharosa.seed',
    categorySlug: 'honey',
    title: 'Unfiltered Wild Forest Raw Honey',
    hindi_title: 'कच्चा और प्राकृतिक वन शहद',
    price: 650,
    original_price: 750,
    weight: '500 g',
    image_url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    rating: 4.92,
    reviews: 240,
    batch_code: 'BHAROSA-2026-HONEY-09',
    lab_pesticide_ppm: '0.00 ppm (Zero C-4 Sugar Adulteration)',
    lab_purity_score: '100% Raw Bee Pollen Intact',
    harvest_date: 'May 2026',
    farm_origin: 'Wayanad Forest, Kerala',
    description: '100% raw, unpasteurized forest honey filled with natural pollen, enzymes, and medicinal flora notes.',
  },
  {
    vendorEmail: 'kisan.samriddhi@bharosa.seed',
    categorySlug: 'oils',
    title: 'Wood Pressed Mustard Oil (Kachi Ghani)',
    hindi_title: 'लकड़ी की घानी का कच्चा सरसों का तेल',
    price: 340,
    original_price: 400,
    weight: '1 Litre',
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    rating: 4.87,
    reviews: 198,
    batch_code: 'BHAROSA-2026-OIL-02',
    lab_pesticide_ppm: '0.00 ppm (No Hexane or Solvent)',
    lab_purity_score: '100% Cold Extracted',
    harvest_date: 'June 2026',
    farm_origin: 'Alwar & Satara Farms',
    description: 'Extracted slowly in traditional wooden kolhu without heating. Retains natural pungent pungency and heart-healthy Omega 3.',
  },
];

async function main() {
  await connectDB();

  const vendorIdByEmail: Record<string, string> = {};

  for (const v of VENDORS) {
    let user = await User.findOne({ email: v.email });

    if (!user) {
      const password_hash = await bcrypt.hash(DEMO_PASSWORD, 10);
      user = await User.create({ email: v.email, password_hash, full_name: v.name, role: 'vendor' });
    } else {
      user.role = 'vendor';
      await user.save();
    }

    await Vendor.findOneAndUpdate(
      { user_id: user._id },
      {
        user_id: user._id,
        slug: slugify(v.name),
        name: v.name,
        hindi_name: v.hindi_name,
        location: v.location,
        state: v.state,
        certification: v.certification,
        certification_id: v.certification_id,
        certification_type: v.certification_type,
        specialty: v.specialty,
        story: v.story,
        avatar_url: v.avatar_url,
        farm_image_url: v.farm_image_url,
        pesticide_free_score: v.pesticide_free_score,
        rating: v.rating,
        review_count: v.review_count,
        status: 'verified',
        verified_at: new Date(),
      },
      { upsert: true }
    );

    vendorIdByEmail[v.email] = user._id.toString();
    console.log(`✔ vendor: ${v.name}`);
  }

  for (const p of PRODUCTS) {
    const vendor = await Vendor.findOne({ user_id: vendorIdByEmail[p.vendorEmail] }).select('_id');
    const category = await Category.findOne({ slug: p.categorySlug }).select('_id');

    if (!vendor || !category) {
      console.warn(`Skipping "${p.title}" — vendor or category not found.`);
      continue;
    }

    await Product.findOneAndUpdate(
      { slug: slugify(p.title) },
      {
        vendor_id: vendor._id,
        category_id: category._id,
        slug: slugify(p.title),
        title: p.title,
        hindi_title: p.hindi_title,
        description: p.description,
        price: p.price,
        original_price: p.original_price,
        weight: p.weight,
        image_url: p.image_url,
        batch_code: p.batch_code,
        lab_pesticide_ppm: p.lab_pesticide_ppm,
        lab_purity_score: p.lab_purity_score,
        harvest_date: p.harvest_date,
        farm_origin: p.farm_origin,
        rating: p.rating,
        reviews: p.reviews,
        badge: 'Bharosa Verified',
        status: 'approved',
        reviewed_at: new Date(),
      },
      { upsert: true }
    );

    console.log(`✔ product: ${p.title}`);
  }

  console.log(`\nDone. Demo vendor logins use password: ${DEMO_PASSWORD}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
