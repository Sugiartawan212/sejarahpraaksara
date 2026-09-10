import { defineType, defineField } from 'sanity';

/**
 * timeline — Schema untuk data timeline / garis waktu zaman pra-aksara.
 * Menyimpan informasi periode sejarah dengan dukungan multi-bahasa.
 */
const timeline = defineType({
  name: 'timeline',
  title: 'Timeline Zaman',
  type: 'document',
  fields: [
    defineField({
      name: 'periode',
      title: 'Periode / Nama Zaman',
      type: 'string',
      description: 'Contoh: Paleolitikum, Mesolitikum, Neolitikum',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rentangWaktu',
      title: 'Rentang Waktu',
      type: 'string',
      description: 'Contoh: 2.500.000 – 10.000 SM',
    }),
    defineField({
      name: 'urutan',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Angka kecil tampil lebih awal',
    }),
    defineField({
      name: 'deskripsi',
      title: 'Deskripsi',
      type: 'localeText',
      description: 'Penjelasan singkat zaman ini (multi-bahasa)',
    }),
    defineField({
      name: 'ciriUtama',
      title: 'Ciri-Ciri Utama',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Daftar ciri utama zaman ini',
    }),
    defineField({
      name: 'gambar',
      title: 'Gambar Ilustrasi',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'warna',
      title: 'Warna Aksen (hex)',
      type: 'string',
      description: 'Contoh: #4f46e5 — digunakan untuk warna badge timeline',
    }),
  ],
  orderings: [
    {
      title: 'Urutan Tampil',
      name: 'urutanAsc',
      by: [{ field: 'urutan', direction: 'asc' }],
    },
  ],
});

export default timeline;
