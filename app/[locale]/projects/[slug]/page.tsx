import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin, CalendarDays, Ruler, Briefcase } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface StoryBlock {
  _type: 'block';
  _key: string;
  style?: string;
  children: { _type: 'span'; _key: string; text: string; marks?: string[] }[];
}

interface GalleryImage {
  _key: string;
  url: string;
  alt?: string;
}

interface Project {
  id: number;
  title: string;
  slug: string;
  service: string;
  location: string;
  year: string;
  size: string;
  designStyle: string;
  mainImage: string;
  story: StoryBlock[];
  gallery: GalleryImage[];
  nextProject?: { title: string; slug: string };
}

// ─── Dummy Data (mirrors updated Sanity schema) ───────────────────────────────
const dummyProjects: Record<string, Project> = {
  'modern-minimalist-kitchen-set': {
    id: 1,
    title: 'Modern Minimalist Kitchen Set',
    slug: 'modern-minimalist-kitchen-set',
    service: 'Interior Design',
    location: 'Singaraja, Bali',
    year: '2025',
    size: '24 sqm',
    designStyle: 'Modern Minimalist',
    mainImage:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    story: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Dapur ini lahir dari sebuah prinsip sederhana: bahwa keindahan sejati bersembunyi di balik kesederhanaan yang terukur. Klien kami menginginkan ruang memasak yang bukan sekadar fungsional — tetapi sebuah pernyataan estetika yang berdiri sendiri.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Kami memilih palet monokromatik dengan aksen kayu walnut hangat. Setiap detail — dari handle kabinet yang tersembunyi hingga backsplash marmer Carrara — dipilih dengan teliti untuk menciptakan harmoni yang tenang namun menawan.',
          },
        ],
      },
    ],
    gallery: [
      {
        _key: 'g1',
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=1200&auto=format&fit=crop',
        alt: 'Kitchen detail view',
      },
      {
        _key: 'g2',
        url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?q=80&w=1200&auto=format&fit=crop',
        alt: 'Kitchen counter close-up',
      },
      {
        _key: 'g3',
        url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=1200&auto=format&fit=crop',
        alt: 'Kitchen overhead lighting',
      },
      {
        _key: 'g4',
        url: 'https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?q=80&w=1200&auto=format&fit=crop',
        alt: 'Kitchen wide angle',
      },
      {
        _key: 'g5',
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
        alt: 'Kitchen island',
      },
    ],
    nextProject: {
      title: 'Japandi Master Bedroom',
      slug: 'japandi-master-bedroom',
    },
  },
  // Add more projects as needed — Sanity will replace this entirely
};

// ─── Fallback (prevents 404 for other dummy slugs) ────────────────────────────
function getFallbackProject(slug: string): Project {
  return {
    id: 0,
    title: slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' '),
    slug,
    service: 'Interior Design',
    location: 'Singaraja, Bali',
    year: '2025',
    size: '—',
    designStyle: 'Modern Minimalist',
    mainImage:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&auto=format&fit=crop',
    story: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Proyek ini mencerminkan filosofi Umah Luwung: setiap ruang adalah sebuah karya seni yang hidup — fungsional, indah, dan penuh cerita.',
          },
        ],
      },
    ],
    gallery: [
      {
        _key: 'g1',
        url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop',
        alt: 'Project gallery 1',
      },
      {
        _key: 'g2',
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
        alt: 'Project gallery 2',
      },
      {
        _key: 'g3',
        url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1200&auto=format&fit=crop',
        alt: 'Project gallery 3',
      },
    ],
    nextProject: {
      title: 'Modern Minimalist Kitchen Set',
      slug: 'modern-minimalist-kitchen-set',
    },
  };
}

// ─── Simple Rich Text Renderer ────────────────────────────────────────────────
function PortableText({ blocks }: { blocks: StoryBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        const text = block.children.map((c) => c.text).join('');

        if (block.style === 'h2') {
          return (
            <h2 key={block._key} className="font-serif text-2xl md:text-3xl text-[#EBE7E0] leading-snug">
              {text}
            </h2>
          );
        }
        if (block.style === 'h3') {
          return (
            <h3 key={block._key} className="font-serif text-xl md:text-2xl text-[#EBE7E0] leading-snug">
              {text}
            </h3>
          );
        }
        if (block.style === 'blockquote') {
          return (
            <blockquote
              key={block._key}
              className="border-l-2 border-[#D05B43] pl-6 font-serif italic text-lg md:text-xl text-[#EBE7E0]/70 leading-relaxed"
            >
              {text}
            </blockquote>
          );
        }
        return (
          <p key={block._key} className="text-[#EBE7E0]/65 leading-[1.85] text-base md:text-lg font-light">
            {text}
          </p>
        );
      })}
    </div>
  );
}

// ─── Page Component ────────────────────────────────────────────────────────────
export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  // In production: replace with Sanity client.fetch() using GROQ query
  const project = dummyProjects[slug] ?? getFallbackProject(slug);

  const metaItems = [
    { label: 'Service', value: project.service, icon: Briefcase },
    { label: 'Location', value: project.location, icon: MapPin },
    { label: 'Year', value: project.year, icon: CalendarDays },
    { label: 'Size', value: project.size, icon: Ruler },
  ];

  // Assign gallery layout patterns for asymmetric masonry feel
  const galleryPatterns = ['tall', 'wide', 'tall', 'tall', 'wide', 'tall', 'wide'];

  return (
    <article className="min-h-screen bg-[#1A1A18] text-[#EBE7E0]">

      {/* ═══════════════════════════════════════════════════════════════════════
          1. BACK NAVIGATION
      ════════════════════════════════════════════════════════════════════════ */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 pt-28 pb-8">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[#EBE7E0]/40 hover:text-[#EBE7E0] transition-colors duration-300 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Selected Works
        </Link>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. HERO SECTION
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 pb-16">
        {/* Hero Image */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-[#141414]" style={{ aspectRatio: '16/9' }}>
          <img
            src={project.mainImage}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Project Title — placed below image */}
        <div className="mt-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#EBE7E0]/40 font-sans mb-3">
              {project.service}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl xl:text-7xl text-[#EBE7E0] tracking-tight leading-tight max-w-3xl">
              {project.title}
            </h1>
          </div>
          <p className="text-sm text-[#EBE7E0]/40 font-light md:text-right flex-shrink-0">
            {project.location}<br />
            <span className="text-[#EBE7E0]/20">{project.year}</span>
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          3. METADATA GRID — 4-column clean layout
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 py-14">
        <div className="w-full h-px bg-[#EBE7E0]/10 mb-14" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {metaItems.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#EBE7E0]/30">
                <Icon className="w-3.5 h-3.5" />
                <span className="text-[10px] tracking-[0.25em] uppercase font-sans">{label}</span>
              </div>
              <p className="font-serif text-xl md:text-2xl text-[#EBE7E0] leading-snug">{value}</p>
            </div>
          ))}
        </div>
        <div className="w-full h-px bg-[#EBE7E0]/10 mt-14" />
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          4. THE NARRATIVE — Project Story
      ════════════════════════════════════════════════════════════════════════ */}
      {project.story && project.story.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 py-10">
          <div className="flex flex-col md:flex-row gap-12 md:gap-20">
            {/* Section label */}
            <div className="md:w-48 flex-shrink-0">
              <p className="text-xs tracking-[0.3em] uppercase text-[#EBE7E0]/30 font-sans md:sticky md:top-32">
                The Narrative
              </p>
            </div>
            {/* Rich text content */}
            <div className="flex-1 max-w-prose">
              <PortableText blocks={project.story} />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          5. DYNAMIC GALLERY — Asymmetric masonry grid
      ════════════════════════════════════════════════════════════════════════ */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 py-20">
          <div className="flex items-center justify-between mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-[#EBE7E0]/30 font-sans">
              Gallery
            </p>
            <span className="text-xs text-[#EBE7E0]/20 font-light">
              {project.gallery.length} images
            </span>
          </div>

          {/* Asymmetric grid: mix of tall and wide images */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {project.gallery.map((image, index) => {
              const pattern = galleryPatterns[index % galleryPatterns.length];
              const isWide = pattern === 'wide';

              return (
                <div
                  key={image._key}
                  className={`overflow-hidden rounded-xl bg-[#141414] ${isWide ? 'md:col-span-2' : 'col-span-1'}`}
                  style={{ aspectRatio: isWide ? '16 / 9' : '4 / 5' }}
                >
                  <img
                    src={image.url}
                    alt={image.alt ?? `${project.title} — gallery image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          6. CALL TO ACTION — Next project + Konsultasi button
      ════════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 py-20">
        <div className="w-full h-px bg-[#EBE7E0]/10 mb-20" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">

          {/* Next Project Link */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#EBE7E0]/30 font-sans">
              Next Project
            </p>
            {project.nextProject ? (
              <Link
                href={`/${locale}/projects/${project.nextProject.slug}`}
                className="group inline-flex items-center gap-4 font-serif text-2xl md:text-3xl text-[#EBE7E0]/60 hover:text-[#EBE7E0] transition-colors duration-500"
              >
                {project.nextProject.title}
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 flex-shrink-0" />
              </Link>
            ) : (
              <Link
                href={`/${locale}/projects`}
                className="group inline-flex items-center gap-4 font-serif text-2xl md:text-3xl text-[#EBE7E0]/60 hover:text-[#EBE7E0] transition-colors duration-500"
              >
                All Projects
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 flex-shrink-0" />
              </Link>
            )}
          </div>

          {/* CTA Button — Konsultasi Gratis */}
          <a
            href="https://wa.me/6281353555535?text=Halo%20Umah%20Luwung%2C%20saya%20tertarik%20untuk%20konsultasi%20gratis."
            target="_blank"
            rel="noreferrer"
            id="cta-konsultasi-gratis"
            className="
              group relative inline-flex items-center gap-3
              px-8 py-4 rounded-full
              bg-[#84A98C] hover:bg-[#6B9072] text-white
              text-sm tracking-widest uppercase font-sans font-medium
              transition-all duration-300 ease-out
              hover:shadow-[0_0_40px_rgba(132,169,140,0.25)]
              hover:-translate-y-0.5
              active:translate-y-0
            "
          >
            <span className="w-2 h-2 rounded-full bg-white/70 group-hover:bg-white transition-colors" />
            Konsultasi Gratis
          </a>

        </div>

        {/* Closing brand mark */}
        <div className="mt-24 flex items-center gap-4">
          <span className="w-8 h-px bg-[#EBE7E0]/15" />
          <p className="text-xs text-[#EBE7E0]/20 font-serif italic tracking-wide">
            Umah Luwung · Singaraja, Bali
          </p>
        </div>

      </section>

    </article>
  );
}
