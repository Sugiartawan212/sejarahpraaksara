"use client";

import { motion } from 'framer-motion';
import { Send, CalendarCheck, Clock, ShieldCheck, Globe } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane, FaInstagram } from 'react-icons/fa';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ nama: '', tipe: '', pesan: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fungsi Handle Submit Form (Buka WhatsApp)
  const handleWhatsAppForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const waNumber = "6281234567890"; // Ganti dengan nomor Kak Sri
    const text = `Hello Nirvana Bali ✨%0A%0AI would like to schedule a survey/consultation:%0A👤 *Name:* ${formData.nama}%0A🏡 *Interested in:* ${formData.tipe}%0A📝 *Message:* ${formData.pesan}`;
    window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
    setIsSubmitting(false);
  };

  return (
    <section className="py-24 bg-slate-50/50 relative overflow-hidden" id="kontak">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* BAGIAN KIRI: Social Media & Trust Badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-blue-950 mb-6 leading-tight font-serif">
                Get in Touch with <br /><span className="text-[#C5A059] italic">Nirvana Bali</span>
              </h2>
              <p className="text-lg text-slate-600 font-medium leading-relaxed">
                Punya pertanyaan tentang investasi properti di Bali? Tim representatif kami siap membantu Anda dengan layanan VIP.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <Globe className="w-4 h-4 text-[#C5A059]" />
                <span className="text-sm font-bold text-slate-700">We speak English & Russian</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <Clock className="w-4 h-4 text-[#C5A059]" />
                <span className="text-sm font-bold text-slate-700">Fast Response (5 Mins)</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span className="text-sm font-bold text-slate-700">Verified Legal Agents</span>
              </div>
            </div>

            {/* Social Media Grid (Glassmorphism) */}
            <div className="grid sm:grid-cols-2 gap-4">
              <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="group flex items-center gap-4 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300">
                <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-500 transition-colors duration-300">
                  <FaWhatsapp className="w-6 h-6 text-green-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">WhatsApp</h4>
                  <p className="text-xs text-slate-500 font-medium">Chat with Kak Sri</p>
                </div>
              </a>

              <a href="https://t.me/nirvanabali" target="_blank" rel="noreferrer" className="group flex items-center gap-4 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300">
                <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-500 transition-colors duration-300">
                  <FaTelegramPlane className="w-6 h-6 text-blue-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Telegram</h4>
                  <p className="text-xs text-slate-500 font-medium">Official Channel</p>
                </div>
              </a>

              <a href="https://instagram.com/nirvanabali" target="_blank" rel="noreferrer" className="group flex items-center gap-4 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-pink-200 transition-all duration-300 sm:col-span-2">
                <div className="bg-pink-100 p-3 rounded-xl group-hover:bg-gradient-to-tr group-hover:from-amber-500 group-hover:via-pink-500 group-hover:to-purple-500 transition-all duration-300">
                  <FaInstagram className="w-6 h-6 text-pink-600 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Instagram</h4>
                  <p className="text-xs text-slate-500 font-medium">Lihat portfolio & testimoni klien kami</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* BAGIAN KANAN: Form Booking */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_20px_80px_rgba(30,58,138,0.08)] border border-blue-50 relative"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="bg-blue-50 p-3 rounded-2xl">
                <CalendarCheck className="w-7 h-7 text-blue-900" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-blue-950 tracking-tight">
                  Book a Survey
                </h3>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  Isi form untuk menjadwalkan kunjungan lokasi.
                </p>
              </div>
            </div>

            <form onSubmit={handleWhatsAppForm} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alexey / Gede Sugiartawan"
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] focus:border-[#C5A059] focus:bg-white outline-none transition-all text-slate-700 font-medium placeholder:text-slate-400"
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Minat Properti *</label>
                <select
                  required
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] focus:border-[#C5A059] focus:bg-white outline-none transition-all text-slate-700 appearance-none font-medium"
                  onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                >
                  <option value="">-- Pilih Tipe --</option>
                  <option value="Luxury Villa">Luxury Villa (Lovina)</option>
                  <option value="Premium Land">Premium Land / Kavling</option>
                  <option value="Commercial">Commercial / Ruko</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wider">Pesan / Waktu Preferensi</label>
                <textarea
                  rows={3}
                  placeholder="I would like to visit this weekend..."
                  className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#C5A059] focus:border-[#C5A059] focus:bg-white outline-none transition-all text-slate-700 resize-none font-medium placeholder:text-slate-400"
                  onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className={`w-full bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 group mt-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-blue-200 group-hover:translate-x-1 transition-transform" />
                    Kirim Jadwal (WhatsApp)
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}