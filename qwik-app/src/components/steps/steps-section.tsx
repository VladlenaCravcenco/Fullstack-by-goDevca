import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './StepsSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';

export default component$(() => {
  const activeStep = useSignal(0);

  // === ТАЙМЕР / ПРОГРЕСС (сигналы) ===
  const DURATION = 5_000;                 // 5 секунд
  const remaining = useSignal(DURATION);  // сколько осталось у текущей карточки
  const startedAt = useSignal(0);
  const isPaused = useSignal(false);
  const timerId = useSignal<ReturnType<typeof setTimeout> | null>(null);
  const barKey = useSignal(0);         // перезапуск CSS-анимации

  // Триггер «перезапустить таймер на ms»
  const restartMs = useSignal<number | null>(null);
  const steps = [
    {
      title: 'Брифинг',
      description:
        'Собираю информацию о вашем бизнесе, целях и задачах сайта. Это нужно, чтобы сайт решал реальные задачи, а не просто “красиво выглядел”.',
      image: '/images/steps/step1.png',
      button: 'заполнить бриф',
    },
    {
      title: 'Анализ и поиск решений',
      description:
        'Исследую конкурентов, целевую аудиторию и предлагаю лучшие подходы к структуре и подаче. Без этого сайт будет “в никуда” — я строю стратегию, а не просто интерфейс.',
      image: '/images/steps/step2.png',
      button: 'забронировать звонок',
    },
    {
      title: 'Прототипирование',
      description:
        'Создаю логическую схему сайта и размещение блоков без визуала. Нужно, чтобы проверить структуру до погружения в дизайн — это экономит время и правки.',
      image: '/images/steps/step3.png',
      button: 'узнать больше',
    },
    {
      title: 'Дизайн',
      description:
        'Делаю индивидуальный, адаптивный и визуально продуманный интерфейс в Figma. На этом этапе рождается лицо сайта — красиво, удобно, узнаваемо.',
      image: '/images/steps/step4.png',
      button: 'узнать цены',
    },
    {
      title: 'Вёрстка',
      description:
        'Переношу дизайн в код: адаптивно, быстро и чисто на Qwik или React. Сайт начинает “жить” и работать во всех браузерах и на всех устройствах.',
      image: '/images/steps/step5.png',
      button: 'подробнее',
    },
    {
      title: 'CMS в Sanity',
      description:
        'Подключаю админку Sanity, чтобы вы могли менять контент через интерфейс. Вы больше не зависите от программиста — меняйте тексты и проекты сами.',
      image: '/images/steps/step6.png',
      button: 'узнать больше',
    },
    {
      title: 'SEO через код',
      description:
        'Прописываю мета-теги, заголовки, alt и структуру — сайт будет понятен Google. Это нужно, чтобы сайт не просто был, а индексировался и приводил клиентов.',
      image: '/images/steps/step7.png',
      button: 'узнать цены',
    },
    {
      title: 'Запуск на Vercel',
      description:
        'Публикую сайт на хостинге, настраиваю домен, всё проверяю. В результате вы получаете рабочий сайт, доступный в интернете, готовый к продвижению.',
      image: '/images/steps/step8.png',
      button: 'запросить звонок',
    },
  ];

  // ==== ТОЛЬКО МЕНЯЕМ СИГНАЛЫ В ОБРАБОТЧИКАХ ====
  const pause$ = $(() => {
    if (!isPaused.value) {
      isPaused.value = true;
      const elapsed = Date.now() - startedAt.value;
      remaining.value = Math.max(0, remaining.value - elapsed);
      if (timerId.value) { clearTimeout(timerId.value); timerId.value = null; }
      // CSS-анимация тоже стопается классом .paused — это в JSX
    }
  });

  const resume$ = $(() => {
    if (isPaused.value) {
      isPaused.value = false;
      // Просим перезапуск на оставшееся время
      restartMs.value = remaining.value;
    }
  });

  const openStep$ = $((index: number) => {
    activeStep.value = index;
    isPaused.value = false;
    remaining.value = DURATION;
    restartMs.value = DURATION; // новая «пятёрка» для выбранной карточки
  });

  // ==== ВСЯ ЛОГИКА СТАРТА/АВТОПЕРЕКЛЮЧЕНИЯ — ТОЛЬКО В useVisibleTask$ ====
  useVisibleTask$(({ track, cleanup }) => {
    // локальная функция (НЕ QRL), безопасна для клиента
    const startInternal = (ms: number) => {
      if (timerId.value) { clearTimeout(timerId.value); timerId.value = null; }
      remaining.value = ms;
      startedAt.value = Date.now();
      barKey.value++; // перезапуск CSS-анимации с 0

      timerId.value = setTimeout(() => {
        // авто-переход
        activeStep.value = (activeStep.value + 1) % steps.length;
        // и новый цикл на полную длительность
        startInternal(DURATION);
      }, ms);
    };

    // 1) первый запуск
    startInternal(DURATION);

    // 2) следим за запросами перезапуска из обработчиков
    track(() => restartMs.value);
    if (restartMs.value !== null) {
      startInternal(restartMs.value);
      restartMs.value = null;
    }

    // 3) на всякий случай чистим таймер при размонтировании
    cleanup(() => {
      if (timerId.value) clearTimeout(timerId.value);
    });
  });

  return (
    <section class="steps" id="process">
      <div class="container">
        <h2 class="steps__title">Процесс работы по шагам</h2>
        <p class="steps__subtitle">Как я создаю сайт, который работает</p>

        <div class="steps__content">
          <div class="steps__left">
            {steps.map((step, index) => (
              <div
                key={index}
                class={`step-card ${activeStep.value === index ? 'active' : ''}`}
                onClick$={() => openStep$(index)}
                onMouseDown$={pause$} onMouseUp$={resume$} onMouseLeave$={resume$}
                onTouchStart$={pause$} onTouchEnd$={resume$}
              >
                <div class="step-card__header">
                  <div class="step-card__number">{String(index + 1).padStart(2, '0')}</div>
                  <div class="step-card__title">{step.title}</div>
                  <div class="step-card__toggle">⌵</div>
                </div>

                {activeStep.value === index && (
                  <div class="step-card__body">
                    <img src={step.image} alt={step.title} />
                    <p>{step.description}</p>


                    <div class="buttprog">
                      <GlassEffect class="step-card__btn">{step.button}</GlassEffect>
                      {/* ПРОГРЕСС-БАР — чистая CSS-анимация */}
                      <div class="step-card__progress">
                        <div
                          key={barKey.value}                               /* перезапуск анимации */
                          class={`step-card__bar ${isPaused.value ? 'paused' : ''}`}
                          style={{ '--dur': `${remaining.value}ms` }}      /* текущая длительность */
                        />
                      </div>
                    </div>

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
  meta: [{ name: 'description', content: 'Всё началось с желания…' }],
};