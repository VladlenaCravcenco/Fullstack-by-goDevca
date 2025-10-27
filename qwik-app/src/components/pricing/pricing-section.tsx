
import type { DocumentHead } from '@builder.io/qwik-city';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { component$ } from '@builder.io/qwik';
import { Form, routeAction$ } from '@builder.io/qwik-city';
import './PricingSection.css';

export const useCustomBrief = routeAction$(async (data) => {
  if (data.hp) return { ok: true }; // honeypot антиспам
  return { ok: true };
});

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
      'сложные или 3D-анимации',
      'Мультиязычность',
      'блог/дополнительные страницы',
      'CRM-интеграции',
      'Поддержка и сопровождение'
    ],
    postSlug: 'landing-examples'
  },
  {
    name: 'Business',
    description: 'Хорошо подходит для агентств, салонов, магазинов и фрилансеров, которые хотят выглядеть профессионально.',
    oldPrice: '€949',
    price: '€690',
    button: 'Обсудить задачу',
    included: [
      'многостраничный сайт (3–5 страниц)',
      'Адаптив под телефон',
      'Анимации наведения и прокрутки',
      'подключение аналитики (Google)',
      'Форма обратной связи (почта или Telegram)',
      'Настройка Домена + хостинга',
      'Расширенное SEO: страницы хорошо индексируются',
      '2 языка (RU + RO)',
      '2 круга правок'
    ],
    excluded: [
      'Редактирование контента',
      'блог',
      'сложные или 3D-анимации',
      'CRM-интеграции',
      'Поддержка и сопровождение'
    ],
    postSlug: 'business-examples'
  },
  {
    name: 'Premium',
    description: 'Подходит компаниям, личным брендам и студиям, которые хотят управлять контентом и выглядеть как топовые сайты на рынке.',
    oldPrice: '€1849',
    price: '€1290',
    button: 'Отправить бриф',
    included: [
      '5+ страниц / сложная структура',
      'Адаптив под телефон',
      'CMS (редактирование контента)',
      'Форма обратной связи (почта или Telegram)',
      'Расширенное SEO: страницы хорошо индексируются',
      'многоязычие (RU, RO, EN…)',
      'Кастомный UI + микроанимации',
      'лёгкие 3D-эффекты',
      'Поддержка и сопровождение'
    ],
    excluded: [
      'сложное 3D',
      'CRM',
      'калькуляторы'
    ],
    postSlug: 'premium-examples'
  },
  {
    name: 'Custom',
    description: 'Под задачи без ограничений. Напишите, что нужно — подберу решение и вернусь с идеей и бюджетом',
    oldPrice: '',
    price: '',
    button: 'Рассчитать мой проект',
    type: 'custom',
    included: [
      'Любое количество страниц',
      'любой дизайн и логика',
      '3D / WebGL',
      'CRM, боты, калькуляторы',
      'SEO-структура (теги, OG, alt, ...)',
      'многоязычие (RU, RO, EN…)',
      'Анимации и микроинтерактив',
      '3D, интерактив, WebGL',
      'SEO + Оптимизация скорости',
      'Поддержка и сопровождение'
    ],
    excluded: [],
    postSlug: 'custom-examples'
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
                  <Form action={useCustomBrief()} class="custom-brief__form">
                    <input name="hp" aria-hidden="true" tabIndex={-1} class="hp" />

                    <label class="custom-brief__label">
                      Направление
                      <select name="topic" required class="custom-brief__field">
                        <option value="landing">Лендинг</option>
                        <option value="multipage">Многостраничный</option>
                        <option value="seo">SEO / структура</option>
                        <option value="3d">3D / WebGL</option>
                        <option value="crm">CRM / калькулятор</option>
                        <option value="custom">Другое</option>
                      </select>
                    </label>

                    <label class="custom-brief__label">
                      Email
                      <input type="email" name="email" required placeholder="you@email.com" class="custom-brief__field" />
                    </label>

                    <label class="custom-brief__label">
                      Коротко о задаче
                      <textarea name="idea" rows={4} placeholder="Опишите идею или задачу…" class="custom-brief__field" />
                    </label>

                    <GlassEffect class="custom-brief__submit">
                      <button type="submit">{plan.button}</button>
                    </GlassEffect>

                    <p class="custom-brief__note">Отвечу в течение 30 минут (будни 09:00–18:00).</p>
                  </Form>
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