import { connectDB } from '@/lib/db/connect';
import { Category as CategoryModel } from '@/lib/db/models/Category';
import { serializeCategory } from '@/lib/db/serialize';
import type { Category } from '@/types/database';

export async function getAllCategories(): Promise<Category[]> {
  try {
    const conn = await connectDB();
    if (!conn) return [];
    const docs = await CategoryModel.find().sort({ name_en: 1 }).lean();
    return docs.map(serializeCategory);
  } catch (err) {
    console.error('Error fetching categories:', err);
    return [];
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const conn = await connectDB();
    if (!conn) return null;
    const doc = await CategoryModel.findOne({ slug }).lean();
    return doc ? serializeCategory(doc) : null;
  } catch (err) {
    console.error(`Error fetching category with slug "${slug}":`, err);
    return null;
  }
}
