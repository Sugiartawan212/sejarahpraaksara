// app/sitemap.ts — Dynamic Sitemap Generator
// Dijalankan otomatis oleh Next.js di /sitemap.xml
import type { MetadataRoute } from 'next';
import { client } from '@/lib/sanity';

const BASE_URL = 'https://nirvanabalirealestate.com';
const LOCALES = ['en', 'id', 'ru'] as const;

// Halaman statis utama (path relatif tanpa locale)
const STATIC_PATHS = [
  '',          // homepage
  '/properti',
  '/area',
  '/galeri',
  '/kontak',
  '/kurs',
];

/**
 * Bangun URL dengan memperhatikan localePrefix: 'as-needed'
 * - locale 'en' → tanpa prefix (canonical)
 * - locale 'id' / 'ru' → dengan prefix /id atau /ru
 */
function buildUrl(locale: string, path: string): string {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return `${BASE_URL}${prefix}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // ── 1. Halaman Statis × 3 Locale ──────────────────────────────────────────
  for (const path of STATIC_PATHS) {
    const alternates: Record<string, string> = {};
    for (const locale of LOCALES) {
      alternates[locale] = buildUrl(locale, path);
    }

    entries.push({
      url: buildUrl('en', path), // canonical (English tanpa prefix)
      lastModified: new Date(),
      changeFrequency: path === '' ? 'daily' : 'weekly',
      priority: path === '' ? 1.0 : 0.8,
      alternates: {
        languages: alternates,
      },
    });
  }

  // ── 2. Halaman Detail Properti (Dinamis dari Sanity) ─────────────────────
  let propertySlugs: { slug: string; updatedAt: string }[] = [];
  try {
    propertySlugs = await client.fetch(
      `*[_type == "properti" && defined(slug.current)] | order(_updatedAt desc) {
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    );
  } catch (e) {
    console.error('[Sitemap] Gagal fetch slug properti:', e);
  }

  for (const { slug, updatedAt } of propertySlugs) {
    const path = `/properti/${slug}`;
    const alternates: Record<string, string> = {};
    for (const locale of LOCALES) {
      alternates[locale] = buildUrl(locale, path);
    }

    entries.push({
      url: buildUrl('en', path),
      lastModified: new Date(updatedAt),
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: alternates,
      },
    });
  }

  // ── 3. Halaman Detail Area (Dinamis dari Sanity) ──────────────────────────
  let areaSlugs: { slug: string; updatedAt: string }[] = [];
  try {
    areaSlugs = await client.fetch(
      `*[_type == "area" && defined(slug.current)] | order(_updatedAt desc) {
        "slug": slug.current,
        "updatedAt": _updatedAt
      }`
    );
  } catch (e) {
    console.error('[Sitemap] Gagal fetch slug area:', e);
  }

  for (const { slug, updatedAt } of areaSlugs) {
    const path = `/area/${slug}`;
    const alternates: Record<string, string> = {};
    for (const locale of LOCALES) {
      alternates[locale] = buildUrl(locale, path);
    }

    entries.push({
      url: buildUrl('en', path),
      lastModified: new Date(updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: alternates,
      },
    });
  }

  return entries;
}
