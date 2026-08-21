import { notFound, redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import { getOwnVendor } from '@/lib/data/vendors';
import { getAllCategories } from '@/lib/data/categories';
import { getProductById } from '@/lib/data/products';
import { ProductForm } from '@/components/vendor/ProductForm';
import { updateProduct } from '@/lib/actions/vendor-products';

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  const currentUser = await getCurrentUser();
  const vendor = currentUser ? await getOwnVendor(currentUser.id) : null;
  if (!vendor) redirect('/vendor/dashboard');

  const product = await getProductById(id);
  if (!product || product.vendor_id !== vendor.id) notFound();

  const categories = await getAllCategories();
  const boundUpdate = updateProduct.bind(null, product.id);

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="font-serif-display text-2xl font-bold text-[#24291F]">Edit Product</h1>
      <ProductForm
        categories={categories}
        action={boundUpdate}
        initialValues={product}
        submitLabel="Save Changes"
      />
    </div>
  );
}
