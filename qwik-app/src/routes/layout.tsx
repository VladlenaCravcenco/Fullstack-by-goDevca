import { component$, Slot } from '@builder.io/qwik';
import Header from '~/components/header/header';   // ← замени на свой компонент хедера
import Footer from '~/components/footer/footer';         // ← замени на свой компонент футера
import '~/global.css';                                   // если есть глобальные стили

export default component$(() => {
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