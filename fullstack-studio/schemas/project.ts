import { defineArrayMember, defineField, defineType } from 'sanity'

const localeStringField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'localeString',
  })

const localeTextField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'localeText',
  })

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  groups: [
    { name: 'meta', title: 'Meta' },
    { name: 'hero', title: 'Hero' },
    { name: 'mock', title: 'Mockup' },
    { name: 'gallery', title: 'Gallery' },
    { name: 'beforeAfter', title: 'Before / After' },
    { name: 'related', title: 'Related' },
  ],
  fields: [
    defineField({
      name: 'titleI18n',
      title: 'Title',
      type: 'localeString',
      group: 'meta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: {
        source: (doc: any) => doc?.titleI18n?.ru || '',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
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
      title: 'Excerpt',
      type: 'localeText',
      group: 'meta',
    }),
    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({
          name: 'pillsI18n',
          title: 'Tags',
          type: 'localeStringArray',
        }),
        localeTextField('introI18n', 'Intro'),
        localeStringField('taskTitleI18n', 'Task label'),
        localeTextField('taskTextI18n', 'Task text'),
        defineField({
          name: 'ctaPrimary',
          title: 'Primary button',
          type: 'object',
          fields: [
            localeStringField('labelI18n', 'Label'),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineField({
          name: 'ctaSecondary',
          title: 'Secondary button',
          type: 'object',
          fields: [
            localeStringField('labelI18n', 'Label'),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        localeStringField('durationI18n', 'Duration'),
        localeStringField('planI18n', 'Plan'),
      ],
    }),
    defineField({
      name: 'mockupBlock',
      title: 'Mockup block',
      type: 'object',
      group: 'mock',
      fields: [
        defineField({
          name: 'mockup',
          title: 'Mockup image',
          type: 'image',
          options: { hotspot: true },
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'agency',
          title: 'Agency badge',
          type: 'object',
          fields: [
            defineField({
              name: 'enabled',
              title: 'Show badge',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { hotspot: true },
            }),
            localeStringField('nameI18n', 'Agency name'),
            localeStringField('noteI18n', 'Agency note'),
          ],
        }),
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
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
              validation: (rule) => rule.required(),
            }),
            localeStringField('altI18n', 'Alt'),
          ],
          preview: {
            select: { media: 'image', title: 'altI18n.ru' },
            prepare({ media, title }) {
              return { media, title: title || 'Gallery image' }
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(30),
    }),
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
        localeStringField('labelI18n', 'Label'),
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
    defineField({
      name: 'relatedProjects',
      title: 'Related projects',
      type: 'array',
      group: 'related',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
      validation: (rule) => rule.max(6),
    }),
  ],
  preview: {
    select: {
      title: 'titleI18n.ru',
      media: 'mockupBlock.mockup',
      subtitle: 'hero.introI18n.ru',
    },
    prepare({ title, media, subtitle }) {
      return {
        title,
        media,
        subtitle: subtitle ? `${String(subtitle).slice(0, 60)}…` : '',
      }
    },
  },
})
