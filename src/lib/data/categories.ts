import { connectDB } from '@/lib/db/connect';
import { Category as CategoryModel } from '@/lib/db/models/Category';
import { serializeCategory } from '@/lib/db/serialize';
import type { Category } from '@/types/database';

export async function getAllCategories(): Promise<Category[]> {
  await connectDB();
  const docs = await CategoryModel.find().sort({ name_en: 1 }).lean();
  return docs.map(serializeCategory);
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  await connectDB();
  const doc = await CategoryModel.findOne({ slug }).lean();
  return doc ? serializeCategory(doc) : null;
}
