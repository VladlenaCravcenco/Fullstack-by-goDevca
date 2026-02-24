import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
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

  useVisibleTask$(() => {
    if ((window as any).Cal) return;

    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    (window as any).Cal("init", "30min", { origin: "https://app.cal.com" });

    (window as any).Cal.ns["30min"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
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

        <button
          class="faq__bookBtn"
          type="button"
          data-cal-link="godevca/30min"
          data-cal-namespace="30min"
          data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        >
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