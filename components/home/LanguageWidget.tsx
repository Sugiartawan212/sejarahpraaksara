"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { routing } from '@/i18n/routing';

const LANGUAGES = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/gb.png' },
    { code: 'id', name: 'Indonesia', flag: 'https://flagcdn.com/w40/id.png' },
    { code: 'ru', name: 'Русский', flag: 'https://flagcdn.com/w40/ru.png' },
] as const;

type LangCode = typeof LANGUAGES[number]['code'];

export default function LanguageWidget() {
    const router = useRouter();
    const pathname = usePathname();      // Contoh: /en/properti
    const currentLocale = useLocale();   // Locale aktif dari next-intl

    const [isOpen, setIsOpen] = useState(false);

    const activeLang = LANGUAGES.find(l => l.code === currentLocale) ?? LANGUAGES[0];

    const handleChangeLanguage = (newLocale: LangCode) => {
        setIsOpen(false);

        // Ganti segmen locale di URL
        // Contoh: /en/properti → /id/properti
        const segments = pathname.split('/');
        const isLocaleInPath = routing.locales.includes(segments[1] as 'en' | 'id' | 'ru');

        let newPath: string;
        if (isLocaleInPath) {
            segments[1] = newLocale;
            newPath = segments.join('/') || '/';
        } else {
            // Path tanpa prefix (default locale)
            newPath = `/${newLocale}${pathname}`;
        }

        // Bersihkan trailing slash ganda
        newPath = newPath.replace(/\/+$/, '') || '/';

        router.push(newPath);
        router.refresh();
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Menu Pilihan Bahasa (Muncul ke atas) */}
            {isOpen && (
                <>
                    {/* Overlay transparan untuk menutup menu saat klik di luar */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute bottom-full left-0 mb-4 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-2xl p-2 w-40 flex flex-col gap-1 z-50">
                        {LANGUAGES.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => handleChangeLanguage(lang.code)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${currentLocale === lang.code
                                        ? 'bg-blue-50 text-blue-700 font-bold'
                                        : 'text-slate-600 hover:bg-slate-50 font-semibold'
                                    }`}
                            >
                                {/* DIGANTI JADI IMG BIAR MUNCUL DI WINDOWS */}
                                <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded shadow-sm" />
                                <span className="text-sm">{lang.name}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}

            {/* Tombol Bulat Melayang */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-white border-2 border-slate-100 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-center hover:scale-110 transition-transform duration-300 focus:outline-none"
                aria-label="Change Language"
            >
                {/* DIGANTI JADI IMG BIAR MUNCUL DI WINDOWS */}
                <img src={activeLang.flag} alt={activeLang.name} className="w-7 h-4.5 object-cover rounded shadow-sm" />
            </button>
        </div>
    );
}