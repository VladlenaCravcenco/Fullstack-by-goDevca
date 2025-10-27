import { component$ } from '@builder.io/qwik';
import './ProjectBriefForm.css';

export default component$(({ action }: { action: string }) => {
  return (
    <form action="/api/telegram-notify" method="POST" class="custom-form">
      {/* чекбоксы можно выбирать несколько — одно и то же имя fields */}
      <fieldset class="chip-group">
        <label><input type="checkbox" name="services" value="Design" /> 🎨 Design</label>
        <label><input type="checkbox" name="services" value="Marketing" /> 📈 Marketing</label>
        <label><input type="checkbox" name="services" value="Software Development" /> ⚙️ Software Dev</label>
        <label><input type="checkbox" name="services" value="No-code dev" /> 🧩 No-code dev</label>
        <label><input type="checkbox" name="services" value="Copywriting" /> ✍️ Copywriting</label>
        <label><input type="checkbox" name="services" value="QA" /> 🐞 QA</label>
        <label><input type="checkbox" name="services" value="Not sure" /> ❓ Not sure</label>
      </fieldset>

      <label class="custom-form__label">Ваша почта</label>
      <input class="custom-form__input" type="email" name="email" required />

      <label class="custom-form__label">Пару слов об идее</label>
      <textarea class="custom-form__textarea" name="idea" rows={4} />

      {/* honeypot (антиспам) */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" hidden />

      {/* красиво в письме */}
      <input type="hidden" name="_subject" value="New brief from godevca.com" />

      <button class="custom-form__btn-inner" type="submit">
        Отправить
      </button>
    </form>
  );
});


