import { component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import './faq-section.css';
import { getLocaleFromPathname } from '~/lib/i18n';

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const openIndex = useSignal<number | null>(null);
  const copy = {
    ru: {
      title: 'FAQ',
      description: 'Коротко отвечаю на самые частые вопросы, которые помогают вам понять процесс',
      sideTitle: 'остались вопросы?',
      sideText: 'Забронируй звонок на 30 минут со мной.',
      book: 'забронировать консультацию',
      faqs: [
        ['Сколько времени занимает создание сайта?', 'Зависит от объёма и сложности проекта: лендинг от 7 до 14 дней, сайт с CMS и мультиязыком от 3 недель.'],
        ['Что нужно от меня для начала работы?', 'На старте мне нужны описание бизнеса, примеры сайтов, которые вам нравятся, и черновик контента, если он уже есть.'],
        ['Я не разбираюсь в технических деталях, вы всё сделаете?', 'Да. Я беру на себя весь процесс: от дизайна до публикации сайта и передачи инструкции.'],
        ['Смогу ли я потом менять тексты и фото самостоятельно?', 'Да. Если в проекте есть CMS Sanity, вы сможете редактировать контент через простой интерфейс.'],
        ['Чем вы отличаетесь от студий и шаблонных решений?', 'Я не работаю по шаблону. Каждый сайт собирается под конкретную задачу, структуру и контент бизнеса.'],
      ],
    },
    ro: {
      title: 'FAQ',
      description: 'Răspund pe scurt la cele mai frecvente întrebări ca să înțelegi procesul mai clar',
      sideTitle: 'mai sunt întrebări?',
      sideText: 'Programează un apel de 30 de minute cu mine.',
      book: 'rezervă consultația',
      faqs: [
        ['Cât durează crearea unui site?', 'Depinde de volum și complexitate: un landing durează de obicei 7-14 zile, iar un site cu CMS și multilingv de la 3 săptămâni.'],
        ['Ce trebuie să pregătesc pentru start?', 'Am nevoie de o descriere scurtă a businessului, exemple de site-uri care îți plac și, dacă există, un draft de conținut.'],
        ['Nu mă pricep la partea tehnică, te ocupi de tot?', 'Da. Preiau întregul proces, de la design până la lansare și predare.'],
        ['Voi putea schimba ulterior textele și pozele?', 'Da. Dacă proiectul include Sanity CMS, vei putea actualiza conținutul singur printr-o interfață simplă.'],
        ['Prin ce te diferențiezi de studiouri și șabloane?', 'Nu lucrez cu template-uri standard. Fiecare site este construit pentru contextul, structura și obiectivele businessului tău.'],
      ],
    },
    en: {
      title: 'FAQ',
      description: 'Short answers to the most common questions so you can understand the process quickly',
      sideTitle: 'still have questions?',
      sideText: 'Book a 30-minute call with me.',
      book: 'book a consultation',
      faqs: [
        ['How long does a website take to build?', 'It depends on scope and complexity: a landing page usually takes 7-14 days, while a CMS and multilingual site starts from 3 weeks.'],
        ['What do you need from me to get started?', 'I need a short description of your business, examples of websites you like and any rough content structure if you already have one.'],
        ['I do not understand technical details, will you handle everything?', 'Yes. I take care of the full process from design to launch and handoff.'],
        ['Will I be able to update text and images myself later?', 'Yes. If the project includes Sanity CMS, you will be able to edit content yourself through a simple interface.'],
        ['What makes you different from agencies and template solutions?', 'I do not work from generic templates. Every site is built around the specific goal, structure and content of the business.'],
      ],
    },
  }[locale];

  const faqs = copy.faqs.map(([question, answer]) => ({ question, answer }));

  return (
    <section class="faq container">
      <div class="faq__header">
        <h2>{copy.title}</h2>
        <p class="faq__description">{copy.description}</p>
      </div>

      <div class="faq__grid">
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

        <aside class="faq__side">
          <h3 class="faq__sideTitle">{copy.sideTitle}</h3>
          <p class="faq__sideText">{copy.sideText}</p>

          <button
            type="button"
            class="faq__bookBtn"
            data-cal-link="godevca/30min"
            data-cal-namespace="30min"
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
          >
            {copy.book}
          </button>
        </aside>
      </div>
    </section>
  );
});
