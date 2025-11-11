// /schemas/project.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',

  groups: [
    { name: 'card',  title: 'Card (Projects list)' },
    { name: 'case',  title: 'Case page' },
    { name: 'media', title: 'Media & Content' },
    { name: 'meta',  title: 'Meta' },
  ],

  fields: [
    // ───────────────────────────────── META
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
      group: 'meta',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
      group: 'meta',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'meta',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'meta',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Project URL',
      type: 'url',
      group: 'meta',
    }),

    // ──────────────────────────────── CARD (для общей страницы проектов)
    defineField({
      name: 'card',
      title: 'Card (Projects list)',
      type: 'object',
      group: 'card',
      fields: [
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
        defineField({
          name: 'miniExcerpt',
          title: 'Short teaser (card text)',
          type: 'text',
        }),
        defineField({
          name: 'metrics',
          title: 'Badges / Metrics',
          description: 'Короткие факты: “+38% SEO”, “2 months”, “WordPress”',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'thumb',
          title: 'Card thumbnail',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'theme',
          title: 'Theme',
          type: 'string',
          options: {
            layout: 'radio',
            list: [
              { title: 'Light', value: 'light' },
              { title: 'Dark', value: 'dark' },
            ],
          },
          initialValue: 'light',
        }),
        defineField({
          name: 'accent',
          title: 'Accent color (hex)',
          type: 'string',
          description: 'Напр.: #FED16A',
        }),
        defineField({
          name: 'featured',
          title: 'Featured',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'order',
          title: 'Manual order (lower = first)',
          type: 'number',
        }),
      ],
      preview: {
        select: { title: 'subtitle', media: 'thumb' },
        prepare({ title, media }) {
          return { title: title || 'Card', media };
        },
      },
    }),

    // ──────────────────────────────── CASE PAGE (левая/правая колонка)
    // Hero/cover для кейса (можно переиспользовать как верхнюю большую плашку)
    defineField({
      name: 'cover',
      title: 'Cover image (Hero, 100% width)',
      type: 'image',
      options: { hotspot: true },
      group: 'case',
    }),

    // Левая колонка
    defineField({
      name: 'excerpt',
      title: 'About project (short)',
      type: 'text',
      group: 'case',
    }),
    defineField({
      name: 'about',
      title: 'About project (full)',
      type: 'text',
      group: 'case',
    }),
    defineField({
      name: 'task',
      title: 'Task',
      type: 'text',
      group: 'case',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'text',
      group: 'case',
    }),
    defineField({
      name: 'details',
      title: 'Details box',
      type: 'object',
      group: 'case',
      fields: [
        defineField({
          name: 'tools',
          title: 'Tools (logos)',
          type: 'array',
          of: [{ type: 'image', options: { hotspot: true } }],
        }),
        defineField({ name: 'location', title: 'Location', type: 'string' }),
        defineField({ name: 'duration', title: 'Duration', type: 'string' }),
        defineField({ name: 'plan', title: 'Plan', type: 'string' }),
      ],
    }),

    // Правая колонка (форма — компонент на фронте; здесь только блок агентства)
    defineField({
      name: 'agency',
      title: 'Agency box',
      type: 'object',
      group: 'case',
      fields: [
        defineField({ name: 'logo', title: 'Agency logo', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'name', title: 'Agency name', type: 'string' }),
        defineField({ name: 'link', title: 'Agency URL', type: 'url' }),
        defineField({
          name: 'note',
          title: 'Note',
          type: 'string',
          initialValue: 'Проект выполнен для агентства в рамках сотрудничества.',
        }),
      ],
      preview: { select: { title: 'name', media: 'logo' } },
    }),

    // ──────────────────────────────── MEDIA & CONTENT (галерея + конструктор кейса)
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      group: 'media',
    }),

    defineField({
      name: 'content',
      title: 'Case content',
      type: 'array',
      group: 'media',
      of: [
        // 1) Bento-grid
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
                    { name: 'title', type: 'string', title: 'Title' },
                    { name: 'text', type: 'text', title: 'Text' },
                    { name: 'image', type: 'image', options: { hotspot: true }, title: 'Image' },
                    {
                      name: 'colSpan',
                      type: 'number',
                      title: 'Col span (1–2)',
                      initialValue: 1,
                      validation: (r) => r.min(1).max(2),
                    },
                    {
                      name: 'rowSpan',
                      type: 'number',
                      title: 'Row span (1–2)',
                      initialValue: 1,
                      validation: (r) => r.min(1).max(2),
                    },
                  ],
                },
              ],
            },
          ],
          preview: { select: { title: 'items.0.title' }, prepare: (v) => ({ title: v.title || 'Bento grid' }) },
        }),

        // 2) До/после
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
  ],

  orderings: [
    {
      title: 'Newest first',
      name: 'pubDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Manual (card.order)',
      name: 'manualAsc',
      by: [{ field: 'card.order', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'cover',
      subtitle: 'card.subtitle',
    },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle };
    },
  },
});