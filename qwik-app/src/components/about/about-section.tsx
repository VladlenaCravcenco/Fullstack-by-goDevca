import type { DocumentHead } from '@builder.io/qwik-city';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { component$ } from '@builder.io/qwik';
import GoogleReviews from '~/components/reviews/GoogleReviews';

import './about-me.css';

type DesignItem =
  | { type: 'image'; src: string; alt: string; href?: string }
  | { type: 'video'; src: string; poster?: string; href?: string };

export default component$(() => {
  const designItems: DesignItem[] = [
    {
      type: 'image',
      src: '/images/design/preview-1.jpg',
      alt: 'Design project preview 1',
      href: 'https://go-de-vca.vercel.app',
    },
    {
      type: 'video',
      src: '/videos/design/preview-2.mp4',
      poster: '/images/design/preview-2-poster.jpg',
      href: 'https://go-de-vca.vercel.app',
    },
    {
      type: 'image',
      src: '/images/design/preview-3.jpg',
      alt: 'Design project preview 3',
      href: 'https://go-de-vca.vercel.app',
    },
  ];

  return (
    <section class="about-me" id="about">
      <div class="container">
        <div class="about-me__grid">
          <div class="card photo">
            <img src="/images/me.jpg" alt="Vladlena Cravcenco" />
          </div>

          <div class="card about-text">
            <h2>Давайте знакомиться</h2>
            <p>
              Я занимаюсь дизайном и разработкой сайтов, которые помогают брендам становиться понятнее, сильнее и заметнее
              в цифровой среде.
            </p>
            <p>
              Более 2 лет я работаю в сфере дизайна и разработки, сотрудничая с маркетинговым агентством GrowUp Agency и
              студией Mornin Digital. За это время я прошла путь от первых проектов до комплексных решений для бизнеса —
              с фокусом на структуру, UX и вовлечённость пользователей.
            </p>
            <p>
              Вне работы я исследую 3D-визуализацию, UI-анимации и Blender-сцены, вдохновляюсь восточной эстетикой и
              философией. Эти интересы напрямую влияют на мой визуальный язык и помогают находить нестандартные решения
              для проектов.
            </p>
          </div>

          <div class="card contact">
            <h2>Кравченко Владлена</h2>
            <h3>web-designer & frontend developer</h3>
            <a href="https://bento.me/godevca">bento.me</a>
            <p>
              Помимо сайтов я также создаю рекламные креативы, презентации, 3D-анимации в Blender и дизайн-шаблоны.
            </p>
            <GlassEffect class="design-portfolio-btn">
              <a href="https://go-de-vca.vercel.app" target="_blank" rel="noopener">
                Открыть дизайн-портфолио
              </a>
            </GlassEffect>
          </div>

          <div class="card education">
            <h3>Образование</h3>
            <ul>
              <li>
                <strong>2017</strong> — Cours web design – Vanar.md
              </li>
              <li>
                <strong>2018–2023</strong> — USM, Information and Communication Technologies
              </li>
              <li>
                <strong>2022–2024</strong> — Skillbox, Web design from scratch to PRO
              </li>
            </ul>
          </div>

          <div class="card skills">
            <h3>Инструменты, которыми владею</h3>
            <div class="tags">
              <span>photoshop</span>
              <span>Figma</span>
              <span>VS Code</span>
              <span>Sanity</span>
              <span>Qwik</span>
              <span>React</span>
              <span>illustrator</span>
              <span>HTML</span>
              <span>CSS</span>
              <span>React.js</span>
              <span>Tilda</span>
            </div>
          </div>

          {/* ✅ НОВАЯ КАРТОЧКА С ПРЕВЬЮ */}
          <div class="card design-preview">
            <div class="design-preview__head">
              <h3>Дизайн-проекты</h3>
              <a class="design-preview__link" href="https://go-de-vca.vercel.app" target="_blank" rel="noopener">
                Смотреть всё
              </a>
            </div>

            <div class="design-preview__grid">
              {designItems.slice(0, 3).map((item, idx) => {
                const href = item.href || 'https://go-de-vca.vercel.app';

                return (
                  <a
                    key={idx}
                    class="design-preview__item"
                    href={href}
                    target="_blank"
                    rel="noopener"
                    aria-label="Открыть дизайн-портфолио"
                  >
                    {item.type === 'image' ? (
                      <img class="design-preview__media" src={item.src} alt={item.alt} loading="lazy" />
                    ) : (
                      <video
                        class="design-preview__media"
                        src={item.src}
                        poster={item.poster}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                      />
                    )}
                    <span class="design-preview__overlay">Открыть</span>
                  </a>
                );
              })}
            </div>

            
          </div>

          <div class="card review">
            <GoogleReviews placeId="ChIJCc4IYn5LMYsRype3iidGuFY" />
          </div>
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Обо мне',
  meta: [
    {
      name: 'description',
      content: 'Всё началось с желания сделать сайт для своей анимационной студии uhappy.md',
    },
  ],
};