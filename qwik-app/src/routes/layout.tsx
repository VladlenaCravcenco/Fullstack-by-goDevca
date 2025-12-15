import { component$, Slot } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';
import '~/global.css';

export const head: DocumentHead = {
  meta: [
    // цвет верхней панели браузера (Android/Chrome и часть браузеров)
    { name: 'theme-color', content: '#0e2e08' },

    // iOS: статус-бар (в PWA/в некоторых режимах Safari)
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
  ],
  links: [
    // важно для safe-area на iPhone (чтобы можно было использовать env(safe-area-inset-*))
    // это обычно кладут в <meta name="viewport">, см. ниже вариант
  ],
};

export default component$(() => {
  return (
    <>
      <Header />
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});