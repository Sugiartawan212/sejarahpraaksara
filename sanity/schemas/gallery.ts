import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'gallery',
  title: 'Galeri Artefak & Foto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Judul Foto / Artefak',
      type: 'string',
      description: 'Contoh: Kapak Genggam dari Pacitan',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      description: 'Contoh: Alat Batu, Lukisan Gua, Fosil',
      options: {
        list: [
          { title: 'Alat Batu', value: 'alat-batu' },
          { title: 'Lukisan Gua', value: 'lukisan-gua' },
          { title: 'Fosil & Tengkorak', value: 'fosil' },
          { title: 'Perhiasan & Gerabah', value: 'perhiasan' },
          { title: 'Lainnya', value: 'lainnya' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'era',
      title: 'Era / Zaman',
      type: 'string',
      description: 'Contoh: Paleolitikum, Mesolitikum, Neolitikum, Megalitikum',
      options: {
        list: [
          { title: 'Paleolitikum', value: 'paleolitikum' },
          { title: 'Mesolitikum', value: 'mesolitikum' },
          { title: 'Neolitikum', value: 'neolitikum' },
          { title: 'Megalitikum', value: 'megalitikum' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Foto / Gambar',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'era',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Era: ${subtitle}` : '',
        media,
      };
    },
  },
});
