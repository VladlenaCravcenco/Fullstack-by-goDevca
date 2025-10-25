import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Short description',
      type: 'text',
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),

    // 👇 вот здесь должен быть контент с бенто и слайдером
    defineField({
      name: 'content',
      title: 'Case content',
      type: 'array',
      of: [
        // 1️⃣ Бенто-грид
        defineField({
          type: 'object',
          name: 'bento',
          title: 'Bento grid',
          fields: [
            {
              name: 'items',
              title: 'Cards',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'title', type: 'string' },
                    { name: 'text', type: 'text' },
                    { name: 'image', type: 'image', options: { hotspot: true } },
                    {
                      name: 'colSpan',
                      type: 'number',
                      initialValue: 1,
                      validation: (r) => r.min(1).max(2),
                    },
                    {
                      name: 'rowSpan',
                      type: 'number',
                      initialValue: 1,
                      validation: (r) => r.min(1).max(2),
                    },
                  ],
                },
              ],
            },
          ],
        }),

        // 2️⃣ До/после
        defineField({
          type: 'object',
          name: 'beforeAfter',
          title: 'Before / After slider',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'before', type: 'image', options: { hotspot: true } },
            { name: 'after', type: 'image', options: { hotspot: true } },
            { name: 'caption', type: 'string' },
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'siteUrl',
      title: 'Project URL',
      type: 'url',
    }),
  ],

  orderings: [
    {
      title: 'Newest first',
      name: 'pubDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
});