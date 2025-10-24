import { component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import { sanity } from '~/lib/sanity';
import { urlFor } from '~/lib/imageUrl';

// ↓↓↓ подключи готовые блоки, которые уже есть в проекте
import Cta from '~/components/form/brief-cta';                    // твой призыв к действию
import BlogPreview from '~/components/blog/blog-section';          // мини-лента постов, если есть

const QUERY = `
*[_type=="project"]|order(coalesce(publishedAt,_createdAt) desc){
  _id, title, "slug": slug.current, excerpt, cover, tags
}
`;

export const useProjects = routeLoader$(async () => {
    const items = await sanity.fetch(QUERY);
    return items ?? [];
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
            {/* <BlogPreview limit={3} />   если надо показать 3 последних поста */}

            <style>{`
        .projects-page{max-width:1300px;margin:0 auto;padding:clamp(24px,4vw,48px) 20px;}
        .projects-head{display:grid;gap:14px;margin-bottom:16px;}
        .tags{display:flex;flex-wrap:wrap;gap:10px}
        .tag{padding:6px 10px;border-radius:999px;background:#f2f2f2;text-decoration:none;color:#333;font-size:14px}
        .tag:hover{background:#e9e9e9}
        .tag.active{background:#111;color:#fff}
        .tag .count{opacity:.7;margin-left:6px}
        .grid{display:grid;grid-template-columns:repeat(12,1fr);gap:22px}
        .card{grid-column:span 12;text-decoration:none;color:inherit;border:1px solid rgba(0,0,0,.06);border-radius:16px;overflow:hidden;background:#fff;transition:transform .2s, box-shadow .2s}
        .card:hover{transform:translateY(-2px);box-shadow:0 10px 30px rgba(0,0,0,.08)}
        .card img{width:100%;height:300px;object-fit:cover;display:block}
        .card .body{padding:16px 18px 20px;display:grid;gap:8px}
        .mini-tags{display:flex;gap:6px;flex-wrap:wrap;margin-top:4px}
        .mini-tags li{font-size:12px;color:#666;background:#f2f2f2;padding:4px 8px;border-radius:999px}
        @media (min-width:720px){.card{grid-column:span 6}}
        @media (min-width:1100px){.card{grid-column:span 4}.card img{height:240px}}
      `}</style>
        </section>
    );
});