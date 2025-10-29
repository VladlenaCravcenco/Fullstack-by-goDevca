import { component$, useResource$, Resource } from '@builder.io/qwik';
import './google-reviews.css';

type ApiResp = {
  ok: boolean;
  aggregateRating?: { rating: number; count: number };
  reviews?: Array<{
    author: string;
    avatar?: string;
    rating: number;
    text?: string;
    when?: string;
  }>;
  reason?: string;
};

export default component$(({ limit = 5 }: { limit?: number }) => {
  const dataR = useResource$<ApiResp>(async ({ track }) => {
    track(() => limit);
    const res = await fetch(`/api/google-reviews?limit=${limit}`);
    return res.json();
  });

  return (
    <section class="g-reviews">
      <h3 class="g-reviews__title">Отзывы в Google</h3>

      <Resource
        value={dataR}
        onPending={() => <div class="g-reviews__loading">Загружаю отзывы…</div>}
        onRejected={(err) => <div class="g-reviews__error">Ошибка: {String(err)}</div>}
        onResolved={(d) => {
          if (!d?.ok) return <div class="g-reviews__empty">Пока нет отзывов</div>;
          return (
            <>
              {d.aggregateRating && (
                <div class="g-reviews__summary">
                  <div class="g-reviews__stars" aria-label={`Рейтинг ${d.aggregateRating.rating}`}>
                    {renderStars(d.aggregateRating.rating)}
                  </div>
                  <span class="g-reviews__score">
                    {d.aggregateRating.rating?.toFixed(1)} · {d.aggregateRating.count} отзывов
                  </span>
                </div>
              )}

              <ul class="g-reviews__list">
                {d.reviews?.map((r, i) => (
                  <li class="g-reviews__item" key={i}>
                    <div class="g-reviews__head">
                      <img
                        class="g-reviews__avatar"
                        src={r.avatar || 'https://www.gstatic.com/images/icons/material/system/2x/account_circle_grey600_24dp.png'}
                        alt={r.author}
                        width={40}
                        height={40}
                        loading="lazy"
                      />
                      <div class="g-reviews__meta">
                        <strong class="g-reviews__author">{r.author}</strong>
                        <div class="g-reviews__row">
                          <span class="g-reviews__stars">{renderStars(r.rating)}</span>
                          {r.when && <span class="g-reviews__when"> · {r.when}</span>}
                        </div>
                      </div>
                    </div>
                    {r.text && <p class="g-reviews__text">{r.text}</p>}
                  </li>
                ))}
              </ul>
            </>
          );
        }}
      />
    </section>
  );
});

function renderStars(value: number) {
  const full = Math.floor(value);
  const half = value - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <>
      {'★'.repeat(full)}
      {half ? '☆'.slice(0, 0) + '⯪' : ''}
      {'☆'.repeat(empty)}
    </>
  );
}