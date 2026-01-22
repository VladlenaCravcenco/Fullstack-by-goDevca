import { component$ } from '@builder.io/qwik';
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
    plan,
    mockup,
    agency{logo,name,note}
  },

  gallery[],
  beforeAfter{enabled, before, after},

  relatedProjects[]->{
    _id,
    title,
    "slug": slug.current,
    hero{ mockup, pills }
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
  const hasAgency = !!hero?.agency?.name || !!hero?.agency?.note || !!hero?.agency?.logo;

  return (
    <article class="case">

      {/* HERO TOP (как в макете: теги, заголовок, интро, задача, кнопки + справа duration/plan) */}
      <header class="case-hero">
        <div class="case-hero__grid">
          {/* LEFT */}
          <div class="case-hero__left">
            {hero?.pills?.length ? (
              <ul class="case-tags" aria-label="tags">
                {hero.pills.slice(0, 6).map((t: string) => (
                  <li class="case-tag" key={t}>{t}</li>
                ))}
              </ul>
            ) : null}

            <h1 class="case-title">{p.title}</h1>

            {hero?.intro ? <p class="case-intro">{hero.intro}</p> : null}

            {(hero?.taskTitle || hero?.taskText) ? (
              <div class="case-task">
                {hero?.taskTitle ? <div class="case-task__label">{hero.taskTitle}</div> : null}
                {hero?.taskText ? <div class="case-task__text">{hero.taskText}</div> : null}
              </div>
            ) : null}

            {(hero?.ctaPrimary?.url || hero?.ctaSecondary?.url) ? (
              <div class="case-actions">
                {hero?.ctaPrimary?.url ? (
                  <a class="btn btn--light" href={hero.ctaPrimary.url} target="_blank" rel="noreferrer">
                    {hero.ctaPrimary.label || 'перейти на сайт'}
                  </a>
                ) : null}

                {hero?.ctaSecondary?.url ? (
                  <a class="btn btn--dark" href={hero.ctaSecondary.url} target="_blank" rel="noreferrer">
                    <span>{hero.ctaSecondary.label || 'Заполнить бриф'}</span>
                    <span class="btn__arrow" aria-hidden="true">→</span>
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

      {/* BIG MOCKUP (под ним справа — agency badge) */}
      {hero?.mockup ? (
        <section class="case-mock">
          <div class="case-mock__card">
            <img
              class="case-mock__img"
              src={urlFor(hero.mockup).width(2200).auto('format').url()}
              alt={`${p.title} mockup`}
              loading="eager"
              decoding="async"
            />
          </div>

          {hasAgency ? (
            <div class="case-agency">
              {hero?.agency?.logo ? (
                <div class="case-agency__logo">
                  <img
                    src={urlFor(hero.agency.logo).width(160).auto('format').url()}
                    alt={hero?.agency?.name || 'agency'}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <div class="case-agency__logo case-agency__logo--placeholder" aria-hidden="true" />
              )}

              <div class="case-agency__text">
                <div class="case-agency__name">{hero?.agency?.name || 'GROWUP AGENCY'}</div>
                {hero?.agency?.note ? <div class="case-agency__note">{hero.agency.note}</div> : null}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

      {/* GALLERY (вертикальная лента скринов) */}
      {p.gallery?.length ? (
        <section class="case-gallery">
          {p.gallery.map((img: any, i: number) => (
            <div class="case-shot" key={i}>
              <img
                src={urlFor(img).width(2400).auto('format').url()}
                alt={img?.alt || `${p.title} screen ${i + 1}`}
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </section>
      ) : null}

      {/* BEFORE / AFTER (как в макете: "до\\после" и две картинки внутри одного блока) */}
      {p.beforeAfter?.enabled && (p.beforeAfter?.before || p.beforeAfter?.after) ? (
        <section class="case-beforeAfter">
          <div class="case-beforeAfter__label">до\после</div>

          <div class="case-beforeAfter__card">
            <div class="case-beforeAfter__grid">
              <div class="case-beforeAfter__side">
                {p.beforeAfter?.before ? (
                  <img
                    src={urlFor(p.beforeAfter.before).width(1800).auto('format').url()}
                    alt="before"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>

              <div class="case-beforeAfter__side">
                {p.beforeAfter?.after ? (
                  <img
                    src={urlFor(p.beforeAfter.after).width(1800).auto('format').url()}
                    alt="after"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
              </div>

              {/* разделитель/хэндл purely visual */}
              <div class="case-beforeAfter__divider" aria-hidden="true">
                <span class="case-beforeAfter__knob" />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* RELATED PROJECTS (как в макете: "посмотреть" + "ЕЩЕ ПРОЕКТЫ", большие карточки) */}
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
                  {rp?.hero?.mockup ? (
                    <img
                      src={urlFor(rp.hero.mockup).width(2000).auto('format').url()}
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
                        <span class="related-card__tag" key={t}>{t}</span>
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