import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { toggleMusic, isMusicEnabled, restoreMusicState, playGlassHover } from '~/utils/sounds';
import { getLocaleFromPathname } from '~/lib/i18n';
import './musictoggle.css'

export const MusicToggle = component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const enabled = useSignal(false);
  const label = {
    ru: 'Музыка',
    ro: 'Muzică',
    en: 'Music',
  }[locale];

  useVisibleTask$(() => {
    restoreMusicState();
    enabled.value = isMusicEnabled();
  });

  const onToggle$ = $(() => {
    playGlassHover();   // клик-эффект (у тебя “стекло”)
    toggleMusic();      // включает/выключает lofi
    enabled.value = isMusicEnabled();
  });

  return (
    <button class="sound-toggle" onClick$={onToggle$} aria-label={label}>
      <span class={enabled.value ? 'sound-wave is-on' : 'sound-wave is-off'} />
    </button>
  );
});
