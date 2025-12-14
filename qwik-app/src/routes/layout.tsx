import { component$, Slot } from '@builder.io/qwik';

import Header from '~/components/header/header';
import Footer from '~/components/footer/footer';
import '~/global.css';



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