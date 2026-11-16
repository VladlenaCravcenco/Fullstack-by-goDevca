import { projectDirections, resolveProjectDirections, directionLabel } from '../../../../shared/projectDirections';
import { translateLegacyProject } from '~/lib/projectTranslations';
import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { sanity, localizedString, localizedText } from '~/lib/sanity';
import { urlFor } from '~/lib/imageUrl';
import Blog from '~/components/blog/blog-section';
import { getLocaleFromPathname, localizePath } from '~/lib/i18n';
import './projects-page.css';

const QUERY = `
*[_type=="project"]|order(coalesce(publishedAt,_createdAt) desc){
  _id,
  "title": coalesce(select($locale != "ru" => titleI18n[$locale]), title, ${localizedString('titleI18n', undefined, 'slug.current')}),
  "slug": slug.current,
  "directions": hero.directions,
  "tags": coalesce(select($locale != "ru" => hero.pillsI18n[$locale]), hero.pills, hero.pillsI18n.ru, []),
  "cover": mockupBlock.mockup,
  "excerpt": ${localizedText('excerptI18n', 'excerpt', '""')}
}
`;

export const useProjects = routeLoader$(async (ctx) => {
  try {
    const locale = getLocaleFromPathname(ctx.url.pathname);
    const items = await sanity.fetch(QUERY, { locale });
    return Array.isArray(items) ? translateLegacyProject(items.filter((p) => p?.slug), locale) : [];
  } catch (e: any) {
    console.error('Sanity fetch failed:', e?.message || e);
    ctx.status(200);
    return [];
  }
});

export default component$(() => {
  const items = useProjects().value as any[];
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const requestedDirection = (loc.url.searchParams.get('direction') ?? loc.url.searchParams.get('tag') ?? '').trim();
  const activeTag = resolveProjectDirections([requestedDirection])[0] ?? '';
  const projects = items.map((p) => ({ ...p, directions: resolveProjectDirections(p.directions?.length ? p.directions : p.tags) }));
  const copy = {
    ru: { title: 'Проекты', all: 'Все' },
    ro: { title: 'Proiecte', all: 'Toate' },
    en: { title: 'Projects', all: 'All' },
  }[locale];

  const availableDirections = projectDirections.filter((d) => projects.some((p) => p.directions.includes(d.value)));
  const filtered = activeTag
    ? projects.filter((p) => p.directions.includes(activeTag))
    : projects;

  return (
    <section class="projects-page">
      <header class="projects-head">
        <h1>{copy.title}</h1>

        <nav class="project-directions" aria-label={copy.title}>
          <a href={localizePath(locale, '/projects')} class={{ "project-direction": true, active: !activeTag }} aria-current={!activeTag ? "page" : undefined}>
            {copy.all}
          </a>

          {availableDirections.map(({ value: t, labels }) => (
            <a
              key={t}
              href={localizePath(locale, `/projects?direction=${encodeURIComponent(t)}`)}
              class={{ "project-direction": true, active: activeTag === t }}
              aria-current={activeTag === t ? "page" : undefined}
            >
              {labels[locale]}
            </a>
          ))}
        </nav>
      </header>

      <div class="grid">
        {filtered.map((p) => {
          const img = p.cover;
          const coverUrl =
            img?.asset?._ref
              ? urlFor(img).width(900).height(600).fit('crop').auto('format').url()
              : '';

          return (
            <a href={localizePath(locale, `/projects/${p.slug}`)} class="card" key={p._id}>
              {coverUrl ? (
                <img
                  width={900}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: 'auto' }}
                  src={coverUrl}
                  alt={p.title}
                />
              ) : null}

              <div class="body">
                <h3>{p.title}</h3>

                {p.excerpt ? <p>{p.excerpt}</p> : null}

                {p.directions?.length ? (
                  <ul class="mini-tags">
                    {p.directions.map((t: string) => (
                      <li key={t}>{directionLabel(t, locale)}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </a>
          );
        })}
      </div>

      <Blog />
    </section>
  );
});
