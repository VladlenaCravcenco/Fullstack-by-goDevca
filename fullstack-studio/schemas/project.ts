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
      name: 'titleI18n',
      title: 'Project title translations',
      type: 'localeString',
      group: 'meta',
      description: 'New multilingual title. If empty, the old "title" field is used as fallback.',
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
    defineField({
      name: 'excerptI18n',
      title: 'Project short description translations',
      type: 'localeText',
      group: 'meta',
      description: 'Optional localized excerpt for cards/listing.',
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
          name: 'pillsI18n',
          title: 'Tags (pills) translations',
          type: 'localeStringArray',
          description: 'Localized pills for RU / RO / EN. Falls back to the old "pills" array.',
        }),

        defineField({
          name: 'intro',
          title: 'Intro (1–2 sentences)',
          type: 'text',
          rows: 3,
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'introI18n',
          title: 'Intro translations',
          type: 'localeText',
        }),

        defineField({
          name: 'taskTitle',
          title: 'Task label',
          type: 'string',
          initialValue: 'задача:',
          description: 'Короткая метка как на макете: "задача:"',
        }),
        defineField({
          name: 'taskTitleI18n',
          title: 'Task label translations',
          type: 'localeString',
        }),

        defineField({
          name: 'taskText',
          title: 'Task text',
          type: 'text',
          rows: 3,
          validation: (r) => r.required(),
        }),
        defineField({
          name: 'taskTextI18n',
          title: 'Task text translations',
          type: 'localeText',
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
              name: 'labelI18n',
              title: 'Label translations',
              type: 'localeString',
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
              name: 'labelI18n',
              title: 'Label translations',
              type: 'localeString',
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
          name: 'durationI18n',
          title: 'Duration translations',
          type: 'localeString',
        }),

        defineField({
          name: 'plan',
          title: 'Plan (right meta)',
          type: 'string',
          description: 'Напр.: Premium',
        }),
        defineField({
          name: 'planI18n',
          title: 'Plan translations',
          type: 'localeString',
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
              name: 'nameI18n',
              title: 'Agency name translations',
              type: 'localeString',
            }),
            defineField({
              name: 'note',
              title: 'Agency note',
              type: 'string',
              description: 'Напр.: "Проект выполнен для агентства в рамках долгосрочного сотрудничества."',
            }),
            defineField({
              name: 'noteI18n',
              title: 'Agency note translations',
              type: 'localeString',
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
            defineField({
              name: 'altI18n',
              title: 'Alt translations',
              type: 'localeString',
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
          name: 'labelI18n',
          title: 'Label translations',
          type: 'localeString',
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
      title: 'titleI18n.ru',
      legacyTitle: 'title',
      media: 'mockupBlock.mockup',
      subtitle: 'hero.introI18n.ru',
      legacySubtitle: 'hero.intro',
    },
    prepare({ title, legacyTitle, media, subtitle, legacySubtitle }) {
      const safeTitle = title || legacyTitle;
      const safeSubtitle = subtitle || legacySubtitle;
      return { title: safeTitle, media, subtitle: safeSubtitle ? String(safeSubtitle).slice(0, 60) + '…' : '' };
    },
  },
});
