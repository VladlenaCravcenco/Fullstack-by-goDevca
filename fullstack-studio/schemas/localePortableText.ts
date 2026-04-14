import {defineArrayMember, defineField, defineType} from 'sanity'

const localePortableField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [
      defineArrayMember({
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'Quote', value: 'blockquote'},
        ],
        lists: [
          {title: 'Bullet', value: 'bullet'},
          {title: 'Numbered', value: 'number'},
        ],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
          ],
        },
      }),
    ],
  })

export default defineType({
  name: 'localePortableText',
  title: 'Localized rich text',
  type: 'object',
  fields: [
    localePortableField('ru', 'Russian'),
    localePortableField('ro', 'Romanian'),
    localePortableField('en', 'English'),
  ],
})
