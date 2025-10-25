import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { sanity } from '~/lib/sanity';
import { urlFor } from '~/lib/imageUrl';
import './projects-page.css';

// ↓↓↓ подключи готовые блоки, которые уже есть в проекте
import Cta from '~/components/form/brief-cta';                    // твой призыв к действию


const QUERY = `
*[_type=="project"]|order(coalesce(publishedAt,_createdAt) desc){
  _id, title, "slug": slug.current, excerpt, cover, tags
}
`;

export const useProjects = routeLoader$(async (ctx) => {
  try {
    const items = await sanity.fetch(QUERY);
    // фильтруем на случай пустых slug
    return Array.isArray(items) ? items.filter(p => p?.slug) : [];
  } catch (e: any) {
    console.error('Sanity fetch failed:', e?.message || e);
    ctx.status(200); // не даём 500
    return [];
  }
});

export default component$(() => {
    const items = useProjects().value as any[];
    const loc = useLocation();
    const activeTag = (loc.url.searchParams.get('tag') ?? '').trim();
    

    // собрать счётчики по тегам
    const counts = new Map<string, number>();
    items.forEach(p => (p.tags || []).forEach((t: string) => {
        counts.set(t, (counts.get(t) ?? 0) + 1);
    }));

    const filtered = activeTag ? items.filter(p => (p.tags || []).includes(activeTag)) : items;

    return (
        <section class="projects-page">
            <header class="projects-head">
                <h1>Проекты</h1>
                <nav class="tags">
                    <a href="/projects" class={{ tag: true, active: !activeTag }}>Все</a>
                    {[...counts.entries()].sort().map(([t, c]) => (
                        <a key={t}
                            href={`/projects?tag=${encodeURIComponent(t)}`}
                            class={{ tag: true, active: activeTag === t }}>
                            #{t} <span class="count">{c}</span>
                        </a>
                    ))}
                </nav>
            </header>

            <div class="grid">
                {filtered.map(p => {
                    const cover = p.cover
                        ? urlFor(p.cover).width(900).height(600).fit('crop').auto('format').url()
                        : '';
                    return (
                        <a href={`/projects/${p.slug}`} class="card" key={p._id}>
                            {cover && <img
                                width={900}
                                height={600}
                                loading="lazy"
                                decoding="async"
                                style={{ width: '100%', height: 'auto'}}
                                src={cover} alt={p.title} />}
                            <div class="body">
                                <h3>{p.title}</h3>
                                {p.excerpt && <p>{p.excerpt}</p>}
                                {p.tags?.length ? (
                                    <ul class="mini-tags">
                                        {p.tags.map((t: string) => <li key={t}>#{t}</li>)}
                                    </ul>
                                ) : null}
                            </div>
                        </a>
                    );
                })}
            </div>

            {/* твои готовые блоки ниже — просто вставляем как компоненты */}
            <Cta />
   
        </section>
    );
});