// types/team.ts
// Interface bersama agar tidak ada circular import antara
// Server Component (TeamSection) dan Client Component (TeamCarousel).

export interface TeamMember {
  _id: string;
  name: string;
  role?: string;       // opsional — fallback ke 'Anggota Tim' di UI
  desc?: string;       // opsional — deskripsi dari Sanity (field: description)
  color?: string;      // hanya untuk data statis / fallback
  imageUrl?: string;   // hasil proyeksi GROQ: image.asset->url
}
