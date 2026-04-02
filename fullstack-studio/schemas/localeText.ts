import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fields: [
    defineField({ name: 'ru', title: 'Russian', type: 'text', rows: 3 }),
    defineField({ name: 'ro', title: 'Romanian', type: 'text', rows: 3 }),
    defineField({ name: 'en', title: 'English', type: 'text', rows: 3 }),
  ],
});
