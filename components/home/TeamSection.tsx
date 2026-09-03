"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { client } from '@/lib/sanity';

// ── Tipe Data ──────────────────────────────────────────────────────────────────
interface TeamMember {
  _id: string;
  name: string;
  role: string;
  desc: string;
  color: string;
  imageUrl?: string;
}

// ── Data Fallback Lokal ────────────────────────────────────────────────────────
const fallbackTeamMembers: TeamMember[] = [
  {
    _id: "1",
    name: "Andi Pratama",
    role: "Speaker Utama",
    desc: "Bertugas membawakan presentasi dan menjelaskan materi secara interaktif kepada audiens.",
    color: "#D05B43",
  },
  {
    _id: "2",
    name: "Sugiartawan",
    role: "UI/UX & Web Dev",
    desc: "Merancang dan membangun website presentasi interaktif ini dari nol dengan animasi memukau.",
    color: "#5C7A5A",
  },
  {
    _id: "3",
    name: "Budi Wijaya",
    role: "Riset Materi & Kuis",
    desc: "Mengumpulkan data sejarah pra-aksara yang akurat dan menyusun pertanyaan kuis yang menantang.",
    color: "#D4AF37",
  },
];

// ── GROQ Query ─────────────────────────────────────────────────────────────────
const TEAM_QUERY = `*[_type == "team"] | order(_createdAt asc) {
  _id,
  name,
  role,
  desc,
  color,
  "imageUrl": image.asset->url
}`;

// ── Helper: Inisial 2 Huruf ────────────────────────────────────────────────────
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// ── Komponen Kartu Anggota Tim ─────────────────────────────────────────────────
function MemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group relative h-full bg-white border border-[#2A2A27]/5 p-8 md:p-10 rounded-[2rem] flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform">

      {/* Foto / Avatar */}
      <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6">
        {/* Dekorasi Lingkaran Warna Blur di Belakang */}
        <div
          className="absolute inset-0 rounded-full blur-md opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
          style={{ backgroundColor: member.color || "#5C7A5A" }}
        />

        {member.imageUrl ? (
          /* Foto dari Sanity */
          <img
            src={member.imageUrl}
            alt={member.name}
            className="relative w-full h-full object-cover rounded-full border border-gray-100 shadow-md grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          /* Fallback: Avatar Inisial 2 Huruf */
          <div
            className="relative w-full h-full rounded-full border border-gray-100 shadow-md flex items-center justify-center text-white font-serif font-bold text-3xl md:text-4xl select-none grayscale group-hover:grayscale-0 transition-all duration-500"
            style={{ backgroundColor: member.color || "#5C7A5A" }}
          >
            {getInitials(member.name)}
          </div>
        )}
      </div>

      {/* Badge Role */}
      <div
        className="px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase text-white mb-5 shadow-sm"
        style={{ backgroundColor: member.color || "#5C7A5A" }}
      >
        {member.role}
      </div>

      {/* Nama & Deskripsi */}
      <h3 className="text-2xl font-serif font-bold text-[#2A2A27] mb-3">
        {member.name}
      </h3>
      <p className="text-[#2A2A27]/70 text-sm leading-relaxed font-medium">
        {member.desc}
      </p>
    </div>
  );
}

// ── Komponen Utama ─────────────────────────────────────────────────────────────
export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(fallbackTeamMembers);
  const [isLoading, setIsLoading] = useState(true);

  // ── Slider State ───────────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  // visibleCount: 1 (mobile) | 2 (tablet) | 3 (desktop)
  const [visibleCount, setVisibleCount] = useState(3);

  // ── Fetch Data Sanity ──────────────────────────────────────────────────────
  useEffect(() => {
    async function fetchTeam() {
      try {
        const data = await client.fetch<TeamMember[]>(TEAM_QUERY);
        if (data && data.length > 0) setTeamMembers(data);
      } catch (err) {
        console.warn("[TeamSection] Gagal fetch dari Sanity, menggunakan data lokal.", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTeam();
  }, []);

  // ── Responsive: Hitung visibleCount Berdasarkan Lebar Layar ───────────────
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      if (w < 640) setVisibleCount(1);
      else if (w < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // maxIndex: indeks terbesar yang valid agar card tidak melampaui batas
  const maxIndex = Math.max(0, teamMembers.length - visibleCount);

  // Reset currentIndex jika melebihi batas (misal saat resize)
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  // ── Fungsi Navigasi (Infinite Loop) ───────────────────────────────────────
  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // ── Auto-Play: Geser Otomatis Tiap 5 Detik ────────────────────────────────
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    // Hanya auto-play jika ada lebih dari satu "slide"
    if (teamMembers.length > visibleCount) {
      intervalRef.current = setInterval(goNext, 5000);
    }
  }, [goNext, teamMembers.length, visibleCount]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  // ── Handler dengan Reset Interval ─────────────────────────────────────────
  const handlePrev = () => { goPrev(); startInterval(); };
  const handleNext = () => { goNext(); startInterval(); };
  const handleDot = (index: number) => { setCurrentIndex(index); startInterval(); };

  // ── Kalkulasi Transform ────────────────────────────────────────────────────
  // Lebar tiap card = 100% / visibleCount
  // Translate = -(currentIndex * (100 / visibleCount))%
  const cardWidthPercent = 100 / visibleCount;
  const translateXPercent = -(currentIndex * cardWidthPercent);

  // ── Jumlah Dots = maxIndex + 1 ─────────────────────────────────────────────
  const totalDots = maxIndex + 1;
  const showControls = teamMembers.length > visibleCount;

  return (
    <section id="tim" className="bg-[#EEEBE4] pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" ref={ref}>

        {/* ── Header Section ── */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-8 bg-[#5C7A5A]" />
            <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-xs uppercase">
              Di Balik Layar
            </span>
            <div className="h-px w-8 bg-[#5C7A5A]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2A2A27] tracking-tight"
          >
            Tim <span className="font-serif italic text-[#5C7A5A] font-bold">Pengembang</span>
          </motion.h2>
        </div>

        {/* ── Skeleton Loading ── */}
        {isLoading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-white border border-[#2A2A27]/5 p-8 md:p-10 rounded-[2rem] flex flex-col items-center text-center shadow-lg animate-pulse"
                style={{ width: `calc(${cardWidthPercent}% - 1.5rem)` }}
              >
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#2A2A27]/10 mb-6" />
                <div className="h-6 w-24 bg-[#2A2A27]/10 rounded-full mb-5" />
                <div className="h-7 w-32 bg-[#2A2A27]/10 rounded mb-3" />
                <div className="h-4 w-full bg-[#2A2A27]/10 rounded mb-2" />
                <div className="h-4 w-3/4 bg-[#2A2A27]/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* ── Carousel Wrapper ── */}
            <div className="relative">

              {/* Panah Kiri */}
              {showControls && (
                <button
                  onClick={handlePrev}
                  aria-label="Slide sebelumnya"
                  className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20
                             w-11 h-11 md:w-13 md:h-13 rounded-full bg-white shadow-lg border border-[#2A2A27]/10
                             flex items-center justify-center
                             hover:bg-[#5C7A5A] hover:border-[#5C7A5A] group/btn
                             transition-all duration-300 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 text-[#2A2A27] group-hover/btn:text-white transition-colors duration-300" />
                </button>
              )}

              {/* ── Track Overflow Container ── */}
              <div className="overflow-hidden rounded-[2rem]">
                {/* ── Slide Track ── */}
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(${translateXPercent}%)` }}
                >
                  {teamMembers.map((member) => (
                    <div
                      key={member._id}
                      // Lebar tiap card = 100/visibleCount%, padding antar card pakai gap via padding
                      className="flex-shrink-0 px-3"
                      style={{ width: `${cardWidthPercent}%` }}
                    >
                      <MemberCard member={member} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Panah Kanan */}
              {showControls && (
                <button
                  onClick={handleNext}
                  aria-label="Slide berikutnya"
                  className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-20
                             w-11 h-11 md:w-13 md:h-13 rounded-full bg-white shadow-lg border border-[#2A2A27]/10
                             flex items-center justify-center
                             hover:bg-[#5C7A5A] hover:border-[#5C7A5A] group/btn
                             transition-all duration-300 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 text-[#2A2A27] group-hover/btn:text-white transition-colors duration-300" />
                </button>
              )}
            </div>

            {/* ── Dots Navigation ── */}
            {showControls && (
              <div className="flex items-center justify-center gap-2.5 mt-10">
                {Array.from({ length: totalDots }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleDot(i)}
                    aria-label={`Pergi ke slide ${i + 1}`}
                    className={`rounded-full transition-all duration-400 ease-in-out focus:outline-none
                      ${i === currentIndex
                        ? 'w-7 h-3 bg-[#5C7A5A] shadow-md'          // Aktif: pill lebar + hijau
                        : 'w-3 h-3 bg-[#2A2A27]/20 hover:bg-[#2A2A27]/40' // Non-aktif: lingkaran abu
                      }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}