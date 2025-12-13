import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './HeroSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { playGlassHover } from '~/utils/sounds';
import { Link } from '@builder.io/qwik-city';
import ProjectBriefForm from '~/components/forms/ProjectBriefForm';
import GoogleReviews from '~/components/reviews/GoogleReviews';

export default component$(() => {
  return (
    <>
      <section class="hero">
        <div class="container">
          <div class="hero__content">
            <div class="hero__left">
              <h1>
                Cайты, которые двигают бизнес
              </h1>
              <h2>Cravcenco Vladlena</h2>
              <h4>web-designer & frontend developer</h4>
              <p>
                Адаптивные лендинги с маркетинговой структурой на <strong>Qwik</strong>,<br/> полностью готовые к индексации в Google.
              </p>

              <div class="hero__buttons">
                <GlassEffect class="btn btn--primary"> <Link href="/projects" onMouseEnter$={() => playGlassHover()}
                  onPointerDown$={() => playGlassHover()}>Посмотреть кейсы</Link></GlassEffect>
                <GlassEffect class="btn btn--secondary" ><Link href="/faq" onMouseEnter$={() => playGlassHover()}
                  onPointerDown$={() => playGlassHover()}>Обсудить проект</Link></GlassEffect>
              </div>
              <GoogleReviews placeId="ChIJCc4IYn5LMYsRype3iidGuFY" />
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
              <div class="simple-form">
                <ProjectBriefForm />
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