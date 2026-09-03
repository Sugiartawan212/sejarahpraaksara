'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// ─── Dummy Data Services ───────────────────────────────────────────────
const services = [
  {
    id: '01',
    title: 'Architecture',
    subtitle: 'Structural Narrative & Spatial Flow',
    description: 'Sebuah bangunan lebih dari sekadar dinding dan atap. Kami mengkoreografikan pergerakan cahaya alami, sirkulasi udara, dan aktivitas Anda di dalamnya. Kami merancang struktur yang memastikan setiap transisi dari satu ruang ke ruang lainnya mengalir dan bercerita dengan mulus.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '02',
    title: 'Interior Design',
    subtitle: 'Material Curation & Aesthetic Rhythm',
    description: 'Membawa harmoni ke dalam ruang personal Anda. Kami mengurasi material, memadukan tekstur, dan menata furnitur dengan ritme visual yang presisi. Hasilnya adalah suasana "Quiet Luxury" yang tidak hanya memanjakan mata, tetapi juga menenangkan pikiran setiap kali Anda melangkah masuk.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '03',
    title: 'Design & Build',
    subtitle: 'End-to-End Flawless Execution',
    description: 'Mewujudkan mahakarya di atas kertas menjadi realitas yang kokoh. Dari peletakan batu pertama hingga sentuhan akhir finishing, kami mengeksekusi setiap detail layaknya sebuah pertunjukan yang telah dilatih secara matang. Anda hanya perlu duduk tenang dan menikmati hasil akhirnya.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1200',
  }
];

export default function ServicesPage() {
  const locale = 'en'; // Nanti ganti dengan useLocale() jika pakai i18n
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#EEEBE4] text-[#2A2A27] selection:bg-[#5C7A5A] selection:text-[#EEEBE4]">

      {/* ── 1. IMPROVED CINEMATIC FRAMED HERO SECTION ── */}
      <div className="w-full px-4 md:px-6 pt-4 md:pt-6">
        <div className="relative w-full h-[85vh] md:h-[95vh] max-w-[1800px] mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col justify-center px-6 md:px-16 lg:px-24">

          {/* Background Image & Overlay */}
          <img
            src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2000&auto=format&fit=crop"
            alt="Umah Luwung Expertise"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>

          {/* Teks Konten (Animasi Fade-Up) */}
          <div
            className={`relative z-10 w-full h-full flex flex-col justify-end pb-16 md:pb-24 transform transition-all duration-1000 ease-out ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 lg:gap-20 w-full">

              {/* Bagian Kiri (Judul Besar Berkelas) */}
              <div className="flex flex-col">
                <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-white/80 font-bold font-sans mb-6 drop-shadow-md">
                  Our Expertise
                </p>
                <h1 className="font-serif text-5xl md:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-lg">
                  Crafting <br />
                  <span className="italic text-[#84A98C]">Extraordinary</span> <br />
                  Spaces
                </h1>
              </div>

              {/* Bagian Kanan (Deskripsi Pendukung) */}
              <div className="lg:w-1/3 lg:text-right">
                <p className="font-sans font-semibold text-white/90 text-base md:text-xl leading-relaxed drop-shadow-md border-l-4 lg:border-l-0 lg:border-r-4 border-[#84A98C] pl-4 lg:pl-0 lg:pr-4">
                  Pendekatan komprehensif untuk menciptakan ruang hidup yang melampaui ekspektasi.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── CONTAINER KONTEN BAWAH (DATA ASLI LU) ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 pt-24 md:pt-32 pb-32">

        {/* ── Services List ── */}
        <div className="flex flex-col gap-24 md:gap-40">
          {services.map((service, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.id}
                className={`flex flex-col gap-8 md:gap-16 ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
              >
                {/* Bagian Gambar */}
                <div className="w-full lg:w-1/2">
                  <div className="overflow-hidden rounded-2xl bg-[#E2DECA] aspect-[4/5] md:aspect-square w-full shadow-sm relative group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-6 pointer-events-none">
                      <span className="font-serif text-8xl md:text-9xl font-bold text-[#EEEBE4]/40 mix-blend-overlay">
                        {service.id}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bagian Teks */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-2 md:px-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm md:text-base font-bold font-sans text-[#EEEBE4] bg-[#5C7A5A] tracking-widest rounded-full px-4 py-1 shadow-sm">
                      {service.id}
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2A2A27]">
                      {service.title}
                    </h2>
                  </div>

                  <h3 className="text-xs md:text-sm font-bold font-sans uppercase tracking-[0.2em] text-[#5C7A5A] mb-6 border-b-2 border-[#2A2A27]/10 pb-4 inline-block w-fit">
                    {service.subtitle}
                  </h3>

                  <p className="font-sans font-medium text-base md:text-lg text-[#2A2A27]/80 leading-relaxed max-w-lg mb-10">
                    {service.description}
                  </p>

                  <Link
                    href={`/${locale}/projects`}
                    className="group inline-flex items-center justify-center gap-3 bg-[#5C7A5A] hover:bg-[#4A6348] text-[#EEEBE4] px-7 py-3.5 rounded-full text-xs font-bold font-sans uppercase tracking-widest shadow-md hover:shadow-lg transition-all duration-300 w-fit transform hover:-translate-y-1"
                  >
                    <span>Lihat Karya {service.title}</span>
                    <span className="text-base transform group-hover:translate-x-1.5 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom Call To Action ── */}
        <div className="mt-32 md:mt-48 bg-[#E2DECA] rounded-3xl p-10 md:p-20 text-center flex flex-col items-center shadow-inner">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#2A2A27] mb-6 max-w-2xl">
            Siap Memulai Cerita Ruang Anda?
          </h2>
          <p className="font-sans font-medium text-[#2A2A27]/80 text-base md:text-lg max-w-xl mb-10">
            Mari jadwalkan diskusi santai. Kami siap mendengarkan visi Anda dan merumuskan langkah pertama menuju hunian impian.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="bg-[#5C7A5A] hover:bg-[#4A6348] text-[#EEEBE4] px-8 py-4 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Mulai Konsultasi Gratis
          </Link>
        </div>

      </div>
    </div>
  );
}