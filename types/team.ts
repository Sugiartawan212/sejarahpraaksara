// types/team.ts
// Interface bersama agar tidak ada circular import antara
// Server Component (TeamSection) dan Client Component (TeamCarousel).

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  desc: string;
  color: string;
  imageUrl?: string;
}
