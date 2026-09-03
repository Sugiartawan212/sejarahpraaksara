import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'timeline',
  title: 'Timeline Pra-Aksara',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID Urutan',
      type: 'string',
      description: 'Contoh: 01, 02, 03 — digunakan untuk pengurutan tampilan.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Judul Periode',
      type: 'string',
      description: 'Contoh: Zaman Paleolitikum',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag / Label Singkat',
      type: 'string',
      description: 'Contoh: ±2 Juta Tahun Lalu',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Deskripsi',
      type: 'text',
      rows: 4,
      description: 'Penjelasan singkat mengenai periode ini.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Gambar Ilustrasi',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'tag',
      media: 'image',
    },
  },
});
