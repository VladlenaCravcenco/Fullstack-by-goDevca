// /schemas/project.ts
import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',

  groups: [
    { name: 'meta', title: 'Meta' },
    { name: 'hero', title: 'Hero (top)' },
    { name: 'mock', title: 'Mockup + Agency' },
    { name: 'gallery', title: 'Gallery (screens)' },
    { name: 'beforeAfter', title: 'Before / After' },
    { name: 'related', title: 'Related projects' },
  ],

  fields: [
    // ───────────────────────────── META
    defineField({
      name: 'title',
      title: 'Project title (H1)',
      type: 'string',
      group: 'meta',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'meta',
      initialValue: () => new Date().toISOString(),
    }),

    // ───────────────────────────── HERO
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'pills',
          title: 'Tags (pills)',
          type: 'array',
          of: [{ type: 'string' }],
          validation: (r) => r.max(6),
          description: 'Напр.: website, seo, redesign, wordpress',
        }),

        defineField({
          name: 'intro',
          title: 'Intro (1–2 sentences)',
          type: 'text',
          rows: 3,
          validation: (r) => r.required(),
        }),

        defineField({
          name: 'taskTitle',
          title: 'Task label',
          type: 'string',
          initialValue: 'задача:',
          description: 'Короткая метка как на макете: "задача:"',
        }),

        defineField({
          name: 'taskText',
          title: 'Task text',
          type: 'text',
          rows: 3,
          validation: (r) => r.required(),
        }),

        defineField({
          name: 'ctaPrimary',
          title: 'Button 1 (light)',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'перейти на сайт',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (r) => r.required(),
            }),
          ],
        }),

        defineField({
          name: 'ctaSecondary',
          title: 'Button 2 (dark)',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              initialValue: 'Заполнить бриф',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (r) => r.required(),
            }),
          ],
        }),

        defineField({
          name: 'duration',
          title: 'Duration (right meta)',
          type: 'string',
          description: 'Напр.: 2 месяца',
        }),

        defineField({
          name: 'plan',
          title: 'Plan (right meta)',
          type: 'string',
          description: 'Напр.: Premium',
        }),
      ],
    }),

    // ───────────────────────────── MOCKUP + AGENCY
    defineField({
      name: 'mockupBlock',
      title: 'Mockup block',
      type: 'object',
      group: 'mock',
      fields: [
        defineField({
          name: 'mockup',
          title: 'Big mockup image',
          type: 'image',
          options: { hotspot: true },
          validation: (r) => r.required(),
        }),

        defineField({
          name: 'agency',
          title: 'Agency badge (under mockup, right)',
          type: 'object',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Show agency badge',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'logo',
              title: 'Logo (circle)',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'name',
              title: 'Agency name',
              type: 'string',
              initialValue: 'GROWUP AGENCY',
            }),
            defineField({
              name: 'note',
              title: 'Agency note',
              type: 'string',
              description: 'Напр.: "Проект выполнен для агентства в рамках долгосрочного сотрудничества."',
            }),
          ],
        }),
      ],
    }),

    // ───────────────────────────── GALLERY (лента скринов)
    defineField({
      name: 'gallery',
      title: 'Gallery (screens)',
      type: 'array',
      group: 'gallery',
      of: [
        defineArrayMember({
          name: 'galleryItem',
          title: 'Gallery item',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt (optional)',
              type: 'string',
            }),
          ],
          preview: {
            select: { media: 'image', title: 'alt' },
            prepare({ media, title }) {
              return { media, title: title || 'Gallery image' };
            },
          },
        }),
      ],
      validation: (r) => r.min(1).max(30),
    }),

    // ───────────────────────────── BEFORE / AFTER
    defineField({
      name: 'beforeAfter',
      title: 'Before / After',
      type: 'object',
      group: 'beforeAfter',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable block',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'label',
          title: 'Label text',
          type: 'string',
          initialValue: 'до\\после',
        }),
        defineField({
          name: 'before',
          title: 'Before image',
          type: 'image',
          options: { hotspot: true },
        }),
        defineField({
          name: 'after',
          title: 'After image',
          type: 'image',
          options: { hotspot: true },
        }),
      ],
    }),

    // ───────────────────────────── RELATED
    defineField({
      name: 'relatedProjects',
      title: 'Related projects',
      type: 'array',
      group: 'related',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      validation: (r) => r.max(6),
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mockupBlock.mockup',
      subtitle: 'hero.intro',
    },
    prepare({ title, media, subtitle }) {
      return { title, media, subtitle: subtitle ? String(subtitle).slice(0, 60) + '…' : '' };
    },
  },
});