"use client"; // Wajib untuk menjalankan animasi di Next.js
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Partners() {
  const t = useTranslations('Partners');

  return (
    <section className="py-12 bg-[#F2EBE5] border-t border-[#1F2229]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <h3 className="text-sm font-bold text-[#1F2229]/30 uppercase tracking-widest">
          {t('label')}
        </h3>
      </div>
      
      
      <div className="relative w-full flex overflow-x-hidden">
        
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F2EBE5] to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F2EBE5] to-transparent z-10"></div>

        <motion.div
          className="flex space-x-16 items-center whitespace-nowrap pl-16"
          animate={{ x: ["0%", "-50%"] }} // Bergerak dari awal hingga setengah panjang total
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15, // Ubah angka ini untuk mempercepat/memperlambat
          }}
        >
          
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex space-x-16 items-center opacity-40 hover:opacity-80 transition-opacity duration-300">
              <span className="text-3xl font-black text-[#1F2229]">Bank BTN</span>
              <span className="text-3xl font-black text-[#1F2229]">BNI</span>
              <span className="text-3xl font-black text-[#1F2229]">mandiri</span>
              <span className="text-3xl font-black text-[#1F2229]">BCA</span>
              <span className="text-2xl font-bold text-[#1F2229]">{t('partner')}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}