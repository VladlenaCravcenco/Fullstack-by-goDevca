import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog posts',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'titleI18n',
      title: 'Title',
      type: 'localeString',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'titleI18n.ru', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'blogCategory',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time, minutes',
      type: 'number',
      group: 'content',
      validation: (Rule) => Rule.required().min(1).max(60),
    }),
    defineField({
      name: 'featured',
      title: 'Featured post',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: 'cover',
      title: 'Cover image',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
    }),
    defineField({
      name: 'excerptI18n',
      title: 'Short description',
      type: 'localeText',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'localePortableText',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seoTitleI18n',
      title: 'SEO title',
      type: 'localeString',
      group: 'seo',
      description: 'If empty, the regular title will be used.',
    }),
    defineField({
      name: 'seoDescriptionI18n',
      title: 'SEO description',
      type: 'localeText',
      group: 'seo',
      description: 'If empty, the excerpt will be used.',
    }),
    defineField({
      name: 'seoKeywordsI18n',
      title: 'SEO keywords',
      type: 'localeStringArray',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'titleI18n.ru',
      subtitle: 'category',
      media: 'cover',
    },
    prepare(selection) {
      const categoryLabels: Record<string, string> = {
        react: 'React',
        qwik: 'Qwik',
        design: 'Design',
        '3d': '3D',
      }

      return {
        title: selection.title,
        subtitle: categoryLabels[selection.subtitle] ?? selection.subtitle,
        media: selection.media,
      }
    },
  },
})
