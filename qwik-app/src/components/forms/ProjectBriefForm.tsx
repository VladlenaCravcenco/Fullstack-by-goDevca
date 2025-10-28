import { component$ } from '@builder.io/qwik';
import './ProjectBriefForm.css';

export default component$(() => {
  return (
    <form
      action="/api/telegram-notify"
      method="POST"
      class="custom-form"
      preventdefault:submit
      onSubmit$={async (ev) => {
        const form = ev.target as HTMLFormElement;
        const fd = new FormData(form);
        const res = await fetch(form.action, { method: 'POST', body: fd });
        const out = await res.json();
        if (out.ok) {
          form.reset();
          alert('✅ Отправлено! Я свяжусь в ближайшее время.');
        } else {
          alert('⚠️ Не отправлено. Проверь токен/CHAT_ID на Vercel и .env.local');
        }
      }}
    >
        <label class="custom-form__title">Чем я могу Вам помочь?</label>
      <fieldset class="chip-group">
        <label><input type="checkbox" name="services" value="Design" /> 🎨 Дизайн</label>
        <label><input type="checkbox" name="services" value="Marketing" /> 📈 Маркетинг</label>
        <label><input type="checkbox" name="services" value="Software Dev" /> ⚙️ Разработка</label>
        <label><input type="checkbox" name="services" value="No-code dev" /> 🧩 Готовый шаблон</label>
        <label><input type="checkbox" name="services" value="Copywriting" /> ✍️ Сео</label>
        <label><input type="checkbox" name="services" value="Not sure" /> ❓ Не знаю</label>
      </fieldset>

      <label class="custom-form__label">Ваш имэйл</label>
      <input class="custom-form__input" type="email" name="email" required />


      {/* это то самое "пустое поле" — оно скрыто, оставь как есть, это антиспам */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" hidden />

      <button class="custom-form__btn-inner" type="submit">Отправить</button>
    </form>
  );
});