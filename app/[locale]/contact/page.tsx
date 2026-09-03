'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#EEEBE4] text-[#2A2A27] selection:bg-[#5C7A5A] selection:text-[#EEEBE4]">

      {/* ── 1. FRAMED HERO SECTION ── */}
      <div className="w-full px-4 md:px-6 pt-24 md:pt-32">
        <div className="relative w-full h-[50vh] md:h-[60vh] max-w-[1800px] mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col items-center justify-center text-center">
          <img
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=2000&auto=format&fit=crop"
            alt="Umah Luwung Studio"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="relative z-10 max-w-4xl transform transition-all duration-1000 ease-out translate-y-0 opacity-100 px-6">
            <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-[#EEEBE4]/80 font-bold font-sans mb-6">
              Let's Connect
            </p>
            <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#EEEBE4] tracking-tight leading-[1.2]">
              Mari seduh kopi dan <span className="italic text-[#84A98C]">bicarakan</span> ruang impian Anda.
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 pt-20 md:pt-32 pb-32">

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* ── KIRI: TEKS & INFO KONTAK ── */}
          <div className="w-full lg:w-5/12 flex flex-col gap-12 lg:sticky lg:top-32 h-fit">

            <div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#2A2A27] leading-tight mb-6">
                Langkah pertama menuju <span className="italic text-[#5C7A5A]">mahakarya.</span>
              </h2>
              <p className="font-sans font-medium text-base md:text-lg text-[#2A2A27]/80 leading-relaxed">
                Setiap proyek besar dimulai dari sebuah percakapan sederhana. Apakah Anda sudah memiliki cetak biru yang matang atau sekadar ide kasar, tim kami siap mendengarkan.
              </p>
            </div>

            <div className="flex flex-col gap-8 border-y border-[#2A2A27]/10 py-8">
              <div>
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C7A5A] mb-2">Studio Utama</p>
                <p className="font-serif text-xl font-bold text-[#2A2A27]">Jl. Raya Sanggingan No. 88<br />Ubud, Bali, Indonesia 80571</p>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C7A5A] mb-2">Email Inquiries</p>
                  <a href="mailto:hello@umahluwung.com" className="font-serif text-lg font-bold text-[#2A2A27] hover:text-[#5C7A5A] transition-colors underline underline-offset-4 decoration-[#2A2A27]/20">
                    hello@umahluwung.com
                  </a>
                </div>
                <div>
                  <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C7A5A] mb-2">Telepon / WhatsApp</p>
                  <a href="tel:+6281123456789" className="font-serif text-lg font-bold text-[#2A2A27] hover:text-[#5C7A5A] transition-colors underline underline-offset-4 decoration-[#2A2A27]/20">
                    +62 811 2345 6789
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* ── KANAN: SISTEM BOOKING & SOCIAL MEDIA TABLE ── */}
          <div className="w-full lg:w-7/12 flex flex-col gap-12">

            {/* Form Konsultasi (Melayang) */}
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-[#2A2A27]/5 relative overflow-hidden transition-transform duration-500 hover:-translate-y-1">

              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E2DECA] rounded-bl-full -z-0 opacity-40"></div>

              <div className="relative z-10">
                <h3 className="font-serif text-3xl font-bold text-[#2A2A27] mb-2">Jadwalkan Konsultasi</h3>
                <p className="font-sans text-sm font-medium text-[#2A2A27]/60 mb-8">Pilih layanan dan waktu yang tepat untuk berdiskusi dengan arsitek kami.</p>

                {formStatus === 'success' ? (
                  <div className="bg-[#EEEBE4]/50 p-8 rounded-2xl text-center border border-[#5C7A5A]/20 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-[#5C7A5A] rounded-full flex items-center justify-center text-[#EEEBE4]">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-[#2A2A27]">Jadwal Diterima!</h4>
                    <p className="font-sans text-[#2A2A27]/80">Tim kami akan segera menghubungi Anda untuk konfirmasi waktu pertemuan.</p>
                    <button onClick={() => setFormStatus('idle')} className="mt-4 text-xs font-bold uppercase tracking-widest text-[#5C7A5A] underline underline-offset-4">Jadwalkan Ulang</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#2A2A27]/60">Nama Lengkap</label>
                        <input required type="text" placeholder="John Doe" className="bg-[#EEEBE4]/30 border border-[#2A2A27]/10 rounded-xl px-4 py-3 font-sans text-sm text-[#2A2A27] focus:outline-none focus:border-[#5C7A5A] focus:ring-1 focus:ring-[#5C7A5A] transition-all" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#2A2A27]/60">Email Address</label>
                        <input required type="email" placeholder="john@example.com" className="bg-[#EEEBE4]/30 border border-[#2A2A27]/10 rounded-xl px-4 py-3 font-sans text-sm text-[#2A2A27] focus:outline-none focus:border-[#5C7A5A] focus:ring-1 focus:ring-[#5C7A5A] transition-all" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#2A2A27]/60">Topik Diskusi</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {['Architecture', 'Interior Design', 'Design & Build'].map(service => (
                          <label key={service} className="cursor-pointer">
                            <input type="radio" name="service" className="peer sr-only" defaultChecked={service === 'Architecture'} />
                            <div className="text-center px-4 py-3 rounded-xl border border-[#2A2A27]/10 font-sans text-xs font-bold text-[#2A2A27]/60 peer-checked:bg-[#5C7A5A] peer-checked:text-white peer-checked:border-[#5C7A5A] transition-all hover:bg-[#EEEBE4]/50">
                              {service}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#2A2A27]/60">Estimasi Tanggal Pertemuan</label>
                      <input required type="date" className="bg-[#EEEBE4]/30 border border-[#2A2A27]/10 rounded-xl px-4 py-3 font-sans text-sm text-[#2A2A27] focus:outline-none focus:border-[#5C7A5A] focus:ring-1 focus:ring-[#5C7A5A] transition-all w-full" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-sans text-[10px] font-bold uppercase tracking-widest text-[#2A2A27]/60">Ceritakan Sedikit Visi Anda (Opsional)</label>
                      <textarea rows={4} placeholder="Saya memiliki lahan di daerah Canggu dan ingin membangun..." className="bg-[#EEEBE4]/30 border border-[#2A2A27]/10 rounded-xl px-4 py-3 font-sans text-sm text-[#2A2A27] focus:outline-none focus:border-[#5C7A5A] focus:ring-1 focus:ring-[#5C7A5A] transition-all resize-none"></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-4 w-full flex items-center justify-center gap-2 bg-[#5C7A5A] hover:bg-[#4A6348] text-white px-8 py-4 rounded-xl text-xs font-bold font-sans uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Memproses Jadwal...' : 'Kirim Request Jadwal'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Social Media Table (Brand Colors Permanen) */}
            <div>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C7A5A] mb-4 pl-2">Temukan Kami di Sosial Media</p>
              <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-[#2A2A27]/5 overflow-hidden">

                {/* 1. Instagram Row (#E1306C) */}
                <a href="#" className="group flex items-center justify-between w-full p-5 border-b border-[#2A2A27]/5 hover:bg-[#E1306C]/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-[#E1306C]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span className="font-serif text-xl font-bold text-[#E1306C]">Instagram</span>
                  </div>
                  <span className="text-[#E1306C] transform group-hover:translate-x-1 transition-all">↗</span>
                </a>

                {/* 2. Facebook Row (#1877F2) */}
                <a href="#" className="group flex items-center justify-between w-full p-5 border-b border-[#2A2A27]/5 hover:bg-[#1877F2]/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                    <span className="font-serif text-xl font-bold text-[#1877F2]">Facebook</span>
                  </div>
                  <span className="text-[#1877F2] transform group-hover:translate-x-1 transition-all">↗</span>
                </a>

                {/* 3. YouTube Row (#FF0000) */}
                <a href="#" className="group flex items-center justify-between w-full p-5 border-b border-[#2A2A27]/5 hover:bg-[#FF0000]/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-[#FF0000]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="font-serif text-xl font-bold text-[#FF0000]">YouTube</span>
                  </div>
                  <span className="text-[#FF0000] transform group-hover:translate-x-1 transition-all">↗</span>
                </a>

                {/* 4. LinkedIn Row (#0A66C2) */}
                <a href="#" className="group flex items-center justify-between w-full p-5 hover:bg-[#0A66C2]/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <svg className="w-6 h-6 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span className="font-serif text-xl font-bold text-[#0A66C2]">LinkedIn</span>
                  </div>
                  <span className="text-[#0A66C2] transform group-hover:translate-x-1 transition-all">↗</span>
                </a>

              </div>
            </div>

          </div>
        </div>

        {/* ── 3. AESTHETIC STUDIO PHOTO ── */}
        <div className="mt-24 md:mt-32 relative rounded-[2rem] overflow-hidden shadow-lg border border-[#E2DECA]">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto">
              <img
                src="https://images.unsplash.com/photo-1593696140826-c58b021acf8b?q=80&w=1200&auto=format&fit=crop"
                alt="Material Selection Process"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 bg-[#E2DECA] p-10 md:p-20 flex flex-col justify-center">
              <svg className="w-12 h-12 text-[#5C7A5A] mb-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2zm0 2.83l7 6.17v9h-2v-6H7v6H5v-9l7-6.17z" />
              </svg>
              <h3 className="font-serif text-3xl md:text-5xl font-bold text-[#2A2A27] mb-6">
                Membangun rumah bukan sekadar proyek. Ia adalah <span className="italic text-[#5C7A5A]">perjalanan panjang.</span>
              </h3>
              <p className="font-sans font-medium text-base text-[#2A2A27]/70 leading-relaxed mb-10">
                Kami berkomitmen untuk mendampingi Anda di setiap tahapnya. Dari goresan sketsa pertama hingga serah terima kunci.
              </p>
            </div>
          </div>
        </div>

        {/* ── 4. GOOGLE MAPS SECTION (FULL COLOR PERMANEN) ── */}
        <div className="mt-20 md:mt-32 relative rounded-[2rem] overflow-hidden shadow-xl border border-[#E2DECA] w-full h-[400px] md:h-[500px] group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126214.4124971846!2d115.18485295593256!3d-8.506869400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d739f22c9c3%3A0x6fa0eb51493112d!2sUbud%2C%20Gianyar%20Regency%2C%20Bali!5e0!3m2!1sen!2sid!4v1701234567890!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 w-full h-full pointer-events-auto"
          ></iframe>

          {/* Box Alamat Overlay di atas Map */}
          <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-[#2A2A27]/10 max-w-xs pointer-events-none transition-transform duration-500 group-hover:-translate-y-2">
            <div className="w-10 h-10 bg-[#5C7A5A] rounded-full flex items-center justify-center text-white mb-4">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C7A5A] mb-1">Kunjungi Kami</p>
            <p className="font-serif text-xl font-bold text-[#2A2A27] leading-snug">Umah Luwung Studio</p>
            <p className="font-sans text-xs text-[#2A2A27]/60 mt-2 leading-relaxed">Ubud, Bali, Indonesia</p>
          </div>
        </div>

      </div>
    </div>
  );
}