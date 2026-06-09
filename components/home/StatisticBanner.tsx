"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

// --- TAMBAHAN TYPESCRIPT BUNGKUSAN ---
interface CountUpProps {
  end: number;
  suffix?: string;
  decimals?: number;
}

// --- KOMPONEN ANIMASI ANGKA BERJALAN ---
const CountUp: React.FC<CountUpProps> = ({ end, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number | null = null;
          const duration = 2000;

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 4);
            setCount(easeOut * end);

            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toFixed(decimals)}{suffix}</span>;
};

// --- DATA STATISTIK ---
const stats = [
  { end: 120, suffix: "+", label: "Proyek Selesai", decimals: 0 },
  { end: 23, suffix: "+", label: "Tahun Pengalaman", decimals: 0 },
  { end: 98, suffix: "%", label: "Kepuasan Klien", decimals: 0 },
  { end: 4.9, suffix: "", label: "Rating Bintang 5", decimals: 1, isStar: true }
];

// --- KOMPONEN UTAMA ---
export default function StatisticBanner() {
  return (
    <section className="bg-[#2A2A27] py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Sistem Bingkai Tegas */}
        <div className="grid grid-cols-2 md:grid-cols-4 w-full border-t border-b border-[#5C7A5A]/40">

          {stats.map((stat, index) => (
            <div
              key={index}
              className={`py-12 flex flex-col items-center justify-center group
                ${index % 2 === 0 ? 'border-r border-[#5C7A5A]/40' : ''} 
                ${index < 2 ? 'border-b md:border-b-0 border-[#5C7A5A]/40' : ''} 
                md:border-r md:border-[#5C7A5A]/40 md:last:border-r-0
              `}
            >
              <div className="transform transition-transform duration-500 group-hover:-translate-y-2 flex flex-col items-center">

                <div className="flex items-center gap-1 mb-3">
                  {/* LOGIKA WARNA EMAS KHUSUS UNTUK 4.9 DITERAPKAN DI SINI */}
                  <h3 className={`text-5xl md:text-6xl font-serif font-light tracking-wide ${stat.isStar ? 'text-[#FBBF24]' : 'text-[#EEEBE4]'}`}>
                    <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} />
                  </h3>

                  {/* Bintang Emas */}
                  {stat.isStar && (
                    <Star className="w-8 h-8 md:w-10 md:h-10 fill-[#FBBF24] text-[#FBBF24] ml-2 -mt-2 animate-[pulse_3s_ease-in-out_infinite]" />
                  )}
                </div>

                <p className="text-[#5C7A5A] text-xs md:text-sm tracking-[0.15em] uppercase font-bold text-center mt-1">
                  {stat.label}
                </p>

              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}