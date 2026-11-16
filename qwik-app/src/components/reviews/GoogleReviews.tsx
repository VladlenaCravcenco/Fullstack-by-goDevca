import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { getLocaleFromPathname, localeDateFormats } from '~/lib/i18n';
import './google-reviews.css';

const Stars = ({ value = 0 }: { value?: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div style="display:flex;gap:4px;">
      {stars.map((s) => (
        <span key={s} style={`opacity:${value >= s ? 1 : .25};font-size:14px;`}>★</span>
      ))}
    </div>
  );
};

export default component$(({ placeId }: { placeId: string }) => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const data = useSignal<any>(null);
  const error = useSignal<string | null>(null);
  const copy = {
    ru: {
      title: 'Отзывы',
      allReviews: 'Все отзывы в Google',
      scrollHint: 'Прокрутите, чтобы прочитать отзывы',
      leaveReview: 'Оставить отзыв в Google',
      loadingError: 'Ошибка загрузки отзывов',
      noReviews: 'Пока нет отзывов. Буду благодарна, если вы напишете первый.',
      now: 'Сейчас',
      reviewsCount: 'отзыв(ов)',
      ratingLater: 'Рейтинг появится, как только появятся отзывы.',
      user: 'Пользователь Google',
    },
    ro: {
      title: 'Recenzii',
      allReviews: 'Toate recenziile pe Google',
      scrollHint: 'Derulați pentru a citi recenziile',
      leaveReview: 'Lasa o recenzie in Google',
      loadingError: 'Eroare la incarcarea recenziilor',
      noReviews: 'Inca nu exista recenzii. As aprecia mult daca o lasi pe prima.',
      now: 'Acum',
      reviewsCount: 'recenzii',
      ratingLater: 'Ratingul va aparea imediat ce vor exista recenzii.',
      user: 'Utilizator Google',
    },
    en: {
      title: 'Reviews',
      allReviews: 'All reviews on Google',
      scrollHint: 'Scroll to read the reviews',
      leaveReview: 'Leave a Google review',
      loadingError: 'Failed to load reviews',
      noReviews: 'There are no reviews yet. I would appreciate it if you left the first one.',
      now: 'Now',
      reviewsCount: 'review(s)',
      ratingLater: 'The rating will appear once reviews are published.',
      user: 'Google user',
    },
  }[locale];

  useVisibleTask$(async ({ track, cleanup }) => {
    const language = track(() => getLocaleFromPathname(loc.url.pathname));
    const controller = new AbortController();
    cleanup(() => controller.abort());
    error.value = null;
    data.value = null;
    try {
      const r = await fetch(`/api/google-reviews?place_id=${encodeURIComponent(placeId)}&lang=${language}`, { signal: controller.signal });
      const json = await r.json();

      if (!json?.ok) {
        throw new Error(json?.reason || 'API error');
      }

      data.value = json; // { ok, name, rating, total, reviews }
    } catch {
      if (!controller.signal.aborted) error.value = 'load_failed';
    }
  });

  const writeUrl = `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`;
  const allReviewsUrl = data.value?.reviewsUrl || `https://www.google.com/maps/search/?api=1&query=godevca&query_place_id=${encodeURIComponent(placeId)}`;

  if (error.value) {
    return (
      <section class="reviews">
        <h3>{copy.title}</h3>
        <p style="color:#999">{copy.loadingError}</p>
        <div class="reviews__actions">
          <a class="gbtn" href={writeUrl} target="_blank" rel="noopener">{copy.leaveReview}</a>
          <a class="reviews__all" href={allReviewsUrl} target="_blank" rel="noopener">{copy.allReviews} ↗</a>
        </div>
      </section>
    );
  }

  if (!data.value) {
    return (
      <section class="reviews">
        <h3>{copy.title}</h3>
        <div class="skeleton-row"></div>
        <div class="skeleton-row"></div>
        <div class="skeleton-row"></div>
      </section>
    );
  }

  const name = data.value.name as string;
  const rating = (data.value.rating ?? 0) as number;
  const total = (data.value.total ?? 0) as number;
  const reviews = (data.value.reviews ?? []) as Array<{
    author: string;
    rating: number;
    text: string;
    publishTime?: string;
  }>;

  if (!reviews.length) {
    return (
      <section class="reviews">
        <h3>{name}: {copy.title}</h3>
        <p style="color:#666">{copy.noReviews}</p>
        <div class="reviews__actions">
          <a class="gbtn" href={writeUrl} target="_blank" rel="noopener">{copy.leaveReview}</a>
          <a class="reviews__all" href={allReviewsUrl} target="_blank" rel="noopener">{copy.allReviews} ↗</a>
        </div>
        <div class="sidenote">
          {total > 0
            ? <>{copy.now}: ⭐ {rating} · {total} {copy.reviewsCount}</>
            : <>{copy.ratingLater}</>}
        </div>
      </section>
    );
  }

  return (
    <section class="reviews">
      <div class="reviews__head">
        <h3>{name}: {copy.title}</h3>
        <div style="display:flex;align-items:center;gap:.5rem;">
          <Stars value={rating} />
          <div style="font-weight:600;">{rating.toFixed(1)}</div>
          <div style="color:#666">({total})</div>
        </div>
      </div>

      <p class="reviews__hint">{copy.scrollHint} ↓</p>
      <div class="reviews__scroll" tabIndex={0} role="region" aria-label={copy.scrollHint}>
      <ul class="reviews__list">
        {reviews.map((r, i) => (
          <li key={i} class="reviews__item">
            <div class="review__top">
              <div class="avatar" />
              <div>
                <strong>{r.author || copy.user}</strong>
                <div class="meta">
                  <Stars value={r.rating || 0} />
                  {r.publishTime && (
                    <span>
                      {new Date(r.publishTime).toLocaleDateString(localeDateFormats[locale])}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {r.text && <p class="review__text">{r.text}</p>}
          </li>
        ))}
      </ul>
      </div>

      <div class="reviews__actions">
          <a class="gbtn" href={writeUrl} target="_blank" rel="noopener">{copy.leaveReview}</a>
          <a class="reviews__all" href={allReviewsUrl} target="_blank" rel="noopener">{copy.allReviews} ↗</a>
        </div>
    </section>
  );
});
