
import type { DocumentHead } from '@builder.io/qwik-city';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { component$ } from '@builder.io/qwik';
import GoogleReviews from '~/components/reviews/GoogleReviews';

import './about-me.css';

export default component$(() => {
  return (
    <section class="about-me" id='about'>
      <div class="container">
        <div class="about-me__grid">

          <div class="card photo">
            <img src="/images/me.jpg" alt="Vladlena Cravcenco" />
          </div>

          <div class="card about-text">
            <h2>Давайте знакомиться</h2>
            <p>Я занимаюсь дизайном и разработкой сайтов, которые помогают брендам становиться понятнее, сильнее и заметнее в цифровой среде.</p>
            <p>Более 2 лет я работаю в сфере дизайна и разработки, сотрудничая с маркетинговым агентством GrowUp Agency и студией Mornin Digital. За это время я прошла путь от первых проектов до комплексных решений для бизнеса — с фокусом на структуру, UX и вовлечённость пользователей.</p>
            <p>Вне работы я исследую 3D-визуализацию, UI-анимации и Blender-сцены, вдохновляюсь восточной эстетикой и философией. Эти интересы напрямую влияют на мой визуальный язык и помогают находить нестандартные решения для проектов.</p>
          </div>

          <div class="card contact">
            <h2>Кравченко Владлена</h2>
            <h3>web-designer & frontend developer</h3>
            <a href="https://bento.me/godevca">bento.me</a>
            <p>Помимо сайтов я также создаю рекламные креативы, презентации, 3D-анимации в Blender и дизайн-шаблоны.</p>
            <GlassEffect class="design-portfolio-btn"><a href="https://go-de-vca.vercel.app">Открыть дизайн-портфолио</a></GlassEffect>
          </div>

          <div class="card education">
            <h3>Образование</h3>
            <ul>
              <li><strong>2017</strong> — Cours web design – Vanar.md</li>
              <li><strong>2018–2023</strong> — USM, Information and Communication Technologies</li>
              <li><strong>2022–2024</strong> — Skillbox, Web design from scratch to PRO</li>
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