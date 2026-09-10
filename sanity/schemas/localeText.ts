import { defineType, defineField } from 'sanity';

/**
 * localeText — Schema untuk teks multi-bahasa (id, en)
 * Digunakan sebagai tipe field di dalam schema lain (e.g., timeline, team)
 * untuk mendukung konten multi-bahasa.
 */
const localeText = defineType({
  name: 'localeText',
  title: 'Teks Multi-Bahasa',
  type: 'object',
  fields: [
    defineField({
      name: 'id',
      title: 'Bahasa Indonesia',
      type: 'text',
    }),
    defineField({
      name: 'en',
      title: 'English',
      type: 'text',
    }),
  ],
});

export default localeText;
