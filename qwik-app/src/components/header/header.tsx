import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { MusicToggle } from '~/components/ui/MusicToggle';
import { getLocaleFromPathname, localeLabels, localizePath, switchLocalePath } from '~/lib/i18n';
import './Header.css';

export default component$(() => {
  const isOpen = useSignal(false);
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);

  const open$ = $(() => (isOpen.value = true));
  const close$ = $(() => (isOpen.value = false));

  // Блокируем скролл страницы когда меню открыто
  useVisibleTask$(({ track, cleanup }) => {
    track(() => isOpen.value);
    if (typeof document === 'undefined') return;

    const prev = document.body.style.overflow;
    if (isOpen.value) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prev;

    cleanup(() => {
      document.body.style.overflow = prev;
    });
  });

  const copy = {
    ru: {
      available: 'Available to Work',
      navLabel: 'Навигация',
      menuLabel: 'Меню',
      openMenu: 'Открыть меню',
      closeMenu: 'Закрыть меню',
      cta: 'заполнить бриф',
      nav: [
        { label: 'Услуги', href: '/#services' },
        { label: 'Проекты', href: '/projects' },
        { label: 'Обо мне', href: '/#about' },
        { label: 'Блог', href: '/blog' },
        { label: 'Контакты', href: '/brief' },
      ],
    },
    ro: {
      available: 'Disponibilă pentru proiecte',
      navLabel: 'Navigare',
      menuLabel: 'Meniu',
      openMenu: 'Deschide meniul',
      closeMenu: 'Închide meniul',
      cta: 'completează brief-ul',
      nav: [
        { label: 'Servicii', href: '/#services' },
        { label: 'Proiecte', href: '/projects' },
        { label: 'Despre mine', href: '/#about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/brief' },
      ],
    },
    en: {
      available: 'Available to Work',
      navLabel: 'Navigation',
      menuLabel: 'Menu',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      cta: 'fill out the brief',
      nav: [
        { label: 'Services', href: '/#services' },
        { label: 'Projects', href: '/projects' },
        { label: 'About', href: '/#about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Contact', href: '/brief' },
      ],
    },
  }[locale];

  const currentPath = `${loc.url.pathname}${loc.url.search}`;

  return (
    <header class="h">
      <div class="h__inner">
        <div class="h__left">
          <a class="h__logo" href={localizePath(locale, '/')}>
            <span class="h__dot" />
            <span class="h__brand">godevca</span>
          </a>

          <div class="h__status">
            <span class="h__status-dot" />
            <span>{copy.available}</span>
          </div>
        </div>

        <nav class="h__nav" aria-label={copy.navLabel}>
          {copy.nav.map((i) => (
            <a key={i.href} class="h__link" href={localizePath(locale, i.href)}>
              {i.label}
            </a>
          ))}
        </nav>

        <div class="h__right">
          <div class="h__langs" aria-label="Language switcher">
            {(['ru', 'ro', 'en'] as const).map((item) => (
              <a
                key={item}
                class={{ h__lang: true, 'h__lang--active': locale === item }}
                href={switchLocalePath(currentPath, item)}
                hreflang={item}
              >
                {localeLabels[item]}
              </a>
            ))}
          </div>

          <div class="h__sound">
            <MusicToggle />
          </div>

          <a class="h__cta" href={localizePath(locale, '/brief')}>
            <GlassEffect class="btn btn--primary">{copy.cta}</GlassEffect>
          </a>

          <button class="h__burger" type="button" onClick$={open$} aria-label={copy.openMenu}>
            <span />
            <span />
          </button>
        </div>
      </div>

      <div class={`m ${isOpen.value ? 'm--open' : ''}`} aria-hidden={!isOpen.value}>
        <div class="m__backdrop" onClick$={close$} />

        <div class="m__panel" role="dialog" aria-modal="true" aria-label={copy.menuLabel}>
          <button class="m__close" type="button" onClick$={close$} aria-label={copy.closeMenu}>
            ✕
          </button>

          <div class="m__content">
            <div class="m__links">
              {copy.nav
                .filter((x) => x.href !== '/blog')
                .map((i) => (
                  <a key={i.href} class="m__link" href={localizePath(locale, i.href)} onClick$={close$}>
                    {i.label}
                  </a>
                ))}
            </div>

            <div class="m__langs">
              {(['ru', 'ro', 'en'] as const).map((item) => (
                <a
                  key={item}
                  class={{ m__lang: true, 'm__lang--active': locale === item }}
                  href={switchLocalePath(currentPath, item)}
                  onClick$={close$}
                >
                  {localeLabels[item]}
                </a>
              ))}
            </div>

            <a class="m__cta" href={localizePath(locale, '/brief')} onClick$={close$}>
              <GlassEffect class="m__ctaGlass">{copy.cta}</GlassEffect>
            </a>

            <div class="m__social">
              <a class="m__soc" href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                in
              </a>
              <a class="m__soc" href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                ⌁
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
