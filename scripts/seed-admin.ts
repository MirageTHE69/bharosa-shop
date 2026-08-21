// One-time bootstrap: creates (or promotes) the first admin account.
// Run with: npm run seed:admin
// Requires ADMIN_SEED_EMAIL, ADMIN_SEED_PASSWORD, MONGODB_URI in .env.local.

import { config } from 'dotenv';
config({ path: '.env.local' });

import bcrypt from 'bcryptjs';
import { connectDB } from '../src/lib/db/connect';
import { User } from '../src/lib/db/models/User';

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    console.error('Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in .env.local before running this script.');
    process.exit(1);
  }

  await connectDB();

  const existing = await User.findOne({ email });

  if (existing) {
    existing.role = 'admin';
    await existing.save();
    console.log(`Promoted existing user to admin: ${email}`);
  } else {
    const password_hash = await bcrypt.hash(password, 10);
    await User.create({ email, password_hash, full_name: 'Bharosa Admin', role: 'admin' });
    console.log(`Created admin account: ${email}`);
  }

  console.log(`\n✔ ${email} is now an admin. Sign in at /auth/sign-in.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
