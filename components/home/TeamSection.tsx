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
    name: 'Andi Pratama',
    role: 'Speaker Utama',
    desc: 'Bertugas membawakan presentasi dan menjelaskan materi secara interaktif kepada audiens.',
    color: '#D05B43',
  },
  {
    _id: 'static-2',
    name: 'Sugiartawan',
    role: 'UI/UX & Web Dev',
    desc: 'Merancang dan membangun website presentasi interaktif ini dari nol dengan animasi memukau.',
    color: '#5C7A5A',
  },
  {
    _id: 'static-3',
    name: 'Budi Wijaya',
    role: 'Riset Materi & Kuis',
    desc: 'Mengumpulkan data sejarah pra-aksara yang akurat dan menyusun pertanyaan kuis yang menantang.',
    color: '#D4AF37',
  },
];

// ── GROQ Query ─────────────────────────────────────────────────────────────────
const TEAM_QUERY = `*[_type == "team"] | order(urutan asc) {
  _id,
  "name": nama,
  "role": peran.id,
  "desc": bio.id,
  color,
  "imageUrl": foto.asset->url
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