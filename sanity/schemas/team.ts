import { defineType, defineField } from 'sanity';

/**
 * team — Schema untuk data anggota tim / pembuat konten presentasi.
 * Field diselaraskan dengan GROQ query di TeamSection.tsx.
 */
const team = defineType({
  name: 'team',
  title: 'Anggota Tim',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Lengkap',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Peran / Tugas',
      type: 'string',
      description: 'Contoh: Speaker, UI/UX, Researcher, Editor',
    }),
    defineField({
      name: 'image',
      title: 'Foto Profil',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Deskripsi Singkat Tugas',
      type: 'text',
      rows: 3,
      description: 'Penjelasan singkat mengenai peran anggota dalam tim.',
    }),
    defineField({
      name: 'order',
      title: 'Urutan Tampil',
      type: 'number',
      description: 'Angka kecil tampil lebih awal (misal: 1, 2, 3 …)',
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
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
});

export default team;
