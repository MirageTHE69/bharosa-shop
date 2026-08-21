import mongoose, { Schema, models, model } from 'mongoose';

export interface UserDoc extends mongoose.Document {
  full_name: string | null;
  email: string;
  password_hash: string;
  role: 'customer' | 'vendor' | 'admin';
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDoc>(
  {
    full_name: { type: String, default: null },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password_hash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'vendor', 'admin'], default: 'customer' },
    phone: { type: String, default: null },
  },
  { timestamps: true }
);

export const User = models.User || model<UserDoc>('User', userSchema);
