import { component$, useVisibleTask$, $ } from '@builder.io/qwik';
import './brief-page.css';
import Header from '~/components/header/header';
import { DocumentHead } from '@builder.io/qwik-city';
import Footer from '~/components/footer/footer';

import { GlassEffect } from '~/components/ui/GlassEffect';

export default component$(() => {
    useVisibleTask$(() => {
        const script = document.createElement('script');
        script.src = 'https://cdn.emailjs.com/dist/email.min.js';
        script.onload = () => {
            // @ts-expect-error Calendly is loaded dynamically from external script
            emailjs.init('ri4YXprL5WW09Y1-B');
        };
        document.body.appendChild(script);


        const input = document.querySelector('.gr-input') as HTMLInputElement;

        const updateSlider = () => {
            const value = parseFloat(input.value);
            const percent = ((value - 1) / 9); // значение от 0 до 1
            const scale = percent.toFixed(2); // чтобы не было длинных float'ов

            // Новый способ: меняем scale, а не width
            input.parentElement?.style.setProperty('--scale', scale);

            // Опционально: если ты хочешь сохранить градиент в самой полосе
            input.style.backgroundSize = `${percent * 100}% 100%`;
        };

        input.addEventListener('input', updateSlider);
        updateSlider();
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
        <>
            <Header />
            <section class="brief container">
                <h1>Бриф на разработку сайта</h1>
                <p class="brief__subtitle">
                    Чем подробнее вы заполните форму — тем точнее я пойму ваши задачи и смогу предложить подходящее решение.
                </p>

                <form id="brief-form"
                    preventdefault:submit
                    onSubmit$={handleSubmit}>
                    <fieldset>
                        <h2>Контактная информация</h2>

                        <label>
                            Как вас зовут? *
                            <input type="text" name="name" required />
                        </label>

                        <label>
                            Должность
                            <input type="text" name="position" />
                        </label>

                        <label>
                            Номер телефона *
                            <input type="tel" name="phone" required />
                        </label>

                        <label>
                            E-mail *
                            <input type="email" name="email" required />
                        </label>

                        Выберите способ связи:
                        <label>
                            <input type="radio" name="preferred_contact" value="Telegram" required />
                            Telegram
                        </label>
                        <label>
                            <input type="radio" name="preferred_contact" value="Skype" />
                            Skype
                        </label>
                        <label>
                            <input type="radio" name="preferred_contact" value="E-mail" />
                            E-mail
                        </label>
                    </fieldset>

                    <fieldset>
                        <h2>О компании и продукте</h2>

                        <label>
                            Название компании *
                            <input type="text" name="company_name" required />
                        </label>

                        <label>
                            Что означает название вашей компании?
                            <textarea name="company_meaning" rows={3}></textarea>
                        </label>

                        <label>
                            Как давно существует ваш проект?
                            <input type="text" name="project_age" />
                        </label>

                        <label>
                            Почему вы обратились именно сейчас?
                            <textarea name="why_now" rows={3}></textarea>
                        </label>

                        <label>
                            Ниша *
                            <input type="text" name="niche" required />
                        </label>

                        <label>
                            Продукт или услуга *
                            <input type="text" name="product" required />
                        </label>

                        <label>
                            Описание продукта или услуги
                            <textarea name="product_description" rows={4}></textarea>
                        </label>

                        <label>
                            Приоритетные товары и услуги
                            <textarea name="priority_products" rows={3}></textarea>
                        </label>

                        <label>
                            Уникальность предложения
                            <textarea name="unique_offer" rows={3}></textarea>
                        </label>

                        <label>
                            Сложности и недостатки продукта
                            <textarea name="product_issues" rows={3}></textarea>
                        </label>

                        <label>
                            Что чаще спрашивают клиенты?
                            <textarea name="faq" rows={3}></textarea>
                        </label>

                        <label>
                            Что движет покупателями при заказе?
                            <textarea name="motivation" rows={2}></textarea>
                        </label>

                        <label>
                            Ценовая политика
                            <textarea name="pricing" rows={2}></textarea>
                        </label>

                        <label>
                            География проекта *
                            <input type="text" name="geo" required />
                        </label>

                        <label>
                            Краткая информация о компании
                            <textarea name="about_company" rows={3}></textarea>
                        </label>

                        <label>
                            Ценности компании
                            <textarea name="values" rows={2}></textarea>
                        </label>



                        <label>
                            Сайт компании
                            <input type="url" name="site" />
                        </label>

                        <label>
                            Социальные сети
                            <textarea name="socials" rows={2}></textarea>
                        </label>

                        <label>
                            По каким запросам вас можно найти в поиске?
                            <textarea name="search_keywords" rows={2}></textarea>
                        </label>

                        <label>
                            Прямые конкуренты *
                            <textarea name="competitors" rows={3} required></textarea>
                        </label>
                    </fieldset>

                    <fieldset>
                        <h2>Целевая аудитория</h2>
                        <div class="form-group">
                            <label for="knowAudience">Знаете ли вы свою целевую аудиторию?</label>
                            <label>
                                <input type="radio" name="целевую аудитори" value="да" required />
                                да
                            </label>
                            <label>
                                <input type="radio" name="целевую аудитори" value="нет" />
                                нет
                            </label>
                            <label>
                                <input type="radio" name="целевую аудитори" value="E-нужна проработка" />
                                нужна проработка
                            </label>
                        </div>

                        <div class="form-group">
                            <label for="gender">Пол целевой аудитории</label>
                            <input type="text" id="gender" name="gender" placeholder="например, 70% женщин, 30% мужчин" />
                        </div>

                        <div class="form-group">
                            <label for="age">Возраст целевой аудитории</label>
                            <input type="text" id="age" name="age" placeholder="например, 25–40 лет" />
                        </div>

                        <div class="form-group">
                            <label for="income">Уровень дохода</label>
                            <input type="text" id="income" name="income" placeholder="средний доход, уровень достатка" />
                        </div>

                        <div class="form-group">
                            <label for="interests">Интересы аудитории</label>
                            <input type="text" id="interests" name="interests" placeholder="например, бизнес, здоровье, семья" />
                        </div>

                        <div class="form-group">
                            <label for="audienceProblems">Проблемы, которые решает ваш продукт</label>
                            <textarea id="audienceProblems" name="audienceProblems"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="decisionFactors">Что важно для клиента при выборе?</label>
                            <textarea id="decisionFactors" name="decisionFactors"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="motivation">Что мотивирует клиента воспользоваться продуктом?</label>
                            <textarea id="motivation" name="motivation"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="barriers">Что останавливает клиента от покупки?</label>
                            <textarea id="barriers" name="barriers"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="productAwareness">Насколько клиент осведомлён о продукте?</label>
                            <textarea id="productAwareness" name="productAwareness"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="customerJourney">Путь клиента от знакомства до покупки</label>
                            <textarea id="customerJourney" name="customerJourney"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="communicationChannels">Какие каналы коммуникации используете?</label>
                            <textarea id="communicationChannels" name="communicationChannels"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="loyalty">Возвращаются ли клиенты повторно?</label>
                            <textarea id="loyalty" name="loyalty"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="frequency">Как часто покупают повторно?</label>
                            <textarea id="frequency" name="frequency"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="positioning">Как вы описали бы свою компанию в одном предложении?</label>
                            <textarea id="positioning" name="positioning"></textarea>
                        </div>

                    </fieldset>

                    <fieldset>

                        <h2>Детализация задачи</h2>

                        <label>
                            У вас уже был опыт в разработке дизайна?
                            <textarea name="pastExperience" placeholder="Опишите, какие проекты уже делали, что понравилось или не понравилось." />
                        </label>

                        <label>
                            Какой тип сайта вы хотите?
                            <select name="siteType">
                                <option>Интернет-магазин</option>
                                <option>Информационный сайт</option>
                                <option>Корпоративный сайт</option>
                                <option>Лонгрид</option>
                                <option>Не знаю, нужна консультация</option>
                            </select>
                        </label>

                        <label>
                            Цели, которые должен решить сайт (расположите в порядке приоритетности):
                            <textarea name="siteGoals" placeholder="Например: привлечь внимание, рассказать о проекте, повысить лояльность и т.д." />
                        </label>

                        <label>
                            Какое целевое действие вы ожидаете от пользователя?
                            <select name="cta">
                                <option>Купить</option>
                                <option>Зарегистрироваться</option>
                                <option>Забронировать</option>
                                <option>Заказать</option>
                                <option>Подписаться</option>
                                <option>Оставить заявку</option>
                                <option>Другое</option>
                            </select>
                        </label>

                        <label>
                            Сайты конкурентов:
                            <textarea name="competitorSites" placeholder="Укажите сайты конкурентов. Желательно не менее 3." />
                        </label>

                        <label>
                            Что нравится на сайтах конкурентов?
                            <textarea name="likes" placeholder="Например: хороший контент, адаптивность, стиль, скорость загрузки и т.д." />
                        </label>

                        <label>
                            Что НЕ нравится на сайтах конкурентов?
                            <textarea name="dislikes" placeholder="Например: неудобный интерфейс, старый дизайн, слабый контент и т.п." />
                        </label>

                        <label>
                            Какие другие сайты вам нравятся и чем именно?
                            <textarea name="inspirations" placeholder="Желательно не меньше 3 ссылок и объяснение, что именно нравится." />
                        </label>

                        <label>
                            Какие сайты вам НЕ нравятся и почему?
                            <textarea name="antiExamples" placeholder="Желательно не меньше 3 примеров и причина, почему не нравятся." />
                        </label>

                        <label>
                            Предпочтительный стиль будущего сайта:
                            <input name="style" type="text" placeholder="например: строгий, лёгкий, fashion, милый и т.д." />
                        </label>

                        <label>
                            Какие эмоции должен вызывать сайт?
                            <input name="emotion" type="text" placeholder="Уверенность, восторг, радость, лёгкость..." />
                        </label>

                        <label>
                            Предпочитаемые цвета:
                            <input name="preferredColors" type="text" placeholder="Укажите цвета, которые хотите использовать." />
                        </label>

                        <label>
                            Цвета, которых стоит избегать:
                            <input name="forbiddenColors" type="text" placeholder="Укажите цвета, которые точно не хотите видеть." />
                        </label>

                        <label for="exp-range">Готовность к экспериментам (1–10):</label>
                        <div class="gr-glow">
                            <input
                                id="exp-range"
                                name="experiment"
                                class="gr-input"
                                type="range"
                                min="1"
                                max="10"
                                step="0.01"
                            />
                        </div>

                        <label>
                            Какие разделы хотите видеть на сайте:
                            <textarea name="sections" placeholder="Опишите примерную структуру: шапка, оффер, преимущества, блоки и т.п." />
                        </label>

                        <label>
                            Планируемый функционал сайта и интеграции:
                            <textarea name="integrations" placeholder="CRM, формы, корзина, оплата, рассылки, Telegram, Getcourse и др." />
                        </label>

                        <label>
                            Предпочтительная CMS:
                            <input name="cms" type="text" placeholder="Например: WordPress, Tilda, Sanity и др." />
                        </label>

                        <label>
                            Дополнительные пожелания:
                            <textarea name="extraWishes" placeholder="Необычные эффекты, визуальные предпочтения, анимации, особенности дизайна и т.п." />
                        </label>

                        <label>
                            SEO-оптимизация:
                            <select name="seo">
                                <option>Да</option>
                                <option>Нет</option>
                                <option>Есть свой специалист</option>
                                <option>Нужна консультация</option>
                            </select>
                        </label>

                        <label>
                            Планируете вести блог?
                            <select name="blog">
                                <option>Да</option>
                                <option>Нет</option>
                                <option>Пока не определились</option>
                            </select>
                        </label>

                        <label>
                            Копирайтинг:
                            <select name="copywriting">
                                <option>Да</option>
                                <option>Нет</option>
                                <option>Есть свой копирайтер</option>
                                <option>Нужна консультация</option>
                            </select>
                        </label>

                    </fieldset>

                    <fieldset>
                        <h2>Материалы</h2>

                        <div class="brief-form__group">
                            <label>Логотип *</label>
                            <select>
                                <option>Готов</option>
                                <option>Нужно обновить</option>
                                <option>Разработать с нуля</option>
                                <option>Сделать шаблонный</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Фирменный стиль *</label>
                            <select>
                                <option>Есть</option>
                                <option>Нужно разработать</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Фотографии по продукту *</label>
                            <select>
                                <option>Да, всё готово!</option>
                                <option>Есть, но нужна обработка</option>
                                <option>Предоставим в процессе</option>
                                <option>Нужен фотограф (Москва)</option>
                                <option>Фотографий продукта не будет</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Фотографии команды *</label>
                            <select>
                                <option>Да, всё готово!</option>
                                <option>Есть, но нужна обработка</option>
                                <option>Предоставим в процессе</option>
                                <option>Нужен фотограф (Москва)</option>
                                <option>Фотографий не будет</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Фотографии процесса или производства *</label>
                            <select>
                                <option>Да, всё готово!</option>
                                <option>Есть, но нужна обработка</option>
                                <option>Предоставим в процессе</option>
                                <option>Нужен фотограф (Москва)</option>
                                <option>Фотографий не будет</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Иллюстрации *</label>
                            <select>
                                <option>Да, всё готово!</option>
                                <option>Нет, нужен подбор или отрисовка</option>
                                <option>Купим на стоках</option>
                                <option>Ищем бесплатные</option>
                                <option>Не нужны</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Видеоролик *</label>
                            <select>
                                <option>Есть</option>
                                <option>Нет</option>
                                <option>Отснимем</option>
                                <option>Купим тематический на видео-стоке</option>
                                <option>Не нужен</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Презентации, тексты, буклеты</label>
                            <select>
                                <option>Есть, отправим</option>
                                <option>Готовим материалы</option>
                                <option>Ничего нет</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Акции, скидки, УТП</label>
                            <textarea placeholder="Укажите частоту, формат, особенности отображения"></textarea>
                        </div>

                        <div class="brief-form__group">
                            <label>Сертификаты, патенты, свидетельства</label>
                            <select>
                                <option>Есть</option>
                                <option>Есть, но не будем размещать</option>
                                <option>Нет</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Отзывы или письма благодарности</label>
                            <select>
                                <option>Да, есть в формате текста, письма или видео</option>
                                <option>Есть, но только скриншоты</option>
                                <option>Пока нет, но будут</option>
                                <option>Нет отзывов</option>
                            </select>
                        </div>

                        <div class="brief-form__group">
                            <label>Дополнительные материалы</label>
                            <textarea placeholder="Ссылки на папки в Google Drive, Яндекс.Диск и т.д."></textarea>
                        </div>

                    </fieldset>

                    <fieldset>
                        <h2>Дополнительная информация</h2>

                        <div class="brief__field">
                            <label for="languages">Количество языковых версий</label>
                            <select id="languages" name="languages">
                                <option>1 язык</option>
                                <option>2 языка</option>
                                <option>Больше 2-х</option>
                            </select>
                        </div>

                        <div class="brief__field">
                            <label for="launchDate">Дата предполагаемого запуска</label>
                            <input type="date" id="launchDate" name="launchDate" />
                        </div>

                        <div class="brief__field">
                            <label for="decisionPeople">Сколько человек будут принимать итоговое решение?</label>
                            <input type="text" id="decisionPeople" name="decisionPeople" placeholder="Имена, должности" />
                        </div>

                        <div class="brief__field">
                            <label for="budget">Планируемый или рассчитанный бюджет</label>
                            <input type="text" id="budget" name="budget" placeholder="например: 100–200 т.р." />
                        </div>



                        <div class="brief__field">
                            <label for="admin">Требуется ли администрирование сайта после запуска?</label>
                            <select id="admin" name="admin">
                                <option>Да</option>
                                <option>Нет</option>
                                <option>Пока неизвестно</option>
                            </select>
                        </div>

                        <div class="brief__field">
                            <label for="admin">Будет ли участие маркетолога или других специалистов с вашей стороны?</label>
                            <select id="admin" name="admin">
                                <option>Да</option>
                                <option>Нет</option>
                                <option>Пока неизвестно</option>
                            </select>
                        </div>
                        <div class="brief__field">
                            <label for="extraInfo">Ожидания от работы с дизайнером / разработчиком</label>
                            <textarea id="extraInfo" name="extraInfo" placeholder="бывало ли негативное сотрудничество, что важно в общении?" />
                        </div>
                        <div class="brief__field">
                            <label for="extraInfo">Предпочтительный способ сдачи проекта</label>
                            <textarea id="extraInfo" name="extraInfo" placeholder="одним файлом, поэтапно, через платформу и т.д." />
                        </div>

                        <div class="brief__field">
                            <label for="extraInfo">Есть ли у вас техническое задание (ТЗ)?</label>
                            <textarea id="extraInfo" name="extraInfo" placeholder="Напишите здесь всё, что считаете нужным" />
                        </div>

                        <div class="brief__field">
                            <label for="extraInfo">Есть ли ограничения по стилю?</label>
                            <textarea id="extraInfo" name="extraInfo" placeholder="например: “не используйте шаблонные иконки”, “не хочу фиолетовый цвет”, “не использовать фото людей”" />
                        </div>


                        <div class="brief__field">
                            <label for="files">Файлы, которые у вас есть</label>
                            <input type="file" id="files" name="files" multiple />
                        </div>

                        <div class="brief__checkboxes">
                            <label>
                                <input type="checkbox" name="policy" required />
                                Согласен с Политикой конфиденциальности
                            </label>
                            <label>
                                <input type="checkbox" name="terms" required />
                                Согласен с Пользовательским соглашением
                            </label>
                        </div>
                    </fieldset>


                    <GlassEffect class="submit-brief">Отправить бриф</GlassEffect>
                </form>
            </section>

            <Footer />
        </>

    );
});

export const head: DocumentHead = {
    title: 'Мои проекты | godevca',
    meta: [
        {
            name: 'description',
            content: 'Здесь вы можете посмотреть мои реализованные проекты.',

        },
    ],
};