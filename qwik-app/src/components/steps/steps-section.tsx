import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import './StepsSection.css';

export default component$(() => {
  const index = useSignal(0);

  // подгони под свою верстку карточек (ширина + gap)
  const cardWidth = 360;
  const gap = 18;
  const stepPx = cardWidth + gap;

  const steps = [
    {
      title: 'Брифинг',
      description:
        'Собираю информацию о вашем бизнесе, целях и задачах сайта.',
      button: 'заполнить бриф',
      image: '/images/steps/step1.png',
    },
    {
      title: 'Анализ и поиск решений',
      description:
        'Исследую конкурентов, целевую аудиторию и предлагаю лучшие подходы к структуре и подаче.',
      button: 'забронировать звонок',
      image: '/images/steps/step2.png',
    },
    {
      title: 'Прототипирование',
      description:
        'Создаю логическую схему сайта и размещение блоков без визуала.',
      button: 'узнать больше',
      image: '/images/steps/step3.png',
    },
    {
      title: 'Дизайн',
      description:
        'Делаю индивидуальный, адаптивный и визуально продуманный интерфейс в Figma.',
      button: 'узнать цены',
      image: '/images/steps/step4.png',
    },
    {
      title: 'Вёрстка',
      description:
        'Переношу дизайн в код: адаптивно, быстро и чисто на Qwik или React.',
      button: 'подробнее',
      image: '/images/steps/step5.png',
    },
    {
      title: 'CMS в Sanity',
      description:
        'Подключаю админку Sanity, чтобы вы могли менять контент через интерфейс.',
      button: 'узнать больше',
      image: '/images/steps/step6.png',
    },
    {
      title: 'SEO через код',
      description:
        'Прописываю мета-теги, заголовки, alt и структуру — сайт будет понятен Google.',
      button: 'узнать цены',
      image: '/images/steps/step7.png',
    },
    {
      title: 'Запуск на Vercel',
      description:
        'Публикую сайт на хостинге, настраиваю домен, всё проверяю.',
      button: 'запросить звонок',
      image: '/images/steps/step8.png',
    },
  ];

  const maxIndex = steps.length - 1;

  const prev$ = $(() => {
    index.value = Math.max(0, index.value - 1);
  });

  const next$ = $(() => {
    index.value = Math.min(maxIndex, index.value + 1);
  });

  // свайп на мобилке
  const touch = useStore({ x: 0, down: false });

  const onTouchStart$ = $((e: TouchEvent) => {
    touch.down = true;
    touch.x = e.touches[0]?.clientX ?? 0;
  });

  const onTouchEnd$ = $((e: TouchEvent) => {
    if (!touch.down) return;
    touch.down = false;

    const endX = e.changedTouches[0]?.clientX ?? 0;
    const dx = endX - touch.x;

    if (Math.abs(dx) < 40) return;

    if (dx > 0) prev$();
    else next$();
  });

  return (
    <section class="steps" id="process">
      <div class="container steps__layout">
        {/* LEFT */}
        <div class="steps__meta">
          <h2 class="steps__title">Процесс работы<br/>по шагам</h2>
          <p class="steps__subtitle"> В результате вы получаете рабочий сайт, доступный в интернете, готовый к продвижению.</p>

          <div class="steps__controls">
            <button class="steps__btn" onClick$={prev$} disabled={index.value === 0} aria-label="Назад">
              ‹
            </button>
            <button class="steps__btn" onClick$={next$} disabled={index.value === maxIndex} aria-label="Вперёд">
              ›
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div class="steps__rail" onTouchStart$={onTouchStart$} onTouchEnd$={onTouchEnd$}>
         

          <div
            class="steps__track"
            style={{
              transform: `translateX(-${index.value * stepPx}px)`,
              '--cardW': `${cardWidth}px`,
              '--gap': `${gap}px`,
            }}
          >
            {steps.map((s, i) => (
              <article key={i} class="steps__card">
                <div class="steps__card-top">
                  <div class="steps__num">{String(i + 1).padStart(2, '0')}</div>
                  <h3 class="steps__card-title">{s.title}</h3>
                </div>

                {steps[i].image && (
                  <div class="steps__decor" aria-hidden="true">
                    <img class="steps__decor-img" src={s.image} alt="" />
                  </div>
                )}

                <p class="steps__card-text">{s.description}</p>

                
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});