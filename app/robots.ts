// app/robots.ts — Robots.txt Generator
// Diakses otomatis di /robots.txt
import type { MetadataRoute } from 'next';

const BASE_URL = 'https://nirvanabalirealestate.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Izinkan semua crawler untuk semua halaman publik
        userAgent: '*',
        allow: '/',
        disallow: [
          '/studio',        // Sanity Studio — tidak boleh terindeks
          '/studio/',
          '/api/',          // API routes internal
          '/_next/',        // Aset internal Next.js
        ],
      },
      {
        // Aturan khusus GPTBot (OpenAI) — diblokir untuk keamanan konten
        userAgent: 'GPTBot',
        disallow: '/',
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
