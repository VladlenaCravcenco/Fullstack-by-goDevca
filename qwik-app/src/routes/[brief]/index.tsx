import { component$, useVisibleTask$, $ } from '@builder.io/qwik';
import './brief-page.scss';

export default component$(() => {
    useVisibleTask$(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.emailjs.com/dist/email.min.js';
        script.onload = () => {
            // @ts-expect-error Calendly is loaded dynamically from external script
            emailjs.init('ri4YXprL5WW09Yl-B');
        };
        document.body.appendChild(script);
    });

    const handleSubmit = $((e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;

  // @ts-expect-error emailjs types not detected
  emailjs.sendForm('service_n7rshy8', 'template_d4ohs9n', form)
    .then(() => {
      alert('Спасибо! Бриф отправлен.');
      form.reset();
    })
    .catch((error: any) => {
      alert('Ошибка при отправке. Попробуйте позже.');
      console.error(error);
    });
});

    return (
        <section class="brief container">
            <h1>Бриф на разработку сайта</h1>
            <p>Заполните форму — я ознакомлюсь и предложу оптимальное решение</p>

            <form class="brief__form" onSubmit$={handleSubmit}>
                <fieldset>
                    <legend>Контактная информация</legend>
                    <input type="text" name="name" placeholder="Ваше имя" required />
                    <input type="text" name="position" placeholder="Должность" />
                    <input type="tel" name="phone" placeholder="Телефон" />
                    <input type="email" name="email" placeholder="E-mail" required />
                </fieldset>

                <fieldset>
                    <legend>О компании и продукте</legend>
                    <input type="text" name="company" placeholder="Название компании" />
                    <textarea name="product" placeholder="Что вы продаёте / предлагаете?" />
                    <textarea name="about" placeholder="Расскажите кратко о компании, нише, приоритетах и пр." />
                    <textarea name="unique" placeholder="Что вас отличает от конкурентов?" />
                </fieldset>

                <fieldset>
                    <legend>Целевая аудитория</legend>
                    <textarea name="audience" placeholder="Кто ваш клиент? Возраст, интересы, боли и задачи?" />
                </fieldset>

                <fieldset>
                    <legend>Задачи сайта</legend>
                    <textarea name="goal" placeholder="Что должен делать сайт? Продавать? Представлять? Захватывать контакты?" />
                    <input type="text" name="style" placeholder="Стили сайтов, которые вам нравятся (ссылки)" />
                    <textarea name="functions" placeholder="Нужен ли блог, формы, CMS, мультиязычность и пр.?" />
                </fieldset>

                <fieldset>
                    <legend>Материалы</legend>
                    <textarea name="materials" placeholder="У вас уже есть логотип, тексты, фото, видео?" />
                </fieldset>

                <fieldset>
                    <legend>Сроки и бюджет</legend>
                    <input type="text" name="deadline" placeholder="Желаемая дата запуска" />
                    <input type="text" name="budget" placeholder="Ожидаемый бюджет" />
                </fieldset>

                <textarea name="other" placeholder="Другие комментарии / пожелания" rows={4} />

                <button type="submit" class="brief__submit">Отправить бриф</button>
            </form>
        </section>
    );
});