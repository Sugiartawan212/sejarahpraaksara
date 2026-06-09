"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────
interface TabData {
  id: number;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  accentTag: string;
}

// ─── Color Tokens (Umah Luwung theme) ────────────────────────────────────────
// Warm Sand Drift  → #E2DECA  (screen base / light warm cream)
// Forest Sage      → #4A6741  (solid sage green — active accent)
// Charcoal         → #1F2229  (text)
// Terracotta       → #D05B43  (brand accent)
// Frame Dark       → #2A2A27  (tablet bezel)

// ─── Tab Data ────────────────────────────────────────────────────────────────
const TABS: TabData[] = [
  {
    id: 0,
    label: "Interior",
    title: "Interior Styling & Design",
    subtitle: "Ruang yang Bercerita",
    description:
      "Merancang harmoni ruangan dengan palet membumi dan pencahayaan dramatis yang menghadirkan kedamaian sekaligus keagungan — setiap sudut menjadi narasi visual yang hidup.",
    image: "/tab-interior.png",
    imageAlt: "Luxury interior living room by Umah Luwung",
    accentTag: "01 · Styling",
  },
  {
    id: 1,
    label: "Architecture",
    title: "Architectural Planning",
    subtitle: "Struktur Penuh Visi",
    description:
      "Perancangan struktur bangunan dan fasad dengan desain asimetris yang modern serta fungsional — menyatukan geometri tegas dengan aliran ruang yang intuitif.",
    image: "/tab-architecture.png",
    imageAlt: "Modern architectural facade by Umah Luwung",
    accentTag: "02 · Structure",
  },
  {
    id: 2,
    label: "Furniture",
    title: "Custom Furniture & Build",
    subtitle: "Craftsmanship Tanpa Kompromi",
    description:
      "Detail craftsmanship tingkat tinggi dan pemilihan material premium untuk furnitur custom-made yang presisi — setiap jahitan, sambungan, dan kontur dibuat dengan tangan terlatih.",
    image: "/tab-furniture.png",
    imageAlt: "Premium custom woodwork by Umah Luwung",
    accentTag: "03 · Build",
  },
];

// ─── Noise SVG overlay (grain paper texture) ─────────────────────────────────
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

// ─── 3D Tablet Frame ──────────────────────────────────────────────────────────
function TabletFrame({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Raw pointer position (−0.5 … 0.5)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-damped motion values
  const springConfig = { stiffness: 180, damping: 28, mass: 0.6 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);

  // Map to rotation angles (max ±8°)
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);

  // Subtle glare: moves opposite to tilt
  const glareX = useTransform(springX, [-0.5, 0.5], [60, 0]);
  const glareY = useTransform(springY, [-0.5, 0.5], [0, 60]);

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
    // Outer perspective wrapper
    <div style={{ perspective: "1200px" }} className="w-full flex justify-center">
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        // Default asymmetric editorial tilt + slight scale down
        className="relative scale-[0.97] -rotate-1 cursor-pointer w-full max-w-5xl"
      >
        {/* ── Bezel / Outer Frame ── */}
        <div
          className="relative rounded-[2.2rem] p-[10px] md:p-[14px]"
          style={{
            background:
              "linear-gradient(145deg, #3a3a35 0%, #2A2A27 40%, #1e1e1b 100%)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), " +
              "0 8px 20px rgba(0,0,0,0.55), " +
              "0 40px 80px rgba(0,0,0,0.45), " +
              "0 80px 120px rgba(0,0,0,0.25), " +
              "inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* ── Top camera bar ── */}
          <div className="flex items-center justify-center mb-2.5">
            <div className="w-2 h-2 rounded-full bg-[#1a1a17] border border-[#3a3a35] shadow-inner" />
          </div>

          {/* ── Screen surface ── */}
          <div
            className="relative overflow-hidden rounded-[1.5rem] md:rounded-[1.8rem]"
            style={{ background: "#E2DECA" }}
          >
            {/* Grain texture overlay on screen */}
            <div
              className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] rounded-[1.5rem]"
              style={{
                backgroundImage: NOISE_SVG,
                backgroundRepeat: "repeat",
                backgroundSize: "128px",
              }}
            />

            {/* 3D glare sheen */}
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none rounded-[1.5rem]"
              style={{
                background: `radial-gradient(ellipse at ${glareX}% ${glareY}%, rgba(255,255,255,0.18) 0%, transparent 65%)`,
              }}
            />

            {/* ── Content inside the screen ── */}
            <div className="relative z-30 min-h-[420px] md:min-h-[520px]">
              {children}
            </div>
          </div>

          {/* ── Home indicator bar ── */}
          <div className="flex items-center justify-center mt-2.5">
            <div className="w-16 h-1 rounded-full bg-[#3a3a35]" />
          </div>
        </div>

        {/* ── Drop shadow layer (3D depth illusion) ── */}
        <div
          className="absolute -inset-x-4 bottom-[-24px] h-8 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ background: "radial-gradient(ellipse, #1a1a17 0%, transparent 70%)" }}
        />
      </motion.div>
    </div>
  );
}

// ─── Tab Navigation Bar ───────────────────────────────────────────────────────
function TabNav({
  activeTab,
  onTabChange,
}: {
  activeTab: number;
  onTabChange: (id: number) => void;
}) {
  return (
    <nav className="flex items-center gap-1 px-5 pt-5 pb-3">
      {/* Left section label */}
      <span
        className="mr-auto text-[10px] tracking-[0.22em] uppercase text-neutral-500/70 hidden sm:block"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        Layanan Kami
      </span>

      <div className="flex items-center gap-1 bg-[#ccc8b3]/50 rounded-xl p-1 backdrop-blur-sm border border-[#b8b49f]/30">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              id={`services-tab-${tab.id}`}
              onClick={() => onTabChange(tab.id)}
              className="relative px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#4A6741]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {/* Active pill background */}
              {isActive && (
                <motion.span
                  layoutId="services-tab-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "#4A6741" }}
                  transition={{ type: "spring", stiffness: 380, damping: 36 }}
                />
              )}
              <span
                className="relative z-10 transition-colors duration-200"
                style={{ color: isActive ? "#E2DECA" : "#5a5748" }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Tab Content Panel ────────────────────────────────────────────────────────
function TabContent({ tab }: { tab: TabData }) {
  return (
    <motion.div
      key={tab.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full"
    >
      {/* ── Left: Text Content ── */}
      <div className="flex flex-col justify-center px-6 md:px-8 py-6 md:py-8 order-2 md:order-1">
        {/* Accent tag */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-4 h-px bg-[#4A6741]" />
          <span
            className="text-[10px] font-bold tracking-[0.28em] uppercase text-[#4A6741]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {tab.accentTag}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="text-[11px] tracking-[0.15em] uppercase text-neutral-500/80 mb-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {tab.subtitle}
        </motion.p>

        {/* Main title — Serif */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
          className="text-2xl md:text-3xl lg:text-[2rem] font-semibold leading-tight text-neutral-900 mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {tab.title}
        </motion.h2>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="w-10 h-[1.5px] bg-[#D05B43] mb-4 origin-left"
        />

        {/* Description — Sans-Serif */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.26 }}
          className="text-sm md:text-[0.875rem] leading-relaxed text-neutral-700 font-medium max-w-xs"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {tab.description}
        </motion.p>

        {/* CTA Pill */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.34 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200"
          style={{
            fontFamily: "'Inter', sans-serif",
            background: "#4A6741",
            color: "#E2DECA",
            boxShadow: "0 4px 16px rgba(74,103,65,0.30)",
          }}
          id={`services-cta-${tab.id}`}
        >
          Pelajari Lebih Lanjut
          <motion.span
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>
      </div>

      {/* ── Right: Image ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative order-1 md:order-2 overflow-hidden"
        style={{ minHeight: "200px" }}
      >
        {/* Top-left corner accent */}
        <div className="absolute top-3 left-3 z-10 w-6 h-6 border-t-2 border-l-2 border-[#E2DECA]/60 pointer-events-none" />
        <div className="absolute bottom-3 right-3 z-10 w-6 h-6 border-b-2 border-r-2 border-[#E2DECA]/60 pointer-events-none" />

        <Image
          src={tab.image}
          alt={tab.imageAlt}
          fill
          className="object-cover"
          priority={tab.id === 0}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20 pointer-events-none" />
      </motion.div>
    </motion.div>
  );
}

// ─── Main ServicesSection ──────────────────────────────────────────────────────
export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="services"
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ background: "#F2EBE5" }}
    >
      {/* ── Ambient background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20 blur-[120px]"
          style={{ background: "#4A6741" }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full opacity-15 blur-[100px]"
          style={{ background: "#D05B43" }}
        />
        {/* Grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: NOISE_SVG,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        {/* ── Section Header ── */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-5"
          >
            <div className="h-px w-10 bg-[#4A6741]/60" />
            <span
              className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#4A6741]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Tiga Pilar Layanan
            </span>
            <div className="h-px w-10 bg-[#4A6741]/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-neutral-900 mb-5"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Keahlian yang{" "}
            <em className="italic font-normal text-[#4A6741]">Membentuk</em>
            <br className="hidden md:block" /> Ruang Impian
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-neutral-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Dari konsep hingga realisasi — setiap sentuhan dirancang dengan
            presisi dan jiwa seni yang mendalam.
          </motion.p>
        </div>

        {/* ── 3D Tablet ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <TabletFrame>
            {/* Inner screen layout */}
            <div className="flex flex-col h-full">
              {/* Tab navigation bar */}
              <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

              {/* Divider line */}
              <div className="mx-5 h-px bg-[#ccc8b3]/60" />

              {/* Tab content with animated transitions */}
              <div className="flex-1 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <TabContent key={activeTab} tab={TABS[activeTab]} />
                </AnimatePresence>
              </div>
            </div>
          </TabletFrame>
        </motion.div>

        {/* ── Step indicators below tablet ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mt-10"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              id={`services-dot-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className="transition-all duration-300 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#4A6741]"
              style={{
                width: activeTab === tab.id ? "2rem" : "0.5rem",
                height: "0.5rem",
                background:
                  activeTab === tab.id ? "#4A6741" : "#ccc8b3",
              }}
              aria-label={`Go to ${tab.label}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}