"use client";

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50">
      {/* 
        Rahasia efek kaca (Glassmorphism) ada di sini:
        1. bg-[#2A2A27]/70 -> Warna Graphite Earth dengan transparansi 70%
        2. backdrop-blur-md -> Memberikan efek buram/kaca pada apapun yang ada di belakang navbar
        3. border border-white/20 -> Garis putih super tipis transparan seperti di foto referensimu
      */}
      <nav className="bg-[#2A2A27]/70 backdrop-blur-md border border-white/20 rounded-full px-6 md:px-8 py-3 flex justify-between items-center shadow-2xl">

        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <span className="font-bold tracking-[0.2em] text-[#EEEBE4] text-xs md:text-sm uppercase group-hover:text-[#5C7A5A] transition-colors">
            Umah Luwung
          </span>
        </Link>

        {/* Menu Tengah (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-xs font-medium tracking-widest text-[#EEEBE4]/80 uppercase">
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
        </div>

        {/* Tombol CTA (Forest Sage) */}
        <Link
          href="/contact"
          className="bg-[#5C7A5A] text-white hover:bg-[#4a6348] px-6 py-2.5 rounded-full text-xs font-bold tracking-wide uppercase transition-all duration-300 shadow-[0_4px_14px_0_rgba(92,122,90,0.39)] hover:scale-105"
        >
          Konsultasi Gratis
        </Link>
      </nav>
    </div>
  );
}