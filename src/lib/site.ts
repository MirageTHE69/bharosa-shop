// Canonical public origin, used for metadataBase, canonical URLs, robots.txt and
// sitemap.xml. Override with NEXT_PUBLIC_SITE_URL for preview deployments.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.bharosa.shop').replace(/\/$/, '');

export const SITE_NAME = 'Bharosa Shop';

// Trims free text to a meta-description-friendly length on a word boundary.
export function toMetaDescription(text: string | null | undefined, fallback: string, max = 158): string {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim() || fallback;
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')) || cut}…`;
}
