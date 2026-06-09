import { defineType, defineField } from 'sanity';

/**
 * localeString — Custom object type untuk field bertipe string multi-bahasa.
 * Digunakan untuk field pendek seperti judul, nama, dll.
 *
 * Penggunaan di schema lain:
 *   defineField({ name: 'judul', title: 'Judul', type: 'localeString' })
 *
 * Contoh GROQ query untuk resolve per-locale:
 *   "judul": judul[$locale]
 */
export default defineType({
  name: 'localeString',
  title: 'Lokalisasi Teks (String)',
  type: 'object',
  // Tampilkan field secara horizontal di Studio untuk efisiensi
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'id',
      title: '🇮🇩 Indonesia',
      type: 'string',
    }),
    defineField({
      name: 'en',
      title: '🇬🇧 English',
      type: 'string',
    }),
    defineField({
      name: 'ru',
      title: '🇷🇺 Русский',
      type: 'string',
    }),
  ],
});
