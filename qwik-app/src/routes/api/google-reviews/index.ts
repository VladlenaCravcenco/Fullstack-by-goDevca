import type { RequestHandler } from '@builder.io/qwik-city';

type Review = {
  author_name: string;
  profile_photo_url?: string;
  rating: number;
  text?: string;
  relative_time_description?: string;
  time?: number;
};

export const onGet: RequestHandler = async ({ json, env, request }) => {
  const API_KEY = env.get('GOOGLE_MAPS_API_KEY');
  const PLACE_ID = env.get('GOOGLE_PLACE_ID');

  if (!API_KEY || !PLACE_ID) {
    json(200, { ok: false, reason: 'missing_env' });
    return;
  }

  const limit = Math.max(
    1,
    Math.min(10, parseInt(new URL(request.url).searchParams.get('limit') || '5', 10))
  );

  const fields = [
    'rating',
    'user_ratings_total',
    'reviews(author_name,profile_photo_url,rating,text,relative_time_description,time)',
  ].join(',');

  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${encodeURIComponent(PLACE_ID)}` +
    `&fields=${encodeURIComponent(fields)}` +
    `&key=${encodeURIComponent(API_KEY)}`;

  const resp = await fetch(url);
  const data = await resp.json();

  if (data?.status !== 'OK' || !data?.result) {
    json(200, { ok: false, reason: data?.status || 'api_error' });
    return;
  }

  const all: Review[] = data.result.reviews || [];
  const reviews = all.slice(0, limit).map((r) => ({
    author: r.author_name,
    avatar: r.profile_photo_url,
    rating: r.rating,
    text: r.text,
    when: r.relative_time_description,
    ts: r.time,
  }));

  json(200, {
    ok: true,
    aggregateRating: {
      rating: data.result.rating,
      count: data.result.user_ratings_total,
    },
    reviews,
  });
};