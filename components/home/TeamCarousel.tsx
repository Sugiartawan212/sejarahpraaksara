"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TeamMember } from '@/types/team';

// ── Helper: Inisial 2 Huruf ────────────────────────────────────────────────────
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// ── Komponen Kartu ─────────────────────────────────────────────────────────────
function MemberCard({ member }: { member: TeamMember }) {
  const accent = member.color || '#5C7A5A';
  return (
    <div className="group relative h-full bg-white/80 border border-[#2A2A27]/5 p-8 md:p-10 rounded-[2rem] flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform">

      {/* Avatar */}
      <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6">
        <div
          className="absolute inset-0 rounded-full blur-md opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
          style={{ backgroundColor: accent }}
        />
        {member.imageUrl ? (
          <img
            src={member.imageUrl}
            alt={member.name}
            className="relative w-full h-full object-cover rounded-full border border-gray-100 shadow-md grayscale group-hover:grayscale-0 transition-all duration-500"
          />
        ) : (
          <div
            className="relative w-full h-full rounded-full border border-gray-100 shadow-md flex items-center justify-center text-white font-serif font-bold text-3xl md:text-4xl select-none grayscale group-hover:grayscale-0 transition-all duration-500"
            style={{ backgroundColor: accent }}
          >
            {getInitials(member.name)}
          </div>
        )}
      </div>

      {/* Badge Role */}
      {member.role && (
        <div
          className="px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase text-white mb-5 shadow-sm"
          style={{ backgroundColor: accent }}
        >
          {member.role}
        </div>
      )}

      {/* Nama & Deskripsi */}
      <h3 className="text-2xl font-serif font-bold text-[#2A2A27] mb-3">
        {member.name}
      </h3>
      {member.desc && (
        <p className="text-[#2A2A27]/70 text-sm leading-relaxed font-medium">
          {member.desc}
        </p>
      )}
    </div>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────
interface TeamCarouselProps {
  members: TeamMember[];
}

// ── Client Component: Slider Interaktif ───────────────────────────────────────
export default function TeamCarousel({ members }: TeamCarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive
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

  const maxIndex = Math.max(0, members.length - visibleCount);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (members.length > visibleCount) {
      intervalRef.current = setInterval(goNext, 5000);
    }
  }, [goNext, members.length, visibleCount]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const handlePrev = () => { goPrev(); startInterval(); };
  const handleNext = () => { goNext(); startInterval(); };
  const handleDot  = (i: number) => { setCurrentIndex(i); startInterval(); };

  const cardWidthPercent  = 100 / visibleCount;
  const translateXPercent = -(currentIndex * cardWidthPercent);
  const totalDots         = maxIndex + 1;
  const showControls      = members.length > visibleCount;

  return (
    <section id="tim" className="pt-24 pb-16 md:pt-32 md:pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" ref={ref}>

        {/* Header */}
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
            Tim{' '}
            <span className="font-serif italic text-[#5C7A5A] font-bold">Pengembang</span>
          </motion.h2>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative">

            {/* Panah Kiri */}
            {showControls && (
              <button
                onClick={handlePrev}
                aria-label="Slide sebelumnya"
                className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-20
                           w-11 h-11 rounded-full bg-white shadow-lg border border-[#2A2A27]/10
                           flex items-center justify-center
                           hover:bg-[#5C7A5A] hover:border-[#5C7A5A] group/btn
                           transition-all duration-300 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 text-[#2A2A27] group-hover/btn:text-white transition-colors duration-300" />
              </button>
            )}

            {/* Track */}
            <div className="overflow-hidden rounded-[2rem]">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${translateXPercent}%)` }}
              >
                {members.map((member) => (
                  <div
                    key={member._id}
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
                           w-11 h-11 rounded-full bg-white shadow-lg border border-[#2A2A27]/10
                           flex items-center justify-center
                           hover:bg-[#5C7A5A] hover:border-[#5C7A5A] group/btn
                           transition-all duration-300 active:scale-95"
              >
                <ChevronRight className="w-5 h-5 text-[#2A2A27] group-hover/btn:text-white transition-colors duration-300" />
              </button>
            )}
          </div>

          {/* Dots */}
          {showControls && (
            <div className="flex items-center justify-center gap-2.5 mt-10">
              {Array.from({ length: totalDots }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  aria-label={`Pergi ke slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ease-in-out focus:outline-none
                    ${i === currentIndex
                      ? 'w-7 h-3 bg-[#5C7A5A] shadow-md'
                      : 'w-3 h-3 bg-[#2A2A27]/20 hover:bg-[#2A2A27]/40'
                    }`}
                />
              ))}
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
