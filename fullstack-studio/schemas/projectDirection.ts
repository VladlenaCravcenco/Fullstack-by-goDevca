import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectDirection',
  title: 'Направления проектов',
  type: 'document',
  fields: [
    defineField({
      name: 'title', title: 'Название направления', type: 'string',
      description: 'Создайте направление один раз, затем выбирайте его в любых проектах.',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'titleI18n', title: 'Переводы (необязательно)', type: 'localeString'}),
  ],
  preview: {select: {title: 'title'}},
})
