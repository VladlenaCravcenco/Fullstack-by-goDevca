import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { sanity } from '~/lib/sanity';
import { urlFor } from '~/lib/imageUrl';
import './project-page.css';

const QUERY = `
*[_type=="project" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,

  hero{
    pills,
    intro,
    taskTitle,
    taskText,
    ctaPrimary{label,url},
    ctaSecondary{label,url},
    duration,
    plan
  },

  mockupBlock{
    mockup,
    agency{enabled, logo, name, note}
  },

  gallery[]{ image, alt },

  beforeAfter{enabled, label, before, after},

  relatedProjects[]->{
    _id,
    title,
    "slug": slug.current,
    hero{ pills },
    mockupBlock{ mockup }
  }
}
`;

export const useProject = routeLoader$(async ({ params, status }) => {
  const doc = await sanity.fetch(QUERY, { slug: params.project });
  if (!doc) status(404);
  return doc;
});

export const BeforeAfter = component$(
  ({ before, after }: { before: any; after: any }) => {
    const wrapRef = useSignal<HTMLElement>();
    const pos = useSignal(50);
    const dragging = useSignal(false);

    const setFromClientX = $((clientX: number) => {
      const el = wrapRef.value;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      if (!rect.width) return;

      const x = clientX - rect.left;

      // ✅ clamp ВНУТРИ $()
      let percent = (x / rect.width) * 100;
      if (percent < 0) percent = 0;
      if (percent > 100) percent = 100;

      pos.value = percent;
    });

    const onDown = $((e: PointerEvent) => {
      dragging.value = true;

      const btn = e.currentTarget as HTMLElement | null;
      if (btn?.setPointerCapture) {
        btn.setPointerCapture(e.pointerId);
      }

      setFromClientX(e.clientX);
    });

    const onMove = $((e: PointerEvent) => {
      if (!dragging.value) return;
      setFromClientX(e.clientX);
    });

    const onUp = $((e: PointerEvent) => {
      dragging.value = false;

      const btn = e.currentTarget as HTMLElement | null;
      if (btn?.releasePointerCapture) {
        try {
          btn.releasePointerCapture(e.pointerId);
        } catch { 
          // ignore: pointer capture may already be released
        }
      }
    });

    useVisibleTask$(({ cleanup }) => {
      const stop = () => (dragging.value = false);
      window.addEventListener('pointerup', stop);
      window.addEventListener('pointercancel', stop);
      cleanup(() => {
        window.removeEventListener('pointerup', stop);
        window.removeEventListener('pointercancel', stop);
      });
    });

    return (
      <div
        ref={wrapRef}
        class="ba"
        style={`--pos:${pos.value}%`}
        aria-label="до/после"
      >
        {/* AFTER */}
        <img
          class="ba__img ba__after"
          src={urlFor(after).width(2400).auto('format').url()}
          alt="after"
          draggable={false}
        />

        {/* BEFORE */}
        <img
          class="ba__img ba__beforeImg"
          src={urlFor(before).width(2400).auto('format').url()}
          alt="before"
          draggable={false}
          style="clip-path: inset(0 calc(100% - var(--pos)) 0 0);"
        />

        {/* HANDLE */}
        <div class="ba__handle" style="left: var(--pos);">
          <div class="ba__line" />
          <button
            type="button"
            class="ba__knob"
            aria-label="перетянуть"
            onPointerDown$={onDown}
            onPointerMove$={onMove}
            onPointerUp$={onUp}
            onPointerCancel$={onUp}
          />
        </div>

        {/* RANGE */}
        <input
          class="ba__range"
          type="range"
          min="0"
          max="100"
          value={pos.value}
          onInput$={(e) =>
            (pos.value = +(e.target as HTMLInputElement).value)
          }
        />
      </div>
    );
  }
);

export default component$(() => {
  const p = useProject().value as any;
  if (!p) return <section class="case"><h1>Not found</h1></section>;

  const hero = p.hero || {};
  const mock = p.mockupBlock || {};
  const agency = mock.agency || {};

  const showAgency =
    !!agency?.enabled && (!!agency?.name || !!agency?.note || !!agency?.logo);

  return (
    <article class="case">
      {/* HERO TOP */}
      <header class="case-hero">
        <div class="case-hero__grid">
          {/* LEFT */}
          <div class="case-hero__left">
            {hero?.pills?.length ? (
              <ul class="case-tags" aria-label="tags">
                {hero.pills.slice(0, 6).map((t: string) => (
                  <li class="case-tag" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}

            <h1 class="case-title">{p.title}</h1>

            {hero?.intro ? <p class="case-intro">{hero.intro}</p> : null}

            {hero?.taskTitle || hero?.taskText ? (
              <div class="case-task">
                {hero?.taskTitle ? (
                  <div class="case-task__label">{hero.taskTitle}</div>
                ) : null}
                {hero?.taskText ? (
                  <div class="case-task__text">{hero.taskText}</div>
                ) : null}
              </div>
            ) : null}

            {hero?.ctaPrimary?.url || hero?.ctaSecondary?.url ? (
              <div class="case-actions">
                {hero?.ctaPrimary?.url ? (
                  <a
                    class="btn btn--light"
                    href={hero.ctaPrimary.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {hero.ctaPrimary.label || 'перейти на сайт'}
                  </a>
                ) : null}

                {hero?.ctaSecondary?.url ? (
                  <a
                    class="btn btn--dark"
                    href={hero.ctaSecondary.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{hero.ctaSecondary.label || 'Заполнить бриф'}</span>
                    <span class="btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* RIGHT META */}
          <aside class="case-hero__right" aria-label="meta">
            <div class="case-miniMeta">
              <div class="case-miniMeta__row">
                <div class="case-miniMeta__label">продолжительность:</div>
                <div class="case-miniMeta__value">{hero?.duration || '—'}</div>
              </div>
              <div class="case-miniMeta__row">
                <div class="case-miniMeta__label">План:</div>
                <div class="case-miniMeta__value">{hero?.plan || '—'}</div>
              </div>
            </div>
          </aside>
        </div>
      </header>

      {/* BIG MOCKUP */}
      {mock?.mockup ? (
        <section class="case-mock">
          <div class="case-mock__card">
            <img
              class="case-mock__img"
              src={urlFor(mock.mockup).width(2200).auto('format').url()}
              alt={`${p.title} mockup`}
              loading="eager"
              decoding="async"
            />
          </div>

          {showAgency ? (
            <div class="case-agency">
              {agency?.logo ? (
                <div class="case-agency__logo">
                  <img
                    src={urlFor(agency.logo).width(160).auto('format').url()}
                    alt={agency?.name || 'agency'}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div
                  class="case-agency__logo case-agency__logo--placeholder"
                  aria-hidden="true"
                />
              )}

              <div class="case-agency__text">
                <div class="case-agency__name">
                  {agency?.name || 'GROWUP AGENCY'}
                </div>
                {agency?.note ? (
                  <div class="case-agency__note">{agency.note}</div>
                ) : null}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* GALLERY */}
      {p.gallery?.length ? (
        <section class="case-gallery">
          {p.gallery.map((item: any, i: number) => (
            <div class="case-shot" key={i}>
              {item?.image ? (
                <img
                  src={urlFor(item.image).width(2400).auto('format').url()}
                  alt={item?.alt || `${p.title} screen ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {/* BEFORE / AFTER */}
      {p.beforeAfter?.enabled && p.beforeAfter?.before && p.beforeAfter?.after ? (
        <section class="case-beforeAfter">
          <div class="case-beforeAfter__label">
            {p.beforeAfter.label || 'до\\после'}
          </div>
          <BeforeAfter before={p.beforeAfter.before} after={p.beforeAfter.after} />
        </section>
      ) : null}

      {/* RELATED */}
      {p.relatedProjects?.length ? (
        <section class="case-related">
          <div class="case-related__head">
            <div class="case-related__kicker">посмотреть</div>
            <h2 class="case-related__title">ЕЩЕ ПРОЕКТЫ</h2>
          </div>

          <div class="related-grid">
            {p.relatedProjects.slice(0, 6).map((rp: any) => (
              <a class="related-card" href={`/projects/${rp.slug}`} key={rp.slug}>
                <div class="related-card__media">
                  {rp?.mockupBlock?.mockup ? (
                    <img
                      src={urlFor(rp.mockupBlock.mockup).width(2000).auto('format').url()}
                      alt={rp.title}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>

                <div class="related-card__foot">
                  <div class="related-card__name">{rp.title}</div>
                  {rp?.hero?.pills?.length ? (
                    <div class="related-card__tags" aria-label="tags">
                      {rp.hero.pills.slice(0, 2).map((t: string) => (
                        <span class="related-card__tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const p: any = resolveValue(useProject);
  return {
    title: p?.title ? `${p.title} | проекты` : 'Проект',
    meta: [{ name: 'description', content: p?.hero?.intro ?? '' }],
  };
};