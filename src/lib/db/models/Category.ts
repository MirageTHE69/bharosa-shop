import mongoose, { Schema, models, model } from 'mongoose';

export interface CategoryDoc extends mongoose.Document {
  slug: string;
  name_en: string;
  name_hi: string | null;
  description: string | null;
  image_url: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<CategoryDoc>(
  {
    slug: { type: String, required: true, unique: true },
    name_en: { type: String, required: true },
    name_hi: { type: String, default: null },
    description: { type: String, default: null },
    image_url: { type: String, default: null },
  },
  { timestamps: true }
);

export const Category = models.Category || model<CategoryDoc>('Category', categorySchema);
