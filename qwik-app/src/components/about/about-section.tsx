import { GlassEffect } from '~/components/ui/GlassEffect';
import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import GoogleReviews from '~/components/reviews/GoogleReviews';
import { getLocaleFromPathname } from '~/lib/i18n';

import './about-me.css';

type DesignItem =
  | { type: 'image'; src: string; alt: string; href?: string }
  | { type: 'video'; src: string; poster?: string; href?: string };

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const designItems: DesignItem[] = [
    {
      type: 'image',
      src: '/images/design/preview-1.jpg',
      alt: 'Design project preview 1',
      href: 'https://go-de-vca.vercel.app',
    },
    {
      type: 'video',
      src: '/videos/design/preview-2.MP4',
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

  const copy = {
    ru: {
      title: 'Давайте знакомиться',
      about: [
        'Я занимаюсь дизайном и разработкой сайтов, которые помогают брендам становиться понятнее, сильнее и заметнее в цифровой среде.',
        'Более 2 лет я работаю в сфере дизайна и разработки, сотрудничая с маркетинговым агентством GrowUp Agency и студией Mornin Digital.',
        'Вне работы я исследую 3D-визуализацию, UI-анимации и Blender-сцены. Эти интересы влияют на мой визуальный язык и помогают находить нестандартные решения.',
      ],
      role: 'web-designer & frontend developer',
      extra: 'Помимо сайтов я также создаю рекламные креативы, презентации, 3D-анимации в Blender и дизайн-шаблоны.',
      portfolio: 'Открыть дизайн-портфолио',
      education: 'Образование',
      skills: 'Инструменты, которыми владею',
      designProjects: 'Дизайн-проекты',
      showAll: 'Смотреть всё',
      openPortfolio: 'Открыть дизайн-портфолио',
      open: 'Открыть',
    },
    ro: {
      title: 'Hai sa ne cunoastem',
      about: [
        'Ma ocup cu designul si dezvoltarea de site-uri care ajuta brandurile sa devina mai clare, mai puternice si mai vizibile in mediul digital.',
        'De peste 2 ani lucrez in design si dezvoltare, colaborand cu GrowUp Agency si studioul Mornin Digital.',
        'In afara muncii explorez vizualizarea 3D, animatiile UI si scenele din Blender. Aceste directii influenteaza limbajul meu vizual si ma ajuta sa gasesc solutii diferite.',
      ],
      role: 'web designer & frontend developer',
      extra: 'Pe langa site-uri, creez si creatii publicitare, prezentari, animatii 3D in Blender si sabloane de design.',
      portfolio: 'Deschide portofoliul de design',
      education: 'Educatie',
      skills: 'Instrumente pe care le folosesc',
      designProjects: 'Proiecte de design',
      showAll: 'Vezi tot',
      openPortfolio: 'Deschide portofoliul de design',
      open: 'Deschide',
    },
    en: {
      title: 'Let us get acquainted',
      about: [
        'I design and build websites that help brands become clearer, stronger and more visible in the digital space.',
        'For over 2 years I have been working in design and development, collaborating with GrowUp Agency and Mornin Digital.',
        'Outside of work I explore 3D visualisation, UI animation and Blender scenes. These interests shape my visual language and help me find less obvious solutions.',
      ],
      role: 'web designer & frontend developer',
      extra: 'Beyond websites I also create ad creatives, presentations, 3D animations in Blender and design templates.',
      portfolio: 'Open design portfolio',
      education: 'Education',
      skills: 'Tools I work with',
      designProjects: 'Design projects',
      showAll: 'View all',
      openPortfolio: 'Open design portfolio',
      open: 'Open',
    },
  }[locale];

  return (
    <section class="about-me" id="about">
      <div class="container">
        <div class="about-me__grid">
          <div class="card photo">
            <img src="/images/me.jpg" alt="Vladlena Cravcenco" />
          </div>

          <div class="card about-text">
            <h2>{copy.title}</h2>
            {copy.about.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <div class="card contact">
            <h2>Кравченко Владлена</h2>
            <h3>{copy.role}</h3>
            <a href="https://bento.me/godevca">bento.me</a>
            <p>{copy.extra}</p>
            <GlassEffect class="design-portfolio-btn">
              <a href="https://go-de-vca.vercel.app" target="_blank" rel="noopener">
                {copy.portfolio}
              </a>
            </GlassEffect>
          </div>

          <div class="card education">
            <h3>{copy.education}</h3>
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
            <h3>{copy.skills}</h3>
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

          <div class="card design-preview">
            <div class="design-preview__head">
              <h3>{copy.designProjects}</h3>
              <a class="design-preview__link" href="https://go-de-vca.vercel.app" target="_blank" rel="noopener">
                {copy.showAll}
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
                    aria-label={copy.openPortfolio}
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
                    <span class="design-preview__overlay">{copy.open}</span>
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
