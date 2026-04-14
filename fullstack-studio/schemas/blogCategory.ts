import {defineField, defineType} from 'sanity'

export const blogCategoryOptions = [
  {title: 'React', value: 'react'},
  {title: 'Qwik', value: 'qwik'},
  {title: 'Design', value: 'design'},
  {title: '3D', value: '3d'},
] as const

export default defineType({
  name: 'blogCategory',
  title: 'Blog category',
  type: 'string',
  options: {
    list: blogCategoryOptions.map((option) => ({
      title: option.title,
      value: option.value,
    })),
    layout: 'radio',
  },
  validation: (Rule) => Rule.required(),
})
