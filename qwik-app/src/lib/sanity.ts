import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: '81wvtguf',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,           // ← на время диагностики лучше выключить кеш CDN
  perspective: 'published' // показываем только опубликованное
});

export const localizedString = (field: string, legacyField?: string, fallback?: string) => {
  const candidates = [`${field}[$locale]`, `${field}.ru`, ...(legacyField ? [legacyField] : [])];
  return `coalesce(${candidates.map((candidate) => `select(length(${candidate}) > 0 => ${candidate})`).concat(fallback ? [fallback] : []).join(', ')})`;
};

export const localizedText = localizedString;

export const localizedPortableText = (field: string, legacyField?: string, fallback = '[]') => {
  const candidates = [`${field}[$locale]`, `${field}.ru`, ...(legacyField ? [legacyField] : [])];
  return `coalesce(${candidates.map((candidate) => `select(count(${candidate}) > 0 => ${candidate})`).concat(fallback).join(', ')})`;
};

export const localizedStringArray = (field: string, fallback = '[]') =>
  localizedPortableText(field, undefined, fallback);
