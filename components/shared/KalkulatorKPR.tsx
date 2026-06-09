'use client';

import { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

export default function KalkulatorKPR({ hargaProperti }: { hargaProperti: number }) {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price);
    };

    const [dpPersen, setDpPersen] = useState<number>(20);
    const [bunga, setBunga] = useState<number>(5);
    const [tenor, setTenor] = useState<number>(15);
    const [cicilan, setCicilan] = useState<number>(0);

    useEffect(() => {
        const harga = hargaProperti || 0;
        const nilaiDP = harga * (dpPersen / 100);
        const pokokPinjaman = harga - nilaiDP;

        const r = (bunga / 100) / 12;
        const n = tenor * 12;

        if (r > 0) {
            setCicilan(pokokPinjaman * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
        } else {
            setCicilan(pokokPinjaman / n);
        }
    }, [hargaProperti, dpPersen, bunga, tenor]);

    const nilaiDP = (hargaProperti || 0) * (dpPersen / 100);

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 mb-10">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
                <div className="p-3 bg-[#E8F0FE] rounded-xl">
                    <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-[#1E3A8A]">Simulasi Cicilan KPR</h3>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-3/5 space-y-6">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-slate-500">Uang Muka (DP)</label>
                            {/* Format Rupiah diganti pakai FormatPrice dinamis */}
                            <span className="text-sm font-bold text-blue-600">{dpPersen}% ({formatPrice(nilaiDP)})</span>
                        </div>
                        <input type="range" min="0" max="100" step="5" value={dpPersen} onChange={(e) => setDpPersen(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-slate-500">Suku Bunga</label>
                            <span className="text-sm font-bold text-blue-600">{bunga}% / tahun</span>
                        </div>
                        <input type="range" min="1" max="15" step="0.5" value={bunga} onChange={(e) => setBunga(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-bold text-slate-500">Jangka Waktu (Tenor)</label>
                            <span className="text-sm font-bold text-blue-600">{tenor} Tahun</span>
                        </div>
                        <input type="range" min="1" max="30" step="1" value={tenor} onChange={(e) => setTenor(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                    </div>
                </div>

                <div className="w-full lg:w-2/5 bg-[#1A4B8F] p-6 rounded-2xl shadow-md flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#3B82F6] opacity-30 blur-2xl rounded-full"></div>
                    <div className="relative z-10 mb-4">
                        <p className="text-sm text-blue-200 font-medium mb-1">Pokok Pinjaman</p>
                        {/* Format Rupiah diganti pakai FormatPrice dinamis */}
                        <p className="text-lg font-bold text-white">{formatPrice((hargaProperti || 0) - nilaiDP)}</p>
                    </div>
                    <div className="relative z-10 border-t border-blue-700/50 pt-4 mt-2">
                        <p className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-2">Estimasi Cicilan</p>
                        <p className="text-3xl font-extrabold text-[#34D399]">
                            {/* Format Rupiah diganti pakai FormatPrice dinamis */}
                            {formatPrice(cicilan)}<span className="text-sm text-blue-200 font-medium font-normal">/bln</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}