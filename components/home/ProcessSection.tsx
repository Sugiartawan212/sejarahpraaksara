"use client";

import React, { useState, useEffect, useRef } from 'react';
// Kita pakai Heroicons Solid dari react-icons biar ikonnya padat dan bisa diwarnai penuh
import { HiChatBubbleBottomCenterText, HiLightBulb, HiWrenchScrewdriver, HiKey } from 'react-icons/hi2';

const steps = [
    {
        id: "01",
        title: "Konsultasi",
        desc: "Sesi discovery 90 menit untuk memahami gaya hidup, aspirasi, dan budget Anda. Gratis, tanpa komitmen.",
        // Warna Emas Premium
        icon: <HiChatBubbleBottomCenterText className="w-10 h-10 text-[#D4AF37] group-hover:text-[#EEEBE4] transition-colors duration-500" />
    },
    {
        id: "02",
        title: "Konsep",
        desc: "Presentasi mood board, floor plan 3D, dan material board. Revisi hingga Anda benar-benar jatuh cinta.",
        // Warna Terracotta/Bata
        icon: <HiLightBulb className="w-10 h-10 text-[#D05B43] group-hover:text-[#EEEBE4] transition-colors duration-500" />
    },
    {
        id: "03",
        title: "Konstruksi",
        desc: "Tim terlatih kami bekerja dengan standar presisi tinggi. Laporan progres mingguan langsung ke WhatsApp Anda.",
        // Warna Abu Baja/Slate
        icon: <HiWrenchScrewdriver className="w-10 h-10 text-[#475569] group-hover:text-[#EEEBE4] transition-colors duration-500" />
    },
    {
        id: "04",
        title: "Selesai",
        desc: "Serah terima dengan walkthrough menyeluruh dan garansi workmanship 1 tahun untuk ketenangan pikiran Anda.",
        // Warna Biru Navy
        icon: <HiKey className="w-10 h-10 text-[#1E3A8A] group-hover:text-[#EEEBE4] transition-colors duration-500" />
    }
];

export default function ProcessSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="bg-[#EEEBE4] py-24 md:py-32 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header Section */}
                <div
                    className={`text-center max-w-3xl mx-auto mb-24 transition-all duration-1000 ease-out transform
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <h2 className="text-4xl md:text-5xl font-light text-[#2A2A27] mb-6 tracking-tight">
                        Dari Visi <br />
                        <span className="font-serif italic text-[#5C7A5A]">Menjadi Kenyataan</span>
                    </h2>
                    {/* FONT DITEBALKAN: font-medium dan opacity dinaikkan jadi /90 */}
                    <p className="text-[#2A2A27]/90 text-lg font-medium leading-relaxed">
                        Proses kami dirancang untuk memberikan ketenangan pikiran — dari konsultasi pertama hingga serah terima kunci.
                    </p>
                </div>

                {/* Container Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">

                    {/* Garis Penghubung Tengah (Hanya Desktop) */}
                    <div className="hidden md:block absolute top-[3rem] left-[10%] right-[10%] h-px z-0">
                        <div className="absolute inset-0 bg-[#5C7A5A]/10 w-full h-full"></div>
                        <div
                            className={`absolute inset-0 bg-[#5C7A5A]/40 h-full transition-all duration-[1.5s] ease-in-out delay-500
               ${isVisible ? 'w-full' : 'w-0'}`}
                        ></div>
                    </div>

                    {/* Mapping Kartu Proses */}
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            style={{ transitionDelay: `${(index * 200) + 600}ms` }}
                            className={`relative z-10 flex flex-col items-center text-center group cursor-default transition-all duration-700 ease-out transform
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}
              `}
                        >

                            {/* Wadah Lingkaran Ikon */}
                            <div className="relative mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-4 group-hover:scale-105">

                                <div className="w-24 h-24 rounded-full bg-[#E2DECA] border border-[#5C7A5A]/20 flex items-center justify-center transition-all duration-500 ease-out group-hover:bg-[#5C7A5A] group-hover:shadow-[0_20px_40px_-10px_rgba(92,122,90,0.6)] group-hover:border-[#5C7A5A]">

                                    {/* Ikon Solid Warna-Warni Muncul Di Sini */}
                                    {step.icon}

                                </div>

                                {/* Badge Angka */}
                                <div className="absolute -top-1 -right-1 bg-[#5C7A5A] text-[#EEEBE4] text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg border-2 border-[#EEEBE4] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                                    {step.id}
                                </div>
                            </div>

                            {/* Teks Konten */}
                            {/* FONT DITEBALKAN: font-bold untuk judul */}
                            <h3 className="text-2xl font-serif font-bold text-[#2A2A27] mb-4 group-hover:text-[#5C7A5A] transition-colors duration-300">
                                {step.title}
                            </h3>
                            {/* FONT DITEBALKAN: font-medium dan opacity /90 untuk deskripsi */}
                            <p className="text-[#2A2A27]/90 text-sm leading-relaxed font-medium">
                                {step.desc}
                            </p>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}