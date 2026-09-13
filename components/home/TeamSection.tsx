// Server Component — async, tidak perlu "use client"
// Fetch data dari Sanity di server, lalu teruskan ke TeamCarousel (Client Component).
// Jika Sanity gagal ATAU mengembalikan array kosong → pakai data statis (tidak crash).

import { client } from '@/lib/sanity';
import type { TeamMember } from '@/types/team';
import TeamCarousel from './TeamCarousel';

// ── Data Fallback Statis ───────────────────────────────────────────────────────
const STATIC_MEMBERS: TeamMember[] = [
  {
    _id: 'static-1',
    name: 'Putu Adelia',
    role: 'Anggota Tim',
    desc: 'Berkontribusi dalam penyusunan materi dan penyajian konten sejarah praaksara yang informatif.',
    color: '#D05B43',
  },
  {
    _id: 'static-2',
    name: 'Luh Putu Sarbella',
    role: 'Anggota Tim',
    desc: 'Membantu riset dan pengorganisasian data sejarah agar mudah dipahami oleh audiens.',
    color: '#5C7A5A',
  },
  {
    _id: 'static-3',
    name: 'Luh Putu Laksmi',
    role: 'Anggota Tim',
    desc: 'Berperan dalam penyusunan narasi dan pengeditan konten presentasi sejarah praaksara.',
    color: '#D4AF37',
  },
  {
    _id: 'static-4',
    name: 'Gede Satya',
    role: 'Anggota Tim',
    desc: 'Mendukung pengembangan materi dan memastikan keakuratan fakta-fakta sejarah yang disajikan.',
    color: '#4A7CA8',
  },
  {
    _id: 'static-5',
    name: 'Putu Sukmawardani',
    role: 'Anggota Tim',
    desc: 'Berkontribusi dalam perancangan alur presentasi dan kelengkapan bahan ajar kelompok.',
    color: '#9B59B6',
  },
  {
    _id: 'static-6',
    name: 'Sabrika',
    role: 'Anggota Tim',
    desc: 'Membantu koordinasi tim dan penyusunan konten agar presentasi berjalan lancar dan menarik.',
    color: '#E67E22',
  },
];

// ── GROQ Query ──────────────────────────────────────────────────────────────────
// Mengambil semua data (...) ditambah URL gambar, agar kebal dari salah nama field
const TEAM_QUERY = `*[_type == "team"] | order(order asc) {
  ...,
  "imageUrl": image.asset->url
}`;


// ── Fetch dengan Fallback Kebal Error ─────────────────────────────────────────
async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const data = await client.fetch<TeamMember[]>(
      TEAM_QUERY,
      {},
      { cache: 'no-store' }
    );

    // Jika Sanity mengembalikan data valid → pakai Sanity
    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    // Jika array kosong → pakai fallback statis
    console.info('[TeamSection] Sanity kosong — menggunakan data statis.');
    return STATIC_MEMBERS;

  } catch (err) {
    // Jika fetch gagal (network error, config salah, dll) → JANGAN crash
    console.warn('[TeamSection] Fetch Sanity gagal — menggunakan data statis.', err);
    return STATIC_MEMBERS;
  }
}

// ── Server Component ───────────────────────────────────────────────────────────
export default async function TeamSection() {
  const members = await getTeamMembers();

  // Teruskan data yang sudah siap (dari Sanity atau fallback) ke Client Component
  return <TeamCarousel members={members} />;
}