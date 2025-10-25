import { createClient } from '@sanity/client';

export const sanity = createClient({
  projectId: '81wtguf',
  dataset: 'production',
  apiVersion: '2025-01-01',
  useCdn: false,           // ← на время диагностики лучше выключить кеш CDN
  perspective: 'published' // показываем только опубликованное
});