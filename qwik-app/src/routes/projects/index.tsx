import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { sanity } from '~/lib/sanity';
import { urlFor } from '~/lib/imageUrl';
import Blog from '~/components/blog/blog-section';
import './projects-page.css';

const QUERY = `
*[_type=="project"]|order(coalesce(publishedAt,_createdAt) desc){
  _id,
  title,
  "slug": slug.current,

  // ✅ теги: новое поле hero.pills, но оставляем fallback на tags (если где-то ещё есть старые доки)
  "tags": coalesce(hero.pills, tags, []),

  // ✅ картинка: новое поле mockupBlock.mockup, но оставляем fallback на cover (если где-то ещё есть старые доки)
  "cover": coalesce(mockupBlock.mockup, cover),

  // ✅ текст для карточки: если у тебя нет excerpt в схеме — будет пусто, но не упадёт
  excerpt
}
`;

export const useProjects = routeLoader$(async (ctx) => {
  try {
    const items = await sanity.fetch(QUERY);
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
  const activeTag = (loc.url.searchParams.get('tag') ?? '').trim();

  // счётчики по тегам
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
        <h1>Проекты</h1>

        <nav class="tags">
          <a href="/projects" class={{ tag: true, active: !activeTag }}>
            Все
          </a>

          {[...counts.entries()].sort().map(([t, c]) => (
            <a
              key={t}
              href={`/projects?tag=${encodeURIComponent(t)}`}
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
            <a href={`/projects/${p.slug}`} class="card" key={p._id}>
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