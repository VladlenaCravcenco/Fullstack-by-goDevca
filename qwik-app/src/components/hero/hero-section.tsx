import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { CalendlyBadge } from './../CalendlyBadge';
import './HeroSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { playGlassHover } from '~/utils/sounds';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <section class="hero">
        <div class="container">
          <div class="hero__content">
            <div class="hero__left">
              <h1>
                От идеи и дизайна до полноценного запуска Вашего сайта
              </h1>
              <h3>Cravcenco Vladlena</h3>
              <h5>web-designer & frontend developer</h5>
              <p>
                Разрабатываю адаптивные лендинги с маркетинговой структурой на <strong>Qwik</strong> и корпоративные сайты на <strong>React</strong>, полностью готовые к индексации в поисковых системах.
              </p>

              <div class="hero__buttons">
                <GlassEffect class="btn btn--primary"> <Link href="/projects" onMouseEnter$={() => playGlassHover()}
                  onPointerDown$={() => playGlassHover()}>Посмотреть кейсы</Link></GlassEffect>
                <GlassEffect class="btn btn--secondary" ><Link href="/faq" onMouseEnter$={() => playGlassHover()}
                  onPointerDown$={() => playGlassHover()}>Обсудить проект</Link></GlassEffect>
              </div>
            </div>

            <div class="hero__right">
              <div class="hero__video-wrapper">
                <iframe
                  class="hero__video"
                  src="https://www.youtube.com/embed/hB1f1QsPDXI"
                  title="Visit card for Fiverr profile"
                  style="border: none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CalendlyBadge />
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