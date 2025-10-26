import { component$, Slot, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import Header from '~/components/header/header';   // ← замени на свой компонент хедера
import Footer from '~/components/footer/footer';         // ← замени на свой компонент футера
import '~/global.css';                                   // если есть глобальные стили

export default component$(() => {
  const loc = useLocation();

  // плавный скролл при каждом переходе
  useVisibleTask$(({ track }) => {
    track(() => loc.url.pathname); // следим за изменением маршрута
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
  return (
    <>
      <Header />
      <main>
        <Slot />      {/* сюда рендерятся все страницы: /, /projects, /blog и т.д. */}
      </main>
      <Footer />
    </>
  );
});