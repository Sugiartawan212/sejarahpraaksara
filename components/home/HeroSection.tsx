"use client";

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: gambar naik pelan saat scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* ── Background Layer dengan Ken Burns Effect ── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: bgY }}
      >
        {/* Ken Burns: zoom-in sangat lambat & mulus */}
        <motion.div
          className="absolute inset-[-8%] bg-cover bg-center"
          style={{
            // Gambar default diganti dengan pemandangan alam/gua purba
            backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2000&auto=format&fit=crop')",
          }}
          initial={{ scale: 1.0 }}
          animate={{ scale: 1.12 }}
          transition={{
            duration: 20,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </motion.div>

      {/* ── Overlay Gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />

      {/* ── Noise Texture Overlay ── */}
      <div
        className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4 text-center">

        {/* Eyebrow label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="
            text-neutral-300/80 text-xs font-light
            tracking-[0.35em] uppercase mb-6
          "
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Sejarah Indonesia · Materi Kelas X
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="
            text-white font-serif
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
            leading-[1.1] tracking-[-0.02em]
            max-w-4xl
          "
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Ketika Dunia <br />
          Belum{' '}
          <em className="italic font-normal text-neutral-200">
            Punya
          </em>{' '}
          <span className="font-semibold">Tulisan</span>
        </motion.h1>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px bg-white/40 my-7 origin-center"
        />

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-4 flex-wrap justify-center"
        >
          {/* Primary CTA: Mulai Jelajahi */}
          <Link
            id="cta-mulai"
            href="#pengertian"
            className="
              group relative inline-flex items-center gap-2
              px-8 py-3 rounded-full
              bg-white text-neutral-900 text-sm font-medium tracking-wide
              hover:bg-neutral-100
              transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20
            "
          >
            Mulai Jelajahi
            <span className="
              inline-block transition-transform duration-300 group-hover:translate-x-0.5
            ">→</span>
          </Link>

          {/* Secondary CTA: Lihat Timeline */}
          <Link
            id="cta-timeline"
            href="#timeline"
            className="
              inline-flex items-center gap-2
              px-8 py-3 rounded-full
              border border-white/60 text-white text-sm font-light tracking-wide
              hover:border-white hover:bg-white/10
              transition-all duration-300 hover:scale-105
              backdrop-blur-sm
            "
          >
            Lihat Timeline
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-light">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}