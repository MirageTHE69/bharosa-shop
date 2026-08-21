import mongoose, { Schema, models, model } from 'mongoose';

export interface ProductDoc extends mongoose.Document {
  vendor_id: mongoose.Types.ObjectId;
  category_id: mongoose.Types.ObjectId;
  slug: string;
  title: string;
  hindi_title: string | null;
  description: string | null;
  price: number;
  original_price: number | null;
  weight: string | null;
  image_url: string | null;
  badge: string | null;
  batch_code: string | null;
  lab_pesticide_ppm: string | null;
  lab_purity_score: string | null;
  harvest_date: string | null;
  farm_origin: string | null;
  rating: number;
  reviews: number;
  status: 'draft' | 'pending_review' | 'approved' | 'rejected';
  rejection_reason: string | null;
  reviewed_at: Date | null;
  reviewed_by: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductDoc>(
  {
    vendor_id: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    hindi_title: { type: String, default: null },
    description: { type: String, default: null },
    price: { type: Number, required: true },
    original_price: { type: Number, default: null },
    weight: { type: String, default: null },
    image_url: { type: String, default: null },
    badge: { type: String, default: 'Bharosa Verified' },
    batch_code: { type: String, default: null, unique: true, sparse: true },
    lab_pesticide_ppm: { type: String, default: null },
    lab_purity_score: { type: String, default: null },
    harvest_date: { type: String, default: null },
    farm_origin: { type: String, default: null },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['draft', 'pending_review', 'approved', 'rejected'],
      default: 'draft',
    },
    rejection_reason: { type: String, default: null },
    reviewed_at: { type: Date, default: null },
    reviewed_by: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  },
  { timestamps: true }
);

productSchema.index({ vendor_id: 1 });
productSchema.index({ category_id: 1 });
productSchema.index({ status: 1 });

export const Product = models.Product || model<ProductDoc>('Product', productSchema);
