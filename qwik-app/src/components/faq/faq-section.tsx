import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './faq-section.css';
import { GlassEffect } from '~/components/ui/GlassEffect';


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

  return (
    <section class="faq container">
      <h2>FAQ</h2>
      <p class="faq__description">
        Коротко отвечаю на самые частые вопросы, которые помогают вам понять процесс
      </p>

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



      <div class="faq__cta" id='faq'>
        <p>Не нашли интересующий вас вопрос?</p>
        <GlassEffect class="faq__btn" >
          Забронируйте звонок на 30 минут
        </GlassEffect>
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