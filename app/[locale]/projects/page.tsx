import Link from 'next/link';

// Data Dummy Sementara meniru skema 'project' Sanity
const dummyProjects = [
  {
    id: 1,
    title: 'Modern Minimalist Kitchen Set',
    slug: 'modern-minimalist-kitchen-set',
    category: 'Kitchen Set',
    designStyle: 'Modern Minimalist',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Japandi Master Bedroom',
    slug: 'japandi-master-bedroom',
    category: 'Kamar Utama',
    designStyle: 'Japandi',
    mainImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Industrial Living Space',
    slug: 'industrial-living-space',
    category: 'Ruang Tamu',
    designStyle: 'Industrial',
    mainImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Classic Luxury Full House',
    slug: 'classic-luxury-full-house',
    category: 'Full House',
    designStyle: 'Classic',
    mainImage: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Warm Walnut Wardrobe',
    slug: 'warm-walnut-wardrobe',
    category: 'Kamar Utama',
    designStyle: 'Modern Minimalist',
    mainImage: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Scandinavian Dining Area',
    slug: 'scandinavian-dining-area',
    category: 'Ruang Tamu',
    designStyle: 'Japandi',
    mainImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Monochrome Bathroom Retreat',
    slug: 'monochrome-bathroom-retreat',
    category: 'Full House',
    designStyle: 'Modern Minimalist',
    mainImage: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=800&auto=format&fit=crop',
  }
];

export default function ProjectsPage() {
  return (
    <div className="pt-32 px-4 pb-24 min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-serif text-neutral-900 tracking-tight mb-6">
            Selected Works
          </h1>
          <p className="text-neutral-500 font-light max-w-2xl text-lg leading-relaxed">
            Eksplorasi mahakarya desain interior kami. Koleksi ruang yang tidak hanya estetis namun juga fungsional, dirancang khusus untuk memenuhi standar kemewahan modern.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {dummyProjects.map((project) => (
            <Link 
              key={project.id} 
              href={`/projects/${project.slug}`}
              className="group relative block break-inside-avoid overflow-hidden bg-neutral-900 rounded-sm"
            >
              {/* Image Frameless */}
              <img 
                src={project.mainImage} 
                alt={project.title}
                className="w-full h-auto object-cover transform transition-transform duration-[800ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Dark Overlay (muncul saat hover) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-end p-6 md:p-8">
                
                {/* Teks Konten */}
                <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 ease-out">
                  <p className="text-neutral-300 text-xs md:text-sm tracking-[0.2em] uppercase font-light mb-3">
                    {project.designStyle}
                  </p>
                  <h3 className="text-white text-xl md:text-3xl font-serif leading-snug font-medium">
                    {project.title}
                  </h3>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
