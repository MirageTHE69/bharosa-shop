'use client';

import React, { useState } from 'react';
import { Upload, Loader2, CheckCircle2 } from 'lucide-react';

interface ImageUploadFieldProps {
  bucket: 'product-images' | 'vendor-media';
  name: string;
  label: string;
  defaultValue?: string | null;
}

export function ImageUploadField({ bucket, name, label, defaultValue }: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? '');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const body = new FormData();
      body.append('file', file);
      body.append('folder', bucket);

      const res = await fetch('/api/upload', { method: 'POST', body });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Upload failed.');
        return;
      }

      setUrl(data.url);
    } catch {
      setError('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-xs font-semibold text-[#6B7263] mb-1">{label}</label>
      <input type="hidden" name={name} value={url} />

      <div className="flex items-center space-x-3">
        {url && (
          <img src={url} alt="" className="w-14 h-14 rounded-lg object-cover border border-[#E7E0CE]" />
        )}
        <label className="flex-1 cursor-pointer">
          <div className="px-3.5 py-2.5 rounded-lg bg-[#F4EEE1] border border-transparent hover:border-[#3F7D46]/40 text-sm text-[#6B7263] flex items-center justify-center space-x-2 transition-colors">
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : url ? (
              <CheckCircle2 className="w-4 h-4 text-[#3F7D46]" />
            ) : (
              <Upload className="w-4 h-4" />
            )}
            <span>{isUploading ? 'Uploading…' : url ? 'Replace image' : 'Upload image'}</span>
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
