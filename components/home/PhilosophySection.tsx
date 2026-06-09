import React from 'react';
import Image from 'next/image';
import { Quote, ArrowRight } from 'lucide-react'; // Tambah ArrowRight di sini

export default function PhilosophySection() {
  return (
    <section className="bg-[#EEEBE4] py-24 md:py-32 relative overflow-hidden">

      {/* Teks Watermark Raksasa di Background (Super Premium) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-serif font-bold text-[#2A2A27] opacity-[0.03] whitespace-nowrap pointer-events-none select-none">
        EST. 2009
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Kolom Kiri: Tipografi Utama & Filosofi */}
          <div className="lg:col-span-6 space-y-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#5C7A5A]"></div>
                <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-sm uppercase">
                  Filosofi Studio
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-light text-[#2A2A27] leading-[1.1] tracking-tight">
                Di Mana <br />
                Modernitas <br />
                Bertemu <br />
                <span className="font-serif italic text-[#5C7A5A] mt-2 block">Jiwa Bali</span>
              </h2>
            </div>

            <div className="space-y-6">
              {/* Teks ditebalkan sedikit (font-normal) dan warna dibuat lebih solid (opacity /90) */}
              <p className="text-[#2A2A27]/90 text-lg leading-relaxed font-normal">
                "Luwung" dalam bahasa Bali berarti harum, indah, dan berkualitas tinggi. Itulah standar yang kami junjung dalam setiap proyek yang kami kerjakan di Singaraja dan seluruh Bali Utara.
              </p>

              <p className="text-[#2A2A27]/90 text-lg leading-relaxed font-normal">
                Kami percaya bahwa sebuah ruang bukan sekadar tempat tinggal—ia adalah narasi tentang siapa Anda. Setiap garis, material, dan proporsi yang kami pilih mencerminkan identitas klien kami, sekaligus menghormati warisan estetika lokal yang kaya.
              </p>
            </div>

            {/* Tombol CTA Baru: Solid, Menarik Mata, Interaktif */}
            <div className="pt-4">
              <button className="group inline-flex items-center gap-3 bg-[#5C7A5A] text-white px-8 py-4 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-[#4a6348] hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(92,122,90,0.5)]">
                Kenali Kami Lebih Jauh
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Kolom Kanan: Foto Editorial & Kutipan Melayang */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
            {/* Aksen Kotak Hijau Sage di Belakang Foto */}
            <div className="absolute -top-6 -right-6 w-3/4 h-full bg-[#5C7A5A]/10 rounded-t-[12rem] rounded-b-3xl -z-10 hidden md:block"></div>

            {/* Foto Utama dengan bentuk Arch (Lengkungan Khas Arsitektur) */}
            <div className="relative h-[500px] md:h-[700px] w-full rounded-t-[12rem] rounded-b-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop"
                alt="Interior Mewah Umah Luwung"
                fill
                className="object-cover hover:scale-105 transition-transform duration-[2s]"
              />
            </div>

            {/* Kartu Kutipan Glassmorphism */}
            <div className="absolute -bottom-10 md:bottom-12 -left-4 md:-left-16 w-[90%] md:w-[85%] bg-[#E2DECA]/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl border border-white/40">
              <Quote className="w-10 h-10 text-[#5C7A5A] mb-4 opacity-50" strokeWidth={1.5} />
              <p className="text-[#2A2A27] font-serif text-xl md:text-2xl italic leading-snug">
                "Kami tidak mendekorasi ruang. Kami menciptakan pengalaman hidup yang tak terlupakan."
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-px bg-[#5C7A5A]"></div>
                <span className="text-[#5C7A5A] text-xs tracking-[0.2em] uppercase font-bold">Kak Sri, Lead Designer</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}