'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// ─── Komponen Animasi Angka ──────────────────────────────────────────
function AnimatedNumber({ end, duration = 2000, padZero = false }: { end: number, duration?: number, padZero?: boolean }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  const displayCount = padZero && count < 10 ? `0${count}` : count;

  return <span ref={ref}>{displayCount}</span>;
}

// ─── Dummy Data Team ─────────────────────────────────────────────────
const teamMembers = [
  {
    slug: 'brama-adiputra',
    name: 'Brama Adiputra',
    role: 'Principal Architect',
    image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'saraswati-kirana',
    name: 'Saraswati Kirana',
    role: 'Lead Interior Designer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'yudhistira-pratama',
    name: 'Yudhistira Pratama',
    role: 'Senior Project Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
  {
    slug: 'ananya-dewi',
    name: 'Ananya Dewi',
    role: 'Lighting Choreographer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
  }
];

export default function AboutPage() {
  const locale = 'en';

  const [isLoaded, setIsLoaded] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#EEEBE4] text-[#2A2A27] selection:bg-[#5C7A5A] selection:text-[#EEEBE4]">

      <style dangerouslySetInnerHTML={{
        __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* ── 1. FRAMED CINEMATIC HERO (Tinggi Maksimal & Frame Tipis Konsisten) ── */}
      {/* Mengurangi padding atas (pt) agar foto naik mentok ke atas di belakang navbar */}
      <div className="w-full px-4 md:px-6 pt-4 md:pt-6">
        <div className="relative w-full h-[85vh] md:h-[95vh] max-w-[1800px] mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center text-center px-6">
          <img
            src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop"
            alt="Umah Luwung Design Philosophy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>

          <div
            className={`relative z-10 max-w-5xl transform transition-all duration-1000 ease-out delay-300 mt-12 md:mt-20 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
          >
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#EEEBE4]/80 font-bold font-sans mb-6">
              The Philosophy
            </p>
            <h1 className="font-serif text-4xl md:text-6xl xl:text-7xl font-bold text-[#EEEBE4] tracking-tight leading-[1.2]">
              Arsitektur bukanlah sekadar bangunan. Ia adalah <span className="italic text-[#84A98C]">seni bercerita</span> melalui ruang.
            </h1>
          </div>
        </div>
      </div>

      {/* ── CONTAINER UTAMA KONTEN BAWAH ── */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 pt-24 md:pt-32 pb-32">

        {/* ── 2. THE NARRATIVE ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-32 md:mb-40 items-start">

          <div className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-32 relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2A2A27] leading-tight break-words">
              Mengkoreografikan <br />
              <span className="text-[#5C7A5A] italic">Kehidupan.</span>
            </h2>

            <div className="w-full md:w-4/5 aspect-[2/3] rounded-t-full rounded-b-3xl overflow-hidden shadow-xl border-4 border-[#E2DECA]">
              <img
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop"
                alt="Interior Detail"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-8 md:gap-10 pt-4 lg:pt-8 relative z-10">

            <div className="pl-6 border-l-4 border-[#5C7A5A]">
              <p className="font-serif text-2xl md:text-3xl text-[#5C7A5A] font-bold leading-relaxed italic">
                "Di Umah Luwung, kami memandang setiap proyek sebagai sebuah narasi yang menunggu untuk ditulis."
              </p>
            </div>

            <p className="font-sans font-bold text-lg md:text-xl text-[#2A2A27]/90 leading-relaxed">
              Kami tidak hanya menempatkan furnitur atau mendirikan dinding; kami merancang alur pergerakan Anda setiap harinya.
            </p>

            <p className="font-sans font-medium text-base md:text-lg text-[#2A2A27]/70 leading-loose">
              Seperti sebuah pertunjukan yang dilatih dengan presisi, kami memperhatikan setiap langkah fisik yang Anda ambil dari pintu masuk hingga ke ruang istirahat. Di mana cahaya matahari pagi akan jatuh, bagaimana sirkulasi udara menyapu ruangan, hingga tekstur material yang bersentuhan dengan kulit Anda—semuanya dikoreografikan untuk menciptakan harmoni spasial yang utuh (Quiet Luxury).
            </p>

            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mt-6 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
                alt="Harmoni Spasial"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* ── 3. TYPOGRAPHY METRICS GRID DENGAN ANIMASI ── */}
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-8 border-y-2 border-[#2A2A27]/10 py-16 md:py-24 mb-32 md:mb-40 text-center">
          <div className="flex flex-col gap-3 w-[40%] md:w-auto">
            <span className="font-serif text-5xl md:text-7xl font-bold text-[#2A2A27]">
              <AnimatedNumber end={5} duration={2000} padZero={true} /><span className="text-[#5C7A5A]">+</span>
            </span>
            <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#2A2A27]/60">Tahun Pengalaman</span>
          </div>
          <div className="flex flex-col gap-3 w-[40%] md:w-auto">
            <span className="font-serif text-5xl md:text-7xl font-bold text-[#2A2A27]">
              <AnimatedNumber end={40} duration={2500} /><span className="text-[#5C7A5A]">+</span>
            </span>
            <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#2A2A27]/60">Proyek Selesai</span>
          </div>
          <div className="flex flex-col gap-3 w-[40%] md:w-auto">
            <span className="font-serif text-5xl md:text-7xl font-bold text-[#2A2A27]">
              <AnimatedNumber end={15} duration={2200} />
            </span>
            <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#2A2A27]/60">Tim Ahli</span>
          </div>
          <div className="flex flex-col gap-3 w-[40%] md:w-auto">
            <span className="font-serif text-5xl md:text-7xl font-bold text-[#2A2A27]">
              <AnimatedNumber end={100} duration={3000} /><span className="text-[#5C7A5A]">%</span>
            </span>
            <span className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#2A2A27]/60">Klien Puas</span>
          </div>
        </div>

        {/* ── 4. MEET OUR TEAM ── */}
        <div className="mb-32 md:mb-48">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#2A2A27] mb-6">
              Meet Our Team
            </h2>
            <p className="font-sans font-medium text-[#2A2A27]/70 max-w-2xl mx-auto">
              Kenali lebih dekat para arsitek dan desainer yang akan menterjemahkan visi Anda menjadi mahakarya visual.
            </p>
          </div>

          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-8 md:gap-12 pb-8 hide-scrollbar w-full"
          >
            {teamMembers.map((member) => (
              <div
                key={member.slug}
                className="w-[85vw] md:w-[320px] flex-shrink-0 snap-center group flex flex-col items-center"
              >
                <div className="w-full aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-[#E2DECA] border-8 border-[#FDFBF7] shadow-lg mb-6 relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>

                <div className="w-11/12 flex flex-col gap-5 bg-[#FDFBF7] p-6 rounded-3xl shadow-sm border border-[#2A2A27]/5 text-center -mt-12 relative z-10">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2A2A27]">{member.name}</h3>
                    <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C7A5A] mt-2">{member.role}</p>
                  </div>

                  <Link
                    href={`/${locale}/about/${member.slug}`}
                    className="w-full flex items-center justify-center gap-2 bg-[#5C7A5A] hover:bg-[#4A6348] text-[#EEEBE4] px-6 py-3 rounded-full text-[10px] md:text-xs font-bold font-sans uppercase tracking-widest transition-all duration-300 shadow-md"
                  >
                    Profil Lengkap →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={slideLeft}
              aria-label="Geser ke kiri"
              className="w-14 h-14 rounded-full bg-[#5C7A5A] text-[#EEEBE4] flex items-center justify-center hover:bg-[#4A6348] transition-all duration-300 shadow-lg transform hover:-translate-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={slideRight}
              aria-label="Geser ke kanan"
              className="w-14 h-14 rounded-full bg-[#5C7A5A] text-[#EEEBE4] flex items-center justify-center hover:bg-[#4A6348] transition-all duration-300 shadow-lg transform hover:translate-x-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── 5. CALL TO ACTION ── */}
        <div className="bg-[#E2DECA] rounded-3xl p-10 md:p-20 text-center flex flex-col items-center shadow-inner">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#2A2A27] mb-6 max-w-2xl">
            Mari Rancang Ruang Anda
          </h2>
          <p className="font-sans font-medium text-[#2A2A27]/80 text-base md:text-lg max-w-xl mb-10">
            Jadikan Umah Luwung sebagai mitra Anda dalam mewujudkan hunian atau ruang komersial yang tak lekang oleh waktu.
          </p>
          <Link
            href={`/${locale}/contact`}
            className="bg-[#5C7A5A] hover:bg-[#4A6348] text-[#EEEBE4] px-8 py-4 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Hubungi Kami Sekarang
          </Link>
        </div>

      </div>
    </div>
  );
}