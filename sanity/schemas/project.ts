import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Kitchen Set', value: 'kitchen-set' },
          { title: 'Kamar Utama', value: 'kamar-utama' },
          { title: 'Ruang Tamu', value: 'ruang-tamu' },
          { title: 'Full House', value: 'full-house' },
        ],
      },
    }),
    defineField({
      name: 'designStyle',
      title: 'Design Style',
      type: 'string',
      options: {
        list: [
          { title: 'Modern Minimalist', value: 'modern-minimalist' },
          { title: 'Japandi', value: 'japandi' },
          { title: 'Industrial', value: 'industrial' },
          { title: 'Classic', value: 'classic' },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],
});
