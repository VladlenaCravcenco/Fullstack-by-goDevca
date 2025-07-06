import {component$, useSignal} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'
import './StepsSection.scss';

export default component$(() => {
  const activeStep = useSignal(0);

  const steps = [
    {
      title: 'Брифинг',
      description:
        'Собираю информацию о вашем бизнесе, целях и задачах сайта. Это нужно, чтобы сайт решал реальные задачи, а не просто “красиво выглядел”.',
      image: '/images/steps/step1.png',
    },
    {
      title: 'Анализ и поиск решений',
      description:
        'Исследую конкурентов, целевую аудиторию и предлагаю лучшие подходы к структуре и подаче. Без этого сайт будет “в никуда” — я строю стратегию, а не просто интерфейс.',
      image: '/images/steps/step2.png',
    },
    {
      title: 'Прототипирование',
      description:
        'Создаю логическую схему сайта и размещение блоков без визуала. Нужно, чтобы проверить структуру до погружения в дизайн — это экономит время и правки.',
      image: '/images/steps/step2.png',
    },
    {
      title: 'Дизайн',
      description:
        'Делаю индивидуальный, адаптивный и визуально продуманный интерфейс в Figma. На этом этапе рождается лицо сайта — красиво, удобно, узнаваемо.',
      image: '/images/steps/step2.png',
    },
    {
      title: 'Вёрстка',
      description:
        'Переношу дизайн в код: адаптивно, быстро и чисто на Qwik или React. Сайт начинает “жить” и работать во всех браузерах и на всех устройствах.',
      image: '/images/steps/step2.png',
    },
    {
      title: 'CMS в Sanity',
      description:
        'Подключаю админку Sanity, чтобы вы могли менять контент через интерфейс. Вы больше не зависите от программиста — меняйте тексты и проекты сами.',
      image: '/images/steps/step2.png',
    },
    {
      title: 'SEO через код',
      description:
        'Прописываю мета‑теги, заголовки, alt и структуру — сайт будет понятен Google. Это нужно, чтобы сайт не просто был, а индексировался и приводил клиентов.',
      image: '/images/steps/step2.png',
    },
    {
      title: 'Запуск на Vercel',
      description:
        'Публикую сайт на хостинге, настраиваю домен, всё проверяю. В результате вы получаете рабочий сайт, доступный в интернете, готовый к продвижению.',
      image: '/images/steps/step2.png',
    },
    // Добавишь остальные шаги аналогично
  ];

  return (
    <section class="steps">
      <div class="container">
        <h2 class="steps__title">Процесс работы по шагам</h2>
        <p class="steps__subtitle">Как я создаю сайт, который работает</p>

        <div class="steps__content">
          <div class="steps__left">
            {steps.map((step, index) => (
              <div
                key={index}
                class={`step-card ${activeStep.value === index ? 'active' : ''}`}
                onClick$={() => (activeStep.value = index)}
              >
                <div class="step-card__header">
                  <div class="step-card__number">{String(index + 1).padStart(2, '0')}</div>
                  <div class="step-card__title">{step.title}</div>
                  <div class="step-card__toggle">⌵</div>
                </div>

                {activeStep.value === index && (
                  <div class="step-card__body">
                    <p>{step.description}</p>
                    <button class="step-card__btn">Узнать цены</button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div class="steps__right">
            <img src={steps[activeStep.value].image} alt={steps[activeStep.value].title} />
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