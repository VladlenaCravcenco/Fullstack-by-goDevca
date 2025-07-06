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
        'Изучаю конкурентов, целевую аудиторию и UX-паттерны. Формирую подход к решению.',
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