"use client";

// TimelineSection — Client Component (Framer Motion memerlukan "use client").
// Data di-pass dari TimelineSectionWrapper (Async Server Component).
// Fallback statis memastikan UI tidak pernah kosong meskipun Sanity bermasalah.

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Tipe Data (sesuai field Sanity baru) ──────────────────────────────────────
export interface TimelineEra {
  _id: string;
  title: string;
  timeframe?: string;
  description?: string;
  features?: string[];
  imageUrl?: string | null;
  order?: number;
}

// ── Warna aksen per zaman (dipakai oleh fallback & Sanity jika tidak ada field warna) ──
const ERA_COLORS: Record<string, string> = {
  Paleolitikum: '#D05B43',
  Mesolitikum: '#5C7A5A',
  Neolitikum: '#D4AF37',
  Megalitikum: '#4A7CA8',
};

function getAccentColor(title: string): string {
  return ERA_COLORS[title] ?? '#6B7280';
}

// ── Data Fallback Statis ───────────────────────────────────────────────────────
export const STATIC_TIMELINE: TimelineEra[] = [
  {
    _id: 'era-1',
    title: 'Paleolitikum',
    timeframe: '2.500.000 – 10.000 SM',
    description:
      'Zaman Batu Tua, periode paling awal kehidupan manusia purba di bumi. Manusia hidup secara nomaden, bergantung sepenuhnya pada alam untuk bertahan hidup dengan cara berburu hewan liar dan mengumpulkan buah-buahan.',
    features: [
      'Hidup berpindah-pindah (nomaden)',
      'Peralatan dari batu yang masih kasar',
      'Berburu & meramu (food gathering)',
      'Belum mengenal bercocok tanam',
      'Tinggal di gua-gua alam',
    ],
    imageUrl: null,
    order: 1,
  },
  {
    _id: 'era-2',
    title: 'Mesolitikum',
    timeframe: '10.000 – 5.000 SM',
    description:
      'Zaman Batu Tengah, masa transisi penting di mana manusia mulai meninggalkan gaya hidup nomaden dan beralih ke semi-nomaden. Muncul kebudayaan Kjokkenmoddinger (tumpukan sampah dapur) dan Abris Sous Roche (gua karang sebagai tempat tinggal).',
    features: [
      'Semi-nomaden (mulai menetap sementara)',
      'Peralatan batu lebih halus (flakes)',
      'Mengenal lukisan dinding gua',
      'Muncul kebudayaan Kjokkenmoddinger',
      'Manusia sudah mengenal seni',
    ],
    imageUrl: null,
    order: 2,
  },
  {
    _id: 'era-3',
    title: 'Neolitikum',
    timeframe: '5.000 – 2.000 SM',
    description:
      'Zaman Batu Baru, ditandai dengan Revolusi Neolitik yang mengubah cara hidup manusia secara drastis. Manusia mulai menetap, bercocok tanam, beternak, dan membuat peralatan yang lebih halus dan beragam, termasuk gerabah dan kain tenun.',
    features: [
      'Menetap dan membentuk komunitas',
      'Bercocok tanam & beternak (food producing)',
      'Peralatan batu diasah & diperhalus',
      'Mengenal tradisi penguburan',
      'Membuat gerabah dan kain tenun',
    ],
    imageUrl: null,
    order: 3,
  },
  {
    _id: 'era-4',
    title: 'Megalitikum',
    timeframe: '2.500 – 500 SM',
    description:
      'Zaman Batu Besar, ditandai dengan pembangunan monumen-monumen batu berukuran besar yang memiliki fungsi religi dan sosial. Menhir, dolmen, sarkofagus, dan punden berundak menjadi bukti kompleksitas kepercayaan dan organisasi sosial masyarakat praaksara.',
    features: [
      'Membangun monumen batu besar (menhir, dolmen)',
      'Kepercayaan animisme & dinamisme',
      'Penguburan jenazah yang kompleks',
      'Organisasi sosial sudah berkembang',
      'Muncul pemimpin / kepala suku',
    ],
    imageUrl: null,
    order: 4,
  },
];

// ── Subkomponen: Placeholder Gambar Abu-Abu ────────────────────────────────────
function ImagePlaceholder({ accent, title }: { accent: string; title: string }) {
  return (
    <div
      className="w-full h-48 flex flex-col items-center justify-center gap-2 select-none"
      style={{ backgroundColor: `${accent}15` }}
    >
      {/* Ikon gambar sederhana */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 opacity-30"
        fill="none"
        viewBox="0 0 24 24"
        stroke={accent}
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 21h18M15 3v18"
        />
      </svg>
      <span className="text-[10px] font-semibold tracking-wider uppercase opacity-40" style={{ color: accent }}>
        {title}
      </span>
    </div>
  );
}

// ── Subkomponen: Satu Item Timeline (alternating kiri ↔ kanan) ────────────────
function TimelineItem({ era, index }: { era: TimelineEra; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Genap → masuk dari kiri; Ganjil → masuk dari kanan
  const isEven = index % 2 === 0;
  const accent = getAccentColor(era.title);

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* ── Kartu Konten ── */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-[calc(50%-2.5rem)]"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-[1.5rem] shadow-lg hover:shadow-2xl border border-[#2A2A27]/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden group">

          {/* Gambar: tampilkan <img> jika imageUrl ada, placeholder abu-abu jika tidak */}
          {era.imageUrl ? (
            <div className="w-full h-48 overflow-hidden">
              <img
                src={era.imageUrl}
                alt={`Ilustrasi ${era.title}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ) : (
            <ImagePlaceholder accent={accent} title={era.title} />
          )}

          <div className="p-6 md:p-8">
            {/* Badge Rentang Waktu */}
            {era.timeframe && (
              <span
                className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white mb-4 shadow-sm"
                style={{ backgroundColor: accent }}
              >
                {era.timeframe}
              </span>
            )}

            {/* Nama Zaman */}
            <h3
              className="text-2xl md:text-3xl font-serif font-bold mb-3 tracking-tight"
              style={{ color: accent }}
            >
              {era.title}
            </h3>

            {/* Deskripsi */}
            {era.description && (
              <p className="text-[#2A2A27]/70 text-sm leading-relaxed mb-5">
                {era.description}
              </p>
            )}

            {/* Daftar Ciri / Features */}
            {era.features && era.features.length > 0 && (
              <ul className="space-y-2">
                {era.features.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#2A2A27]/80">
                    <span
                      className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Titik Bernomor di Garis Tengah (hanya tampil md ke atas) ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative z-10 flex-shrink-0 w-10 h-10 md:w-12 md:h-12 hidden md:flex items-center justify-center"
        style={{
          backgroundColor: accent,
          borderRadius: '50%',
          boxShadow: `0 0 0 4px white, 0 0 0 6px ${accent}40`,
        }}
      >
        <span className="text-white font-bold text-sm md:text-base select-none">
          {index + 1}
        </span>
      </motion.div>

      {/* Spacer sisi kosong (menjaga kartu selalu setengah lebar) */}
      <div className="hidden md:block w-[calc(50%-2.5rem)]" aria-hidden="true" />
    </div>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────────
interface TimelineSectionProps {
  eras: TimelineEra[];
}

// ── Komponen Utama ─────────────────────────────────────────────────────────────
export default function TimelineSection({ eras }: TimelineSectionProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-80px' });

  return (
    <section id="timeline" className="pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">

      {/* Dekorasi latar belakang */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#D05B43]/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#5C7A5A]/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/3 blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-8 bg-[#D05B43]" />
            <span className="text-[#D05B43] font-bold tracking-[0.2em] text-xs uppercase">
              Perjalanan Waktu
            </span>
            <div className="h-px w-8 bg-[#D05B43]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2A2A27] tracking-tight mb-4"
          >
            Zaman{' '}
            <span className="font-serif italic text-[#D05B43] font-bold">Praaksara</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#2A2A27]/60 text-base md:text-lg leading-relaxed"
          >
            Jejak perjalanan umat manusia sebelum mengenal tulisan, dari zaman batu tertua
            hingga era megalitikum yang penuh misteri.
          </motion.p>
        </div>

        {/* ── Timeline List ── */}
        <div className="relative">

          {/* Garis vertikal tengah dengan gradien warna tiap zaman */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 rounded-full"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(to bottom, #D05B4366, #5C7A5A66, #D4AF3766, #4A7CA866)',
            }}
          />

          <div className="flex flex-col gap-16 md:gap-20">
            {eras.map((era, index) => (
              <TimelineItem key={era._id} era={era} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
