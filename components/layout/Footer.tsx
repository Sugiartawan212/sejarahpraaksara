import React from 'react';
import Link from 'next/link';
// Icon standar dari lucide-react (aman)
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
// Icon sosmed dari react-icons (spesialis brand logo)
import { FaInstagram, FaFacebookF } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#121824] text-[#F2EBE5]/50 pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top Section: Grid 4 Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Kolom 1: Brand Info */}
          <div className="space-y-6">
            <h3 className="font-serif italic text-3xl text-[#F2EBE5] tracking-wide">
              Umah Luwung<span className="text-[#D05B43]">.</span>
            </h3>
            <p className="text-sm leading-relaxed max-w-xs">
              Studio desain interior premium di Singaraja, Bali. Mengubah visi menjadi ruang nyata yang memukau melalui presisi, fungsi, dan estetika tanpa kompromi.
            </p>
            {/* Social Media */}
            <div className="flex gap-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D05B43] hover:text-white hover:border-[#D05B43] transition-all duration-300">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#D05B43] hover:text-white hover:border-[#D05B43] transition-all duration-300">
                <FaFacebookF className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Kolom 2: Tautan Cepat (Quick Links) */}
          <div>
            <h4 className="text-[#F2EBE5] font-medium tracking-widest uppercase text-sm mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#D05B43]"></span>
              Eksplorasi
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="hover:text-[#D05B43] transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#D05B43] transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Portofolio Kami
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#D05B43] transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Tentang Studio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#D05B43] transition-colors flex items-center gap-2 group">
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Hubungi Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Kami */}
          <div>
            <h4 className="text-[#F2EBE5] font-medium tracking-widest uppercase text-sm mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#D05B43]"></span>
              Layanan
            </h4>
            <ul className="space-y-4">
              <li className="hover:text-[#D05B43] transition-colors cursor-default">Custom Furniture</li>
              <li className="hover:text-[#D05B43] transition-colors cursor-default">Kitchen Set Premium</li>
              <li className="hover:text-[#D05B43] transition-colors cursor-default">Renovasi Hunian</li>
              <li className="hover:text-[#D05B43] transition-colors cursor-default">Desain Ruang Komersial</li>
            </ul>
          </div>

          {/* Kolom 4: Info Kontak */}
          <div>
            <h4 className="text-[#F2EBE5] font-medium tracking-widest uppercase text-sm mb-6 flex items-center gap-2">
              <span className="w-4 h-px bg-[#D05B43]"></span>
              Hubungi Kami
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D05B43] flex-shrink-0 mt-0.5" />
                <span className="text-sm leading-relaxed">
                  Jl. Pantai Penimbangan Gg. Balbo No.1A, Baktiseraga, Singaraja 81119
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D05B43] flex-shrink-0" />
                <span className="text-sm">Kak Sri : +62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D05B43] flex-shrink-0" />
                <span className="text-sm">hello@umahluwung.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#F2EBE5]/30">
            &copy; {currentYear} Umah Luwung Interior. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-[#F2EBE5]/30">
            <Link href="/privacy" className="hover:text-[#F2EBE5] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#F2EBE5] transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}