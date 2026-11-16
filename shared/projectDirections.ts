// Shared by Sanity Studio and the website: stable values, localized labels.
export const projectDirections = [
  { value: 'websites', labels: { ru: 'Сайты', ro: 'Site-uri', en: 'Websites' }, aliases: ['website', 'corporate website', 'corporate', 'landing', 'landing sale', 'wordpress', 'react from scratch', 'сайт', 'лендинг', 'корпоративный сайт'] },
  { value: 'web-apps', labels: { ru: 'Веб-приложения', ro: 'Aplicații web', en: 'Web apps' }, aliases: ['web app', 'web application', 'веб-приложение'] },
  { value: 'telegram-bots', labels: { ru: 'Telegram-боты', ro: 'Boți Telegram', en: 'Telegram bots' }, aliases: ['telegram bot', 'telegram', 'телеграм бот'] },
  { value: 'design', labels: { ru: 'Дизайн', ro: 'Design', en: 'Design' }, aliases: ['redesign', 'ui/ux', 'дизайн', 'редизайн'] },
  { value: 'seo', labels: { ru: 'SEO', ro: 'SEO', en: 'SEO' }, aliases: [] },
];

export function resolveProjectDirections(values: unknown): string[] {
  if (!Array.isArray(values)) return [];
  const normalized = values.filter((v): v is string => typeof v === 'string')
    .map((v) => v.trim().replace(/^#+/, '').trim().toLowerCase().replace(/\s+/g, ' '));
  return projectDirections.filter((d) => normalized.some((v) => d.value === v || d.aliases.includes(v)))
    .map((d) => d.value);
}

export function directionLabel(value: string, locale: 'ru' | 'ro' | 'en'): string {
  return projectDirections.find((d) => d.value === value)?.labels[locale] ?? value;
}
