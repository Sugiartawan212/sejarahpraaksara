import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'team',
  title: 'Anggota Kelompok',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Anggota',
      type: 'string',
      description: 'Contoh: Andi',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Peran / Jabatan',
      type: 'string',
      description: 'Contoh: Ketua Kelompok, Peneliti, Penulis',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Deskripsi Singkat',
      type: 'text',
      rows: 3,
      description: 'Cerita singkat tentang kontribusi anggota ini.',
    }),
    defineField({
      name: 'color',
      title: 'Warna Aksen (HEX)',
      type: 'string',
      description: 'Contoh: #D4A853 — digunakan untuk warna kartu profil di website.',
    }),
    defineField({
      name: 'image',
      title: 'Foto Profil',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
});
