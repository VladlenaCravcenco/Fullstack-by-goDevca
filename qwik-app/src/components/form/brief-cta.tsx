import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import './brief-cta.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { getLocaleFromPathname, localizePath } from '~/lib/i18n';

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = {
    ru: {
      title: 'Начнём с маленького шага, вы заполняете, а я предложу решение.',
      cta: 'заполнить бриф',
    },
    ro: {
      title: 'Pornim cu un pas mic, tu completezi, iar eu iti propun solutia.',
      cta: 'completeaza brief-ul',
    },
    en: {
      title: 'Let us start with a small step, you fill it out and I propose the solution.',
      cta: 'fill out the brief',
    },
  }[locale];

  return (
    <section class="brief-cta">
      <div class="brief-cta__overlay">
        <h2>{copy.title}</h2>
        
         <GlassEffect class="brief-cta__btn">
            <Link href={localizePath(locale, '/brief')}>{copy.cta}</Link>
          </GlassEffect>
      </div>
    </section>
  );
});
