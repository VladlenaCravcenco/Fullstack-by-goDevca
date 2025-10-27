import { component$, useSignal, $ } from '@builder.io/qwik';
import './ProjectBriefForm.css';

type Props = {
  variant?: 'full' | 'compact'; // compact — для Hero (меньше отступы, без длинных текстов)
  action?: string;              // куда отправлять POST (можно Formspree/свой API)
};

const SERVICES = [
  { value: 'design',     label: 'Design',     emoji: '🎨' },
  { value: 'marketing',  label: 'Marketing',  emoji: '📈' },
  { value: 'dev',        label: 'Software Development', emoji: '⚙️' },
  { value: 'nocode',     label: 'No-code dev', emoji: '🧩' },
  { value: 'copy',       label: 'Copywriting', emoji: '✍️' },
  { value: 'qa',         label: 'QA',         emoji: '🐞' },
  { value: 'not_sure',   label: 'Not sure',   emoji: '❓' },
];

export default component$<Props>(({ variant = 'full', action = '/api/brief' }) => {
  const sending = useSignal(false);

  // необязательно: тонкий хэндлер, чтобы показать «отправляется…»
  const onSubmit$ = $(async () => {
    sending.value = true;
    // даём браузеру отправить форму как обычно (классический POST)
    // если используешь внешний service (Formspree) — просто оставь без preventDefault
  });

  return (
    <form
      class={['brief', variant === 'compact' ? 'brief--compact' : ''].join(' ')}
      method="post"
      action={action}
      preventdefault:submit={false}
      onSubmit$={onSubmit$}
    >
      {/* anti-spam */}
      <input type="text" name="hp" class="brief__hp" tabIndex={-1} autoComplete="off" />

      <h3 class="brief__title">Create your project</h3>

      <fieldset class="chip-group" aria-label="What do you need help with?">
        {SERVICES.map((s) => (
          <div class="chip" key={s.value}>
            {/* multiple: используем checkbox и одно имя services[] */}
            <input
              id={`svc-${s.value}`}
              type="checkbox"
              name="services[]"
              value={s.label}
              class="chip__input"
            />
            <label class="chip__label" for={`svc-${s.value}`}>
              <span class="chip__emoji">{s.emoji}</span>
              {s.label}
            </label>
          </div>
        ))}
      </fieldset>

      <label class="brief__label">
        Your email
        <input class="brief__input" type="email" name="email" required placeholder="you@email.com" />
      </label>

      {variant === 'full' && (
        <label class="brief__label">
          Пару слов об идее
          <textarea class="brief__textarea" name="idea" rows={4} placeholder="Коротко опиши задачу…" />
        </label>
      )}

      <button type="submit" class="brief__submit" disabled={sending.value}>
        {sending.value ? 'Sending…' : 'Get started'}
      </button>

      {variant === 'full' && (
        <p class="brief__hint">Отправишь — я отвечу в течение 30 минут и предложу 2–3 варианта по бюджету.</p>
      )}
    </form>
  );
});