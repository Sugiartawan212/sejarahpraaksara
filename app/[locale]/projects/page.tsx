'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// ─── Dummy Data ───
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
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
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
    mainImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&auto=format&fit=crop',
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
    mainImage: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=1600&auto=format&fit=crop',
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
    mainImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop',
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
    mainImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1600&auto=format&fit=crop',
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
    mainImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop',
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
    mainImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1600&auto=format&fit=crop',
  },
];

const FILTERS = ['All', 'Architecture', 'Interior Design'] as const;
type Filter = (typeof FILTERS)[number];

// ─── Component: Project Card ─────────────────────────────────────────
function ProjectCard({
  project,
  locale,
}: {
  project: (typeof dummyProjects)[number];
  locale: string;
}) {
  return (
    <div className="group flex flex-col gap-6 w-full">
      <Link
        href={`/${locale}/projects/${project.slug}`}
        className="block overflow-hidden rounded-xl md:rounded-2xl bg-[#E2DECA] w-full aspect-[4/3] md:aspect-[21/9] relative shadow-sm"
        aria-label={`View project: ${project.title}`}
      >
        <img
          src={project.mainImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Overlay gelap pas di-hover */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* ── TOMBOL PERMANEN (Warna Akurat Sesuai Navbar Baru) ── */}
        <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-10 flex items-center justify-center">
          <span className="bg-[#3A3935]/95 backdrop-blur-md text-[#EEEBE4] px-6 py-3 md:px-7 md:py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest shadow-md hover:bg-[#2A2A27] transition-colors duration-300 flex items-center gap-2">
            Lihat Project <span className="text-lg leading-none">→</span>
          </span>
        </div>
      </Link>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 px-2 md:px-4">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.2em] uppercase font-bold text-[#5C7A5A] font-sans">
            {project.service} — {project.category}
          </p>
          <Link href={`/${locale}/projects/${project.slug}`}>
            <h3 className="font-serif text-2xl md:text-4xl text-[#2A2A27] font-bold leading-snug group-hover:text-[#5C7A5A] transition-colors duration-500">
              {project.title}
            </h3>
          </Link>
        </div>

        <div className="flex flex-col md:text-right mt-1 md:mt-0 border-t md:border-t-0 border-[#2A2A27]/20 pt-3 md:pt-0">
          <p className="text-sm font-bold text-[#2A2A27]">{project.location}</p>
          <p className="text-xs text-[#2A2A27]/80 font-medium tracking-widest mt-1">{project.year}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────
export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All');
  const [isLoaded, setIsLoaded] = useState(false);
  const locale = 'en';

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filtered =
    activeFilter === 'All'
      ? dummyProjects
      : dummyProjects.filter((p) => p.service === activeFilter);

  return (
    <div className="min-h-screen bg-[#EEEBE4] text-[#2A2A27] selection:bg-[#5C7A5A] selection:text-[#EEEBE4]">

      {/* ── 1. ASYMMETRICAL CURVED HERO SECTION (Dipertinggi) ── 
          Height dinaikkan ke h-[75vh] md:h-[85vh] agar frame foto lebih ke bawah, 
          sehingga teks punya ruang lapang di tengah. */}
      <div className="relative w-full h-[75vh] md:h-[85vh] flex flex-col items-center justify-center text-center mb-16 md:mb-24 bg-[#E2DECA]">

        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
            alt="Umah Luwung Portfolio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* ── CUSTOM SVG CURVE (Swoop Dikembalikan) ── */}
        <svg
          className="absolute bottom-0 w-full h-[150px] md:h-[250px] lg:h-[300px] text-[#EEEBE4] pointer-events-none"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,80 C300,350 900,280 1440,120 L1440,300 L0,300 Z"
            fill="currentColor"
          />
        </svg>

        {/* Teks Konten - Karena frame lebih tinggi, teks otomatis aman di tengah */}
        <div
          className={`relative z-10 max-w-4xl transform transition-all duration-1000 ease-out pb-10 md:pb-20 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
        >
          <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-white font-bold font-sans mb-6 drop-shadow-md">
            Portfolio
          </p>
          <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.1] mb-6 md:mb-8 drop-shadow-lg">
            Selected<br />
            <span className="italic text-[#84A98C]">Works</span>
          </h1>
          <p className="font-sans font-semibold text-white max-w-lg mx-auto text-sm md:text-lg leading-relaxed drop-shadow-md px-4">
            Koleksi ruang yang tidak hanya estetis namun juga fungsional — dirancang untuk memenuhi standar kemewahan modern.
          </p>
        </div>
      </div>

      {/* ── CONTAINER UTAMA UNTUK FILTER & GRID ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 pb-32">

        {/* ── Filter Navigation ── */}
        <nav className="flex items-center gap-2 md:gap-4 mb-16 md:mb-24 flex-wrap" aria-label="Project filter">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`
                px-5 py-2 text-xs tracking-widest uppercase font-sans font-bold border rounded-full
                transition-all duration-300 cursor-pointer
                ${activeFilter === filter
                  ? 'bg-[#5C7A5A] text-[#EEEBE4] border-[#5C7A5A] shadow-sm'
                  : 'bg-transparent text-[#2A2A27] border-[#2A2A27]/40 hover:border-[#5C7A5A] hover:text-[#5C7A5A]'
                }
              `}
            >
              {filter}
            </button>
          ))}
          <span className="ml-auto text-xs tracking-[0.2em] text-[#2A2A27] font-extrabold hidden md:block border-b-2 border-[#5C7A5A] pb-1">
            {filtered.length} PROJECT{filtered.length !== 1 ? 'S' : ''}
          </span>
        </nav>

        {/* ── Project Grid ── */}
        <div className="flex flex-col gap-y-28 md:gap-y-40">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} locale={locale} />
          ))}
        </div>

        {/* ── Empty State ── */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <p className="font-serif text-3xl font-bold text-[#2A2A27]/40">No projects found</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="text-xs tracking-widest uppercase font-bold text-[#5C7A5A] hover:text-[#2A2A27] transition-colors underline underline-offset-4"
            >
              Clear filter
            </button>
          </div>
        )}

      </div>
    </div>
  );
}