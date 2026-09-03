"use client";

import React, { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { client } from '@/lib/sanity';

// ── Tipe Data ──────────────────────────────────────────────────────────────────
interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  era: string;
  imageUrl?: string;
}

// ── Data Fallback Lokal ────────────────────────────────────────────────────────
// colSpan tidak datang dari Sanity, jadi kita assign secara siklis
const colSpanPattern = [
  "md:col-span-2 lg:col-span-2",
  "md:col-span-1 lg:col-span-1",
  "md:col-span-1 lg:col-span-1",
  "md:col-span-1 lg:col-span-1",
  "md:col-span-2 lg:col-span-2",
  "md:col-span-1 lg:col-span-1",
  "md:col-span-2 lg:col-span-2",
  "md:col-span-2 lg:col-span-2",
];

const fallbackGalleryData: GalleryItem[] = [
  {
    _id: "1",
    title: "Kapak Perimbas",
    category: "Alat Batu Kasar",
    era: "Paleolitikum",
    imageUrl: "/images/paleolitikum.jpg",
  },
  {
    _id: "2",
    title: "Gua Abris Sous Roche",
    category: "Tempat Tinggal",
    era: "Mesolitikum",
    imageUrl: "/images/mesolitikum.jpg",
  },
  {
    _id: "3",
    title: "Menhir & Dolmen",
    category: "Megalitikum",
    era: "Neolitikum Lanjut",
    imageUrl: "/images/neolitikum.jpg",
  },
  {
    _id: "4",
    title: "Kapak Genggam",
    category: "Alat Batu Museum",
    era: "Paleolitikum",
    imageUrl: "/images/kapak-genggam.jpg",
  },
  {
    _id: "5",
    title: "Lukisan Dinding Gua",
    category: "Kesenian Purba",
    era: "Mesolitikum",
    imageUrl: "/images/lukisan-gua.jpg",
  },
  {
    _id: "6",
    title: "Menhir Batu Tegak",
    category: "Pemujaan Nenek Moyang",
    era: "Megalitikum",
    imageUrl: "/images/menhir.jpg",
  },
  {
    _id: "7",
    title: "Peleburan Perunggu",
    category: "Teknologi Logam",
    era: "Perundagian",
    imageUrl: "/images/perundagian.jpg",
  },
  {
    _id: "8",
    title: "Nekara — Genderang Perunggu",
    category: "Peralatan Upacara",
    era: "Perundagian",
    imageUrl: "/images/nekara.jpg",
  },
];

// ── GROQ Query ─────────────────────────────────────────────────────────────────
const GALLERY_QUERY = `*[_type == "gallery"] | order(_createdAt desc) {
  _id,
  title,
  category,
  era,
  "imageUrl": image.asset->url
}`;

// ── Komponen Utama ─────────────────────────────────────────────────────────────
export default function GallerySection() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>(fallbackGalleryData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data dari Sanity
  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await client.fetch<GalleryItem[]>(GALLERY_QUERY);
        if (data && data.length > 0) {
          setGalleryData(data);
        }
        // Jika kosong, biarkan fallback yang aktif
      } catch (err) {
        console.warn("[GallerySection] Gagal fetch dari Sanity, menggunakan data lokal.", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGallery();
  }, []);

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
        {isLoading ? (
          /* Skeleton Loading */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className={`h-[280px] sm:h-[320px] rounded-2xl bg-[#2A2A27]/10 animate-pulse ${colSpanPattern[i % colSpanPattern.length]}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryData.map((item, index) => (
              <div
                key={item._id}
                className={`group relative overflow-hidden rounded-2xl h-[280px] sm:h-[320px] cursor-pointer shadow-md hover:shadow-xl transition-shadow ${colSpanPattern[index % colSpanPattern.length]}`}
              >
                {/* Gambar Utama */}
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                ) : (
                  /* Placeholder jika belum ada gambar */
                  <div className="absolute inset-0 bg-[#2A2A27]/10 flex items-center justify-center">
                    <span className="text-[#2A2A27]/40 text-sm font-medium">Gambar belum tersedia</span>
                  </div>
                )}

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
        )}

        {/* Tombol Mobile */}
        <button className="mt-10 w-full md:hidden flex justify-center items-center gap-2 border border-[#2A2A27] text-[#2A2A27] py-3.5 rounded-full font-bold tracking-widest uppercase text-xs active:bg-[#2A2A27] active:text-white transition-colors">
          Lihat Semua Koleksi
        </button>

      </div>
    </section>
  );
}