// Server Component — tidak perlu "use client"
// Data di-fetch langsung di server saat build/request, lebih cepat & SEO-friendly.

import { client } from '@/lib/sanity';
import TeamCarousel from './TeamCarousel';

// ── Tipe Data ──────────────────────────────────────────────────────────────────
export interface TeamMember {
  _id: string;
  nama: string;
  /** Dari localeText — kita ambil field 'id' (Bahasa Indonesia) */
  peran?: string;
  /** Dari localeText — kita ambil field 'id' */
  bio?: string;
  color?: string;
  imageUrl?: string;
}

// ── Data Fallback Lokal ────────────────────────────────────────────────────────
const fallbackTeamMembers: TeamMember[] = [
  {
    _id: "1",
    nama: "Andi Pratama",
    peran: "Speaker Utama",
    bio: "Bertugas membawakan presentasi dan menjelaskan materi secara interaktif kepada audiens.",
    color: "#D05B43",
  },
  {
    _id: "2",
    nama: "Sugiartawan",
    peran: "UI/UX & Web Dev",
    bio: "Merancang dan membangun website presentasi interaktif ini dari nol dengan animasi memukau.",
    color: "#5C7A5A",
  },
  {
    _id: "3",
    nama: "Budi Wijaya",
    peran: "Riset Materi & Kuis",
    bio: "Mengumpulkan data sejarah pra-aksara yang akurat dan menyusun pertanyaan kuis yang menantang.",
    color: "#D4AF37",
  },
];

// ── GROQ Query ─────────────────────────────────────────────────────────────────
// Mengambil field localeText.id (Bahasa Indonesia) menggunakan proyeksi GROQ
const TEAM_QUERY = `*[_type == "team"] | order(urutan asc) {
  _id,
  "nama": nama,
  "peran": peran.id,
  "bio": bio.id,
  color,
  "imageUrl": foto.asset->url
}`;

// ── Fungsi Fetch Data ──────────────────────────────────────────────────────────
async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    const data = await client.fetch<TeamMember[]>(TEAM_QUERY, {}, {
      // Tidak cache agar data selalu fresh (atau gunakan { next: { revalidate: 3600 } } untuk ISR)
      cache: 'no-store',
    });
    if (data && data.length > 0) return data;
    console.info('[TeamSection] Sanity mengembalikan array kosong — menggunakan fallback.');
    return fallbackTeamMembers;
  } catch (err) {
    console.warn('[TeamSection] Gagal fetch dari Sanity — menggunakan data lokal.', err);
    return fallbackTeamMembers;
  }
}

// ── Server Component Utama ─────────────────────────────────────────────────────
export default async function TeamSection() {
  const teamMembers = await fetchTeamMembers();

  // Render carousel (Client Component) dengan data yang sudah di-fetch di server
  return <TeamCarousel members={teamMembers} />;
}