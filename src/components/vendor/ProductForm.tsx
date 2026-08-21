'use client';

import React, { useActionState } from 'react';
import { Save } from 'lucide-react';
import { ImageUploadField } from '@/components/ImageUploadField';
import type { ActionResult } from '@/lib/actions/auth';
import type { Category, Product } from '@/types/database';

interface ProductFormProps {
  categories: Category[];
  action: (prevState: ActionResult, formData: FormData) => Promise<ActionResult>;
  initialValues?: Product;
  submitLabel: string;
}

const initialState: ActionResult = {};

export function ProductForm({ categories, action, initialValues, submitLabel }: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5 bg-white border border-[#E7E0CE] rounded-2xl p-6">
      <div>
        <label className="block text-xs font-semibold text-[#6B7263] mb-1">Product Title *</label>
        <input
          type="text"
          name="title"
          required
          defaultValue={initialValues?.title}
          placeholder="e.g. High-Curcumin Lakadong Turmeric Powder"
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#6B7263] mb-1">Hindi Title</label>
        <input
          type="text"
          name="hindiTitle"
          defaultValue={initialValues?.hindi_title ?? ''}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none font-devanagari"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#6B7263] mb-1">Category *</label>
          <select
            name="categoryId"
            required
            defaultValue={initialValues?.category_id ?? ''}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          >
            <option value="" disabled>Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name_en}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7263] mb-1">Weight / Size</label>
          <input
            type="text"
            name="weight"
            defaultValue={initialValues?.weight ?? ''}
            placeholder="e.g. 500 g"
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#6B7263] mb-1">Price (₹) *</label>
          <input
            type="number"
            name="price"
            required
            min={0}
            step="0.01"
            defaultValue={initialValues?.price}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7263] mb-1">Original Price (₹)</label>
          <input
            type="number"
            name="originalPrice"
            min={0}
            step="0.01"
            defaultValue={initialValues?.original_price ?? ''}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#6B7263] mb-1">Description</label>
        <textarea
          name="description"
          rows={3}
          defaultValue={initialValues?.description ?? ''}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none resize-none"
        />
      </div>

      <ImageUploadField bucket="product-images" name="imageUrl" label="Product Photo" defaultValue={initialValues?.image_url} />

      <div className="pt-2 border-t border-[#E7E0CE] space-y-4">
        <p className="text-xs font-semibold text-[#6B7263] uppercase tracking-wide">Lab & Farm Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#6B7263] mb-1">Pesticide Test Result</label>
            <input
              type="text"
              name="labPesticidePpm"
              defaultValue={initialValues?.lab_pesticide_ppm ?? ''}
              placeholder="e.g. 0.00 ppm (Not Detected)"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B7263] mb-1">Purity Score</label>
            <input
              type="text"
              name="labPurityScore"
              defaultValue={initialValues?.lab_purity_score ?? ''}
              placeholder="e.g. 99.9% Pure"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B7263] mb-1">Harvest Date</label>
            <input
              type="text"
              name="harvestDate"
              defaultValue={initialValues?.harvest_date ?? ''}
              placeholder="e.g. July 2026"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B7263] mb-1">Farm Origin</label>
            <input
              type="text"
              name="farmOrigin"
              defaultValue={initialValues?.farm_origin ?? ''}
              placeholder="e.g. Satara, Maharashtra"
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-[#C4611E] hover:bg-[#A84E15] disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <Save className="w-4 h-4" />
        <span>{isPending ? 'Saving…' : submitLabel}</span>
      </button>

      <p className="text-xs text-[#6B7263]">
        Submitting sends this product for admin review. It won&apos;t appear on the storefront until approved.
      </p>
    </form>
  );
}
