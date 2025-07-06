import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '81wvtguf',
  dataset: 'production',
  apiVersion: '2023-07-06',
  useCdn: true,
});