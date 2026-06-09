"use client";

import { useState } from 'react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { MessageCircle, X, CalendarCheck } from 'lucide-react';
import Link from 'next/link';

export default function FloatingWA() {
  const [isOpen, setIsOpen] = useState(false);

  // Ganti dengan nomor Pak Kino
  const waNumber = "6287701028411";
  const waMessage = "Hello Nirvana Bali ✨, I would like to consult about property investment.";

  return (
    <div className="fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-4">

      {/* Menu Item */}
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-300 origin-bottom right-0 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10 pointer-events-none'
          }`}
      >

        {/* Tombol 1: Booking Form (Tema Emas/Amber) */}
        <Link
          href="/kontak"
          onClick={() => setIsOpen(false)}
          className="flex items-center bg-white pl-5 pr-1.5 py-1.5 rounded-full shadow-lg border border-slate-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <span className="font-bold text-slate-700 text-sm mr-3 group-hover:text-[#C5A059] transition-colors">
            Book a Survey
          </span>
          <div className="bg-gradient-to-tr from-amber-500 to-yellow-400 p-2.5 rounded-full text-white shadow-md">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </Link>

        {/* Tombol 2: Telegram (Sangat penting untuk turis Rusia) */}
        <a
          href="https://t.me/nirvanabali"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white pl-5 pr-1.5 py-1.5 rounded-full shadow-lg border border-slate-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <span className="font-bold text-slate-700 text-sm mr-3 group-hover:text-blue-500 transition-colors">
            Telegram Chat
          </span>
          <div className="bg-gradient-to-tr from-blue-400 to-blue-600 p-2.5 rounded-full text-white shadow-md">
            <FaTelegramPlane className="w-5 h-5" />
          </div>
        </a>

        {/* Tombol 3: Chat WhatsApp (Tema Emerald/Hijau) */}
        <a
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white pl-5 pr-1.5 py-1.5 rounded-full shadow-lg border border-slate-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
        >
          <span className="font-bold text-slate-700 text-sm mr-3 group-hover:text-emerald-500 transition-colors">
            WhatsApp
          </span>
          <div className="bg-gradient-to-tr from-emerald-400 to-emerald-600 p-2.5 rounded-full text-white shadow-md">
            <FaWhatsapp className="w-5 h-5" />
          </div>
        </a>

      </div>

      {/* Tombol Toggle Utama (Luxury Navy) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-[#1E3A8A] text-white'
          }`}
      >
        {/* Titik Merah Notifikasi Berdenyut */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border-2 border-white"></span>
          </span>
        )}

        {/* Pergantian Icon */}
        {isOpen ? (
          <X className="w-7 h-7 transition-transform" />
        ) : (
          <MessageCircle className="w-7 h-7 transition-transform" />
        )}
      </button>

    </div>
  );
}