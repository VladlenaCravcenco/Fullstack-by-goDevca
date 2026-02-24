import { component$, Slot } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';
import '~/global.css';

export const head: DocumentHead = {
  meta: [
    { name: 'theme-color', content: '#0e2e08' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
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