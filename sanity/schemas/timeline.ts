import { defineType, defineField } from 'sanity';

/**
 * timeline — Schema untuk data timeline / garis waktu zaman pra-aksara.
 * Field disederhanakan ke bahasa Inggris agar konsisten dengan GROQ query.
 */
const timeline = defineType({
  name: 'timeline',
  title: 'Timeline Zaman',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nama Zaman',
      type: 'string',
      description: 'Contoh: Paleolitikum, Mesolitikum, Neolitikum',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timeframe',
      title: 'Rentang Waktu',
      type: 'string',
      description: 'Contoh: 2.500.000 – 10.000 SM',
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi',
      type: 'text',
      rows: 4,
      description: 'Penjelasan singkat tentang zaman ini.',
    }),
    defineField({
      name: 'features',
      title: 'Ciri-Ciri Utama',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Daftar ciri utama zaman ini (pisahkan per item).',
    }),
    defineField({
      name: 'image',
      title: 'Gambar Ilustrasi',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Angka kecil tampil lebih awal (1, 2, 3 …)',
    }),
  ],
  orderings: [
    {
      title: 'Urutan Tampil',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'timeframe',
      media: 'image',
    },
  },
});

export default timeline;
