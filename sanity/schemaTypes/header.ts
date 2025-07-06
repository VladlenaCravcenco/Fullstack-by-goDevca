export default {
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    {
      name: 'language',
      title: 'Язык',
      type: 'string',
      options: {
        list: [
          { title: 'Русский', value: 'ru' },
          { title: 'English', value: 'en' },
          { title: 'Română', value: 'ro' },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'logo',
      title: 'Логотип',
      type: 'string',
    },
    {
      name: 'navLinks',
      title: 'Навигационные ссылки',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'briefButton',
      title: 'Текст кнопки "Заполнить бриф"',
      type: 'string',
    },
  ],
}