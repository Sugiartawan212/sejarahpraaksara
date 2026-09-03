import React from 'react';
import { Quote, ArrowRight } from 'lucide-react';

export default function PengertianSection() {
  return (
    <section id="pengertian" className="bg-[#EEEBE4] py-24 md:py-32 relative overflow-hidden">

      {/* Teks Watermark Raksasa di Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-serif font-bold text-[#2A2A27] opacity-[0.03] whitespace-nowrap pointer-events-none select-none">
        PRA-AKSARA
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Kolom Kiri: Tipografi Utama & Pengertian ── */}
          <div className="space-y-10">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-12 bg-[#5C7A5A]"></div>
                <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-sm uppercase">
                  Pengantar Materi
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-light text-[#2A2A27] leading-[1.1] tracking-tight">
                Apa itu <br />
                Zaman <br />
                <span className="font-serif italic text-[#5C7A5A] mt-2 block">Pra-Aksara?</span>
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-[#2A2A27]/90 text-lg leading-relaxed font-normal">
                Zaman pra-aksara adalah masa ketika manusia belum mengenal sistem tulisan. Kata{' '}
                <strong className="text-[#5C7A5A]">&ldquo;Pra&rdquo;</strong> berarti{' '}
                <em>sebelum</em>, sedangkan{' '}
                <strong className="text-[#5C7A5A]">&ldquo;Aksara&rdquo;</strong> berarti{' '}
                <em>tulisan</em>. Jadi, zaman pra-aksara adalah era <em>sebelum manusia mengenal tulisan</em>.
              </p>

              <div>
                <p className="text-[#2A2A27]/70 text-xs font-bold tracking-[0.2em] uppercase mb-4">
                  Ciri-Ciri Kehidupan Manusia Pra-Aksara
                </p>
                <ul className="space-y-3">
                  {[
                    { icon: '✦', text: 'Belum mengenal tulisan — sejarah diketahui dari artefak & fosil' },
                    { icon: '✦', text: 'Sepenuhnya bergantung pada alam untuk bertahan hidup' },
                    { icon: '✦', text: 'Menggunakan alat sederhana dari batu, tulang, dan kayu' },
                    { icon: '✦', text: 'Bermula dari gaya hidup nomaden, lalu perlahan menetap' },
                    { icon: '✦', text: 'Mulai mengenal kepercayaan terhadap roh nenek moyang' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#2A2A27]/85 text-sm md:text-base leading-relaxed">
                      <span className="text-[#5C7A5A] mt-0.5 flex-shrink-0 font-bold">{item.icon}</span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tombol CTA yang mengarah ke Timeline */}
            <div className="pt-4">
              <a href="#timeline" className="group inline-flex items-center gap-3 bg-[#5C7A5A] text-white px-8 py-4 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-[#4a6348] hover:scale-105 transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(92,122,90,0.5)]">
                Lanjut ke Timeline
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* ── Kolom Kanan: Foto Ilustrasi Utama & Kutipan Overlap ── */}
          <div className="relative mt-12 lg:mt-0">

            {/* Aksen Kotak Dekoratif di Belakang Foto */}
            <div className="absolute -top-6 -right-6 w-3/4 h-full bg-[#5C7A5A]/10 rounded-t-[12rem] rounded-b-3xl -z-10 hidden md:block"></div>

            {/* ⚠️ Ganti "ilustrasi.jpg" dengan nama file yang ada di public/images/
                 Pilihan: lukisan-gua.jpg | neolitikum.jpg | paleolitikum.jpg
                          mesolitikum.jpg | menhir.jpg | nekara.jpg
                          kapak-genggam.jpg | perundagian.jpg */}
            <img
              src="/images/ilustrasi.jpg"
              alt="Zaman Pra-Aksara"
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-xl relative z-10"
            />

            {/* Kartu Kutipan Glassmorphism — Overlap di atas foto */}
            <div className="
              absolute -bottom-10 md:bottom-8
              -left-4 md:-left-12
              w-[92%] md:w-[88%]
              bg-[#E2DECA]/90 backdrop-blur-md
              p-7 md:p-9
              rounded-3xl
              shadow-2xl
              border border-white/50
            ">
              <Quote className="w-9 h-9 text-[#5C7A5A] mb-3 opacity-50" strokeWidth={1.5} />
              <p className="text-[#2A2A27] font-serif text-lg md:text-xl italic leading-snug">
                &ldquo;Bukan sekadar masa sebelum ada tulisan. Ini adalah era evolusi luar biasa dalam cara hidup, teknologi, dan ekonomi manusia.&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-4">
                <div className="w-10 h-px bg-[#5C7A5A]"></div>
                <span className="text-[#5C7A5A] text-xs tracking-[0.2em] uppercase font-bold">Inti Pembelajaran</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}