
import type { DocumentHead } from '@builder.io/qwik-city';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { component$ } from '@builder.io/qwik';

import './PricingSection.css';


const plans = [
  {
    name: 'Starter',
    description: 'Сайт-визитка / одностраничный лендинг для старта и рекламы.',
    oldPrice: '€449',
    price: '€290',
    button: 'Выбрать пакет',
    included: [
      '1 страница (лендинг)',
      'Современный дизайн под твой стиль и нишу',
      'Адаптив под телефон',
      'Форма обратной связи (почта или Telegram)',
      'Плавные базовые анимации',
      'Базовое SEO: сайт видно в Google',
      'Настройка Домена + хостинга',
      '1 круг правок'
    ],
    excluded: [
      'Редактирование контента',
      'Сложные или 3D-анимации',
      'Мультиязычность',
      'Блог / дополнительные страницы',
      'CRM-интеграции',
      'Поддержка и сопровождение'
    ],
    postSlug: 'landing-examples'
  },
  {
    name: 'Business',
    description: 'Подходит для агентств, салонов и фрилансеров, которые хотят выглядеть профессионально.',
    oldPrice: '€949',
    price: '€690',
    button: 'Обсудить задачу',
    included: [
      '3–5 страниц',
      'Адаптив под телефон',
      'Анимации наведения и прокрутки',
      'Подключение аналитики (Google)',
      'Форма обратной связи (почта или Telegram)',
      'Настройка Домена + хостинга',
      'Расширенное SEO',
      '2 языка (RU + RO)',
      '2 круга правок'
    ],
    excluded: [
      'Редактирование контента',
      'Блог',
      'Сложные или 3D-анимации',
      'CRM-интеграции',
      'Поддержка и сопровождение'
    ],
    postSlug: 'business-examples'
  },
  {
    name: 'Premium',
    description: 'Для брендов и компаний, которые хотят управлять контентом и выглядеть топово.',
    oldPrice: '€1849',
    price: '€1290',
    button: 'Отправить бриф',
    included: [
      '5+ страниц / сложная структура',
      'CMS (редактирование контента)',
      'Адаптив под телефон',
      'Форма обратной связи (почта или Telegram)',
      'Расширенное SEO',
      'Многоязычие (RU, RO, EN...)',
      'Кастомный UI + микроанимации',
      'Лёгкие 3D-эффекты',
      'Поддержка и сопровождение'
    ],
    excluded: [
      'Сложное 3D',
      'CRM',
      'Калькуляторы'
    ],
    postSlug: 'premium-examples'
  },
  {
    name: 'Custom',
    description: 'Под задачи без ограничений. Напишите, что нужно — подберу решение и вернусь с идеей и бюджетом.',
    type: 'custom',
    button: 'Рассчитать мой проект',
    included: [
      'Любое количество страниц',
      'Любой дизайн и логика',
      '3D / WebGL',
      'CRM, боты, калькуляторы',
      'SEO-структура (теги, OG, alt, ...)',
      'Многоязычие (RU, RO, EN…)',
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
    <section class="pricing" id="pricing">
      <div class="container">
        <h2 class="pricing__title">Цены</h2>
        <p class="pricing__text">
          Я собрала пакеты, в которых есть всё, чтобы сайт выглядел современно и работал без переплат.
          Выберите нужный сейчас — и доработаете позже.
        </p>

        <div class="pricing__grid">
          {plans.map((plan, index) => (
            <div class="pricing-card" key={index}>
              <div class="pricing_top-info">
                <h3 class="pricing-card__name">{plan.name}</h3>
                <p class="pricing-card__desc">{plan.description}</p>
              </div>

              {/* центральная часть: цена/форма */}
              {plan.type !== 'custom' ? (
                <div>
                  {plan.oldPrice && <p class="pricing-card__old">{plan.oldPrice}</p>}
                  <p class="pricing-card__price">{plan.price}</p>
                  <GlassEffect class="pricing-card__btn">
                    <a href="/brief">{plan.button}</a>
                  </GlassEffect>
                </div>
              ) : (
                <section class="custom-brief">
                  <form action="/brief" method="get" class="custom-form" noValidate>
                    <fieldset class="chip-group">
                      <legend class="sr-only">What do you need help with?</legend>

                      {[
                        ['design', 'Design', '🎨'],
                        ['marketing', 'Marketing', '📈'],
                        ['dev', 'Software Development', '⚙️'],
                        ['nocode', 'No-code dev', '🧩'],
                        ['copy', 'Copywriting', '✍️'],
                        ['qa', 'QA', '🐞'],
                        ['unknown', 'Not sure', '❓'],
                      ].map(([value, label, icon]) => (
                        <span class="chip" key={value}>
                          <input
                            type="radio"
                            id={`need-${value}`}
                            name="type"
                            value={value}
                            checked={value === 'design'}
                          />
                          <label for={`need-${value}`}><i aria-hidden="true">{icon}</i>{label}</label>
                        </span>
                      ))}
                    </fieldset>
                    <label class="custom-form__label">
                      Ваша почта
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="you@email.com"
                        inputMode="email"
                        autoComplete="email"
                      />
                    </label>

                    <label>
                      Пару слов об идее
                      <textarea name="idea" rows={4} />
                    </label>

                    {/* honeypot антиспам */}
                    <input type="text" name="hp" tabIndex={-1} autoComplete="off" style="display:none" />
                    <GlassEffect class="custom-form__btn">
                      <button type="submit" class="custom-form__btn-inner">Отправить</button>
                    </GlassEffect>
                    
                  </form>
                </section>
              )}

              {/* списки "входит" и "не входит" — не трогаем */}
              <ul class="pricing-card__features">
                {plan.included.map((item, i) => (
                  <li key={`in-${i}`} class="included">
                    {item}
                  </li>
                ))}
                {plan.excluded.map((item, i) => (
                  <li key={`ex-${i}`} class="excluded">
                    {item}
                  </li>
                ))}
              </ul>

              {/* ссылка "Посмотреть примеры" — только не для custom */}
              {plan.type !== 'custom' && (
                <a href={`/blog/${plan.postSlug}`} class="more-link">
                  Посмотреть примеры
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Пакеты и цены',
  meta: [
    {
      name: 'description',
      content: 'Выберите пакет разработки сайта, подходящий под вашу задачу — от лендинга до полного кастомного проекта.'
    },
  ],
};