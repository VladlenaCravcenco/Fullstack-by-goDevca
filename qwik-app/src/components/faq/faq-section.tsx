import { component$, useSignal, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './faq-section.css';

const faqs = [
  {
    question: 'Сколько времени занимает создание сайта?',
    answer:
      'Зависит от объёма и сложности проекта: лендинг — от 7 до 14 дней; сайт с CMS и мультиязыком — от 3 недель. Каждый проект начинается с обсуждения сроков и этапов.',
  },
  {
    question: 'Что нужно от меня для начала работы?',
    answer:
      'На старте мне нужны: Краткое описание вашего бизнеса; Примеры сайтов, которые вам нравятся; Структура или черновик контента (если есть); Остальное я помогу сформулировать и соберу в бриф.',
  },
  {
    question: 'Я не разбираюсь в технических деталях — вы всё сделаете?',
    answer:
      'Конечно. Я беру на себя весь процесс: от дизайна до публикации сайта. Вы получите готовый результат и инструкции для управления.',
  },
  {
    question: 'Смогу ли я потом менять тексты и фото самостоятельно?',
    answer:
      'Да! Если в пакете есть CMS (Sanity), вы сможете редактировать проекты, тексты, цены и другие блоки через простой интерфейс.',
  },
  {
    question: 'Чем вы отличаетесь от студий и шаблонных решений?',
    answer:
      'Я не использую шаблоны и не гонюсь за количеством. Каждый сайт — это индивидуальное решение, в котором я продумываю не только визуал, но и структуру, контент, анимации и удобство обновления.',
  },
];

export default component$(() => {
  const openIndex = useSignal<number | null>(null);

  const openCal$ = $(async () => {
  const w = window as any;

  // 0) если Cal уже есть и namespace готов — просто открываем
  if (w.Cal?.ns?.['30min']) {
    w.Cal.ns['30min']('open');
    return;
  }

  // 1) ставим stub Cal с поддержкой init/namespace (как в официальном snippet)
  if (!w.Cal) {
    const d = document;

    w.Cal = function (...args: any[]) {
      const cal = w.Cal;
      cal.q = cal.q || [];
      cal.q.push(args);

      // при первом вызове — подгружаем скрипт
      if (!cal.loaded) {
        cal.loaded = true;
        cal.ns = cal.ns || {};

        const s = d.createElement('script');
        s.src = 'https://app.cal.com/embed/embed.js';
        s.async = true;
        d.head.appendChild(s);
      }

      // init namespace: Cal("init", "30min", {...})
      if (args[0] === 'init' && typeof args[1] === 'string') {
        const namespace = args[1];
        cal.ns[namespace] =
          cal.ns[namespace] ||
          function (...nsArgs: any[]) {
            (cal.ns[namespace].q = cal.ns[namespace].q || []).push(nsArgs);
          };
        cal.ns[namespace].q = cal.ns[namespace].q || [];
      }
    };

    w.Cal.q = w.Cal.q || [];
    w.Cal.ns = w.Cal.ns || {};
  }

  // 2) инициализируем namespace (как в твоём snippet)
  w.Cal('init', '30min', { origin: 'https://app.cal.com' });

  // 3) даём скрипту чуть времени появиться и потом открываем
  //    (в проде обычно хватает 50-150мс)
  const waitForNs = async () => {
    for (let i = 0; i < 50; i++) {
      if (w.Cal?.ns?.['30min']) return true;
      await new Promise((r) => setTimeout(r, 20));
    }
    return false;
  };

  const ok = await waitForNs();
  if (!ok) return;

  // 4) UI настройки (один раз)
  w.Cal.ns['30min']('ui', { hideEventTypeDetails: false, layout: 'month_view' });

  // 5) открыть
  w.Cal.ns['30min']('open', {
    calLink: 'godevca/30min',
    config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
  });
});

  return (
    <section class="faq container">
      <div class="faq__header">
        <h2>FAQ</h2>
        <p class="faq__description">
          Коротко отвечаю на самые частые вопросы, которые помогают вам понять процесс
        </p>
      </div>

      <div class="faq__grid">
        {/* LEFT */}
        <ul class="faq__list">
          {faqs.map((item, index) => (
            <li
              key={index}
              class={{
                faq__item: true,
                open: openIndex.value === index,
              }}
              onClick$={() => {
                openIndex.value = openIndex.value === index ? null : index;
              }}
            >
              <div class="faq__question">
                <span>{item.question}</span>
                <span class="faq__icon">{openIndex.value === index ? '▲' : '▼'}</span>
              </div>
              {openIndex.value === index && <div class="faq__answer">{item.answer}</div>}
            </li>
          ))}
        </ul>

        {/* RIGHT */}
        <aside class="faq__side">
          <h3 class="faq__sideTitle">остались вопросы?</h3>
          <p class="faq__sideText">Забронируй звонок на 30 минут со мной.</p>

          <button type="button" class="faq__bookBtn" onClick$={openCal$}>
            забронировать консультацию
          </button>
        </aside>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Частые вопросы',
  meta: [
    {
      name: 'description',
      content: 'Ответы на популярные вопросы по созданию сайтов и шаблонов.',
    },
  ],
};