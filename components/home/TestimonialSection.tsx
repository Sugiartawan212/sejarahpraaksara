"use client";

import React, { useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: "Bapak Kino",
        role: "Property Agent, Kavling Singaraja",
        initials: "PK",
        quote: "Awalnya ragu menggunakan jasa interior secara penuh, tapi Kak Sri dan tim Umah Luwung sangat transparan. Material yang dijanjikan sesuai, hasilnya presisi. Sangat memuaskan!"
    },
    {
        id: 2,
        name: "Bapak Hendra",
        role: "Pemilik Villa Pribadi",
        initials: "BH",
        quote: "Satu-satunya studio di Singaraja yang bisa menerjemahkan konsep desain arsitektur modern menjadi kenyataan tanpa mengurangi fungsi ruang. Pengerjaannya presisi dan tepat waktu."
    },
    {
        id: 3,
        name: "Ibu Anisa",
        role: "Klien Interior Hunian",
        initials: "IA",
        quote: "Dari awal konsultasi sampai tahap instalasi, prosesnya sangat komunikatif. Custom furniture-nya benar-benar high-end. Sangat puas dengan hasil akhirnya untuk ruang tamu kami!"
    },
    {
        id: 4,
        name: "Bapak Dwi",
        role: "Pemilik Cafe, Lovina",
        initials: "BD",
        quote: "Konsep Japandi yang ditawarkan sangat out-of-the-box tapi tetap membumi. Pengunjung cafe saya selalu memuji kenyamanan dan estetika tempat duduknya. Return of Investment yang sangat worth it!"
    },
    {
        id: 5,
        name: "Ibu Ratna",
        role: "Klien Renovasi Dapur",
        initials: "IR",
        quote: "Kitchen set impian saya akhirnya terwujud. Finishing-nya sangat rapi, engsel dan material yang dipakai kelas satu. Memasak jadi pengalaman yang jauh lebih menyenangkan sekarang."
    }
];

export default function TestimonialSection() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -420 : 420;
            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-[#EEEBE4] py-28 md:py-36 relative overflow-hidden">

            {/* Dekorasi Background */}
            <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-[#E2DECA]/30 to-transparent pointer-events-none"></div>

            <div className="max-w-[90rem] mx-auto px-6 md:px-12 relative z-10">

                {/* Header Section (Tombol panah sudah dipindah dari sini) */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[#5C7A5A] font-bold tracking-[0.3em] text-xs uppercase">
                            REPUTASI & KEPERCAYAAN
                        </span>
                        <div className="h-px w-12 bg-[#5C7A5A]"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-light text-[#2A2A27] tracking-tight leading-tight">
                        Apa Kata Klien <br />
                        <span className="font-serif italic font-bold text-[#5C7A5A]">Terpercaya Kami</span>
                    </h2>
                </div>

                {/* Carousel / Slider Container */}
                <div className="relative -mx-6 md:-mx-12 px-6 md:px-12">
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto gap-6 md:gap-8 pb-8 pt-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        {testimonials.map((item) => (
                            <div
                                key={item.id}
                                // Kartu sekarang sejajar rata (hilangkan logika index ganjil/genap)
                                className="snap-center shrink-0 w-[85vw] md:w-[420px] relative bg-[#E2DECA] p-8 md:p-10 rounded-[2.5rem] shadow-[0_15px_40px_-15px_rgba(42,42,39,0.1)] border border-[#5C7A5A]/15 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(92,122,90,0.3)] hover:border-[#5C7A5A]/40 hover:-translate-y-2"
                            >

                                {/* Tanda Kutip Raksasa Latar Belakang */}
                                <Quote className="absolute top-6 right-8 w-28 h-28 text-[#5C7A5A] opacity-[0.03] pointer-events-none" />

                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-[#FBBF24] text-[#FBBF24]" />
                                    ))}
                                </div>

                                <p className="text-[#2A2A27]/90 text-base md:text-lg font-medium leading-relaxed mb-10 italic font-serif relative z-10 line-clamp-6">
                                    "{item.quote}"
                                </p>

                                {/* Garis Pembatas Halus Internal */}
                                <div className="w-full h-px bg-[#5C7A5A]/20 mb-6 relative z-10"></div>

                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-full bg-[#5C7A5A] text-[#EEEBE4] flex items-center justify-center font-bold text-sm tracking-wider shadow-md">
                                        {item.initials}
                                    </div>
                                    <div>
                                        <h4 className="text-[#2A2A27] font-bold text-base tracking-wide">
                                            {item.name}
                                        </h4>
                                        <p className="text-[#5C7A5A] text-[11px] font-bold tracking-widest uppercase mt-1">
                                            {item.role}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>

                {/* Tombol Navigasi Slider - Dipindah ke Tengah Bawah */}
                <div className="flex items-center justify-center gap-6 mt-10">
                    <button
                        onClick={() => scroll('left')}
                        className="w-14 h-14 rounded-full border border-[#5C7A5A]/40 flex items-center justify-center text-[#5C7A5A] bg-transparent hover:bg-[#5C7A5A] hover:text-[#EEEBE4] transition-all duration-300 shadow-sm active:scale-95"
                        aria-label="Geser Kiri"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        className="w-14 h-14 rounded-full border border-[#5C7A5A]/40 flex items-center justify-center text-[#5C7A5A] bg-transparent hover:bg-[#5C7A5A] hover:text-[#EEEBE4] transition-all duration-300 shadow-sm active:scale-95"
                        aria-label="Geser Kanan"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

            </div>
        </section>
    );
}