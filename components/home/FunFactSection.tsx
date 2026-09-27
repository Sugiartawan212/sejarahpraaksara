'use client';

import { motion } from 'framer-motion';

// ─── DATA KONTEN CARDS ────────────────────────────────────────────────────────
const funFacts = [
  {
    imageSrc: '/images/kerang.jpg',
    imageAlt: 'Kjokkenmoddinger',
    emoji: '🐚',
    title: 'Gunung Sampah Dapur (Kjokkenmoddinger)',
    description:
      'Manusia purba pada zaman Mesolitikum meninggalkan tumpukan kulit kerang dan siput yang sangat tinggi. Tumpukan ini disebut Kjokkenmoddinger, berasal dari bahasa Denmark yang berarti "sampah dapur". Temuan ini menjadi bukti penting bahwa mereka hidup menetap di dekat pantai dan mengandalkan laut sebagai sumber makanan utama.',
  },
  {
    imageSrc: '/images/gua.jpg',
    imageAlt: 'Lukisan Gua',
    emoji: '🖐️',
    title: 'Seniman Gua Kuno',
    description:
      'Lukisan cap tangan tertua di dunia yang dibuat pada masa praaksara ditemukan di Gua Leang-Leang, Sulawesi Selatan. Gambar-gambar yang berusia lebih dari 40.000 tahun ini menunjukkan bahwa manusia purba di Nusantara sudah memiliki kemampuan berekspresi seni yang luar biasa, jauh sebelum peradaban besar lainnya berkembang.',
  },
  {
    imageSrc: '/images/oranggua.jpg',
    imageAlt: 'Abris Sous Roches',
    emoji: '🏕️',
    title: 'Gua sebagai Rumah (Abris Sous Roches)',
    description:
      'Manusia purba tidak selalu tinggal di alam terbuka. Mereka banyak memanfaatkan ceruk-ceruk di dalam gua karang sebagai tempat berlindung yang disebut Abris Sous Roches. Ceruk-ceruk ini memberikan perlindungan alami dari cuaca dan predator, dan di sinilah banyak peninggalan alat batu serta lukisan prasejarah ditemukan oleh para arkeolog.',
  },
];

// ─── KOMPONEN CARD ────────────────────────────────────────────────────────────
function FunFactCard({
  imageSrc,
  imageAlt,
  emoji,
  title,
  description,
}: {
  imageSrc: string;
  imageAlt: string;
  emoji: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="flex flex-col bg-white/15 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/30 hover:shadow-2xl hover:border-white/60 transition-shadow duration-300"
    >
      {/* Gambar */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-48 object-cover rounded-t-2xl mb-4"
      />

      {/* Konten Teks */}
      <div className="px-6 pb-6 flex flex-col gap-3 flex-1">
        {/* Emoji Badge */}
        <span className="text-3xl">{emoji}</span>

        {/* Judul Card */}
        <h3 className="text-lg font-bold text-white leading-snug">
          {title}
        </h3>

        {/* Divider */}
        <div className="w-10 h-0.5 bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] rounded-full" />

        {/* Deskripsi */}
        <p className="text-white/90 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── KOMPONEN UTAMA ───────────────────────────────────────────────────────────
export default function FunFactSection() {
  return (
    <section
      id="funfact"
      className="w-full py-20 px-4 md:px-12 xl:px-20 bg-gradient-to-br from-[#0A192F] via-[#112240] to-[#020C1B] shadow-[inset_0_0_80px_rgba(0,0,0,0.5)]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-center mb-14"
      >
        {/* Label kecil */}
        <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-white/80 mb-3">
          Fakta Menarik
        </span>

        {/* Judul utama */}
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          Tahukah Kamu?{' '}
          <span className="text-yellow-300 drop-shadow-sm">💡</span>
        </h2>

        {/* Garis dekoratif */}
        <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#BF953F] rounded-full shadow-[0_0_12px_rgba(191,149,63,0.6)]" />

        {/* Subtitle */}
        <p className="mt-4 text-white/80 max-w-xl mx-auto text-sm md:text-base">
          Fakta-fakta mengejutkan dari kehidupan manusia di zaman praaksara yang
          mungkin belum pernah kamu bayangkan sebelumnya.
        </p>
      </motion.div>

      {/* Grid 3 Kolom */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {funFacts.map((fact, index) => (
          <FunFactCard key={index} {...fact} />
        ))}
      </div>
    </section>
  );
}
