import { component$, Slot } from '@builder.io/qwik';
     // ← замени на свой компонент футера
import '~/global.css';                                   // если есть глобальные стили

export default component$(() => {
  return (
    <>
      {/* <Header /> */}
      <main>
        <Slot />      {/* сюда рендерятся все страницы: /, /projects, /blog и т.д. */}
      </main>
      {/* <Footer /> */}
    </>
  );
});