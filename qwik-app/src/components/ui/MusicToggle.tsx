import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import { toggleMusic, isMusicEnabled, restoreMusicState, playGlassHover } from '~/utils/sounds';
import './musictoggle.css'

export const MusicToggle = component$(() => {
  const enabled = useSignal(false);

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
    <button class="sound-toggle" onClick$={onToggle$} aria-label="Музыка">
      <span class={enabled.value ? 'sound-wave is-on' : 'sound-wave is-off'} />
    </button>
  );
});