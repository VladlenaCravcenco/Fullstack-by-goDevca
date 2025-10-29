import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import './google-reviews.css'

// Простая рисовка звёзд без иконок
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
      if (json?.status !== 'OK') throw new Error(json?.status || 'API error');
      data.value = json?.result || null;
    } catch (e:any) {
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

  // ещё грузится
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

  const name = data.value.name;
  const rating = data.value.rating; // число или undefined
  const total = data.value.user_ratings_total; // число или undefined
  const reviews = data.value.reviews || []; // массив или []

  // A) Пустой стейт — отзывов ещё нет
  if (!reviews.length) {
    return (
      <section class="reviews">
        <h3>{name}: Отзывы</h3>
        <p style="color:#666">Пока нет отзывов. Буду благодарна, если вы напишете первый!</p>
        <a class="gbtn" href={writeUrl} target="_blank" rel="noopener">Оставить отзыв в Google</a>
        <div class="sidenote">
          {typeof rating === 'number' && typeof total === 'number'
            ? <>Сейчас: ⭐ {rating} · {total} отзыв(ов)</>
            : <>Рейтинг появится, как только появятся отзывы.</>}
        </div>
      </section>
    );
  }

  // B) Есть отзывы
  return (
    <section class="reviews">
      <div class="reviews__head">
        <h3>{name}: Отзывы</h3>
        <div style="display:flex;align-items:center;gap:.5rem;">
          <Stars value={rating || 0} />
          <div style="font-weight:600;">{rating?.toFixed(1) ?? '—'}</div>
          <div style="color:#666">({total ?? reviews.length})</div>
        </div>
      </div>

      <ul class="reviews__list">
        {reviews.slice(0,6).map((r:any, i:number) => (
          <li key={i} class="review">
            <div class="review__top">
              {r.profile_photo_url ? <img src={r.profile_photo_url} alt="" width={40} height={40} /> : <div class="avatar" />}
              <div>
                <strong>{r.reviewer_name || 'Пользователь Google'}</strong>
                <div class="meta">
                  <Stars value={r.rating || 0} />
                  <span>{r.relative_time_description}</span>
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