'use client';
import { useState } from 'react';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function ImageGallery({ images, kategori, status }: { images: string[], kategori: string, status: string }) {
  const [activeImage, setActiveImage] = useState(images[0]);
  if (!images || images.length === 0) return <div className="w-full h-[40vh] bg-slate-200 rounded-3xl flex items-center justify-center mb-8"><span className="text-slate-400 font-medium">Gambar Tidak Tersedia</span></div>;

  return (
    <div className="mb-8 w-full">
      <div className="relative w-full h-[50vh] md:h-[65vh] rounded-3xl overflow-hidden shadow-2xl mb-4 bg-slate-100">
        <Image src={activeImage} alt="Property Cover" fill className="object-cover transition-transform duration-700" priority />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-sm text-[#1E3A8A] uppercase tracking-wider">{kategori}</div>
        <div className="absolute top-4 right-4 bg-[#1E3A8A] text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> {status}</div>
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {images.map((img, index) => (
            <button key={index} onClick={() => setActiveImage(img)} className={`relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-xl overflow-hidden transition-all duration-300 snap-center ${activeImage === img ? 'border-4 border-[#1E3A8A] scale-95 opacity-100' : 'border-2 border-transparent opacity-60 hover:opacity-100'}`}>
              <Image src={img} alt={`Thumbnail ${index}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
