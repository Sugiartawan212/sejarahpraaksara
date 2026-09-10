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
    imageSrc: '/images/oranggua.jpg',
    imageAlt: 'Lukisan Gua',
    emoji: '🖐️',
    title: 'Seniman Gua Kuno',
    description:
      'Lukisan cap tangan tertua di dunia yang dibuat pada masa praaksara ditemukan di Gua Leang-Leang, Sulawesi Selatan. Gambar-gambar yang berusia lebih dari 40.000 tahun ini menunjukkan bahwa manusia purba di Nusantara sudah memiliki kemampuan berekspresi seni yang luar biasa, jauh sebelum peradaban besar lainnya berkembang.',
  },
  {
    imageSrc: '/images/gua.jpg',
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
      className="flex flex-col bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/80 hover:shadow-2xl hover:border-blue-200 transition-shadow duration-300"
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
        <h3 className="text-lg font-bold text-slate-800 leading-snug">
          {title}
        </h3>

        {/* Divider */}
        <div className="w-10 h-0.5 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full" />

        {/* Deskripsi */}
        <p className="text-slate-700 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── KOMPONEN UTAMA ───────────────────────────────────────────────────────────
export default function FunFactSection() {
  return (
    <section
      id="funfact"
      className="w-full py-20 px-4 md:px-12 xl:px-20 bg-gradient-to-br from-sky-200 via-blue-100 to-cyan-200"
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
        <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-sky-600 mb-3">
          Fakta Menarik
        </span>

        {/* Judul utama */}
        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight">
          Tahukah Kamu?{' '}
          <span className="text-yellow-400 drop-shadow-sm">💡</span>
        </h2>

        {/* Garis dekoratif */}
        <div className="mt-4 mx-auto w-16 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full" />

        {/* Subtitle */}
        <p className="mt-4 text-slate-600 max-w-xl mx-auto text-sm md:text-base">
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
