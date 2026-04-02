import { component$, useVisibleTask$, $ } from '@builder.io/qwik';
import { DocumentHead, useLocation } from '@builder.io/qwik-city';
import { getLocaleFromPathname } from '~/lib/i18n';
import './brief-page.css';

const briefCopy = {
  ru: {
    title: 'Бриф на разработку сайта',
    subtitle:
      'Ответьте на несколько вопросов, этого достаточно, чтобы я предложила подходящее решение.',
    navLabel: 'Навигация по брифу',
    nav: ['Контактные данные', 'О проекте', 'Целевая аудитория', 'Формат сайта', 'Детали'],
    sections: {
      contacts: 'Контактные данные',
      about: 'О проекте',
      audience: 'Целевая аудитория',
      format: 'Формат сайта',
      details: 'Детали',
    },
    fields: {
      name: 'Имя *',
      email: 'Email *',
      contact: 'Телефон / мессенджер',
      contactPlaceholder: 'Telegram / WhatsApp',
      projectDescription: 'Кратко опишите ваш проект *',
      projectDescriptionPlaceholder: 'Что вы делаете и для кого',
      goal: 'Зачем вам сайт?',
      goalPlaceholder: 'Продажи, презентация, запуск продукта и т.д.',
      cta: 'Что должен сделать пользователь на сайте?',
      ctaPlaceholder: 'Оставить заявку / купить / написать',
      audience: 'Кто ваш клиент?',
      audiencePlaceholder: 'Возраст, страна, тип клиентов',
      usp: 'Почему выбирают именно вас?',
      uspPlaceholder: 'Уникальность, сильные стороны',
      siteType: 'Какой сайт вам нужен?',
      references: 'Примеры сайтов, которые нравятся',
      referencesPlaceholder: '2-5 ссылок',
      antiReferences: 'Что не нравится на других сайтах',
      antiReferencesPlaceholder: 'Коротко, без воды',
      style: 'Какой стиль вы ожидаете?',
      stylePlaceholder: 'Минимализм, премиум, технологично',
      materials: 'Что у вас уже есть?',
      materialsPlaceholder: 'Логотип, тексты, фото / ничего',
      deadline: 'Сроки',
      deadlinePlaceholder: 'Срочно / в течение месяца / без сроков',
      budget: 'Ориентировочный бюджет',
      comment: 'Дополнительные комментарии',
      commentPlaceholder: 'Любые пожелания или важные детали',
    },
    selects: {
      choose: 'Выберите',
      landing: 'Лендинг',
      corporate: 'Корпоративный сайт',
      shop: 'Интернет-магазин',
      unknown: 'Нужна консультация',
      budget1: 'до 500 €',
      budget2: '500-1000 €',
      budget3: '1000-2000 €',
      discussion: 'Обсуждается',
    },
    submit: 'отправить бриф',
    success: 'Спасибо! Бриф отправлен.',
    error: 'Ошибка при отправке. Попробуйте позже.',
    headTitle: 'Бриф на разработку сайта | godevca',
    headDescription: 'Короткий и удобный бриф для заказа сайта',
  },
  ro: {
    title: 'Brief pentru dezvoltarea site-ului',
    subtitle:
      'Răspunde la câteva întrebări, iar asta va fi suficient ca să îți propun soluția potrivită.',
    navLabel: 'Navigare prin brief',
    nav: ['Date de contact', 'Despre proiect', 'Public țintă', 'Formatul site-ului', 'Detalii'],
    sections: {
      contacts: 'Date de contact',
      about: 'Despre proiect',
      audience: 'Public țintă',
      format: 'Formatul site-ului',
      details: 'Detalii',
    },
    fields: {
      name: 'Nume *',
      email: 'Email *',
      contact: 'Telefon / messenger',
      contactPlaceholder: 'Telegram / WhatsApp',
      projectDescription: 'Descrie pe scurt proiectul tău *',
      projectDescriptionPlaceholder: 'Ce faci și pentru cine',
      goal: 'De ce ai nevoie de site?',
      goalPlaceholder: 'Vânzări, prezentare, lansare de produs etc.',
      cta: 'Ce ar trebui să facă utilizatorul pe site?',
      ctaPlaceholder: 'Să lase cerere / să cumpere / să scrie',
      audience: 'Cine este clientul tău?',
      audiencePlaceholder: 'Vârstă, țară, tip de clienți',
      usp: 'De ce va aleg anume pe voi?',
      uspPlaceholder: 'Unicitate, puncte forte',
      siteType: 'Ce tip de site îți trebuie?',
      references: 'Exemple de site-uri care îți plac',
      referencesPlaceholder: '2-5 linkuri',
      antiReferences: 'Ce nu îți place la alte site-uri',
      antiReferencesPlaceholder: 'Pe scurt, fără apă',
      style: 'Ce stil aștepți?',
      stylePlaceholder: 'Minimalist, premium, tehnologic',
      materials: 'Ce ai deja?',
      materialsPlaceholder: 'Logo, texte, foto / nimic',
      deadline: 'Termene',
      deadlinePlaceholder: 'Urgent / în decurs de o lună / fără termen',
      budget: 'Buget orientativ',
      comment: 'Comentarii suplimentare',
      commentPlaceholder: 'Orice dorințe sau detalii importante',
    },
    selects: {
      choose: 'Alege',
      landing: 'Landing page',
      corporate: 'Site corporate',
      shop: 'Magazin online',
      unknown: 'Am nevoie de consultație',
      budget1: 'până la 500 €',
      budget2: '500-1000 €',
      budget3: '1000-2000 €',
      discussion: 'Se discută',
    },
    submit: 'trimite brief-ul',
    success: 'Mulțumesc! Brief-ul a fost trimis.',
    error: 'Eroare la trimitere. Încearcă mai târziu.',
    headTitle: 'Brief pentru dezvoltarea site-ului | godevca',
    headDescription: 'Brief scurt și comod pentru comanda unui site',
  },
  en: {
    title: 'Website project brief',
    subtitle:
      'Answer a few questions and that will be enough for me to suggest the right solution.',
    navLabel: 'Brief navigation',
    nav: ['Contact details', 'About the project', 'Target audience', 'Website format', 'Details'],
    sections: {
      contacts: 'Contact details',
      about: 'About the project',
      audience: 'Target audience',
      format: 'Website format',
      details: 'Details',
    },
    fields: {
      name: 'Name *',
      email: 'Email *',
      contact: 'Phone / messenger',
      contactPlaceholder: 'Telegram / WhatsApp',
      projectDescription: 'Briefly describe your project *',
      projectDescriptionPlaceholder: 'What you do and who it is for',
      goal: 'Why do you need a website?',
      goalPlaceholder: 'Sales, presentation, product launch, etc.',
      cta: 'What should the user do on the website?',
      ctaPlaceholder: 'Leave a request / buy / message you',
      audience: 'Who is your customer?',
      audiencePlaceholder: 'Age, country, type of clients',
      usp: 'Why do people choose you specifically?',
      uspPlaceholder: 'Uniqueness, strong points',
      siteType: 'What type of website do you need?',
      references: 'Examples of websites you like',
      referencesPlaceholder: '2-5 links',
      antiReferences: 'What do you dislike on other websites',
      antiReferencesPlaceholder: 'Short and specific',
      style: 'What style do you expect?',
      stylePlaceholder: 'Minimal, premium, tech-forward',
      materials: 'What do you already have?',
      materialsPlaceholder: 'Logo, copy, photos / nothing',
      deadline: 'Timeline',
      deadlinePlaceholder: 'Urgent / within a month / no strict deadline',
      budget: 'Estimated budget',
      comment: 'Additional comments',
      commentPlaceholder: 'Any wishes or important details',
    },
    selects: {
      choose: 'Choose',
      landing: 'Landing page',
      corporate: 'Corporate website',
      shop: 'Online store',
      unknown: 'I need consultation',
      budget1: 'up to 500 €',
      budget2: '500-1000 €',
      budget3: '1000-2000 €',
      discussion: 'To be discussed',
    },
    submit: 'send brief',
    success: 'Thanks! Your brief has been sent.',
    error: 'Submission failed. Please try again later.',
    headTitle: 'Website project brief | godevca',
    headDescription: 'A short and convenient website brief form',
  },
} as const;

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = briefCopy[locale];

  useVisibleTask$(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.emailjs.com/dist/email.min.js';
    script.onload = () => {
      // @ts-expect-error emailjs is loaded from CDN, no TS types
      emailjs.init('ri4YXprL5WW09Yl-B');
    };
    document.body.appendChild(script);

    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const scroller = document.querySelector('#brief-form') as HTMLElement | null;
    if (!scroller) return;

    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.brief_nav__link[href^="#"]'));

    const setActive = (hash: string) => {
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === hash));
    };

    const scrollToHash = (hash: string) => {
      const target = document.querySelector(hash) as HTMLElement | null;
      if (!target) return;

      const topOffset = 140;
      const targetTop = target.getBoundingClientRect().top;
      const scrollerTop = scroller.getBoundingClientRect().top;

      scroller.scrollTo({
        top: scroller.scrollTop + (targetTop - scrollerTop) - topOffset,
        behavior: 'smooth',
      });

      setActive(hash);
    };

    links.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const hash = a.getAttribute('href');
        if (!hash) return;
        scrollToHash(hash);
      });
    });

    const fieldsets = Array.from(scroller.querySelectorAll<HTMLElement>('fieldset[id]'));
    const onScroll = () => {
      const topLine = scroller.getBoundingClientRect().top + 160;
      let current: string | null = null;

      for (const fs of fieldsets) {
        const r = fs.getBoundingClientRect();
        if (r.top <= topLine) current = `#${fs.id}`;
      }

      if (current) setActive(current);
    };

    scroller.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  });

  const handleSubmit = $((e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    // @ts-expect-error emailjs is loaded from CDN and has no TS types
    emailjs
      .sendForm('service_n7rshy8', 'template_d4ohs9n', form)
      .then(() => {
        alert(copy.success);
        form.reset();
      })
      .catch(() => {
        alert(copy.error);
      });
  });

  return (
    <section class="brief_container">
      <div class="brief_left">
        <h1>{copy.title}</h1>

        <p class="brief__subtitle">{copy.subtitle}</p>

        <nav class="brief_nav" aria-label={copy.navLabel}>
          <a class="brief_nav__link" href="#contacts">
            {copy.nav[0]}
          </a>
          <a class="brief_nav__link" href="#about">
            {copy.nav[1]}
          </a>
          <a class="brief_nav__link" href="#audience">
            {copy.nav[2]}
          </a>
          <a class="brief_nav__link" href="#format">
            {copy.nav[3]}
          </a>
          <a class="brief_nav__link" href="#details">
            {copy.nav[4]}
          </a>
        </nav>
      </div>

      <div class="brief_right">
        <form id="brief-form" preventdefault:submit onSubmit$={handleSubmit}>
          <fieldset id="contacts">
            <h2>{copy.sections.contacts}</h2>

            <label>
              {copy.fields.name}
              <input type="text" name="name" required />
            </label>

            <label>
              {copy.fields.email}
              <input type="email" name="email" required />
            </label>

            <label>
              {copy.fields.contact}
              <input type="text" name="contact" placeholder={copy.fields.contactPlaceholder} />
            </label>
          </fieldset>

          <fieldset id="about">
            <h2>{copy.sections.about}</h2>

            <label>
              {copy.fields.projectDescription}
              <textarea
                name="project_description"
                rows={3}
                required
                placeholder={copy.fields.projectDescriptionPlaceholder}
              />
            </label>

            <label>
              {copy.fields.goal}
              <textarea name="goal" rows={2} placeholder={copy.fields.goalPlaceholder} />
            </label>

            <label>
              {copy.fields.cta}
              <input type="text" name="cta" placeholder={copy.fields.ctaPlaceholder} />
            </label>
          </fieldset>

          <fieldset id="audience">
            <h2>{copy.sections.audience}</h2>

            <label>
              {copy.fields.audience}
              <textarea name="audience" rows={2} placeholder={copy.fields.audiencePlaceholder} />
            </label>

            <label>
              {copy.fields.usp}
              <textarea name="usp" rows={2} placeholder={copy.fields.uspPlaceholder} />
            </label>
          </fieldset>

          <fieldset id="format">
            <h2>{copy.sections.format}</h2>

            <label>
              {copy.fields.siteType}
              <select name="site_type">
                <option value="">{copy.selects.choose}</option>
                <option value="landing">{copy.selects.landing}</option>
                <option value="corporate">{copy.selects.corporate}</option>
                <option value="shop">{copy.selects.shop}</option>
                <option value="unknown">{copy.selects.unknown}</option>
              </select>
            </label>

            <label>
              {copy.fields.references}
              <textarea name="references" rows={2} placeholder={copy.fields.referencesPlaceholder} />
            </label>

            <label>
              {copy.fields.antiReferences}
              <textarea name="anti_references" rows={2} placeholder={copy.fields.antiReferencesPlaceholder} />
            </label>
          </fieldset>

          <fieldset id="details">
            <h2>{copy.sections.details}</h2>

            <label>
              {copy.fields.style}
              <input type="text" name="style" placeholder={copy.fields.stylePlaceholder} />
            </label>

            <label>
              {copy.fields.materials}
              <input type="text" name="materials" placeholder={copy.fields.materialsPlaceholder} />
            </label>

            <label>
              {copy.fields.deadline}
              <input type="text" name="deadline" placeholder={copy.fields.deadlinePlaceholder} />
            </label>

            <label>
              {copy.fields.budget}
              <select name="budget">
                <option value="">{copy.selects.choose}</option>
                <option value="до 500">{copy.selects.budget1}</option>
                <option value="500-1000">{copy.selects.budget2}</option>
                <option value="1000-2000">{copy.selects.budget3}</option>
                <option value="discussion">{copy.selects.discussion}</option>
              </select>
            </label>

            <label>
              {copy.fields.comment}
              <textarea name="comment" rows={3} placeholder={copy.fields.commentPlaceholder} />
            </label>
          </fieldset>

          <div class="btn btn--primary">
            <button type="submit" class="glass-btn">
              <span>{copy.submit}</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ url }) => {
  const locale = getLocaleFromPathname(url.pathname);
  const copy = briefCopy[locale];

  return {
    title: copy.headTitle,
    meta: [
      {
        name: 'description',
        content: copy.headDescription,
      },
    ],
  };
};
