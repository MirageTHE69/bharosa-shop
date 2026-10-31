// Creates a dedicated DEMO admin account (separate from the real production
// admin in .env.local) so client walkthrough docs never need to expose real
// credentials. Run with: npm run seed:demo-admin
// Requires DEMO_ADMIN_PASSWORD and DEMO_PASSWORD in .env.local. Re-running
// resets both demo accounts to those passwords, so it doubles as a rotation tool.
import { config } from 'dotenv';
config({ path: '.env.local' });

import bcrypt from 'bcryptjs';
import { connectDB } from '../src/lib/db/connect';
import { User } from '../src/lib/db/models/User';

const DEMO_ADMIN_EMAIL = 'demo.admin@bharosa.seed';
const DEMO_CUSTOMER_EMAIL = 'demo.customer@bharosa.seed';

async function main() {
  const adminPassword = process.env.DEMO_ADMIN_PASSWORD;
  const customerPassword = process.env.DEMO_PASSWORD;

  if (!adminPassword || !customerPassword) {
    console.error('Set DEMO_ADMIN_PASSWORD and DEMO_PASSWORD in .env.local before running this script.');
    process.exit(1);
  }

  await connectDB();

  for (const [email, password, role, name] of [
    [DEMO_ADMIN_EMAIL, adminPassword, 'admin', 'Demo Admin'],
    [DEMO_CUSTOMER_EMAIL, customerPassword, 'customer', 'Demo Customer'],
  ] as const) {
    const password_hash = await bcrypt.hash(password, 10);
    const existing = await User.findOne({ email });
    if (existing) {
      existing.role = role;
      existing.password_hash = password_hash;
      await existing.save();
      console.log(`Updated existing user: ${email} -> role ${role}, password reset`);
    } else {
      await User.create({ email, password_hash, full_name: name, role });
      console.log(`Created demo account: ${email} (${role})`);
    }
  }

  console.log('\nDemo accounts ready (passwords are in .env.local):');
  console.log(`  Admin:    ${DEMO_ADMIN_EMAIL}`);
  console.log(`  Customer: ${DEMO_CUSTOMER_EMAIL}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
