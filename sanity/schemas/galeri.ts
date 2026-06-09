import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'galeriGlobal',
    title: 'Galeri Progres & Klien',
    type: 'document',
    fields: [
        defineField({
            name: 'gambar',
            title: 'Foto Dokumentasi',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'alt',
            title: 'Keterangan Foto (Alt Text)',
            type: 'string',
            description: 'Misal: Serah terima kunci dengan Bapak Made di Kavling Lovina',
            validation: (Rule) => Rule.required(),
        }),
        // FIELD BARU: Biar Pak Kino bisa milih foto mana yang jadi Header Utama
        defineField({
            name: 'kategori',
            title: 'Kategori Penempatan Foto',
            type: 'string',
            options: {
                list: [
                    { title: '🔥 Header Utama Landing Page (Maks 4)', value: 'header' },
                    { title: '📸 Progres Proyek Lapangan', value: 'progres' },
                    { title: '🤝 Dokumentasi & Testimoni Klien', value: 'klien' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],
})