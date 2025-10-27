import { component$, Slot, PropFunction } from '@builder.io/qwik';

import './BigCTA.css'

type BigCtaProps = {
  as?: 'button' | 'a';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  class?: string;
  onClick$?: PropFunction<() => void>;
};

export default component$<BigCtaProps>((props) => {
  const { as = 'button', href, type = 'button', class: cls = '', onClick$ } = props;

  const common = {
    class: `bigcta ${cls}`,
    onMouseEnter$: () => {
      // 3 коротких «тук» с небольшим смещением по времени
      const play = (v: number, t: number) =>
        setTimeout(() => {
          const a = new Audio('/sounds/tick.mp3'); // положи файл сюда
          a.volume = v;
          a.play().catch(() => {});
        }, t);
      play(0.25, 0);
      play(0.22, 80);
      play(0.18, 160);
    },
    onClick$,
  };

  if (as === 'a') {
    return (
      <a href={href} {...common}>
        <span class="arrows left">
          <svg viewBox="0 0 24 24" class="arrow"><path d="M8 5l8 7-8 7" /></svg>
          <svg viewBox="0 0 24 24" class="arrow d2"><path d="M8 5l8 7-8 7" /></svg>
          <svg viewBox="0 0 24 24" class="arrow d3"><path d="M8 5l8 7-8 7" /></svg>
        </span>
        <span class="label"><Slot /></span>
        <span class="arrows right">
          <svg viewBox="0 0 24 24" class="arrow"><path d="M8 5l8 7-8 7" /></svg>
          <svg viewBox="0 0 24 24" class="arrow d2"><path d="M8 5l8 7-8 7" /></svg>
          <svg viewBox="0 0 24 24" class="arrow d3"><path d="M8 5l8 7-8 7" /></svg>
        </span>
      </a>
    );
  }

  return (
    <button type={type} {...common}>
      <span class="arrows left">
        <svg viewBox="0 0 24 24" class="arrow"><path d="M8 5l8 7-8 7" /></svg>
        <svg viewBox="0 0 24 24" class="arrow d2"><path d="M8 5l8 7-8 7" /></svg>
        <svg viewBox="0 0 24 24" class="arrow d3"><path d="M8 5l8 7-8 7" /></svg>
      </span>
      <span class="label"><Slot /></span>
      <span class="arrows right">
        <svg viewBox="0 0 24 24" class="arrow"><path d="M8 5l8 7-8 7" /></svg>
        <svg viewBox="0 0 24 24" class="arrow d2"><path d="M8 5l8 7-8 7" /></svg>
        <svg viewBox="0 0 24 24" class="arrow d3"><path d="M8 5l8 7-8 7" /></svg>
      </span>
    </button>
  );
});