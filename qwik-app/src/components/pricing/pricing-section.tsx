
import type { DocumentHead } from '@builder.io/qwik-city';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { component$ } from '@builder.io/qwik';
import './PricingSection.css';

const plans = [
  {
    name: 'Starter',
    description: 'Для тех, кто хочет запуститься быстро и просто.',
    oldPrice: '€649',
    price: '€390',
    button: 'Выбрать пакет',
    included: [
      'Адаптивный лендинг (1 страница)',
      'Чистая верстка на Qwik',
      'Форма + отправка',
      'Домен + хостинг (Vercel)',
    ],
    excluded: [
      'CMS Sanity (тексты, проекты, ...)',
      'Анимации',
      'SEO-настройка',
      'Мультиязычность',
      'Оптимизация скорости',
      'Поддержка и сопровождение'
    ]
  },
  {
    name: 'Business',
    description: 'Оптимально для услуг, портфолио и проектов с обновляемым контентом.',
    oldPrice: '€1349',
    price: '€890',
    button: 'Выбрать пакет',
    included: [
      '3–5 страниц (Услуги, Проекты, ...)',
      'Чистая верстка на Qwik/React',
      'Форма + отправка',
      'Домен + хостинг (Vercel)',
      'CMS Sanity (тексты, проекты, ...)',
      'SEO-структура (теги, OG, alt, ...)',
      'Мультиязычность'
    ],
    excluded: [
      'Анимации',
      'Оптимизация скорости',
      'Поддержка и сопровождение'
    ]
  },
  {
    name: 'Premium',
    description: 'Для тех, кому нужен сайт, который выделяется, масштабируется и продаёт.',
    oldPrice: '€2449',
    price: '€1990',
    button: 'Выбрать пакет',
    included: [
      '5+ страниц / сложная структура',
      'Чистая верстка на Qwik/React',
      'CMS Sanity (тексты, проекты, ...)',
      'Форма + отправка',
      'SEO-структура (теги, OG, alt, ...)',
      'Расширенная мультиязычность',
      'Кастомный UI + микроанимации',
      'Оптимизация скорости',
      'Поддержка и сопровождение'
    ],
    excluded: []
  },
  {
    name: 'Custom',
    description: 'Для тех, кому нужен нестандартный сайт под конкретные задачи, интеграции и анимации',
    oldPrice: '',
    price: 'от 2500€+',
    button: 'Обсудить задачу',
    included: [
      'Любое количество страниц',
      'Чистая верстка на Qwik/React',
      'Гибкая CMS (тексты, проекты, ...)',
      'Интеграции (Airtable, Telegram...)',
      'SEO-структура (теги, OG, alt, ...)',
      'Расширенная мультиязычность',
      'Анимации и микроинтерактив',
      '3D, интерактив, WebGL',
      'SEO + Оптимизация скорости',
      'Поддержка и сопровождение'
    ],
    excluded: []
  }
];

export default component$(() => {
  return (
    <section class="pricing" id='pricing'>
      <div class="container">
        <h2 class="pricing__title">Цены</h2>
        <p class="pricing__text">
          Не всем нужен навороченный сайт с анимациями, админкой и мультиязычностью.
          Я собрала три сбалансированных пакета, в которых есть всё, чтобы сайт работал, загружался и продавал — без переплат за то, что вам не нужно.
          Выберите подходящее сейчас — и сможете доработать позже.
        </p>
        <div class="pricing__grid">
          {plans.map((plan, index) => (
            <div class="pricing-card" key={index}>
              <div class="pricing_top-info">
                <h3 class="pricing-card__name">{plan.name}</h3>
                <p class="pricing-card__desc">{plan.description}</p>
              </div>
              <div>
                {plan.oldPrice && <p class="pricing-card__old">{plan.oldPrice}</p>}
                <p class="pricing-card__price">{plan.price}</p>
                <GlassEffect class="pricing-card__btn">{plan.button}</GlassEffect>
              </div>
              <ul class="pricing-card__features">
                {plan.included.map((item, i) => (
                  <li key={`in-${i}`} class="included">
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 2.47266C8.39303 2.47266 6.82214 2.94918 5.486 3.84197C4.14985 4.73476 3.10844 6.00371 2.49348 7.48836C1.87852 8.97301 1.71762 10.6067 2.03112 12.1828C2.34463 13.7589 3.11846 15.2066 4.25476 16.3429C5.39106 17.4792 6.8388 18.2531 8.4149 18.5666C9.99099 18.8801 11.6247 18.7192 13.1093 18.1042C14.594 17.4893 15.8629 16.4479 16.7557 15.1117C17.6485 13.7756 18.125 12.2047 18.125 10.5977C18.1227 8.44347 17.266 6.37817 15.7427 4.85493C14.2195 3.33169 12.1542 2.47493 10 2.47266ZM13.5672 9.16485L9.19219 13.5399C9.13415 13.598 9.06522 13.6441 8.98934 13.6756C8.91347 13.707 8.83214 13.7232 8.75 13.7232C8.66787 13.7232 8.58654 13.707 8.51067 13.6756C8.43479 13.6441 8.36586 13.598 8.30782 13.5399L6.43282 11.6649C6.31554 11.5476 6.24966 11.3886 6.24966 11.2227C6.24966 11.0568 6.31554 10.8978 6.43282 10.7805C6.55009 10.6632 6.70915 10.5973 6.875 10.5973C7.04086 10.5973 7.19992 10.6632 7.31719 10.7805L8.75 12.2141L12.6828 8.28047C12.7409 8.2224 12.8098 8.17634 12.8857 8.14491C12.9616 8.11349 13.0429 8.09731 13.125 8.09731C13.2071 8.09731 13.2884 8.11349 13.3643 8.14491C13.4402 8.17634 13.5091 8.2224 13.5672 8.28047C13.6253 8.33854 13.6713 8.40748 13.7027 8.48335C13.7342 8.55922 13.7504 8.64054 13.7504 8.72266C13.7504 8.80478 13.7342 8.8861 13.7027 8.96197C13.6713 9.03784 13.6253 9.10678 13.5672 9.16485Z" fill="#27272A" />
                    </svg>
                    {item}
                  </li>
                ))}
                {plan.excluded.map((item, i) => (
                  <li key={`ex-${i}`} class="excluded">
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect y="0.722656" width="18" height="18" fill="url(#pattern0_66_4935)" />
                      <defs>
                        <pattern id="pattern0_66_4935" patternContentUnits="objectBoundingBox" width="1" height="1">
                          <use xlink:href="#image0_66_4935" transform="scale(0.0555556)" />
                        </pattern>
                        <image id="image0_66_4935" width="18" height="18" preserveAspectRatio="none" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAEqADAAQAAAABAAAAEgAAAACaqbJVAAAB7UlEQVQ4EY1Uz0sCQRSecS0tQwiK2JtCQV07BR0Kii576GBUdknsh5Hg3+AfEdH2QzxVLHnosJcwxFP/QQUVegwsSHG1hfQ1b3V2dVmzuczM+773zXvf7A4hfYYsywO5XM7dh0aoEyGVul4VBLrPsAVCqK/FAY2tswCNs0gkrNrzuoRk+XLM43FfU0qW7MTOPQC507RSKB6PV3ncFEIRr9f9wIBJDv41AzRfNO1zlou5OBkr+a8I5lDqmvL5xjM83xBCTxzaqXOSNUPFWqMYWUmnrySMGUJtYzs59XL5fZSVf8GDAHBeKDyNE2IXE/ZMIQC6yBPa85DfP3GkqpkYiqGIqt4cBALTx6wOfzcXlnFPk0llMBgkejfY2qEIiuFOkkIy82XHiVcoPAouUSRDTmArRqE3ZiGiKAp4/TSdVqrMuGELYk6028FKMI6VOVcF2vb2xgiajafmkWwNqBSLT3GeiC1J0tpJsfh8aDeb5Ri5xq01m03jVEuI+oPBmVKnJ5TSXYzZzW404BTzzC+btZd1+JYsbYcV+1XuI5F149aMipCj6z+bzJc3B36v0GulUg1z0BSKxbY+dP1rDk/hYK8ZObXa93wiEWWttobZGg/gzJ8R/FCt28RnhOTRk2h087aT/681PmyKogj9yL970cDTkTmPXwAAAABJRU5ErkJggg==" />
                      </defs>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
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