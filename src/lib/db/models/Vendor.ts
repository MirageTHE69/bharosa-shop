import mongoose, { Schema, models, model } from 'mongoose';

export interface VendorDoc extends mongoose.Document {
  user_id: mongoose.Types.ObjectId;
  slug: string;
  name: string;
  hindi_name: string | null;
  location: string | null;
  state: string | null;
  certification: string | null;
  certification_id: string | null;
  certification_type: string | null;
  specialty: string | null;
  story: string | null;
  phone: string | null;
  avatar_url: string | null;
  farm_image_url: string | null;
  certification_doc_url: string | null;
  pesticide_free_score: string | null;
  rating: number;
  review_count: number;
  status: 'pending' | 'verified' | 'rejected';
  rejection_reason: string | null;
  verified_at: Date | null;
  verified_by: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const vendorSchema = new Schema<VendorDoc>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    hindi_name: { type: String, default: null },
    location: { type: String, default: null },
    state: { type: String, default: null },
    certification: { type: String, default: null },
    certification_id: { type: String, default: null },
    certification_type: { type: String, default: null },
    specialty: { type: String, default: null },
    story: { type: String, default: null },
    phone: { type: String, default: null },
    avatar_url: { type: String, default: null },
    farm_image_url: { type: String, default: null },
    certification_doc_url: { type: String, default: null },
    pesticide_free_score: { type: String, default: null },
    rating: { type: Number, default: 0 },
    review_count: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    rejection_reason: { type: String, default: null },
    verified_at: { type: Date, default: null },
    verified_by: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

export const Vendor = models.Vendor || model<VendorDoc>('Vendor', vendorSchema);
