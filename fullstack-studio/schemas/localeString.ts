import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fields: [
    defineField({ name: 'ru', title: 'Russian', type: 'string' }),
    defineField({ name: 'ro', title: 'Romanian', type: 'string' }),
    defineField({ name: 'en', title: 'English', type: 'string' }),
  ],
});
