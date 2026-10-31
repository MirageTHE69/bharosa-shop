import ImageKit from 'imagekit';

// Created lazily on first use: constructing ImageKit at module load throws when
// the env vars are absent, which breaks `next build` (page data collection
// imports every route module).
let client: ImageKit | null = null;

export function getImageKit(): ImageKit {
  if (client) return client;

  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    throw new Error('ImageKit is not configured: set IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY and IMAGEKIT_URL_ENDPOINT.');
  }

  client = new ImageKit({ publicKey, privateKey, urlEndpoint });
  return client;
}
