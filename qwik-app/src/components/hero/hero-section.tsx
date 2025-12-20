import { component$, useVisibleTask$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './HeroSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { playGlassHover } from '~/utils/sounds';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {

  useVisibleTask$(() => {
  const el = document.querySelector<HTMLElement>('[data-reveal]');
  if (!el) return;

  requestAnimationFrame(() => {
    el.classList.add('is-in');
  });
});
  return (
    <>
      <section class="hero">
        <div class="container">
          <div class="hero__content">
            <div class="hero__left">
              <h1 class="hero-title" data-reveal>
                <span class="line" style="--d: 0ms">Сайты,</span>
                <span class="line" style="--d: 220ms">которые двигают бизнес</span>
              </h1>
              <h2>Cravcenco Vladlena</h2>
              <h4>web-designer & frontend developer</h4>
              <p>
                Адаптивные лендинги с маркетинговой структурой на <strong>Qwik</strong>,<br /> полностью готовые к индексации в Google.
              </p>

              <div class="hero__buttons">
                <GlassEffect class="btn btn--primary"> <Link href="/projects" onMouseEnter$={() => playGlassHover()}
                  onPointerDown$={() => playGlassHover()}>Посмотреть кейсы</Link></GlassEffect>
              </div>
            </div>


          </div>
        </div>
      </section>
    </>
  );

});

export const head: DocumentHead = {
  title: 'Обо мне',
  meta: [
    {
      name: 'description',
      content:
        'Всё началось с желания сделать сайт для своей анимационной студии uhappy.md',
    },
  ],
};