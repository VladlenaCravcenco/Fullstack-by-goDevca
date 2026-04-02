import { component$, useVisibleTask$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import './HeroSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { playGlassHover } from '~/utils/sounds';
import { getLocaleFromPathname, localizePath } from '~/lib/i18n';

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = {
    ru: {
      lines: ['Сайты,', 'которые двигают бизнес'],
      role: 'web-designer & frontend developer',
      description:
        'Адаптивные лендинги с маркетинговой структурой на Qwik, полностью готовые к индексации в Google.',
      cta: 'Посмотреть кейсы',
    },
    ro: {
      lines: ['Site-uri', 'care misca businessul'],
      role: 'web designer & frontend developer',
      description:
        'Landing page-uri adaptive cu structura de marketing pe Qwik, complet pregatite pentru indexare in Google.',
      cta: 'Vezi proiectele',
    },
    en: {
      lines: ['Websites', 'that move business forward'],
      role: 'web designer & frontend developer',
      description:
        'Responsive landing pages with a marketing-first structure on Qwik, fully prepared for Google indexing.',
      cta: 'View case studies',
    },
  }[locale];

  useVisibleTask$(() => {
    const el = document.querySelector<HTMLElement>('[data-reveal]');
    if (!el) return;

    requestAnimationFrame(() => {
      el.classList.add('is-in');
    });
  });
  return (
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <div class="hero__left">
            <h1 class="hero-title" data-reveal>
              <span class="line" style="--d: 0ms">
                {copy.lines[0]}
              </span>
              <span class="line" style="--d: 220ms">
                {copy.lines[1]}
              </span>
            </h1>
            <h2>Cravcenco Vladlena</h2>
            <h4>{copy.role}</h4>
            <p>{copy.description}</p>

            <div class="hero__buttons">
              <GlassEffect class="btn btn--primary">
                <Link
                  href={localizePath(locale, '/projects')}
                  onMouseEnter$={() => playGlassHover()}
                  onPointerDown$={() => playGlassHover()}
                >
                  {copy.cta}
                </Link>
              </GlassEffect>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
