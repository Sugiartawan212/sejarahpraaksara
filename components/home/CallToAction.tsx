"use client";

import { CheckCircle2, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-24 bg-[#121824] relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D05B43] rounded-full mix-blend-multiply filter blur-[120px] opacity-10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D05B43] rounded-full mix-blend-multiply filter blur-[120px] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-[#D05B43]"></div>
              <span className="text-[#D05B43] font-bold tracking-[0.2em] text-sm uppercase">
                Mulai Perjalanan Anda
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light text-[#F2EBE5] mb-6 leading-tight">
              Mari Wujudkan <br className="hidden md:block" />
              <span className="font-serif italic text-[#D05B43]">Ruang Impian</span> Anda.
            </h2>

            <p className="text-[#F2EBE5]/60 text-lg mb-10 leading-relaxed">
              Diskusikan visi, gaya hidup, dan kebutuhan interior Anda. Kak Sri siap membantu menjadwalkan sesi konsultasi gratis Anda hari ini.
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-[#D05B43] flex-shrink-0 mt-0.5" />
                <span className="text-[#F2EBE5]/80">Sesi discovery 90 menit (Gratis)</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-[#D05B43] flex-shrink-0 mt-0.5" />
                <span className="text-[#F2EBE5]/80">Presentasi Mood Board & Konsep Awal</span>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-[#D05B43] flex-shrink-0 mt-0.5" />
                <span className="text-[#F2EBE5]/80">Estimasi Budget Transparan</span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-[#F2EBE5]/50">
              <span>Atau hubungi langsung:</span>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#F2EBE5] font-medium hover:text-[#D05B43] transition-colors">
                <Phone className="h-5 w-5" />
                +62 812-3456-7890
              </a>
            </div>
          </div>

          {/* Right: Card Form CTA */}
          <div className="bg-[#F2EBE5] rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group border border-[#1F2229]/5">
            {/* Terracotta top-bar accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D05B43] to-transparent opacity-80"></div>

            <div className="text-center space-y-8">
              <h3 className="text-3xl font-serif text-[#1F2229]">
                Siap Berdiskusi?
              </h3>
              <p className="text-[#1F2229]/60 leading-relaxed">
                Kunjungi halaman kontak kami untuk mengatur jadwal pertemuan, melihat lokasi studio, atau meninggalkan pesan detail tentang proyek Anda.
              </p>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-3 bg-[#D05B43] hover:bg-[#bb4a34] text-white font-medium text-lg py-5 px-8 rounded-xl shadow-[0_8px_30px_rgba(208,91,67,0.30)] transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                Ke Halaman Kontak
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>

              <p className="text-[#1F2229]/40 text-sm">Konsultasi Pertama Selalu Gratis</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}