// TimelineSectionWrapper.tsx — Async Server Component
// Bertanggung jawab untuk fetch data Sanity dengan sistem fallback berlapis.
// Tidak perlu "use client" — ini murni server-side.

import { client } from '@/lib/sanity';
import TimelineSection, {
  type TimelineEra,
  STATIC_TIMELINE,
} from './TimelineSection';

// ── GROQ Query ─────────────────────────────────────────────────────────────────
// Mengurutkan berdasarkan field 'order' dan memproyeksikan imageUrl dari aset Sanity.
const TIMELINE_QUERY = `*[_type == "timeline"] | order(order asc) {
  _id,
  periode,
  rentangWaktu,
  "deskripsi": deskripsi.id,
  ciriUtama,
  "imageUrl": gambar.asset->url,
  warna,
  order
}`;

// ── Fetch dengan Fallback Berlapis ─────────────────────────────────────────────
async function getTimelineEras(): Promise<TimelineEra[]> {
  try {
    const data = await client.fetch<TimelineEra[]>(
      TIMELINE_QUERY,
      {},
      { cache: 'no-store' }
    );

    // Guard 1: array kosong → pakai fallback
    if (!Array.isArray(data) || data.length === 0) {
      console.info('[TimelineWrapper] Sanity kosong — menggunakan data statis.');
      return STATIC_TIMELINE;
    }

    // Guard 2: ada item yang field utamanya undefined → pakai fallback
    const hasInvalidEntry = data.some((era) => !era?.periode);
    if (hasInvalidEntry) {
      console.warn('[TimelineWrapper] Ada data Sanity tidak valid — menggunakan data statis.');
      return STATIC_TIMELINE;
    }

    // Data valid dari Sanity
    return data;

  } catch (err) {
    // Guard 3: network error / konfigurasi salah → JANGAN crash
    console.warn('[TimelineWrapper] Fetch Sanity gagal — menggunakan data statis.', err);
    return STATIC_TIMELINE;
  }
}

// ── Server Component ───────────────────────────────────────────────────────────
export default async function TimelineSectionWrapper() {
  const eras = await getTimelineEras();
  return <TimelineSection eras={eras} />;
}
