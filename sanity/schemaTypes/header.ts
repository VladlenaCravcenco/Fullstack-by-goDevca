// /sanity/schemas/header.ts
export default {
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    {
      name: 'logo',
      title: 'Логотип',
      type: 'string',
    },
    {
      name: 'navLinks',
      title: 'Навигационные ссылки',
      type: 'object',
      fields: [
        { name: 'ru', title: 'Русский', type: 'array', of: [{ type: 'string' }] },
        { name: 'en', title: 'Английский', type: 'array', of: [{ type: 'string' }] },
        { name: 'ro', title: 'Румынский', type: 'array', of: [{ type: 'string' }] },
      ],
    },
    {
      name: 'briefButton',
      title: 'Кнопка “Заполнить бриф”',
      type: 'object',
      fields: [
        { name: 'ru', title: 'Русский', type: 'string' },
        { name: 'en', title: 'Английский', type: 'string' },
        { name: 'ro', title: 'Румынский', type: 'string' },
      ],
    },
    {
      name: 'langLabel',
      title: 'Языковая метка',
      type: 'string',
    },
  ],
};