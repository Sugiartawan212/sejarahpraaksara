"use client";

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, CalendarCheck } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function FloatingWidget() {
    const [isOpen, setIsOpen] = useState(false);
    // State baru khusus untuk mengatur muncul/hilangnya balon notifikasi
    const [showMessage, setShowMessage] = useState(false);

    // LOGIKA ANIMASI LOOPING (Muncul 5 detik, Hilang 2.5 detik)
    useEffect(() => {
        const runAnimationCycle = () => {
            setShowMessage(true); // 1. Balon Muncul

            // 2. Tunggu 5 detik, lalu hilangkan balonnya
            setTimeout(() => {
                setShowMessage(false);
            }, 5000);
        };

        // Beri jeda 1 detik saat website baru dibuka sebelum animasi dimulai biar smooth
        const initialDelay = setTimeout(runAnimationCycle, 1000);

        // 3. Ulangi siklus ini terus-menerus setiap 7.5 detik (5 detik muncul + 2.5 detik jeda hilang)
        const interval = setInterval(runAnimationCycle, 7500);

        // Bersihkan timer kalau komponen di-unmount biar memori nggak bocor
        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, []);

    const menuItems = [
        {
            id: 1,
            label: "Book a Survey",
            icon: <CalendarCheck size={18} strokeWidth={2.5} />,
            themeColor: "bg-[#F5A623]",
            hoverTextColor: "group-hover:text-[#F5A623]",
            link: "/contact",
            delay: "delay-150"
        },
        {
            id: 2,
            label: "Instagram",
            icon: <FaInstagram size={18} />,
            themeColor: "bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888]",
            hoverTextColor: "group-hover:text-[#dc2743]",
            link: "https://instagram.com/umahluwung",
            delay: "delay-75"
        },
        {
            id: 3,
            label: "WhatsApp",
            icon: <FaWhatsapp size={20} />,
            themeColor: "bg-[#25D366]",
            hoverTextColor: "group-hover:text-[#25D366]",
            link: "https://wa.me/6281234567890",
            delay: "delay-0"
        }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">

            <div className="relative flex flex-col items-end gap-3 mb-4">

                {/* Balon Notifikasi dengan Logika Baru */}
                <div
                    className={`absolute bottom-0 right-0 bg-[#E2DECA] text-[#2A2A27] px-5 py-3 rounded-t-2xl rounded-bl-2xl rounded-br-sm shadow-xl border border-[#5C7A5A]/20 font-bold text-xs tracking-wide whitespace-nowrap transition-all duration-500 origin-bottom-right flex items-center gap-2
          ${!isOpen && showMessage ? 'scale-100 opacity-100 translate-y-0' : 'scale-50 opacity-0 translate-y-4 pointer-events-none'}`}
                >
                    Butuh Bantuan? 👋
                </div>

                {/* List Menu Tahap 2 */}
                {menuItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center bg-[#FDFCFB] rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300 ease-out origin-bottom
              ${isOpen
                                ? `opacity-100 translate-y-0 scale-100 ${item.delay}`
                                : 'opacity-0 translate-y-10 scale-50 pointer-events-none'
                            }
            `}
                    >
                        <span className={`pl-5 pr-3 py-2 text-[#2A2A27] font-bold text-sm transition-colors duration-300 ${item.hoverTextColor}`}>
                            {item.label}
                        </span>
                        <div className={`${item.themeColor} text-white p-2.5 rounded-full m-1 group-hover:scale-110 transition-transform duration-300 shadow-inner`}>
                            {item.icon}
                        </div>
                    </a>
                ))}
            </div>

            {/* Tombol Pemicu Utama */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex items-center justify-center w-[60px] h-[60px] rounded-full shadow-[0_10px_30px_rgba(92,122,90,0.3)] hover:scale-105 transition-colors duration-300 ease-out z-50
          ${isOpen ? 'bg-[#2A2A27]' : 'bg-[#5C7A5A]'} 
        `}
            >
                {/* Titik Merah Notifikasi */}
                {!isOpen && (
                    <span className="absolute top-0 right-0 flex h-4 w-4 transform -translate-x-1 translate-y-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#EF4444] border-2 border-[#5C7A5A]"></span>
                    </span>
                )}

                <div className="relative w-full h-full flex items-center justify-center">
                    <MessageCircle
                        size={28}
                        className={`absolute text-[#EEEBE4] transition-all duration-300 ease-out ${isOpen ? 'scale-50 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'}`}
                    />
                    <X
                        size={30}
                        className={`absolute text-[#EEEBE4] transition-all duration-300 ease-out ${isOpen ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 -rotate-90'}`}
                    />
                </div>
            </button>

        </div>
    );
}