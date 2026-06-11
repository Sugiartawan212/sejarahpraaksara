import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    // ─── Core Identity ──────────────────────────────────────────────────────────
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

    // ─── Classification ─────────────────────────────────────────────────────────
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

    // ─── NEW: Service Type (for portfolio filter navigation) ────────────────────
    defineField({
      name: 'service',
      title: 'Service',
      type: 'string',
      description: 'e.g., Architecture, Interior Design, Landscape',
      options: {
        list: [
          { title: 'Architecture', value: 'Architecture' },
          { title: 'Interior Design', value: 'Interior Design' },
          { title: 'Landscape', value: 'Landscape' },
          { title: 'Full Renovation', value: 'Full Renovation' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // ─── NEW: Location ───────────────────────────────────────────────────────────
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., Singaraja, Bali',
      validation: (Rule) => Rule.required(),
    }),

    // ─── NEW: Year ──────────────────────────────────────────────────────────────
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g., 2026',
      validation: (Rule) => Rule.required(),
    }),

    // ─── NEW: Size ──────────────────────────────────────────────────────────────
    defineField({
      name: 'size',
      title: 'Project Size',
      type: 'string',
      description: 'e.g., 450 sqm',
    }),

    // ─── Images ─────────────────────────────────────────────────────────────────
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    // ─── NEW: Story / Narrative (Rich Text) ─────────────────────────────────────
    defineField({
      name: 'story',
      title: 'Project Story',
      type: 'array',
      description: 'The narrative behind this project — materials, philosophy, challenges solved.',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
          },
        },
      ],
    }),

    // ─── Gallery (Array of images for masonry detail page) ───────────────────────
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      description: 'Additional project photos for the masonry gallery on the detail page.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Describe the image for accessibility and SEO.',
            }),
          ],
        },
      ],
    }),
  ],

  // ─── Studio Preview ─────────────────────────────────────────────────────────
  preview: {
    select: {
      title: 'title',
      service: 'service',
      location: 'location',
      year: 'year',
      media: 'mainImage',
    },
    prepare({ title, service, location, year, media }) {
      return {
        title,
        subtitle: [service, location, year].filter(Boolean).join(' · '),
        media,
      };
    },
  },
});
