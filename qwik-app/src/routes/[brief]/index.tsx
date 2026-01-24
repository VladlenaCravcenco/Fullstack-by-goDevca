import { component$, useVisibleTask$, $ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import './brief-page.css';

export default component$(() => {
  useVisibleTask$(() => {
    // emailjs
    const script = document.createElement('script');
    script.src = 'https://cdn.emailjs.com/dist/email.min.js';
    script.onload = () => {
      // @ts-expect-error
      emailjs.init('ri4YXprL5WW09Yl-B');
    };
    document.body.appendChild(script);

    // ===== desktop anchors: скроллим только правую форму, без прыжка наверх =====
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const scroller = document.querySelector('#brief-form') as HTMLElement | null;
    if (!scroller) return;

    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.brief_nav__link[href^="#"]')
    );

    const setActive = (hash: string) => {
      links.forEach((l) => l.classList.toggle('is-active', l.getAttribute('href') === hash));
    };

    const scrollToHash = (hash: string) => {
      const target = document.querySelector(hash) as HTMLElement | null;
      if (!target) return;

      const topOffset = 140; // подстрой: чтобы блок становился "под заголовок"
      const targetTop = target.getBoundingClientRect().top;
      const scrollerTop = scroller.getBoundingClientRect().top;

      scroller.scrollTo({
        top: scroller.scrollTop + (targetTop - scrollerTop) - topOffset,
        behavior: 'smooth',
      });

      setActive(hash);
    };

    // перехват клика
    links.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault();
        const hash = a.getAttribute('href');
        if (!hash) return;
        scrollToHash(hash);
      });
    });

    // подсветка при ручном скролле (по ближайшему fieldset)
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

    // @ts-expect-error
    emailjs
      .sendForm('service_n7rshy8', 'template_d4ohs9n', form)
      .then(() => {
        alert('Спасибо! Бриф отправлен.');
        form.reset();
      })
      .catch(() => {
        alert('Ошибка при отправке. Попробуйте позже.');
      });
  });

  return (
    <section class="brief_container">
      {/* LEFT */}
      <div class="brief_left">
        <h1>Бриф на разработку сайта</h1>

        <p class="brief__subtitle">
          Ответьте на несколько вопросов — этого достаточно, чтобы я предложила подходящее решение.
        </p>

        <nav class="brief_nav" aria-label="Навигация по брифу">
          <a class="brief_nav__link" href="#contacts">Контактные данные</a>
          <a class="brief_nav__link" href="#about">О проекте</a>
          <a class="brief_nav__link" href="#audience">Целевая аудитория</a>
          <a class="brief_nav__link" href="#format">Формат сайта</a>
          <a class="brief_nav__link" href="#details">Детали</a>
        </nav>
      </div>

      {/* RIGHT */}
      <div class="brief_right">
        <form id="brief-form" preventdefault:submit onSubmit$={handleSubmit}>
          {/* КОНТАКТЫ */}
          <fieldset id="contacts">
            <h2>Контактные данные</h2>

            <label>
              Имя *
              <input type="text" name="name" required />
            </label>

            <label>
              Email *
              <input type="email" name="email" required />
            </label>

            <label>
              Телефон / мессенджер
              <input type="text" name="contact" placeholder="Telegram / WhatsApp" />
            </label>
          </fieldset>

          {/* ПРОЕКТ */}
          <fieldset id="about">
            <h2>О проекте</h2>

            <label>
              Кратко опишите ваш проект *
              <textarea name="project_description" rows={3} required placeholder="Что вы делаете и для кого" />
            </label>

            <label>
              Зачем вам сайт?
              <textarea name="goal" rows={2} placeholder="Продажи, презентация, запуск продукта и т.д." />
            </label>

            <label>
              Что должен сделать пользователь на сайте?
              <input type="text" name="cta" placeholder="Оставить заявку / купить / написать" />
            </label>
          </fieldset>

          {/* АУДИТОРИЯ */}
          <fieldset id="audience">
            <h2>Целевая аудитория</h2>

            <label>
              Кто ваш клиент?
              <textarea name="audience" rows={2} placeholder="Возраст, страна, тип клиентов" />
            </label>

            <label>
              Почему выбирают именно вас?
              <textarea name="usp" rows={2} placeholder="Уникальность, сильные стороны" />
            </label>
          </fieldset>

          {/* ФОРМАТ */}
          <fieldset id="format">
            <h2>Формат сайта</h2>

            <label>
              Какой сайт вам нужен?
              <select name="site_type">
                <option value="">Выберите</option>
                <option value="landing">Лендинг</option>
                <option value="corporate">Корпоративный сайт</option>
                <option value="shop">Интернет-магазин</option>
                <option value="unknown">Нужна консультация</option>
              </select>
            </label>

            <label>
              Примеры сайтов, которые нравятся
              <textarea name="references" rows={2} placeholder="2–5 ссылок" />
            </label>

            <label>
              Что не нравится на других сайтах
              <textarea name="anti_references" rows={2} placeholder="Коротко, без воды" />
            </label>
          </fieldset>

          {/* ДЕТАЛИ */}
          <fieldset id="details">
            <h2>Детали</h2>

            <label>
              Какой стиль вы ожидаете?
              <input type="text" name="style" placeholder="Минимализм, премиум, технологично" />
            </label>

            <label>
              Что у вас уже есть?
              <input type="text" name="materials" placeholder="Логотип, тексты, фото / ничего" />
            </label>

            <label>
              Сроки
              <input type="text" name="deadline" placeholder="Срочно / в течение месяца / без сроков" />
            </label>

            <label>
              Ориентировочный бюджет
              <select name="budget">
                <option value="">Выберите</option>
                <option value="до 500">до 500 €</option>
                <option value="500-1000">500–1000 €</option>
                <option value="1000-2000">1000–2000 €</option>
                <option value="discussion">Обсуждается</option>
              </select>
            </label>

            <label>
              Дополнительные комментарии
              <textarea name="comment" rows={3} placeholder="Любые пожелания или важные детали" />
            </label>
          </fieldset>

          {/* КНОПКУ НЕ ТРОГАЮ */}
          <div class="btn btn--primary">
            <button type="submit" class="glass-btn">
              <span>отправить бриф</span>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Бриф на разработку сайта | godevca',
  meta: [
    {
      name: 'description',
      content: 'Короткий и удобный бриф для заказа сайта',
    },
  ],
};