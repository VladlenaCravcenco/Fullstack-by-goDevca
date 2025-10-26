import { component$, } from '@builder.io/qwik';
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city';
import { sanity } from '~/lib/sanity';
import { urlFor } from '~/lib/imageUrl';
import BentoGrid from '~/components/case/BentoGrid';
import BeforeAfter from '~/components/case/BeforeAfter';

const QUERY = `
*[_type=="project" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, excerpt, tags, cover,
  content[]{
    // bento
    _type == "bento" => {
      _type, items[]{
        title, text, image, colSpan, rowSpan
      }
    },
    // before/after
    _type == "beforeAfter" => {
      _type, title, before, after, caption
    }
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

  return (
    <article class="case">
      {/* Hero */}
      <header class="case-hero">
        <h1>{p.title}</h1>
        {p.tags?.length ? <ul class="tags">{p.tags.map((t:string) => <li key={t}>#{t}</li>)}</ul> : null}
        {p.cover && (
          <img
            width={1440} height={720}
            src={urlFor(p.cover).width(1440).height(720).fit('crop').auto('format').url()}
            alt={p.title}
            loading="eager" decoding="async"
          />
        )}
      </header>

      {/* Sections */}
      {p.content?.map((block:any, i:number) => {
        if (block._type === 'bento') return <BentoGrid key={i} items={block.items} />;
        if (block._type === 'beforeAfter') return <BeforeAfter key={i} data={block} />;
        return null;
      })}

      <style>{`
        .case{max-width:1200px;margin:0 auto;padding:clamp(24px,4vw,48px) 20px}
        .case-hero{display:grid;gap:14px;margin-bottom:24px}
        .case-hero img{width:100%;height:auto;border-radius:20px}
        .tags{display:flex;gap:8px;flex-wrap:wrap}
        .tags li{font-size:12px;background:#f2f2f2;border-radius:999px;padding:4px 8px;color:#555}
      `}</style>
    </article>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const p:any = resolveValue(useProject);
  return {
    title: p?.title ? `${p.title} | проекты` : 'Проект',
    meta: [{ name: 'description', content: p?.excerpt ?? '' }],
  };
};