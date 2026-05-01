import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: '81wvtguf',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,           // ← на время диагностики лучше выключить кеш CDN
  perspective: 'published' // показываем только опубликованное
});

const withLegacyFallback = (field: string, legacyField?: string, fallback?: string) => {
  const parts = [`${field}[$locale]`, `${field}.ru`];

  if (legacyField) {
    parts.push(legacyField);
  }

  if (fallback) {
    parts.push(fallback);
  }

  return `coalesce(${parts.join(', ')})`;
};

export const localizedString = (field: string, legacyField?: string, fallback?: string) =>
  withLegacyFallback(field, legacyField, fallback);

export const localizedText = (field: string, legacyField?: string, fallback?: string) =>
  withLegacyFallback(field, legacyField, fallback);

export const localizedStringArray = (field: string, fallback = '[]') =>
  `coalesce(${field}[$locale], ${field}.ru, ${fallback})`;

export const localizedPortableText = (field: string, legacyField?: string, fallback = '[]') =>
  withLegacyFallback(field, legacyField, fallback);
