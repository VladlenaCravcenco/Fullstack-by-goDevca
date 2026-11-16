import ProjectDirectionsInput from '../components/ProjectDirectionsInput'
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

// Keep older documents editable without renaming, migrating or deleting their fields.
const savedField = (name: string, title: string, type: 'string' | 'text' = 'string') =>
  defineField({
    name,
    title: `${title} — сохранённый текст`,
    type,
    description: 'Текст из прежней формы. Он сохранён и доступен для редактирования. Переводы ниже заполнять заново не требуется.',
    hidden: ({value}) => value === undefined || value === null,
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
    { name: 'related', title: 'Related' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'meta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleI18n',
      title: 'Title — сохранённые переводы',
      type: 'localeString',
      group: 'meta',
      hidden: ({value}) => !value,
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'meta',
      options: {
        source: (doc: any) => doc?.title || doc?.titleI18n?.ru || '',
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
    {...savedField('excerpt', 'Excerpt', 'text'), group: 'meta'},
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
          name: 'directionRefs',
          title: 'Направления проекта',
          description: 'Отметьте нужные направления. Можно выбрать несколько или добавить новое в общий список.',
          type: 'array',
          of: [defineArrayMember({type: 'reference', to: [{type: 'projectDirection'}]})],
          components: {input: ProjectDirectionsInput},
          validation: (rule) => rule.unique(),
        }),
        defineField({
          name: 'directions', title: 'Прежние направления', type: 'array',
          of: [defineArrayMember({type: 'string'})], hidden: true,
        }),
        defineField({
          name: 'pills',
          title: 'Прежние теги',
          hidden: true,
          description: 'Сохранены для старых проектов. Для изменений используйте направления выше.',
          readOnly: true,
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
        }),
        defineField({
          name: 'taskTitle',
          title: 'Task label (legacy)',
          type: 'string',
          hidden: true,
        }),
        defineField({
          name: 'pillsI18n',
          title: 'Tags (legacy i18n)',
          type: 'localeStringArray',
          hidden: true,
        }),
        savedField('intro', 'Intro', 'text'),
        localeTextField('introI18n', 'Intro'),
        defineField({
          name: 'taskTitleI18n',
          title: 'Task label (legacy i18n)',
          type: 'localeString',
          hidden: true,
        }),
        savedField('taskText', 'Task text', 'text'),
        localeTextField('taskTextI18n', 'Task text'),
        defineField({
          name: 'ctaPrimary',
          title: 'Primary button',
          type: 'object',
          fields: [
            savedField('label', 'Label'),
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
          title: 'Secondary button — сохранённые данные',
          type: 'object',
          hidden: ({value}) => !value || Object.keys(value).length === 0,
          fields: [
            savedField('label', 'Label'),
            defineField({
              name: 'labelI18n',
              title: 'Label — сохранённые переводы',
              type: 'localeString',
              hidden: ({value}) => value === undefined || value === null,
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              hidden: ({value}) => value === undefined || value === null,
            }),
          ],
        }),
        savedField('duration', 'Duration', 'string'),
        localeStringField('durationI18n', 'Duration'),
        savedField('plan', 'Plan', 'string'),
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
            defineField({
              name: 'name',
              title: 'Agency name',
              type: 'string',
            }),
            defineField({
              name: 'nameI18n',
              title: 'Agency name — сохранённые переводы',
              type: 'localeString',
              hidden: ({value}) => !value,
            }),
            savedField('note', 'Agency note'),
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
            savedField('alt', 'Alt'),
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
      title: 'Before / After — сохранённые данные',
      type: 'object',
      hidden: ({value}) => !value || !(value.before || value.after || value.label || value.labelI18n || value.enabled),
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable block',
          type: 'boolean',
          initialValue: false,
        }),
        savedField('label', 'Label'),
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
      title: 'title',
      titleRu: 'titleI18n.ru',
      titleEn: 'titleI18n.en',
      titleRo: 'titleI18n.ro',
      media: 'mockupBlock.mockup',
      subtitle: 'hero.introI18n.ru',
    },
    prepare({ title, titleRu, titleEn, titleRo, media, subtitle }) {
      return {
        title: title || titleRu || titleEn || titleRo || 'Проект без названия',
        media,
        subtitle: subtitle ? `${String(subtitle).slice(0, 60)}…` : '',
      }
    },
  },
})
