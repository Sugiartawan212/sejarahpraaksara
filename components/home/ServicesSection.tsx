'use client';

import React, { useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import { PlayCircle, QrCode } from 'lucide-react'; // Pakai ikon Lucide untuk kotak bawah

// ─── TEXTURE OVERLAY ──────────────────────────────────────────────────
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

// ─── KOMPONEN BINGKAI TABLET 3D ───────────────────────────────────────
function TabletFrame({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  const rotateY = useTransform(springX, [-0.5, 0.5], [-2, 2]); // Dikurangi dikit biar nggak trlalu miring
  const rotateX = useTransform(springY, [-0.5, 0.5], [2, -2]);
  const glareX = useTransform(springX, [-0.5, 0.5], [80, 20]);
  const glareY = useTransform(springY, [-0.5, 0.5], [20, 80]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      rawX.set(x);
      rawY.set(y);
    },
    [rawX, rawY]
  );

  const handlePointerLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <div style={{ perspective: "1500px" }} className="w-full flex justify-center">
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-4xl cursor-default"
      >
        <div
          className="relative rounded-[2.5rem] p-[12px] md:p-[16px] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.35)]"
          style={{
            background: "linear-gradient(145deg, #3a3a35 0%, #2A2A27 40%, #1e1e1b 100%)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Kamera Depan */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[12px] md:h-[16px] flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a17] shadow-inner" />
          </div>

          {/* ── LAYAR DALAM (TIDAK ADA HEADER/PADDING) ── */}
          <div className="relative overflow-hidden rounded-[1.8rem] bg-black aspect-video flex flex-col items-center justify-center">

            {/* 1. Grain Texture */}
            <div
              className="absolute inset-0 z-10 pointer-events-none opacity-[0.015]"
              style={{ backgroundImage: NOISE_SVG, backgroundRepeat: "repeat" }}
            />

            {/* 2. Dynamic Glare (Mengikuti Mouse) */}
            <motion.div
              className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay"
              style={{
                background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.6) 0%, transparent 60%)`,
              }}
            />

            {/* 3. EFEK KACA REALISTIS */}
            <div className="absolute top-0 left-0 w-[150%] h-[150%] -rotate-12 origin-top-left bg-gradient-to-b from-white/20 via-white/5 to-transparent pointer-events-none z-30 transform -translate-y-[55%] mix-blend-screen" />

            {/* AREA KONTEN (Video/QR Full Screen) */}
            <div className="relative z-20 w-full h-full">
              {children}
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── KOMPONEN UTAMA (HALAMAN) ─────────────────────────────────────────
export default function MediaSection() {
  // State: 'video' atau 'barcode'
  const [activeMedia, setActiveMedia] = useState('video');

  return (
    <section id="media" className="w-full mx-auto px-4 md:px-12 xl:px-20 py-24 bg-[#EEEBE4] flex flex-col items-center">

      {/* Tipografi Judul (Opsional, ditaruh di luar tablet) */}
      <div className="text-center mb-12">
        <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-xs uppercase block mb-3">Media Pembelajaran</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#2A2A27]">Visualisasi Zaman Pra-Aksara</h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col items-center"
      >
        {/* BINGKAI TABLET 3D */}
        <TabletFrame>
          <AnimatePresence mode="wait">
            {activeMedia === 'video' ? (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-black"
              >
                {/* Iframe YouTube Full Screen di dalam Tablet */}
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/k-pOQS3YTgo"
                  title="Video Pra-Aksara"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            ) : (
              <motion.div
                key="barcode"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full bg-[#F5F5F5] flex flex-col items-center justify-center p-8"
              >
                {/* Konten QR Code */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://youtu.be/k-pOQS3YTgo"
                  alt="QR Code"
                  className="w-48 h-48 md:w-64 md:h-64 object-contain mb-6 shadow-xl rounded-2xl bg-white p-4"
                />
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#2A2A27] text-center">
                  Scan barcode untuk menonton!
                </h3>
                <p className="text-sm md:text-base text-[#2A2A27]/60 mt-2 text-center">
                  Gunakan kamera HP untuk membuka materi video ini di perangkat Anda.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </TabletFrame>

        {/* ── KOTAK NAVIGASI BAWAH ── */}
        <div className="flex gap-6 mt-16 perspective-1000">

          {/* Kotak 1: Video YouTube */}
          <motion.button
            onClick={() => setActiveMedia('video')}
            animate={{
              scale: activeMedia === 'video' ? 1.05 : 0.95,
              y: activeMedia === 'video' ? -5 : 0,
              backgroundColor: activeMedia === 'video' ? '#5C7A5A' : '#E2DECA',
              color: activeMedia === 'video' ? '#FFFFFF' : '#2A2A27'
            }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg border border-white/20 transition-colors"
          >
            <PlayCircle className="w-6 h-6" />
            <div className="text-left">
              <span className="block text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">Tonton Langsung</span>
              <span className="block font-serif font-bold text-lg">Video Materi</span>
            </div>
          </motion.button>

          {/* Kotak 2: Barcode */}
          <motion.button
            onClick={() => setActiveMedia('barcode')}
            animate={{
              scale: activeMedia === 'barcode' ? 1.05 : 0.95,
              y: activeMedia === 'barcode' ? -5 : 0,
              backgroundColor: activeMedia === 'barcode' ? '#5C7A5A' : '#E2DECA',
              color: activeMedia === 'barcode' ? '#FFFFFF' : '#2A2A27'
            }}
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg border border-white/20 transition-colors"
          >
            <QrCode className="w-6 h-6" />
            <div className="text-left">
              <span className="block text-[10px] font-bold tracking-[0.2em] uppercase opacity-70">Pindai & Tonton</span>
              <span className="block font-serif font-bold text-lg">Scan Barcode</span>
            </div>
          </motion.button>

        </div>
      </motion.div>
    </section>
  );
}