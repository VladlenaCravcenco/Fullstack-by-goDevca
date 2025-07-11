
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
    <section class="pricing">
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
                    <span class="icon-check" /> {item}
                  </li>
                ))}
                {plan.excluded.map((item, i) => (
                  <li key={`ex-${i}`} class="excluded">
                    <span class="icon-cross" /> {item}
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