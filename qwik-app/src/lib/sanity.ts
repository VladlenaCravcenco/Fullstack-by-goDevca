import { createClient } from '@sanity/client';
export const sanity = createClient({
  projectId: '81wtguf',     // твой ID из Manage
  dataset: 'production',
  apiVersion: '2025-10-24',
  useCdn: true,
});