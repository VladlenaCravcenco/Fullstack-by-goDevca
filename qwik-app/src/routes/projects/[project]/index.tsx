import { component$, useSignal } from '@builder.io/qwik';
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

export default component$(() => {
  const p = useProject().value as any;
  if (!p) return <section class="case"><h1>Not found</h1></section>;

  const hero = p.hero || {};
  const mock = p.mockupBlock || {};
  const agency = mock.agency || {};

  const showAgency =
    !!agency?.enabled && (!!agency?.name || !!agency?.note || !!agency?.logo);

  const baPos = useSignal(50); // 0..100

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

      {/* BIG MOCKUP (теперь из mockupBlock) */}
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

      {/* GALLERY (теперь item.image) */}
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

      {/* BEFORE / AFTER (реальный слайдер) */}
      {p.beforeAfter?.enabled && (p.beforeAfter?.before || p.beforeAfter?.after) ? (
        <section class="case-beforeAfter">
          <div class="case-beforeAfter__label">
            {p.beforeAfter?.label || 'до\\после'}
          </div>

          <div
            class="ba"
            style={`--pos:${baPos.value}%`}
            onPointerDown$={(e) => {
              // захватываем pointer, чтобы drag не отваливался
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
            }}
            onPointerMove$={(e) => {
              // двигаем только когда есть pointer (мышь/палец)
              const el = e.currentTarget as HTMLElement;
              const r = el.getBoundingClientRect();
              const x = Math.min(Math.max(e.clientX - r.left, 0), r.width);
              baPos.value = Math.round((x / r.width) * 100);
            }}
          >
            {/* AFTER (фон) */}
            {p.beforeAfter?.after ? (
              <img
                class="ba__img ba__img--after"
                src={urlFor(p.beforeAfter.after).width(2400).auto('format').url()}
                alt="after"
                loading="lazy"
                decoding="async"
              />
            ) : null}

            {/* BEFORE (обрезается по --pos) */}
            {p.beforeAfter?.before ? (
              <div class="ba__before">
                <img
                  class="ba__img ba__img--before"
                  src={urlFor(p.beforeAfter.before).width(2400).auto('format').url()}
                  alt="before"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : null}

            {/* Divider + knob */}
            <div class="ba__divider" aria-hidden="true">
              <span class="ba__knob" />
            </div>

            {/* Range (невидимый, но даёт управление на мобилке + доступность) */}
            <input
              class="ba__range"
              type="range"
              min={0}
              max={100}
              value={baPos.value}
              onInput$={(e) => (baPos.value = Number((e.target as HTMLInputElement).value))}
              aria-label="До/после"
            />
          </div>
        </section>
      ) : null}

      {/* RELATED PROJECTS (mockup теперь rp.mockupBlock.mockup) */}
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