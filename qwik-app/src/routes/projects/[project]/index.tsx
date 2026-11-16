import { withProjectDirections } from '~/lib/projectDirections';
import { translateLegacyProject } from '~/lib/projectTranslations';
import { component$ } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead, useLocation } from '@builder.io/qwik-city';
import { sanity, localizedString } from '~/lib/sanity';
import { urlFor } from '~/lib/imageUrl';
import { uiCopy, getLocaleFromPathname, localizePath } from '~/lib/i18n';
import './project-page.css';

const QUERY = `
*[_type=="project" && slug.current == $slug][0]{
  _id,
  "title": coalesce(select($locale != "ru" => titleI18n[$locale]), title, ${localizedString('titleI18n', undefined, 'slug.current')}),
  "slug": slug.current,

  hero{
    directions,
    "directionRefs": directionRefs[]->{_id, "title": coalesce(titleI18n[$locale], title)},
    "pills": coalesce(select($locale != "ru" => pillsI18n[$locale]), pills, pillsI18n.ru, []),
    "intro": coalesce(introI18n[$locale], introI18n.ru, intro),
    "taskText": coalesce(taskTextI18n[$locale], taskTextI18n.ru, taskText),
    "ctaPrimary": {
      "label": coalesce(ctaPrimary.labelI18n[$locale], ctaPrimary.labelI18n.ru, ctaPrimary.label),
      "url": ctaPrimary.url
    },
    "duration": coalesce(durationI18n[$locale], durationI18n.ru, duration),
    "plan": coalesce(planI18n[$locale], planI18n.ru, plan)
  },

  mockupBlock{
    mockup,
    agency{
      enabled,
      logo,
      "name": coalesce(name, nameI18n[$locale], nameI18n.ru),
      "note": coalesce(noteI18n[$locale], noteI18n.ru, note)
    }
  },

  "gallery": gallery[]{
    image,
    "alt": coalesce(altI18n[$locale], altI18n.ru, alt)
  },
  relatedProjects[]->{
    _id,
    "title": coalesce(select($locale != "ru" => titleI18n[$locale]), title, ${localizedString('titleI18n', undefined, 'slug.current')}),
    "slug": slug.current,
    hero{
    directions,
    "directionRefs": directionRefs[]->{_id, "title": coalesce(titleI18n[$locale], title)},
      "pills": coalesce(select($locale != "ru" => pillsI18n[$locale]), pills, pillsI18n.ru, [])
    },
    mockupBlock{ mockup }
  }
}
`;

export const useProject = routeLoader$(async ({ params, status, url }) => {
  try {
    const locale = getLocaleFromPathname(url.pathname);
    const slug = typeof params.project === 'string' ? params.project.trim() : '';

    if (!slug) {
      status(404);
      return null;
    }

    const doc = await sanity.fetch(QUERY, { slug, locale });
    if (!doc) status(404);
    return withProjectDirections(translateLegacyProject(doc ?? null, locale), locale);
  } catch (error: any) {
    console.error('Sanity PROJECT fetch failed:', error?.message || error);
    status(404);
    return null;
  }
});

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const p = useProject().value as any;
  if (!p) return <section class="case"><h1>{uiCopy[locale].notFound}</h1></section>;

  const hero = p.hero || {};
  const primaryUrl = hero.ctaPrimary?.url || '';
  const internalPath = primaryUrl.match(/^https:\/\/(?:www\.)?godevca\.com(\/.*)?$/)?.[1];
  const primaryHref = internalPath ? localizePath(locale, internalPath) : primaryUrl;
  const mock = p.mockupBlock || {};
  const agency = mock.agency || {};
  const relatedProjects = Array.isArray(p.relatedProjects)
    ? p.relatedProjects.filter((item: any) => typeof item?.slug === 'string' && item.slug.length > 0)
    : [];

  const showAgency =
    !!agency?.enabled && (!!agency?.name || !!agency?.note || !!agency?.logo);
  const copy = {
    ru: {
      visit: 'перейти на сайт',
      brief: 'Заполнить бриф',
      taskLabel: 'Задача:',
      duration: 'продолжительность:',
      plan: 'План:',
      relatedKicker: 'посмотреть',
      relatedTitle: 'ЕЩЕ ПРОЕКТЫ',
    },
    ro: {
      visit: 'deschide site-ul',
      brief: 'Completează brief-ul',
      taskLabel: 'Sarcina:',
      duration: 'durată:',
      plan: 'Plan:',
      relatedKicker: 'vezi',
      relatedTitle: 'ALTE PROIECTE',
    },
    en: {
      visit: 'visit website',
      brief: 'Fill out the brief',
      taskLabel: 'Task:',
      duration: 'duration:',
      plan: 'Plan:',
      relatedKicker: 'see',
      relatedTitle: 'MORE PROJECTS',
    },
  }[locale];

  return (
    <article class="case">
      {/* HERO TOP */}
      <header class="case-hero">
        <div class="case-hero__grid">
          {/* LEFT */}
          <div class="case-hero__left">
            {hero?.pills?.length ? (
              <ul class="case-tags" aria-label={uiCopy[locale].tags}>
                {hero.pills.slice(0, 6).map((t: string) => (
                  <li class="case-tag" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}

            <h1 class="case-title">{p.title}</h1>

            {hero?.intro ? <p class="case-intro">{hero.intro}</p> : null}

            {hero?.taskText ? (
              <div class="case-task">
                <div class="case-task__label">{copy.taskLabel}</div>
                {hero?.taskText ? (
                  <div class="case-task__text">{hero.taskText}</div>
                ) : null}
              </div>
            ) : null}

            <div class="case-actions">
              {hero?.ctaPrimary?.url ? (
                <a
                  class="btn btn--light"
                  href={primaryHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {hero.ctaPrimary.label || copy.visit}
                </a>
              ) : null}

              <a class="btn btn--dark" href={localizePath(locale, '/brief')}>
                <span>{copy.brief}</span>
                <span class="btn__arrow" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* RIGHT META */}
          <aside class="case-hero__right" aria-label={uiCopy[locale].meta}>
            <div class="case-miniMeta">
              <div class="case-miniMeta__row">
                <div class="case-miniMeta__label">{copy.duration}</div>
                <div class="case-miniMeta__value">{hero?.duration || '—'}</div>
              </div>
              <div class="case-miniMeta__row">
                <div class="case-miniMeta__label">{copy.plan}</div>
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
              alt={`${p.title} — ${uiCopy[locale].mockup}`}
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
                    alt={agency?.name || uiCopy[locale].agency}
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
                  alt={item?.alt || `${p.title} — ${uiCopy[locale].screen} ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                />
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {/* RELATED */}
      {relatedProjects.length ? (
        <section class="case-related">
          <div class="case-related__head">
            <div class="case-related__kicker">{copy.relatedKicker}</div>
            <h2 class="case-related__title">{copy.relatedTitle}</h2>
          </div>

          <div class="related-grid">
            {relatedProjects.slice(0, 6).map((rp: any) => (
              <a class="related-card" href={localizePath(locale, `/projects/${rp.slug}`)} key={rp.slug}>
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
                    <div class="related-card__tags" aria-label={uiCopy[locale].tags}>
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

export const head: DocumentHead = ({ resolveValue, url }) => {
  const p: any = resolveValue(useProject);
  return {
    title: p?.title ? `${p.title} | godevca` : uiCopy[getLocaleFromPathname(url.pathname)].project,
    meta: [{ name: 'description', content: p?.hero?.intro ?? '' }],
  };
};
