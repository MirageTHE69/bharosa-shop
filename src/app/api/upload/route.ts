import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { imagekit } from '@/lib/imagekit';

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
    const result = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${file.name}`,
      folder: `bharosashop/${folder}/${session.user.id}`,
      useUniqueFileName: false,
    });

    return NextResponse.json({ url: result.url });
  } catch (err) {
    console.error('ImageKit upload failed:', err);
    return NextResponse.json({ error: 'Upload failed. Please try again.' }, { status: 500 });
  }
}
