'use client';

import React, { useActionState } from 'react';
import { Save } from 'lucide-react';
import { ImageUploadField } from '@/components/ImageUploadField';
import { updateVendorProfile } from '@/lib/actions/vendor-profile';
import type { ActionResult } from '@/lib/actions/auth';
import type { Vendor } from '@/types/database';

const initialState: ActionResult = {};

export function VendorProfileForm({ vendor }: { vendor: Vendor }) {
  const [state, formAction, isPending] = useActionState(updateVendorProfile, initialState);

  return (
    <form action={formAction} className="space-y-5 bg-white border border-[#E7E0CE] rounded-2xl p-6">
      <div>
        <label className="block text-xs font-semibold text-[#6B7263] mb-1">Farm / Business Name *</label>
        <input
          type="text"
          name="name"
          required
          defaultValue={vendor.name}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#6B7263] mb-1">Hindi Name</label>
        <input
          type="text"
          name="hindiName"
          defaultValue={vendor.hindi_name ?? ''}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none font-devanagari"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#6B7263] mb-1">Location</label>
          <input
            type="text"
            name="location"
            defaultValue={vendor.location ?? ''}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7263] mb-1">State</label>
          <input
            type="text"
            name="state"
            defaultValue={vendor.state ?? ''}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#6B7263] mb-1">Specialty</label>
        <input
          type="text"
          name="specialty"
          defaultValue={vendor.specialty ?? ''}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#6B7263] mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          defaultValue={vendor.phone ?? ''}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#6B7263] mb-1">Farmer Story</label>
        <textarea
          name="story"
          rows={4}
          defaultValue={vendor.story ?? ''}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent text-sm text-[#24291F] focus:ring-2 focus:ring-[#3F7D46] focus:outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ImageUploadField bucket="vendor-media" name="avatarUrl" label="Avatar Photo" defaultValue={vendor.avatar_url} />
        <ImageUploadField bucket="vendor-media" name="farmImageUrl" label="Farm Photo" defaultValue={vendor.farm_image_url} />
      </div>

      {state.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 bg-[#3F7D46] hover:bg-[#2A5C31] disabled:opacity-60 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center space-x-2"
      >
        <Save className="w-4 h-4" />
        <span>{isPending ? 'Saving…' : 'Save Profile'}</span>
      </button>
    </form>
  );
}
