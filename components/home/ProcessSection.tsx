'use client';

import React, { useState, useEffect, useRef } from 'react';

// Data Materi 4 Zaman Pra-Aksara
const timelineData = [
    {
        id: "01",
        title: "Paleolitikum (Batu Tua)",
        tag: "BERBURU & MERAMU",
        desc: "Alat batu kasar seperti kapak perimbas mendominasi kehidupan sehari-hari. Manusia hidup nomaden dalam kelompok kecil, sepenuhnya bergantung pada hewan buruan dan tumbuhan liar untuk bertahan hidup.",
        image: "/images/paleolitikum.jpg"
    },
    {
        id: "02",
        title: "Mesolitikum (Batu Tengah)",
        tag: "SEMI-MENETAP",
        desc: "Manusia mulai tinggal di gua (abris sous roche) dan memanfaatkan tepi sungai/pantai. Penemuan tumpukan kulit kerang (kjokkenmoddinger) membuktikan pola hidup semi-sedenter yang mulai terbentuk.",
        image: "/images/mesolitikum.jpg"
    },
    {
        id: "03",
        title: "Neolitikum & Megalitikum",
        tag: "FOOD PRODUCING",
        desc: "Revolusi besar terjadi: manusia beralih dari food gathering ke food producing. Mereka mulai bercocok tanam, hidup menetap, menghaluskan alat batu, dan membangun batu besar (menhir, dolmen) untuk pemujaan nenek moyang.",
        image: "/images/neolitikum.jpg"
    },
    {
        id: "04",
        title: "Zaman Perundagian",
        tag: "PENGOLAHAN LOGAM",
        desc: "Muncul golongan undagi yang ahli mengolah perunggu dan besi. Pembagian kerja menjadi sangat jelas dalam masyarakat, menghasilkan artefak presisi tinggi seperti nekara, moko, dan berbagai perhiasan logam.",
        image: "/images/perundagian.jpg"
    }
];

export default function TimelineSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    // Intersection Observer untuk memicu animasi saat di-scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="timeline" className="bg-[#EEEBE4] py-24 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* ── HEADER SECTION ── */}
                <div
                    className={`text-center max-w-3xl mx-auto mb-24 transition-all duration-1000 ease-out transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-sm uppercase mb-4 block">
                        Evolusi Peradaban
                    </span>
                    <h2 className="text-4xl md:text-6xl font-light text-[#2A2A27] mb-6 tracking-tight">
                        4 Tingkat <br />
                        <span className="font-serif italic text-[#5C7A5A]">Kehidupan Manusia</span>
                    </h2>
                    <p className="text-[#2A2A27]/90 text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                        Perjalanan panjang manusia purba dari sekadar bertahan hidup nomaden hingga mampu menciptakan teknologi pengolahan logam.
                    </p>
                </div>

                {/* ── ZIGZAG TIMELINE CONTAINER ── */}
                <div className="relative">

                    {/* Garis Vertikal Tengah (Gradient Elegan) */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[3px] md:-translate-x-1/2 rounded-full z-0 overflow-hidden bg-gray-200">
                        <div
                            className={`absolute top-0 left-0 w-full bg-gradient-to-b from-[#D4AF37] via-[#D05B43] to-[#5C7A5A] shadow-[0_0_15px_rgba(212,175,55,0.6)] transition-all duration-[2.5s] ease-in-out delay-300
              ${isVisible ? 'h-full' : 'h-0'}`}
                        ></div>
                    </div>

                    {/* Mapping Data 4 Tingkat */}
                    {timelineData.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={item.id}
                                style={{ transitionDelay: `${(index * 200) + 500}ms` }}
                                className={`relative flex flex-col md:flex-row items-center justify-between mb-20 md:mb-32 transition-all duration-1000 ease-out transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
                ${isEven ? '' : 'md:flex-row-reverse'}`} // Zigzag logic (tukar posisi di desktop)
                            >

                                {/* 1. Badge Angka di Tengah */}
                                <div className="absolute left-8 md:left-1/2 w-14 h-14 rounded-full bg-[#EEEBE4] border-4 border-[#2A2A27] md:-translate-x-1/2 flex items-center justify-center z-10 shadow-xl group-hover:scale-110 transition-transform duration-500">
                                    <span className="text-[#2A2A27] font-bold font-serif text-xl">{item.id}</span>
                                </div>

                                {/* 2. Kolom Teks (Materi) */}
                                <div className={`w-full md:w-5/12 pl-24 md:pl-0 flex flex-col justify-center group
                  ${isEven ? 'md:pr-16 md:text-right md:items-end' : 'md:pl-16 md:text-left md:items-start'}
                `}>
                                    <div className="inline-block bg-[#5C7A5A]/10 text-[#5C7A5A] font-bold text-[10px] tracking-widest px-4 py-1.5 rounded-full mb-4 uppercase">
                                        {item.tag}
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-serif font-bold text-[#2A2A27] mb-4 group-hover:text-[#D05B43] transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="text-[#2A2A27]/80 text-sm md:text-base leading-relaxed font-medium">
                                        {item.desc}
                                    </p>
                                </div>

                                {/* 3. Kolom Foto */}
                                <div className={`w-full md:w-5/12 pl-24 md:pl-0 mt-8 md:mt-0 
                  ${isEven ? 'md:pl-16' : 'md:pr-16'}
                `}>
                                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 group">
                                        {/* Gambar di hover akan zoom halus */}
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                                        />
                                        {/* Overlay Tipis Biar Estetik */}
                                        <div className="absolute inset-0 bg-[#2A2A27]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                                    </div>
                                </div>

                            </div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}