// Seeds the 8 product categories. Safe to re-run (upserts on slug).
// Run with: npm run seed:categories

import { config } from 'dotenv';
config({ path: '.env.local' });

import { connectDB } from '../src/lib/db/connect';
import { Category } from '../src/lib/db/models/Category';

const CATEGORIES = [
  {
    slug: 'spices',
    name_en: 'Hand-Ground Spices',
    name_hi: 'शुद्ध खड़े एवं पिसे मसाले',
    description: 'Single-origin Lakadong turmeric, Malabar black pepper & aromatic spices with high essential oils. Lab-tested organic spices, zero chemical residue.',
    image_url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'ghee',
    name_en: 'A2 Desi Cow Ghee',
    name_hi: 'A2 देसी गाय का बिलोना घी',
    description: 'Traditional Bilona churned ghee from free-grazing Gir and Sahiwal cows. NABL-tested A2 ghee, hand-churned and lab-verified.',
    image_url: 'https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'honey',
    name_en: 'Pure Wild Raw Honey',
    name_hi: 'जंगली प्राकृतिक कच्चा शहद',
    description: 'Unfiltered, unheated forest honey collected by traditional tribal honey gatherers. Lab-tested raw honey online, direct from farmers.',
    image_url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'oils',
    name_en: 'Cold-Pressed Oils',
    name_hi: 'लकड़ी की घानी का शुद्ध तेल',
    description: 'Wood-pressed (Kachi Ghani) mustard, sesame, and coconut oil under 45°C. Cold-pressed oil online, verified organic marketplace India.',
    image_url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'grains',
    name_en: 'Organic Grains & Millets',
    name_hi: 'देशी अनाज एवं रागी-बाजरा',
    description: 'Unpolished Khapli wheat, organic Ragi, Foxtail millet, and heritage rice varieties.',
    image_url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'pulses',
    name_en: 'Unpolished Organic Dals',
    name_hi: 'बिना पॉलिश की जैविक दालें',
    description: 'Hand-split organic Toor, Chana, Moong, and Urad dal grown without chemical fertilizers.',
    image_url: 'https://images.unsplash.com/photo-1585994191611-72d373321524?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'teas',
    name_en: 'Artisanal Herbal Teas',
    name_hi: 'पारंपरिक जड़ी-बूटी चाय',
    description: 'Whole leaf green tea, Tulsi infusions, and spiced Chai blends from Kangra & Wayanad.',
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'dryfruits',
    name_en: 'Sun-Dried Fruits & Nuts',
    name_hi: 'कश्मीर के प्राकृतिक मेवे',
    description: 'Kashmiri Mamra almonds, organic walnuts, and sun-dried figs direct from growers.',
    image_url: 'https://images.unsplash.com/photo-1508061252966-f7274022b54d?auto=format&fit=crop&w=800&q=80',
  },
];

async function main() {
  await connectDB();

  for (const cat of CATEGORIES) {
    await Category.findOneAndUpdate({ slug: cat.slug }, cat, { upsert: true });
    console.log(`✔ category: ${cat.name_en}`);
  }

  console.log('\nDone.');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
