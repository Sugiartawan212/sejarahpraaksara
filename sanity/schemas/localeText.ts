import { defineType, defineField } from 'sanity';

/**
 * localeText — Custom object type untuk field bertipe text (multi-line) multi-bahasa.
 * Digunakan untuk field panjang seperti deskripsi, konten, dll.
 *
 * Penggunaan di schema lain:
 *   defineField({ name: 'deskripsi', title: 'Deskripsi', type: 'localeText' })
 *
 * Contoh GROQ query untuk resolve per-locale:
 *   "deskripsi": deskripsi[$locale]
 */
export default defineType({
  name: 'localeText',
  title: 'Lokalisasi Teks Panjang (Text)',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'id',
      title: '🇮🇩 Indonesia',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'en',
      title: '🇬🇧 English',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'ru',
      title: '🇷🇺 Русский',
      type: 'text',
      rows: 5,
    }),
  ],
});
