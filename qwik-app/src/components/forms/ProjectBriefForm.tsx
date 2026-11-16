import { component$ } from '@builder.io/qwik';
import './ProjectBriefForm.css';
import { useLocation } from '@builder.io/qwik-city';
import { getLocaleFromPathname } from '~/lib/i18n';

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = {
    ru: { title: 'Чем я могу вам помочь?', services: ['Дизайн', 'Маркетинг', 'Разработка', 'Готовый шаблон', 'SEO', 'Пока не знаю'], email: 'Ваш email', submit: 'Отправить', success: 'Отправлено! Я свяжусь с вами в ближайшее время.', error: 'Не удалось отправить. Попробуйте позже.' },
    ro: { title: 'Cu ce vă pot ajuta?', services: ['Design', 'Marketing', 'Dezvoltare', 'Șablon gata', 'SEO', 'Nu știu încă'], email: 'Adresa de e-mail', submit: 'Trimite', success: 'Trimis! Vă voi contacta în curând.', error: 'Trimiterea a eșuat. Încercați mai târziu.' },
    en: { title: 'How can I help you?', services: ['Design', 'Marketing', 'Development', 'Ready-made template', 'SEO', 'Not sure yet'], email: 'Your email', submit: 'Send', success: 'Sent! I will get in touch soon.', error: 'Could not send. Please try again later.' },
  }[locale];
  return (
    <form
      action="/api/telegram-notify"
      method="POST"
      class="custom-form"
      preventdefault:submit
      onSubmit$={async (ev) => {
        const form = ev.target as HTMLFormElement;
        const fd = new FormData(form);
        try {
        const res = await fetch(form.action, { method: 'POST', body: fd });
        const out = await res.json();
        if (out.ok) {
          form.reset();
          alert(copy.success);
        } else {
          alert(copy.error);
        }
        } catch {
          alert(copy.error);
        }
      }}
    >
        <label class="custom-form__title">{copy.title}</label>
      <fieldset class="chip-group">
        <label><input type="checkbox" name="services" value="Design" /> 🎨 {copy.services[0]}</label>
        <label><input type="checkbox" name="services" value="Marketing" /> 📈 {copy.services[1]}</label>
        <label><input type="checkbox" name="services" value="Software Dev" /> ⚙️ {copy.services[2]}</label>
        <label><input type="checkbox" name="services" value="No-code dev" /> 🧩 {copy.services[3]}</label>
        <label><input type="checkbox" name="services" value="Copywriting" /> ✍️ {copy.services[4]}</label>
        <label><input type="checkbox" name="services" value="Not sure" /> ❓ {copy.services[5]}</label>
      </fieldset>

      <label class="custom-form__label">{copy.email}</label>
      <input class="custom-form__input" type="email" name="email" required />


      {/* это то самое "пустое поле" — оно скрыто, оставь как есть, это антиспам */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" hidden />

      <button class="custom-form__btn-inner" type="submit">{copy.submit}</button>
    </form>
  );
});