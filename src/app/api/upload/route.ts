import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { cloudinary } from '@/lib/cloudinary';

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_FOLDERS = ['product-images', 'vendor-media', 'vendor-certifications'];

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'You must be signed in.' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const folder = String(formData.get('folder') ?? 'product-images');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }
  if (!ALLOWED_FOLDERS.includes(folder)) {
    return NextResponse.json({ error: 'Invalid upload target.' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File is too large (max 5MB).' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `bharosa-shop/${folder}/${session.user.id}`,
          resource_type: 'auto',
        },
        (error, uploadResult) => {
          if (error || !uploadResult) reject(error ?? new Error('Upload failed'));
          else resolve(uploadResult as { secure_url: string });
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch {
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
