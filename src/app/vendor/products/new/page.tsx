import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getOwnVendor } from '@/lib/data/vendors';
import { getAllCategories } from '@/lib/data/categories';
import { ProductForm } from '@/components/vendor/ProductForm';
import { createProduct } from '@/lib/actions/vendor-products';

export default async function NewProductPage() {
  const currentUser = await getCurrentUser();
  const vendor = currentUser ? await getOwnVendor(currentUser.id) : null;

  if (!vendor || vendor.status !== 'verified') {
    redirect('/vendor/dashboard');
  }

  const categories = await getAllCategories();

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Add Product</h1>
      <ProductForm categories={categories} action={createProduct} submitLabel="Submit for Review" />
    </div>
  );
}
