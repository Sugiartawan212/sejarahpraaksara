import { defineType, defineField } from 'sanity';

/**
 * team — Schema untuk data anggota tim / pembuat konten presentasi.
 * Menyimpan informasi profil dengan dukungan multi-bahasa.
 */
const team = defineType({
  name: 'team',
  title: 'Anggota Tim',
  type: 'document',
  fields: [
    defineField({
      name: 'nama',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'peran',
      title: 'Peran / Jabatan',
      type: 'localeText',
      description: 'Peran dalam tim (multi-bahasa)',
    }),
    defineField({
      name: 'bio',
      title: 'Bio Singkat',
      type: 'localeText',
      description: 'Deskripsi singkat anggota tim (multi-bahasa)',
    }),
    defineField({
      name: 'foto',
      title: 'Foto Profil',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'urutan',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Angka kecil tampil lebih awal',
    }),
    defineField({
      name: 'sosialMedia',
      title: 'Sosial Media',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'linkedin', title: 'LinkedIn', type: 'url' },
        { name: 'github', title: 'GitHub', type: 'url' },
      ],
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

export default team;
