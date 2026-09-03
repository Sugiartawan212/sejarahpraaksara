import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// ── Data Galeri Statis (Local /images/) ────────────────────────────────────────
const galleryData = [
  {
    id: 1,
    title: "Kapak Perimbas",
    category: "Alat Batu Kasar",
    era: "Paleolitikum",
    image: "/images/paleolitikum.jpg",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    id: 2,
    title: "Gua Abris Sous Roche",
    category: "Tempat Tinggal",
    era: "Mesolitikum",
    image: "/images/mesolitikum.jpg",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 3,
    title: "Menhir & Dolmen",
    category: "Megalitikum",
    era: "Neolitikum Lanjut",
    image: "/images/neolitikum.jpg",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 4,
    title: "Kapak Genggam",
    category: "Alat Batu Museum",
    era: "Paleolitikum",
    image: "/images/kapak-genggam.jpg",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 5,
    title: "Lukisan Dinding Gua",
    category: "Kesenian Purba",
    era: "Mesolitikum",
    image: "/images/lukisan-gua.jpg",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    id: 6,
    title: "Menhir Batu Tegak",
    category: "Pemujaan Nenek Moyang",
    era: "Megalitikum",
    image: "/images/menhir.jpg",
    colSpan: "md:col-span-1 lg:col-span-1",
  },
  {
    id: 7,
    title: "Peleburan Perunggu",
    category: "Teknologi Logam",
    era: "Perundagian",
    image: "/images/perundagian.jpg",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
  {
    id: 8,
    title: "Nekara — Genderang Perunggu",
    category: "Peralatan Upacara",
    era: "Perundagian",
    image: "/images/nekara.jpg",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
];

// ── Komponen Utama (Sepenuhnya Statis) ────────────────────────────────────────
export default function GallerySection() {
  return (
    <section id="galeri" className="bg-[#EEEBE4] py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#5C7A5A]"></div>
              <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-sm uppercase">
                Jejak Peninggalan
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2A2A27] tracking-tight">
              Galeri <span className="font-serif italic text-[#5C7A5A] font-bold">Pra-Aksara</span>
            </h2>
          </div>

          <button className="hidden md:inline-flex items-center gap-2 border-b border-[#2A2A27] text-[#2A2A27] pb-1 font-medium tracking-widest uppercase text-xs hover:text-[#5C7A5A] hover:border-[#5C7A5A] transition-colors">
            Lihat Semua Koleksi
          </button>
        </div>

        {/* Bento Grid Gallery (4 Kolom di Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {galleryData.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl h-[280px] sm:h-[320px] cursor-pointer shadow-md hover:shadow-xl transition-shadow ${item.colSpan}`}
            >
              {/* Gambar Utama */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />

              {/* Efek Hitam (Gradient Overlay) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18]/90 via-[#1A1A18]/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"></div>

              {/* Konten Teks */}
              <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 flex justify-between items-end">
                <div className="transform transition-transform duration-500 ease-out md:translate-y-4 group-hover:translate-y-0">

                  {/* Kategori & Era */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[#E2DECA] text-[9px] md:text-[10px] font-bold tracking-widest uppercase bg-[#5C7A5A]/80 px-2 py-1 rounded-sm">
                      {item.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#E2DECA]"></span>
                    <span className="text-[#E2DECA]/90 text-[9px] md:text-[10px] font-medium tracking-widest uppercase">
                      Zaman {item.era}
                    </span>
                  </div>

                  {/* Judul Foto */}
                  <h3 className="text-white text-xl md:text-2xl font-serif font-bold tracking-wide leading-snug">
                    {item.title}
                  </h3>
                </div>

                {/* Tombol Panah (Hanya PC) */}
                <div className="hidden md:flex w-10 h-10 rounded-full bg-[#5C7A5A] items-center justify-center transform translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 flex-shrink-0 ml-4">
                  <ArrowUpRight className="text-white w-5 h-5" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Tombol Mobile */}
        <button className="mt-10 w-full md:hidden flex justify-center items-center gap-2 border border-[#2A2A27] text-[#2A2A27] py-3.5 rounded-full font-bold tracking-widest uppercase text-xs active:bg-[#2A2A27] active:text-white transition-colors">
          Lihat Semua Koleksi
        </button>

      </div>
    </section>
  );
}