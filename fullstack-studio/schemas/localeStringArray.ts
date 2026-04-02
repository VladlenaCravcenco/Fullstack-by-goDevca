import { defineArrayMember, defineField, defineType } from 'sanity';

const localizedArrayField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'array',
    of: [defineArrayMember({ type: 'string' })],
  });

export default defineType({
  name: 'localeStringArray',
  title: 'Localized string array',
  type: 'object',
  fields: [
    localizedArrayField('ru', 'Russian'),
    localizedArrayField('ro', 'Romanian'),
    localizedArrayField('en', 'English'),
  ],
});
