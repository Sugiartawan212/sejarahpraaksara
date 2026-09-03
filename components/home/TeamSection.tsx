"use client";

import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

// Data Anggota Kelompok
const teamMembers = [
  {
    id: 1,
    name: "Andi Pratama",
    role: "Speaker Utama",
    desc: "Bertugas membawakan presentasi dan menjelaskan materi secara interaktif kepada audiens.",
    color: "#D05B43", // Terracotta
    image: "https://ui-avatars.com/api/?name=Andi+Pratama&background=D05B43&color=fff&size=256",
  },
  {
    id: 2,
    name: "Sugiartawan",
    role: "UI/UX & Web Dev",
    desc: "Merancang dan membangun website presentasi interaktif ini dari nol dengan animasi memukau.",
    color: "#5C7A5A", // Sage Green
    image: "https://ui-avatars.com/api/?name=Sugiartawan&background=5C7A5A&color=fff&size=256",
  },
  {
    id: 3,
    name: "Budi Wijaya",
    role: "Riset Materi & Kuis",
    desc: "Mengumpulkan data sejarah pra-aksara yang akurat dan menyusun pertanyaan kuis yang menantang.",
    color: "#D4AF37", // Gold
    image: "https://ui-avatars.com/api/?name=Budi+Wijaya&background=D4AF37&color=fff&size=256",
  }
];

export default function TeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Tambahkan tipe "Variants" dari framer-motion agar TS tidak error
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      // Tambahkan "as [number, number, number, number]" agar TS tahu ini adalah tuple cubic-bezier
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
  };

  return (
    <section id="tim" className="bg-[#EEEBE4] pt-24 pb-12 md:pt-32 md:pb-16 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10" ref={ref}>

        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <div className="h-px w-8 bg-[#5C7A5A]"></div>
            <span className="text-[#5C7A5A] font-bold tracking-[0.2em] text-xs uppercase">
              Di Balik Layar
            </span>
            <div className="h-px w-8 bg-[#5C7A5A]"></div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-[#2A2A27] tracking-tight"
          >
            Tim <span className="font-serif italic text-[#5C7A5A] font-bold">Pengembang</span>
          </motion.h2>
        </div>

        {/* Grid Kartu Anggota Tim */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={cardVariants}
              className="group relative"
            >
              {/* Kartu Tema Terang (White Card) */}
              <div className="relative h-full bg-white border border-[#2A2A27]/5 p-8 md:p-10 rounded-[2rem] flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 transform">

                {/* Foto / Avatar */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 mb-6">
                  {/* Dekorasi Lingkaran Warna di Belakang Foto */}
                  <div
                    className="absolute inset-0 rounded-full blur-md opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500"
                    style={{ backgroundColor: member.color }}
                  ></div>

                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-full h-full object-cover rounded-full border border-gray-100 shadow-md grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>

                {/* Badge Role (Warnanya beda-beda tiap anak) */}
                <div
                  className="px-5 py-2 rounded-full text-[10px] md:text-xs font-bold tracking-widest uppercase text-white mb-5 shadow-sm"
                  style={{ backgroundColor: member.color }}
                >
                  {member.role}
                </div>

                {/* Nama & Deskripsi */}
                <h3 className="text-2xl font-serif font-bold text-[#2A2A27] mb-3">
                  {member.name}
                </h3>
                <p className="text-[#2A2A27]/70 text-sm leading-relaxed font-medium">
                  {member.desc}
                </p>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}