// TimelineSectionWrapper.tsx — Async Server Component
// Bertanggung jawab untuk fetch data Sanity dengan sistem fallback berlapis.
// Tidak perlu "use client" — ini murni server-side.

import { client } from '@/lib/sanity';
import TimelineSection, {
  type TimelineEra,
  STATIC_TIMELINE,
} from './TimelineSection';

// ── GROQ Query ─────────────────────────────────────────────────────────────────
// Field disesuaikan dengan skema baru (title, timeframe, description, features, image).
const TIMELINE_QUERY = `*[_type == "timeline"] | order(order asc) {
  _id,
  title,
  timeframe,
  description,
  features,
  "imageUrl": image.asset->url
}`;

// ── Fetch dengan Fallback Berlapis ─────────────────────────────────────────────
async function getTimelineEras(): Promise<TimelineEra[]> {
  try {
    const data = await client.fetch<TimelineEra[]>(
      TIMELINE_QUERY,
      {},
      { cache: 'no-store' }
    );

    // Guard 1: bukan array atau kosong → pakai fallback
    if (!Array.isArray(data) || data.length === 0) {
      console.info('[TimelineWrapper] Sanity kosong — menggunakan data statis.');
      return STATIC_TIMELINE;
    }

    // Guard 2: ada item yang field title-nya undefined/null → pakai fallback
    const hasInvalidEntry = data.some((era) => !era?.title?.trim());
    if (hasInvalidEntry) {
      console.warn('[TimelineWrapper] Ada data Sanity tidak valid — menggunakan data statis.');
      return STATIC_TIMELINE;
    }

    // Data valid dari Sanity ✅
    return data;

  } catch (err) {
    // Guard 3: network error / konfigurasi salah → JANGAN crash, pakai fallback
    console.warn('[TimelineWrapper] Fetch Sanity gagal — menggunakan data statis.', err);
    return STATIC_TIMELINE;
  }
}

// ── Server Component ───────────────────────────────────────────────────────────
export default async function TimelineSectionWrapper() {
  const eras = await getTimelineEras();
  return <TimelineSection eras={eras} />;
}
