import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { sanity, localizedString, localizedStringArray, localizedText } from '~/lib/sanity';
import { urlFor } from '~/lib/imageUrl';
import Blog from '~/components/blog/blog-section';
import { getLocaleFromPathname, localizePath } from '~/lib/i18n';
import './projects-page.css';

const QUERY = `
*[_type=="project"]|order(coalesce(publishedAt,_createdAt) desc){
  _id,
  "title": ${localizedString('titleI18n', 'title')},
  "slug": slug.current,
  "tags": ${localizedStringArray('hero.pillsI18n', 'coalesce(hero.pills, tags, [])')},
  "cover": coalesce(mockupBlock.mockup, cover),
  "excerpt": ${localizedText('excerptI18n', 'excerpt')}
}
`;

export const useProjects = routeLoader$(async (ctx) => {
  try {
    const locale = getLocaleFromPathname(ctx.url.pathname);
    const items = await sanity.fetch(QUERY, { locale });
    return Array.isArray(items) ? items.filter((p) => p?.slug) : [];
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
  const activeTag = (loc.url.searchParams.get('tag') ?? '').trim();
  const copy = {
    ru: { title: 'Проекты', all: 'Все' },
    ro: { title: 'Proiecte', all: 'Toate' },
    en: { title: 'Projects', all: 'All' },
  }[locale];

  const counts = new Map<string, number>();
  items.forEach((p) =>
    (p.tags || []).forEach((t: string) => {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    })
  );

  const filtered = activeTag
    ? items.filter((p) => (p.tags || []).includes(activeTag))
    : items;

  return (
    <section class="projects-page">
      <header class="projects-head">
        <h1>{copy.title}</h1>

        <nav class="tags">
          <a href={localizePath(locale, '/projects')} class={{ tag: true, active: !activeTag }}>
            {copy.all}
          </a>

          {[...counts.entries()].sort().map(([t, c]) => (
            <a
              key={t}
              href={localizePath(locale, `/projects?tag=${encodeURIComponent(t)}`)}
              class={{ tag: true, active: activeTag === t }}
            >
              #{t} <span class="count">{c}</span>
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

                {p.tags?.length ? (
                  <ul class="mini-tags">
                    {p.tags.map((t: string) => (
                      <li key={t}>#{t}</li>
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
