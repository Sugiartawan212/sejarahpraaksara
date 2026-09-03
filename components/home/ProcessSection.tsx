'use client';

import React, { useState, useEffect, useRef } from 'react';
import { client } from '@/lib/sanity';

// ── Tipe Data ──────────────────────────────────────────────────────────────────
interface TimelineItem {
  _id: string;
  id: string;
  title: string;
  tag: string;
  desc: string;
  imageUrl?: string;
}

// ── Data Fallback Lokal ────────────────────────────────────────────────────────
const fallbackTimelineData: TimelineItem[] = [
  {
    _id: "01",
    id: "01",
    title: "Paleolitikum (Batu Tua)",
    tag: "BERBURU & MERAMU",
    desc: "Alat batu kasar seperti kapak perimbas mendominasi kehidupan sehari-hari. Manusia hidup nomaden dalam kelompok kecil, sepenuhnya bergantung pada hewan buruan dan tumbuhan liar untuk bertahan hidup.",
    imageUrl: "/images/paleolitikum.jpg",
  },
  {
    _id: "02",
    id: "02",
    title: "Mesolitikum (Batu Tengah)",
    tag: "SEMI-MENETAP",
    desc: "Manusia mulai tinggal di gua (abris sous roche) dan memanfaatkan tepi sungai/pantai. Penemuan tumpukan kulit kerang (kjokkenmoddinger) membuktikan pola hidup semi-sedenter yang mulai terbentuk.",
    imageUrl: "/images/mesolitikum.jpg",
  },
  {
    _id: "03",
    id: "03",
    title: "Neolitikum & Megalitikum",
    tag: "FOOD PRODUCING",
    desc: "Revolusi besar terjadi: manusia beralih dari food gathering ke food producing. Mereka mulai bercocok tanam, hidup menetap, menghaluskan alat batu, dan membangun batu besar (menhir, dolmen) untuk pemujaan nenek moyang.",
    imageUrl: "/images/neolitikum.jpg",
  },
  {
    _id: "04",
    id: "04",
    title: "Zaman Perundagian",
    tag: "PENGOLAHAN LOGAM",
    desc: "Muncul golongan undagi yang ahli mengolah perunggu dan besi. Pembagian kerja menjadi sangat jelas dalam masyarakat, menghasilkan artefak presisi tinggi seperti nekara, moko, dan berbagai perhiasan logam.",
    imageUrl: "/images/perundagian.jpg",
  },
];

// ── GROQ Query ─────────────────────────────────────────────────────────────────
const TIMELINE_QUERY = `*[_type == "timeline"] | order(id asc) {
  _id,
  id,
  title,
  tag,
  desc,
  "imageUrl": image.asset->url
}`;

// ── Komponen Utama ─────────────────────────────────────────────────────────────
export default function TimelineSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [timelineData, setTimelineData] = useState<TimelineItem[]>(fallbackTimelineData);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data dari Sanity
  useEffect(() => {
    async function fetchTimeline() {
      try {
        const data = await client.fetch<TimelineItem[]>(TIMELINE_QUERY);
        if (data && data.length > 0) {
          setTimelineData(data);
        }
        // Jika kosong, biarkan fallback yang aktif
      } catch (err) {
        console.warn("[TimelineSection] Gagal fetch dari Sanity, menggunakan data lokal.", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTimeline();
  }, []);

  // Intersection Observer untuk memicu animasi saat di-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="timeline" className="bg-[#EEEBE4] py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── HEADER SECTION ── */}
        <div
          className={`text-center max-w-3xl mx-auto mb-24 transition-all duration-1000 ease-out transform
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
            Evolusi Peradaban
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-[#2A2A27] mb-6 tracking-tight">
            4 Tingkat <br />
            <span className="font-serif italic text-[#5C7A5A]">Kehidupan Manusia</span>
          </h2>
          <p className="text-[#2A2A27]/90 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
            Perjalanan panjang manusia purba dari sekadar bertahan hidup nomaden hingga mampu menciptakan teknologi pengolahan logam.
          </p>
        </div>

        {/* ── ZIGZAG TIMELINE CONTAINER ── */}
        <div className="relative">

          {/* Garis Vertikal Tengah (Gradient Elegan) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-1/2 rounded-full z-0 overflow-hidden bg-gray-200">
            <div
              className={`absolute top-0 left-0 w-full bg-gradient-to-b from-[#D4AF37] via-[#D05B43] to-[#5C7A5A] shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all duration-[2.5s] ease-in-out delay-300
                ${isVisible ? 'h-full' : 'h-0'}`}
            ></div>
          </div>

          {/* Skeleton Loading */}
          {isLoading ? (
            <div className="space-y-20 md:space-y-32">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative flex flex-col md:flex-row items-center justify-between animate-pulse">
                  {/* Badge angka */}
                  <div className="absolute left-8 md:left-1/2 w-14 h-14 rounded-full bg-[#2A2A27]/10 md:-translate-x-1/2 z-10" />
                  {/* Teks */}
                  <div className="w-full md:w-5/12 pl-24 md:pl-0 md:pr-16 space-y-3">
                    <div className="h-5 w-28 bg-[#2A2A27]/10 rounded-full" />
                    <div className="h-8 w-48 bg-[#2A2A27]/10 rounded" />
                    <div className="h-4 w-full bg-[#2A2A27]/10 rounded" />
                    <div className="h-4 w-4/5 bg-[#2A2A27]/10 rounded" />
                  </div>
                  {/* Gambar */}
                  <div className="w-full md:w-5/12 pl-24 md:pl-16 mt-8 md:mt-0">
                    <div className="w-full aspect-[4/3] rounded-3xl bg-[#2A2A27]/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Mapping Data Tingkatan */
            timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item._id}
                  style={{ transitionDelay: `${(index * 200) + 500}ms` }}
                  className={`relative flex flex-col md:flex-row items-center justify-between mb-20 md:mb-32 transition-all duration-1000 ease-out transform
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                    ${isEven ? '' : 'md:flex-row-reverse'}`}
                >

                  {/* 1. Badge Angka di Tengah */}
                  <div className="absolute left-8 md:left-1/2 w-14 h-14 rounded-full bg-[#EEEBE4] border-4 border-[#2A2A27] md:-translate-x-1/2 flex items-center justify-center z-10 shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <span className="text-[#2A2A27] font-bold font-serif text-xl">{item.id}</span>
                  </div>

                  {/* 2. Kolom Teks (Materi) */}
                  <div className={`w-full md:w-5/12 pl-24 md:pl-0 flex flex-col justify-center group
                    ${isEven ? 'md:pr-16 md:text-right md:items-end' : 'md:pl-16 md:text-left md:items-start'}
                  `}>
                    <div className="inline-block bg-[#5C7A5A]/10 text-[#5C7A5A] font-bold text-[10px] tracking-widest px-4 py-1.5 rounded-full mb-4 uppercase">
                      {item.tag}
                    </div>
                    <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#2A2A27] mb-4 group-hover:text-[#D05B43] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-[#2A2A27]/80 text-sm md:text-base leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>

                  {/* 3. Kolom Foto */}
                  <div className={`w-full md:w-5/12 pl-24 md:pl-0 mt-8 md:mt-0 
                    ${isEven ? 'md:pl-16' : 'md:pr-16'}
                  `}>
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 group">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                      ) : (
                        /* Placeholder jika belum ada gambar di Sanity */
                        <div className="w-full h-full bg-[#2A2A27]/10 flex items-center justify-center">
                          <span className="text-[#2A2A27]/40 text-sm font-medium">Gambar belum tersedia</span>
                        </div>
                      )}
                      {/* Overlay Tipis Biar Estetik */}
                      <div className="absolute inset-0 bg-[#2A2A27]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    </div>
                  </div>

                </div>
              );
            })
          )}

        </div>
      </div>
    </section>
  );
}