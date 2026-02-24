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
  scripts: [
    {
      props: {
        type: 'text/javascript',
      },
      // ВАЖНО: это будет встроенный <script>...</script>
      script: `
(function (C, A, L) {
  let p = function (a, ar) { a.q.push(ar); };
  let d = C.document;
  C.Cal = C.Cal || function () {
    let cal = C.Cal;
    let ar = arguments;
    if (!cal.loaded) {
      cal.ns = {};
      cal.q = cal.q || [];
      d.head.appendChild(d.createElement("script")).src = A;
      cal.loaded = true;
    }
    if (ar[0] === L) {
      const api = function () { p(api, arguments); };
      const namespace = ar[1];
      api.q = api.q || [];
      if (typeof namespace === "string") {
        cal.ns[namespace] = cal.ns[namespace] || api;
        p(cal.ns[namespace], ar);
        p(cal, ["initNamespace", namespace]);
      } else p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, "https://app.cal.com/embed/embed.js", "init");

Cal("init", "30min", { origin: "https://app.cal.com" });
Cal.ns["30min"]("ui", { hideEventTypeDetails: false, layout: "month_view" });
      `.trim(),
    },
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