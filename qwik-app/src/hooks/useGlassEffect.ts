// src/hooks/useHoverActive.ts
import { useVisibleTask$, useSignal } from '@builder.io/qwik';

export const useGlassEffect = () => {
  const wrapperRef = useSignal<HTMLElement>();
  const targetRef = useSignal<HTMLElement>();

  useVisibleTask$(() => {
    const btn = targetRef.value;
    const wrap = wrapperRef.value;
    if (!btn || !wrap) return;

    const onEnter = () => wrap.classList.add('hover');
    const onLeave = () => wrap.classList.remove('hover');
    const onDown = () => wrap.classList.add('active');
    const onUp = () => wrap.classList.remove('active');

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);
    btn.addEventListener('mousedown', onDown);
    btn.addEventListener('mouseup', onUp);

    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
      btn.removeEventListener('mousedown', onDown);
      btn.removeEventListener('mouseup', onUp);
    };
  });

  return { wrapperRef, targetRef };
};