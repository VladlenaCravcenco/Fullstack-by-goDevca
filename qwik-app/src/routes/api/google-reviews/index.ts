import type { RequestHandler } from '@builder.io/qwik-city';

export const onGet: RequestHandler = async ({ url, json, env }) => {
  try {
    const key = env.get('GOOGLE_MAPS_API_KEY');
    const placeId = url.searchParams.get('place_id') || '';

    if (!key) {
      json(200, { ok: false, reason: 'missing_env' });
      return;
    }
    if (!placeId) {
      json(200, { ok: false, reason: 'missing_place_id' });
      return;
    }

    // Places API v1
    const fields = ['displayName', 'rating', 'userRatingCount', 'reviews'].join(',');
    const endpoint =
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}` +
      `?fields=${encodeURIComponent(fields)}`;

    const resp = await fetch(endpoint, {
      headers: {
        'X-Goog-Api-Key': key,
        // header не обязателен для этого REST вызова, но не мешает:
        'X-Goog-FieldMask': fields,
      },
    });

    const data = await resp.json();

    if (!resp.ok) {
      json(200, { ok: false, reason: 'google_error', status: resp.status, data });
      return;
    }

    const name = data?.displayName?.text ?? '';
    const rating = data?.rating ?? 0;
    const total = data?.userRatingCount ?? 0;
    const reviews = (data?.reviews ?? []).map((r: any) => ({
      author: r?.authorAttribution?.displayName ?? '',
      rating: r?.rating ?? 0,
      text: r?.text?.text ?? '',
      publishTime: r?.publishTime,
    }));

    json(200, { ok: true, name, rating, total, reviews });
    return;
  } catch {
    json(200, { ok: false, reason: 'exception' });
    return;
  }
};