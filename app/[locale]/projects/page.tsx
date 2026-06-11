'use client';

import Link from 'next/link';
import { useState } from 'react';

// ─── Dummy Data (mirrors the updated Sanity 'project' schema) ──────────────────
const dummyProjects = [
  {
    id: 1,
    title: 'Modern Minimalist Kitchen Set',
    slug: 'modern-minimalist-kitchen-set',
    category: 'Kitchen Set',
    service: 'Interior Design',
    location: 'Singaraja, Bali',
    year: '2025',
    designStyle: 'Modern Minimalist',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    span: 'tall', // aspect-[3/4]
  },
  {
    id: 2,
    title: 'Japandi Master Bedroom',
    slug: 'japandi-master-bedroom',
    category: 'Kamar Utama',
    service: 'Interior Design',
    location: 'Denpasar, Bali',
    year: '2025',
    designStyle: 'Japandi',
    mainImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1200&auto=format&fit=crop',
    span: 'wide', // aspect-[16/10]
  },
  {
    id: 3,
    title: 'Classic Luxury Full House',
    slug: 'classic-luxury-full-house',
    category: 'Full House',
    service: 'Architecture',
    location: 'Lovina, Bali',
    year: '2024',
    designStyle: 'Classic',
    mainImage: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=1200&auto=format&fit=crop',
    span: 'tall',
  },
  {
    id: 4,
    title: 'Industrial Living Space',
    slug: 'industrial-living-space',
    category: 'Ruang Tamu',
    service: 'Interior Design',
    location: 'Kuta, Bali',
    year: '2024',
    designStyle: 'Industrial',
    mainImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
    span: 'tall',
  },
  {
    id: 5,
    title: 'Warm Walnut Wardrobe Suite',
    slug: 'warm-walnut-wardrobe',
    category: 'Kamar Utama',
    service: 'Interior Design',
    location: 'Singaraja, Bali',
    year: '2026',
    designStyle: 'Modern Minimalist',
    mainImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop',
    span: 'wide',
  },
  {
    id: 6,
    title: 'Scandinavian Dining Area',
    slug: 'scandinavian-dining-area',
    category: 'Ruang Tamu',
    service: 'Interior Design',
    location: 'Ubud, Bali',
    year: '2026',
    designStyle: 'Japandi',
    mainImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    span: 'tall',
  },
  {
    id: 7,
    title: 'Villa Tepi Sawah — Architecture',
    slug: 'villa-tepi-sawah',
    category: 'Full House',
    service: 'Architecture',
    location: 'Ubud, Bali',
    year: '2025',
    designStyle: 'Classic',
    mainImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop',
    span: 'wide',
  },
];

const FILTERS = ['All', 'Architecture', 'Interior Design'] as const;
type Filter = (typeof FILTERS)[number];

// ─── Project Card Component ────────────────────────────────────────────────────
function ProjectCard({
  project,
  locale,
}: {
  project: (typeof dummyProjects)[number];
  locale: string;
}) {
  const isWide = project.span === 'wide';

  return (
    <div className={`group flex flex-col gap-4 ${isWide ? 'md:col-span-2' : 'col-span-1'}`}>
      {/* ── Image Container ── */}
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="block overflow-hidden rounded-2xl bg-[#1A1A18] flex-shrink-0"
        style={{ aspectRatio: isWide ? '16 / 10' : '3 / 4' }}
        aria-label={`View project: ${project.title}`}
      >
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      {/* ── Text — safely BELOW the image ── */}
      <div className="flex flex-col gap-1 px-1">
        <p className="text-xs tracking-widest uppercase font-light text-[#EBE7E0]/50 font-sans">
          {project.service}
        </p>
        <Link href={`/${locale}/projects/${project.slug}`}>
          <h3 className="font-serif text-lg md:text-xl text-[#EBE7E0] leading-snug hover:text-[#D05B43] transition-colors duration-300">
            {project.title}
          </h3>
        </Link>
        <p className="text-xs text-[#EBE7E0]/35 font-light">{project.location} · {project.year}</p>
      </div>
    </div>
  );
}

// ─── Page Component ────────────────────────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  // Hardcode locale to 'en' for dummy data; replace with useLocale() when live
  const locale = 'en';

  const filtered =
    activeFilter === 'All'
      ? dummyProjects
      : dummyProjects.filter((p) => p.service === activeFilter);

  return (
    <div className="min-h-screen bg-[#1A1A18] text-[#EBE7E0]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 pt-36 pb-32">

        {/* ── Page Header ───────────────────────────────────────────────────── */}
        <div className="mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-[#EBE7E0]/40 font-sans mb-5">
            Portfolio
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl text-[#EBE7E0] tracking-tight leading-none">
              Selected<br />
              <span className="italic text-[#D05B43]">Works</span>
            </h1>
            <p className="text-[#EBE7E0]/50 font-light max-w-sm text-base leading-relaxed md:text-right">
              Koleksi ruang yang tidak hanya estetis namun juga fungsional — dirancang untuk memenuhi standar kemewahan modern.
            </p>
          </div>
        </div>

        {/* ── Divider ───────────────────────────────────────────────────────── */}
        <div className="w-full h-px bg-[#EBE7E0]/10 mb-12" />

        {/* ── Filter Navigation ─────────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 md:gap-4 mb-16 flex-wrap" aria-label="Project filter">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              id={`filter-${filter.toLowerCase().replace(/\s/g, '-')}`}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-5 py-2 text-xs tracking-widest uppercase font-sans font-medium border rounded-full
                transition-all duration-300 cursor-pointer
                ${
                  activeFilter === filter
                    ? 'bg-[#EBE7E0] text-[#1A1A18] border-[#EBE7E0]'
                    : 'bg-transparent text-[#EBE7E0]/50 border-[#EBE7E0]/20 hover:border-[#EBE7E0]/60 hover:text-[#EBE7E0]'
                }
              `}
            >
              {filter}
            </button>
          ))}
          <span className="ml-auto text-xs text-[#EBE7E0]/30 font-light hidden md:block">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          </span>
        </nav>

        {/* ── Asymmetric Grid ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-16">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>

        {/* ── Empty State ───────────────────────────────────────────────────── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <p className="font-serif text-3xl text-[#EBE7E0]/20">No projects found</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="text-xs tracking-widest uppercase text-[#EBE7E0]/40 hover:text-[#EBE7E0] transition-colors underline underline-offset-4"
            >
              Clear filter
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
