"use client";

import React, { useState } from 'react';
import { MapPin, Clock, ChevronDown, Send, Sparkles } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Umah Luwung Colour Tokens ────────────────────────────────────────────────
// Desert Sand (body bg)  → #F2EBE5
// Warm Sand Drift        → #E8E0CE  (form card bg — slightly deeper than body)
// Forest Sage            → #4A6741  (primary accent)
// Terracotta             → #D05B43  (brand warm accent)
// Frame Dark / Charcoal  → #1F2229  (text)
// Deep Moss              → #2e4228  (submit button hover)

// ─── Noise Texture ────────────────────────────────────────────────────────────
const NOISE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`;

// ─── Form Data Type ───────────────────────────────────────────────────────────
interface BookingForm {
  nama: string;
  layanan: string;
  jadwal: string;
  whatsapp: string;
}

const INITIAL_FORM: BookingForm = {
  nama: '',
  layanan: '',
  jadwal: '',
  whatsapp: '',
};

const SERVICES = [
  { value: 'Interior Styling & Design', label: 'Interior Styling & Design' },
  { value: 'Architectural Planning', label: 'Architectural Planning' },
  { value: 'Custom Furniture & Build', label: 'Custom Furniture & Build' },
];

// ─── Admin WhatsApp Number (Kak Sri) ─────────────────────────────────────────
const ADMIN_WA = '62881082028411';

// ─── Label + Field wrapper ────────────────────────────────────────────────────
function FieldWrap({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        className="block text-[11px] font-bold tracking-[0.22em] uppercase"
        style={{ color: '#1F2229', fontFamily: "'Inter', sans-serif" }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: '#D05B43' }}>
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

// ─── Shared input/select styles ───────────────────────────────────────────────
const inputBase =
  'w-full px-4 py-3.5 rounded-xl text-sm font-medium outline-none transition-all duration-200 border';

const inputStyle = {
  background: '#F5F0E8',           // warm tinted field — NOT white
  borderColor: '#c9c3b0',
  color: '#1F2229',
  fontFamily: "'Inter', sans-serif",
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function BookingSection() {
  const [form, setForm] = useState<BookingForm>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<BookingForm>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────────
  const validate = (): boolean => {
    const e: Partial<BookingForm> = {};
    if (!form.nama.trim()) e.nama = 'Nama wajib diisi';
    if (!form.layanan) e.layanan = 'Pilih layanan terlebih dahulu';
    if (!form.jadwal.trim()) e.jadwal = 'Jadwal wajib diisi';
    if (!form.whatsapp.trim()) e.whatsapp = 'Nomor WhatsApp wajib diisi';
    else if (!/^[0-9+\s\-()]{8,}$/.test(form.whatsapp.trim()))
      e.whatsapp = 'Format nomor tidak valid';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ── Submit → open WA deep-link ──────────────────────────────────────────────
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);

    const message =
      `Halo Kak Sri 👋, saya ingin booking konsultasi dengan *Umah Luwung*:%0A%0A` +
      `👤 *Nama Lengkap:* ${form.nama}%0A` +
      `🏡 *Layanan yang Diminati:* ${form.layanan}%0A` +
      `📅 *Jadwal Preferensi:* ${form.jadwal}%0A` +
      `📱 *Nomor WhatsApp Aktif:* ${form.whatsapp}%0A%0A` +
      `Terima kasih! 🙏`;

    setTimeout(() => {
      window.open(`https://wa.me/${ADMIN_WA}?text=${message}`, '_blank');
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm(INITIAL_FORM);
      }, 3500);
    }, 600);
  };

  const update = (field: keyof BookingForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section
      id="booking"
      className="relative py-24 md:py-32 overflow-hidden border-t"
      style={{ background: '#F2EBE5', borderColor: 'rgba(31,34,41,0.08)' }}
    >
      {/* ── Ambient background orbs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[130px]"
          style={{ background: '#4A6741' }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[420px] h-[420px] rounded-full opacity-[0.10] blur-[110px]"
          style={{ background: '#D05B43' }}
        />
        {/* Paper-grain texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: NOISE,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">

        {/* ═══════════════════════════════════════════════════════════════════
            TOP BLOCK — Heading + Booking Form
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">

          {/* ── Left: Heading & Intro ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32"
          >
            {/* Eye-brow */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10" style={{ background: '#D05B43' }} />
              <span
                className="text-[11px] font-bold tracking-[0.28em] uppercase"
                style={{ color: '#D05B43', fontFamily: "'Inter', sans-serif" }}
              >
                Kunjungi Studio Kami
              </span>
            </div>

            {/* Main heading — Serif */}
            <h2
              className="text-4xl md:text-5xl font-semibold leading-[1.15] mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1F2229' }}
            >
              Mari Rencanakan{' '}
              <em
                className="italic font-normal"
                style={{ color: '#D05B43' }}
              >
                Ruang Impian
              </em>{' '}
              Anda.
            </h2>

            {/* Decorative rule */}
            <div
              className="w-12 h-[2px] mb-6"
              style={{ background: '#4A6741' }}
            />

            {/* Description — Sans-Serif medium weight */}
            <p
              className="text-base md:text-lg leading-relaxed mb-8"
              style={{
                color: 'rgba(31,34,41,0.68)',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
              }}
            >
              Setiap mahakarya berawal dari sebuah percakapan. Isi form di
              samping untuk menjadwalkan sesi konsultasi eksklusif bersama Kak
              Sri, atau langsung kunjungi studio kami di Singaraja.
            </p>

            {/* Trust badges */}
            <div className="space-y-3">
              {[
                'Konsultasi pertama selalu gratis',
                'Respon cepat dalam 1×24 jam',
                'Pengerjaan profesional & transparan',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(74,103,65,0.15)' }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: '#4A6741' }}
                    />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'rgba(31,34,41,0.75)', fontFamily: "'Inter', sans-serif" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Booking Form Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative rounded-[2rem] p-7 md:p-9 overflow-hidden"
              style={{
                background: '#E8E0CE',        // Warm Sand Drift — NOT white
                boxShadow:
                  '0 0 0 1px rgba(31,34,41,0.07), ' +
                  '0 8px 24px rgba(31,34,41,0.07), ' +
                  '0 32px 64px rgba(31,34,41,0.09)',
              }}
            >
              {/* Sage top-bar accent */}
              <div
                className="absolute top-0 left-0 w-full h-[3px]"
                style={{
                  background:
                    'linear-gradient(90deg, transparent, #4A6741 30%, #4A6741 70%, transparent)',
                }}
              />

              {/* Card noise grain */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[2rem]"
                style={{
                  backgroundImage: NOISE,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '128px',
                }}
              />

              {/* Card header */}
              <div className="flex items-center gap-3 mb-7 relative z-10">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(74,103,65,0.14)' }}
                >
                  <Sparkles
                    className="w-5 h-5"
                    style={{ color: '#4A6741' }}
                  />
                </div>
                <div>
                  <h3
                    className="text-lg font-bold leading-none mb-0.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#1F2229' }}
                  >
                    Booking Konsultasi
                  </h3>
                  <p
                    className="text-xs font-medium"
                    style={{ color: 'rgba(31,34,41,0.55)', fontFamily: "'Inter', sans-serif" }}
                  >
                    Isi form, Kak Sri akan menghubungi Anda via WhatsApp
                  </p>
                </div>
              </div>

              {/* ── Form ── */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5 relative z-10"
                noValidate
              >
                {/* Full Name */}
                <FieldWrap label="Nama Lengkap" required>
                  <input
                    id="booking-nama"
                    type="text"
                    placeholder="Contoh: Gede Arisuda / Sari Dewi"
                    value={form.nama}
                    onChange={(e) => update('nama', e.target.value)}
                    className={inputBase}
                    style={{
                      ...inputStyle,
                      borderColor: errors.nama ? '#D05B43' : '#c9c3b0',
                    }}
                  />
                  {errors.nama && (
                    <p
                      className="text-[11px] font-medium mt-1"
                      style={{ color: '#D05B43', fontFamily: "'Inter', sans-serif" }}
                    >
                      {errors.nama}
                    </p>
                  )}
                </FieldWrap>

                {/* Preferred Service — Dropdown */}
                <FieldWrap label="Layanan yang Diminati" required>
                  <div className="relative">
                    <select
                      id="booking-layanan"
                      value={form.layanan}
                      onChange={(e) => update('layanan', e.target.value)}
                      className={inputBase + ' appearance-none pr-10 cursor-pointer'}
                      style={{
                        ...inputStyle,
                        borderColor: errors.layanan ? '#D05B43' : '#c9c3b0',
                      }}
                    >
                      <option value="" disabled>
                        — Pilih Layanan —
                      </option>
                      {SERVICES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                    {/* Custom chevron */}
                    <ChevronDown
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                      style={{ color: '#4A6741' }}
                    />
                  </div>
                  {errors.layanan && (
                    <p
                      className="text-[11px] font-medium mt-1"
                      style={{ color: '#D05B43', fontFamily: "'Inter', sans-serif" }}
                    >
                      {errors.layanan}
                    </p>
                  )}
                </FieldWrap>

                {/* Preferred Schedule */}
                <FieldWrap label="Jadwal Preferensi" required>
                  <input
                    id="booking-jadwal"
                    type="text"
                    placeholder="Contoh: Sabtu, 14 Juni 2025 — pagi"
                    value={form.jadwal}
                    onChange={(e) => update('jadwal', e.target.value)}
                    className={inputBase}
                    style={{
                      ...inputStyle,
                      borderColor: errors.jadwal ? '#D05B43' : '#c9c3b0',
                    }}
                  />
                  {errors.jadwal && (
                    <p
                      className="text-[11px] font-medium mt-1"
                      style={{ color: '#D05B43', fontFamily: "'Inter', sans-serif" }}
                    >
                      {errors.jadwal}
                    </p>
                  )}
                </FieldWrap>

                {/* WhatsApp Number */}
                <FieldWrap label="Nomor WhatsApp Aktif" required>
                  <div className="relative">
                    <span
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold select-none"
                      style={{ color: '#4A6741', fontFamily: "'Inter', sans-serif" }}
                    >
                      +62
                    </span>
                    <input
                      id="booking-whatsapp"
                      type="tel"
                      placeholder="8123 4567 890"
                      value={form.whatsapp}
                      onChange={(e) => update('whatsapp', e.target.value)}
                      className={inputBase + ' pl-12'}
                      style={{
                        ...inputStyle,
                        borderColor: errors.whatsapp ? '#D05B43' : '#c9c3b0',
                      }}
                    />
                  </div>
                  {errors.whatsapp && (
                    <p
                      className="text-[11px] font-medium mt-1"
                      style={{ color: '#D05B43', fontFamily: "'Inter', sans-serif" }}
                    >
                      {errors.whatsapp}
                    </p>
                  )}
                </FieldWrap>

                {/* ── Submit Button ── */}
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full py-4 rounded-xl flex items-center justify-center gap-3"
                      style={{ background: 'rgba(74,103,65,0.15)' }}
                    >
                      <span
                        className="text-sm font-bold"
                        style={{ color: '#4A6741', fontFamily: "'Inter', sans-serif" }}
                      >
                        ✓ Mengarahkan ke WhatsApp Kak Sri…
                      </span>
                    </motion.div>
                  ) : (
                    <motion.button
                      key="submit"
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: sending ? 1 : 1.015 }}
                      whileTap={{ scale: sending ? 1 : 0.97 }}
                      className="w-full py-4 rounded-xl flex items-center justify-center gap-3 font-bold text-sm tracking-wide transition-colors duration-200 relative overflow-hidden"
                      style={{
                        background: sending ? '#7a9b73' : '#4A6741',
                        color: '#E8E0CE',
                        fontFamily: "'Inter', sans-serif",
                        boxShadow: '0 6px 24px rgba(74,103,65,0.32)',
                        cursor: sending ? 'not-allowed' : 'pointer',
                      }}
                      id="booking-submit"
                    >
                      {/* Shimmer sweep on hover */}
                      <span
                        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background:
                            'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)',
                        }}
                      />

                      {sending ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-[#E8E0CE]/30 border-t-[#E8E0CE] rounded-full"
                          />
                          <span>Memproses…</span>
                        </>
                      ) : (
                        <>
                          <FaWhatsapp className="w-5 h-5 flex-shrink-0" />
                          <span>Kirim Booking via WhatsApp</span>
                          <Send className="w-4 h-4 opacity-70" />
                        </>
                      )}
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Disclaimer */}
                <p
                  className="text-center text-[11px] leading-relaxed"
                  style={{
                    color: 'rgba(31,34,41,0.45)',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Form ini akan membuka WhatsApp dan mengarahkan Anda langsung
                  ke admin resmi{' '}
                  <span style={{ color: '#4A6741', fontWeight: 600 }}>Kak Sri</span>.
                  Konsultasi pertama gratis.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            BOTTOM BLOCK — Studio Info & Google Maps (UNTOUCHED)
        ═══════════════════════════════════════════════════════════════════ */}
        <div className="space-y-6">
          {/* Info row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-[#121824] p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-3 text-[#F2EBE5]/70">
              <MapPin className="w-4 h-4 text-[#D05B43]" />
              <span>Jl. Pantai Penimbangan Gg. Balbo No.1A, Singaraja, Bali</span>
            </div>
            <div className="flex items-center gap-3 text-[#F2EBE5]/70 md:justify-end">
              <Clock className="w-4 h-4 text-[#D05B43]" />
              <span>Senin - Sabtu: 08.00 - 17.00 WITA</span>
            </div>
          </div>

          {/* Google Maps iframe — pixel-perfect preserved */}
          <div className="h-[350px] md:h-[450px] w-full rounded-[2rem] overflow-hidden relative shadow-2xl group border border-[#1F2229]/15 bg-[#121824]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3949.423984183861!2d115.0886!3d-8.112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMDYnNDMuMiJTIDExNcKwMDUnMTkuMCJF!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full object-cover grayscale-[60%] contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 ease-in-out"
            />
          </div>
        </div>

      </div>
    </section>
  );
}