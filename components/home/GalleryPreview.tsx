"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Villa Bapak Kino",
    category: "Full Interior & Custom Furniture",
    location: "Kavling Singaraja",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop",
    // Kartu pertama dibuat besar (Featured)
    colSpan: "md:col-span-2",
  },
  {
    id: 2,
    title: "Tropical Modern House",
    category: "Living Room Design",
    location: "Lovina Residence",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop",
    colSpan: "md:col-span-1",
  },
  {
    id: 3,
    title: "Minimalist Japandi Cafe",
    category: "Commercial Space",
    location: "Pusat Kota Singaraja",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=2070&auto=format&fit=crop",
    colSpan: "md:col-span-1",
  },
  {
    id: 4,
    title: "Private Villa Estate",
    category: "Architecture & Interior",
    location: "Ubud, Bali",
    image: "https://images.unsplash.com/photo-1613490908676-e1cefc334360?q=80&w=2070&auto=format&fit=crop",
    colSpan: "md:col-span-2",
  }
];

export default function ProjectsSection() {
  return (
    <section className="bg-[#EEEBE4] py-24 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#5C7A5A]"></div>
              <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-sm uppercase">
                Portofolio Pilihan
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light text-[#2A2A27] tracking-tight">
              Karya <span className="font-serif italic text-[#5C7A5A] font-bold">Terbaik Kami</span>
            </h2>
          </div>

          <button className="hidden md:inline-flex items-center gap-2 border-b border-[#2A2A27] text-[#2A2A27] pb-1 font-medium tracking-widest uppercase text-sm hover:text-[#5C7A5A] hover:border-[#5C7A5A] transition-colors">
            Lihat Semua Proyek
          </button>
        </div>

        {/* Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden rounded-3xl h-[400px] md:h-[500px] cursor-pointer shadow-lg ${project.colSpan}`}
            >
              {/* Gambar Utama (Animasi Zoom Halus) */}
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
              />

              {/* 
                EFEK HITAM (Gradient Overlay): 
                Selalu terlihat (opacity-90) agar di HP teks selalu terbaca, 
                tapi makin pekat saat disentuh kursor di PC.
              */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-[#1A1A18]/40 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"></div>

              {/* Konten Teks di Atas Efek Hitam */}
              <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end">
                <div className="transform transition-transform duration-500 ease-out md:translate-y-4 group-hover:translate-y-0">

                  {/* Kategori & Lokasi */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[#E2DECA] text-xs font-bold tracking-widest uppercase">
                      {project.category}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5C7A5A]"></span>
                    <span className="text-[#E2DECA]/80 text-xs font-medium tracking-widest uppercase">
                      {project.location}
                    </span>
                  </div>

                  {/* Nama Properti (Sangat Jelas di HP maupun PC) */}
                  <h3 className="text-white text-3xl md:text-4xl font-serif font-bold tracking-wide">
                    {project.title}
                  </h3>
                </div>

                {/* Tombol Panah (Hanya muncul perlahan saat di-hover di PC, di HP akan tampil statis jika tidak di-hidden) */}
                <div className="hidden md:flex w-12 h-12 rounded-full bg-[#5C7A5A] items-center justify-center transform translate-y-8 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="text-white w-6 h-6" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Tombol 'Lihat Semua' khusus Mobile */}
        <button className="mt-12 w-full md:hidden flex justify-center items-center gap-2 border border-[#2A2A27] text-[#2A2A27] py-4 rounded-full font-bold tracking-widest uppercase text-sm active:bg-[#2A2A27] active:text-white transition-colors">
          Lihat Semua Proyek
        </button>

      </div>
    </section>
  );
}