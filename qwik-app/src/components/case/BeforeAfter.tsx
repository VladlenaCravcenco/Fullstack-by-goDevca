import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { urlFor } from '~/lib/imageUrl';

export default component$(({ data }: { data: any }) => {
  const percent = useSignal(50); // 0..100

  // стрелочки/тач
  useVisibleTask$(() => {
    const el = document.querySelector<HTMLElement>('.ba-wrap:last-of-type');
    if (!el) return;
    const onMove = (x:number) => {
      const r = el.getBoundingClientRect();
      percent.value = Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100));
    };
    const onPointer = (e: PointerEvent) => { el.setPointerCapture(e.pointerId); onMove(e.clientX); };
    const onPointerMove = (e: PointerEvent) => { if (e.buttons) onMove(e.clientX); };
    el.addEventListener('pointerdown', onPointer);
    el.addEventListener('pointermove', onPointerMove);
    return () => {
      el.removeEventListener('pointerdown', onPointer);
      el.removeEventListener('pointermove', onPointerMove);
    };
  });

  const before = data.before && urlFor(data.before).width(1440).auto('format').url();
  const after  = data.after  && urlFor(data.after).width(1440).auto('format').url();

  return (
    <section class="ba">
      {data.title && <h2>{data.title}</h2>}

      <div class="ba-wrap">
        {after && <img class="img base" src={after} alt="after" width={1440} height={800} loading="lazy" decoding="async" />}
        {before && <img class="img top" src={before} alt="before" style={{ width: `${percent.value}%` }} />}
        <div class="handle" style={{ left: `${percent.value}%` }}>
          <span />
        </div>
      </div>

      {data.caption && <p class="caption">{data.caption}</p>}

      <style>{`
        .ba{margin:40px 0}
        .ba h2{margin:0 0 12px}
        .ba-wrap{position:relative; border-radius:16px; overflow:hidden; background:#000}
        .img{display:block; width:100%; height:auto}
        .img.top{position:absolute; inset:0; height:100%; object-fit:cover}
        .handle{
          position:absolute; top:0; bottom:0; width:0; transform:translateX(-1px);
          border-left:2px solid #fff; box-shadow:0 0 0 2px rgba(0,0,0,.1) inset;
        }
        .handle span{
          position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);
          width:46px; height:46px; border-radius:999px; background:#fff; box-shadow:0 6px 24px rgba(0,0,0,.2);
        }
      `}</style>
    </section>
  );
});