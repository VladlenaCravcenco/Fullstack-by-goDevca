import { component$, useSignal, useStore, $ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { getLocaleFromPathname } from '~/lib/i18n';
import './StepsSection.css';

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const index = useSignal(0);
  const cardWidth = 360;
  const gap = 18;
  const stepPx = cardWidth + gap;

  const copy = {
    ru: {
      title: 'Процесс работы\nпо шагам',
      subtitle: 'В результате вы получаете рабочий сайт, доступный в интернете, готовый к продвижению.',
      prev: 'Назад',
      next: 'Вперёд',
      steps: [
        ['Брифинг', 'Собираю информацию о вашем бизнесе, целях и задачах сайта.'],
        ['Анализ и поиск решений', 'Исследую конкурентов, целевую аудиторию и предлагаю лучшие подходы к структуре и подаче.'],
        ['Прототипирование', 'Создаю логическую схему сайта и размещение блоков без визуала.'],
        ['Дизайн', 'Делаю индивидуальный, адаптивный и визуально продуманный интерфейс в Figma.'],
        ['Вёрстка', 'Переношу дизайн в код: адаптивно, быстро и чисто на Qwik или React.'],
        ['CMS в Sanity', 'Подключаю админку Sanity, чтобы вы могли менять контент через интерфейс.'],
        ['SEO через код', 'Прописываю мета-теги, заголовки, alt и структуру, чтобы сайт был понятен Google.'],
        ['Запуск на Vercel', 'Публикую сайт на хостинге, настраиваю домен и всё проверяю.'],
      ],
    },
    ro: {
      title: 'Procesul de lucru\npas cu pas',
      subtitle: 'La final primești un site funcțional, publicat online și pregătit pentru promovare.',
      prev: 'Înapoi',
      next: 'Înainte',
      steps: [
        ['Briefing', 'Colectez informația despre businessul tău, obiective și sarcinile site-ului.'],
        ['Analiză și căutarea soluției', 'Analizez concurența, publicul țintă și propun cea mai bună structură și prezentare.'],
        ['Prototipare', 'Construiesc schema logică a site-ului și poziționarea blocurilor fără partea vizuală.'],
        ['Design', 'Creez o interfață individuală, adaptivă și bine gândită în Figma.'],
        ['Front-end', 'Transform designul în cod: responsive, rapid și curat în Qwik sau React.'],
        ['CMS în Sanity', 'Conectez adminul Sanity ca să poți actualiza conținutul printr-o interfață simplă.'],
        ['SEO prin cod', 'Setez meta taguri, heading-uri, alt-uri și structură pentru claritate în Google.'],
        ['Lansare pe Vercel', 'Public site-ul, conectez domeniul și verific totul înainte de livrare.'],
      ],
    },
    en: {
      title: 'Process\nstep by step',
      subtitle: 'In the end you get a live website ready for promotion and available online.',
      prev: 'Back',
      next: 'Next',
      steps: [
        ['Briefing', 'I collect information about your business, goals and what the website needs to achieve.'],
        ['Research and solution finding', 'I study competitors, target audience and define the strongest structure and message.'],
        ['Wireframing', 'I create the logical website structure and block placement before visual design.'],
        ['Design', 'I build a custom, responsive and visually considered interface in Figma.'],
        ['Development', 'I translate the design into clean, fast, responsive code in Qwik or React.'],
        ['CMS in Sanity', 'I connect a Sanity admin so you can update content through a simple interface.'],
        ['SEO in code', 'I define meta tags, headings, alt text and structure so the site is clear to Google.'],
        ['Launch on Vercel', 'I publish the website, configure the domain and run final checks.'],
      ],
    },
  }[locale];

  const steps = copy.steps.map(([title, description], idx) => ({
    title,
    description,
    image: `/images/steps/step${idx + 1}.png`,
  }));

  const maxIndex = steps.length - 1;

  const prev$ = $(() => {
    index.value = Math.max(0, index.value - 1);
  });

  const next$ = $(() => {
    index.value = Math.min(maxIndex, index.value + 1);
  });

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
        <div class="steps__meta">
          <h2 class="steps__title">
            {copy.title.split('\n')[0]}
            <br />
            {copy.title.split('\n')[1]}
          </h2>
          <p class="steps__subtitle">{copy.subtitle}</p>

          <div class="steps__controls">
            <button class="steps__btn" onClick$={prev$} disabled={index.value === 0} aria-label={copy.prev}>
              ‹
            </button>
            <button class="steps__btn" onClick$={next$} disabled={index.value === maxIndex} aria-label={copy.next}>
              ›
            </button>
          </div>
        </div>

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

                {s.image && (
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
