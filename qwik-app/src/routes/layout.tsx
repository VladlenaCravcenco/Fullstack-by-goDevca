import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import Header from '~/components/header/header';   // ← замени на свой компонент хедера
import Footer from '~/components/footer/footer';         // ← замени на свой компонент футера
import '~/global.css';                                   // если есть глобальные стили

export default component$(() => {
  const loc = useLocation();

  // Отключаем восстановление скролла (важно для Safari)
  useVisibleTask$(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    // если страница вернулась из bfcache (Safari/Firefox), тоже поднимем наверх
    window.addEventListener('pageshow', (e: any) => {
      if (e?.persisted) window.scrollTo({ top: 0, left: 0 });
    });
  });

  // На каждый переход — наверх (или к якорю)
  useVisibleTask$(({ track }) => {
    track(() => loc.url.pathname);
    track(() => loc.url.search);
    track(() => loc.url.hash);

    const toHash = () => {
      const el = loc.url.hash ? document.querySelector(loc.url.hash) : null;
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); return true; }
      return false;
    };

    // ждём отрисовку, чтобы ничего не "дотолкнуло" вниз
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!toHash()) {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }
      });
    });
  });

  return (
    <>
      <Header />
      <main><Slot /></main>
      <Footer />
    </>
  );
});