import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: '81wvtguf',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,           // ← на время диагностики лучше выключить кеш CDN
  perspective: 'published' // показываем только опубликованное
});

export const localizedString = (field: string, fallback = 'null') =>
  `coalesce(${field}[$locale], ${field}.ru, ${fallback})`;
export const localizedText = (field: string, fallback = 'null') =>
  `coalesce(${field}[$locale], ${field}.ru, ${fallback})`;
export const localizedStringArray = (field: string, fallback = '[]') =>
  `coalesce(${field}[$locale], ${field}.ru, ${fallback})`;
