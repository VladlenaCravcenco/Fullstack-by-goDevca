import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
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
  const data = useSignal<any>(null);
  const error = useSignal<string | null>(null);

  useVisibleTask$(async () => {
    try {
      const r = await fetch(`/api/google-reviews?place_id=${placeId}`);
      const json = await r.json();

      if (!json?.ok) {
        throw new Error(json?.reason || 'API error');
      }

      data.value = json; // { ok, name, rating, total, reviews }
    } catch (e: any) {
      error.value = e?.message || 'Ошибка загрузки отзывов';
    }
  });

  const writeUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;

  if (error.value) {
    return (
      <section class="reviews">
        <h3>Отзывы</h3>
        <p style="color:#999">{error.value}</p>
        <a class="gbtn" href={writeUrl} target="_blank" rel="noopener">Оставить отзыв в Google</a>
      </section>
    );
  }

  if (!data.value) {
    return (
      <section class="reviews">
        <h3>Отзывы</h3>
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
        <h3>{name}: Отзывы</h3>
        <p style="color:#666">Пока нет отзывов. Буду благодарна, если вы напишете первый!</p>
        <a class="gbtn" href={writeUrl} target="_blank" rel="noopener">Оставить отзыв в Google</a>
        <div class="sidenote">
          {total > 0
            ? <>Сейчас: ⭐ {rating} · {total} отзыв(ов)</>
            : <>Рейтинг появится, как только появятся отзывы.</>}
        </div>
      </section>
    );
  }

  return (
    <section class="reviews">
      <div class="reviews__head">
        <h3>{name}: Отзывы</h3>
        <div style="display:flex;align-items:center;gap:.5rem;">
          <Stars value={rating} />
          <div style="font-weight:600;">{rating.toFixed(1)}</div>
          <div style="color:#666">({total})</div>
        </div>
      </div>

      <ul class="reviews__list">
        {reviews.slice(0, 6).map((r, i) => (
          <li key={i} class="review">
            <div class="review__top">
              <div class="avatar" />
              <div>
                <strong>{r.author || 'Пользователь Google'}</strong>
                <div class="meta">
                  <Stars value={r.rating || 0} />
                  {r.publishTime && (
                    <span>
                      {new Date(r.publishTime).toLocaleDateString('ru-RU')}
                    </span>
                  )}
                </div>
              </div>
            </div>
            {r.text && <p class="review__text">{r.text}</p>}
          </li>
        ))}
      </ul>

      <a class="gbtn" href={writeUrl} target="_blank" rel="noopener">Оставить отзыв в Google</a>
    </section>
  );
});