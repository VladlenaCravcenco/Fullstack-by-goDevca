import { component$ } from '@builder.io/qwik';
import { urlFor } from '~/lib/imageUrl';

type BentoItem = {
  title?: string;
  text?: string;
  image?: any;
  colSpan?: number;
  rowSpan?: number;
};
type Props = { items?: BentoItem[] };

export default component$<Props>(({ items = [] }) => {
  return (
    <section class="bento">
      {items.map((it, i) => {
        const col = Math.max(1, Math.min(2, it.colSpan ?? 1));
        const row = Math.max(1, Math.min(2, it.rowSpan ?? 1));
        const img = it.image
          ? urlFor(it.image).width(800).height(600).fit('crop').auto('format').url()
          : '';

        return (
          <article class={`card col-${col} row-${row}`} key={i}>
            {img && (
              <img
                src={img}
                alt={it.title ?? ''}
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
              />
            )}
            <div class="body">
              {it.title && <h3>{it.title}</h3>}
              {it.text && <p>{it.text}</p>}
            </div>
          </article>
        );
      })}

      <style>{`
        .bento{
          display:grid; gap:16px; margin:32px 0;
          grid-template-columns: repeat(2, minmax(0,1fr));
          grid-auto-rows: 220px;
        }
        @media (min-width: 900px){
          .bento{grid-template-columns: repeat(4, minmax(0,1fr)); grid-auto-rows: 200px;}
        }
        .card{position:relative; overflow:hidden; border-radius:16px; background:#fff; border:1px solid rgba(0,0,0,.06)}
        .card img{position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:contrast(1.02)}
        .card .body{position:relative; z-index:1; padding:16px; background:linear-gradient(to top, rgba(0,0,0,.45), transparent 60%); color:#fff; height:100%; display:flex; align-items:end}
        .col-1{grid-column: span 2}
        .col-2{grid-column: span 4}
        .row-1{grid-row: span 1}
        .row-2{grid-row: span 2}
      `}</style>
    </section>
  );
});