import { component$, useSignal, $, useVisibleTask$ } from '@builder.io/qwik';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { MusicToggle } from '~/components/ui/MusicToggle';
import './Header.css';

export default component$(() => {
  const isOpen = useSignal(false);

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

  const nav = [
    { label: 'Услуги', href: '/#services' },
    { label: 'Проекты', href: '/projects' },
    { label: 'Обо мне', href: '/about' },
    { label: 'Блог', href: '/blog' },
    { label: 'Контакты', href: '/contact' },
  ];

  return (
    <header class="h">
      <div class="h__inner">
        {/* LEFT */}
        <div class="h__left">
          <a class="h__logo" href="/">
            <span class="h__dot" />
            <span class="h__brand">godevca</span>
          </a>

          <div class="h__status">
            <span class="h__status-dot" />
            <span>Avaible to Work</span>
          </div>
        </div>

        {/* CENTER (desktop) */}
        <nav class="h__nav" aria-label="Навигация">
          {nav.map((i) => (
            <a key={i.href} class="h__link" href={i.href}>
              {i.label}
            </a>
          ))}
        </nav>

        {/* RIGHT */}
        <div class="h__right">
          <div class="h__sound">
            <MusicToggle />
          </div>

          <a class="h__cta" href="/brief">
            <GlassEffect class="btn btn--primary">заполнить бриф</GlassEffect>
          </a>

          {/* burger (mobile) */}
          <button class="h__burger" type="button" onClick$={open$} aria-label="Открыть меню">
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div class={`m ${isOpen.value ? 'm--open' : ''}`} aria-hidden={!isOpen.value}>
        <div class="m__backdrop" onClick$={close$} />

        <div class="m__panel" role="dialog" aria-modal="true" aria-label="Меню">
          <button class="m__close" type="button" onClick$={close$} aria-label="Закрыть меню">
            ✕
          </button>

          <div class="m__content">
            <div class="m__links">
              {nav
                .filter((x) => x.label !== 'Блог') /* на твоём моб.скрине блога нет */
                .map((i) => (
                  <a key={i.href} class="m__link" href={i.href} onClick$={close$}>
                    {i.label}
                  </a>
                ))}
            </div>

            <a class="m__cta" href="/brief" onClick$={close$}>
              <GlassEffect class="m__ctaGlass">заполнить бриф</GlassEffect>
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