/**
 * SanityProperti — Tipe data properti yang sudah di-resolve per-locale dari GROQ.
 *
 * Field `judul` dan `deskripsi` sudah menjadi `string` biasa karena
 * GROQ query menggunakan `judul[$locale]` dan `deskripsi[$locale]`
 * untuk me-resolve nilai berdasarkan bahasa aktif sebelum data tiba di komponen.
 *
 * Di Sanity Studio, field-field ini sebenarnya bertipe `localeString` / `localeText`
 * (object dengan sub-field id, en, ru), namun di frontend selalu berupa string.
 */
export interface SanityProperti {
  _id: string;

  /** Judul properti — sudah di-resolve per-locale oleh GROQ query */
  judul: string;

  harga: number;

  /** Lokasi diambil dari reference schema Area */
  lokasi?: string;

  /** Kategori: 'tanah' | 'villa' */
  kategori: 'tanah' | 'villa' | string;

  status: 'tersedia' | 'terjual' | string;
  isBestDeal: boolean;
  luasTanah?: number;
  kamarTidur?: number;
  kamarMandi?: number;

  /** URL gambar utama — sudah di-resolve via mainImage.asset->url di GROQ */
  imageUrl?: string;

  /** Deskripsi — sudah di-resolve per-locale oleh GROQ query */
  deskripsi?: string;

  /** Link Google Maps untuk iframe embed */
  mapsLink?: string;

  slug?: {
    current: string;
  };
}