
import type {DocumentHead} from '@builder.io/qwik-city';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { component$ } from '@builder.io/qwik';
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
            <p>Всё началось с желания сделать сайт для своей анимационной студии uhappy.md. Теперь дизайн — это не просто моя работа, а часть моего образа мышления.</p>
            <p>Я в профессии более 2 лет и сейчас работаю графическим дизайнером в маркетинговом агентстве GrowUp Agency и студии Mornin Digital. Занимаюсь всем понемногу: от брендбуков и баннеров до полноценных лендингов с кастомным кодом и WordPress-интеграцией.</p>
            <p>С детства я в творчестве: 10 лет занималась танцами, 11 лет работала детским аниматором (4 года — руководителем команды), увлекаюсь японской и китайской культурой, философией и эстетикой. А ещё — люблю кататься на роликах и исследовать 3D визуализацию: от UI-анимаций до Blender-сцен.</p>
            <p>Больше всего ценю состояние потока: музыка включена, ум чист, идеи льются прямо в Figma. Мне нравится оживлять сайты, делать их тактильными и интерактивными — чтобы проект был не просто “норм”, а “вау”.</p>
          </div>

          <div class="card contact">
            <h3>Кравченко Владлена Александровна</h3>
            <p>email: godevca@gmail.com</p>
            <p>Telegram: @Cravcenco_frontend</p>
            <p>Instagram: vladlenacravcenco</p>
            <p>Помимо сайтов я также создаю рекламные креативы, презентации, 3D-анимации в Blender и дизайн-шаблоны.</p>
            <GlassEffect class="design-portfolio-btn">Открыть дизайн-портфолио</GlassEffect>
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