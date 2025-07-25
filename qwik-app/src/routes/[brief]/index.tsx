import { component$, useVisibleTask$, $ } from '@builder.io/qwik';
import './brief-page.css';
import Header from '~/components/header/header';
import { DocumentHead } from '@builder.io/qwik-city';
import Footer from '~/components/footer/footer';

import { GlassEffect } from '~/components/ui/GlassEffect';

export default component$(() => {
    useVisibleTask$(() => {
        // Подключаем emailjs
        const script = document.createElement('script');
        script.src = 'https://cdn.emailjs.com/dist/email.min.js';
        script.onload = () => {
            // @ts-expect-error
            emailjs.init('ri4YXprL5WW09Yl-B');
        };
        document.body.appendChild(script);

        // Ползунок и точки
        const input = document.querySelector('#rangeInput') as HTMLInputElement;


        const updateSlider = () => {
            const value = parseInt(input.value, 10);
            const percent = ((value - 1) / 9) * 100;

            // Учитываем смещение половины ширины thumb (~12px из 24px)
            const thumbWidth = 24; // в px
            const trackWidth = input.offsetWidth;
            const offset = (thumbWidth / trackWidth) * 100 / 2;

            input.style.setProperty('--progress', `calc(${percent}% ${offset >= 0 ? '+' : '-'} ${Math.abs(offset)}%)`);
            input.style.setProperty('--progress', `${percent + .5}%`);
        };

        input?.addEventListener('input', updateSlider);
        updateSlider();
    });

    // Обработка формы
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
            <section class="brief_container">
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
                            Как к Вам обращаться? *
                            <input type="text" name="name" required />
                        </label>

                        <label>
                            Должность
                            <input type="text" name="position" placeholder="Маркетолог, Владелец, Дизайнер
"/>
                        </label>

                        <label>
                            Номер телефона *
                            <input type="tel" name="phone" required placeholder="+373 68 000 000
"/>
                        </label>

                        <label>
                            E-mail *
                            <input type="email" name="email" required placeholder="hello@gmail.com
"/>
                        </label>


                    </fieldset>

                    <fieldset class="radio-glass-group">
                        <legend>Выберите способ связи:</legend>

                        <label class="glass-radio">
                            <input type="radio" name="contact" value="telegram" />
                            <span>Telegram</span>
                        </label>

                        <label class="glass-radio">
                            <input type="radio" name="contact" value="whatsapp" />
                            <span>WhatsApp</span>
                        </label>

                        <label class="glass-radio">
                            <input type="radio" name="contact" value="email" />
                            <span>E-mail</span>
                        </label>
                    </fieldset>

                    <fieldset>
                        <h2>О компании и продукте</h2>

                        <label>
                            Название компании *
                            <input type="text" name="company_name" required placeholder='Studio GoDevca
' />
                        </label>

                        <label>
                            Что означает название вашей компании?
                            <textarea name="company_meaning" rows={3} placeholder='Коротко — в чём смысл или почему выбрано
'></textarea>
                        </label>

                        <label>
                            Как давно существует ваш проект?
                            <input type="text" name="project_age" placeholder='с 2021 года или 3 года
'/>
                        </label>

                        <label>
                            Почему вы обратились именно сейчас?
                            <textarea name="why_now" rows={3} placeholder='запуск нового продукта или сезонная активность
'></textarea>
                        </label>

                        <label>
                            Ниша *
                            <input type="text" name="niche" required placeholder='психология, 3D-дизайн, техника для туризма
'/>
                        </label>

                        <label>
                            Продукт или услуга *
                            <input type="text" name="product" required placeholder='онлайн-курс, консультации, прокат квадроциклов
'/>
                        </label>

                        <label>
                            Описание продукта или услуги
                            <textarea name="product_description" rows={4} placeholder='Чем полезен клиенту? Что входит в состав или процесс?
'></textarea>
                        </label>

                        <label>
                            Приоритетные товары и услуги
                            <textarea name="priority_products" rows={3} placeholder='Что нужно продвигать в первую очередь
'></textarea>
                        </label>

                        <label>
                            Уникальность предложения
                            <textarea name="unique_offer" rows={3} placeholder='В чём отличие от конкурентов? Почему выбирают вас?
'></textarea>
                        </label>

                        <label>
                            Сложности и недостатки продукта
                            <textarea name="product_issues" rows={3} placeholder='Какие есть ограничения, слабые стороны или жалобы?
'></textarea>
                        </label>

                        <label>
                            Что чаще спрашивают клиенты?
                            <textarea name="faq" rows={3} placeholder='Повторяющиеся вопросы, которые слышите чаще всего
'></textarea>
                        </label>

                        <label>
                            Что движет покупателями при заказе?
                            <textarea name="motivation" rows={2} placeholder='Что важно: цена, скорость, статус, эксклюзивность?
'></textarea>
                        </label>

                        <label>
                            Ценовая политика
                            <textarea name="pricing" rows={2} placeholder='премиум, демократичные цены, средний сегмент
'></textarea>
                        </label>

                        <label>
                            География проекта *
                            <input type="text" name="geo" required placeholder='Молдова, страны ЕС, СНГ или весь мир
'/>
                        </label>

                        <label>
                            Краткая информация о компании
                            <textarea name="about_company" rows={3} placeholder='Сколько лет на рынке, ключевые этапы, достижения
'></textarea>
                        </label>

                        <label>
                            Ценности компании
                            <textarea name="values" rows={2} placeholder='Что вы поддерживаете: экология, честность, инновации
' ></textarea>
                        </label>



                        <label>
                            Сайт компании
                            <input type="url" name="site" placeholder='www.mycompany.md или https://brand.ro
 | если нет сайта, оставьте поле пустым'/>
                        </label>

                        <label>
                            Социальные сети
                            <textarea name="socials" rows={2} placeholder='Укажите ссылки: Instagram, Facebook, TikTok и др.
'></textarea>
                        </label>

                        <label>
                            По каким запросам вас можно найти в поиске?
                            <textarea name="search_keywords" rows={2} placeholder='ремонт квартир Кишинёв, бренд детской одежды
'></textarea>
                        </label>

                       
                    </fieldset>




                    <fieldset>
                        <h2>Целевая аудитория</h2>



                        <fieldset class="radio-glass-group">
                            <legend>Знаете ли вы свою целевую аудиторию?</legend>

                            <label class="glass-radio">
                                <input type="radio" name="auditoria" value="да" />
                                <span>да</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="auditoria" value="нет" />
                                <span>нет</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="auditoria" value="нужна проработка" />
                                <span>нужна проработка</span>
                            </label>
                        </fieldset>



                        <label for="gender">Пол целевой аудитории</label>
                        <input type="text" id="gender" name="gender" placeholder="например, 70% женщин, 30% мужчин" />



                        <label for="age">Возраст целевой аудитории</label>
                        <input type="text" id="age" name="age" placeholder="например, 25–40 лет" />



                        <label for="income">Уровень дохода</label>
                        <input type="text" id="income" name="income" placeholder="средний доход, уровень достатка" />



                        <label for="interests">Интересы аудитории</label>
                        <input type="text" id="interests" name="interests" placeholder="например, бизнес, здоровье, семья" />



                        <label for="audienceProblems">Проблемы, которые решает ваш продукт</label>
                        <textarea id="audienceProblems" name="audienceProblems" placeholder='нехватка времени, неудобство выбора, высокая цена конкурентов
'></textarea>



                        <label for="decisionFactors">Что важно для клиента при выборе?</label>
                        <textarea id="decisionFactors" name="decisionFactors" placeholder='Качество, цена, бренд, отзывы, гарантия, скорость доставки и т.д.
'></textarea>



                        <label for="motivation">Что мотивирует клиента воспользоваться продуктом?</label>
                        <textarea id="motivation" name="motivation" placeholder='Уникальность, бонусы, решение боли, стиль, статус
'></textarea>



                        <label for="barriers">Что останавливает клиента от покупки?</label>
                        <textarea id="barriers" name="barriers" placeholder='Высокая цена, непонятные условия, нет отзывов, страх ошибки
'></textarea>



                        <label for="productAwareness">Насколько клиент осведомлён о продукте?</label>
                        <textarea id="productAwareness" name="productAwareness" placeholder='знает только название / изучал аналогичные / уже пользовался
'></textarea>



                        <label for="customerJourney">Путь клиента от знакомства до покупки</label>
                        <textarea id="customerJourney" name="customerJourney" placeholder='реклама → сайт → звонок → покупка
'></textarea>



                        <label for="communicationChannels">Какие каналы коммуникации используете?</label>
                        <textarea id="communicationChannels" name="communicationChannels" placeholder='Соцсети, рассылки, мессенджеры, вебинары, звонки, личные встречи
'></textarea>



                        <label for="loyalty">Возвращаются ли клиенты повторно?</label>
                        <textarea id="loyalty" name="loyalty" placeholder='Да, по подписке / покупают сезонно / редко возвращаются
'></textarea>



                        <label for="frequency">Как часто покупают повторно?</label>
                        <textarea id="frequency" name="frequency" placeholder='раз в месяц / 1–2 раза в год / нет данных
'></textarea>



                        <label for="positioning">Как вы описали бы свою компанию в одном предложении?</label>
                        <textarea id="positioning" name="positioning" placeholder='Мы создаём стильные и эффективные сайты под ключ
'></textarea>


                    </fieldset>

                    <fieldset>

                        <h2>Детализация задачи</h2>

                        <label>
                            У вас уже был опыт в разработке дизайна?
                            <textarea name="pastExperience" placeholder="Опишите, какие проекты уже делали, что понравилось или не понравилось." />
                        </label>

                        <fieldset class="radio-glass-group">
                            <legend> Какой тип сайта вы хотите?</legend>

                            <label class="glass-radio">
                                <input type="radio" name="type-site" value="Интернет-магазин" />
                                <span>Интернет-магазин</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="type-site" value="Информационный сайт" />
                                <span>Информационный сайт</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="type-site" value="Корпоративный сайт" />
                                <span>Корпоративный сайт</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="type-site" value="Лонгрид" />
                                <span>Лонгрид</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="type-site" value="Не знаю, нужна консультация" />
                                <span>Не знаю, нужна консультация</span>
                            </label>
                        </fieldset>



                        <label>
                            Цели, которые должен решить сайт (расположите в порядке приоритетности):
                            <textarea name="siteGoals" placeholder="Например: привлечь внимание, рассказать о проекте, повысить лояльность и т.д." />
                        </label>



                        <fieldset class="radio-glass-group">
                            <legend>Какое целевое действие вы ожидаете от пользователя?</legend>

                            <label class="glass-radio">
                                <input type="radio" name="target" value="Купить" />
                                <span>Купить</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="target" value="Зарегистрироваться" />
                                <span>Зарегистрироваться</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="target" value="Забронировать" />
                                <span>Забронировать</span>
                            </label>
                            <label class="glass-radio">
                                <input type="radio" name="target" value="Заказать" />
                                <span>Заказать</span>
                            </label>
                            <label class="glass-radio">
                                <input type="radio" name="target" value="Подписаться" />
                                <span>Подписаться</span>
                            </label>
                            <label class="glass-radio">
                                <input type="radio" name="target" value="Оставить заявку" />
                                <span>Оставить заявку</span>
                            </label>
                        </fieldset>

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

                        <div class="range-wrapper">
                            <label for="rangeInput">Готовность к экспериментам (1–10):</label>
                            <input
                                type="range"
                                id="rangeInput"
                                name="experiments"
                                min="1"
                                max="10"
                                value="5"
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



                        <fieldset class="radio-glass-group">
                            <legend>SEO-оптимизация:</legend>

                            <label class="glass-radio">
                                <input type="radio" name="SEO" value="нужна ваша помощь" />
                                <span>нужна ваша помощь</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="SEO" value="Есть свой специалист" />
                                <span>Есть свой специалист</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="SEO" value="Нужна консультация" />
                                <span>Нужна консультация</span>
                            </label>
                        </fieldset>



                        <fieldset class="radio-glass-group">
                            <legend>Планируете вести блог?</legend>

                            <label class="glass-radio">
                                <input type="radio" name="blog" value="Да" />
                                <span>Да</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="blog" value="Нет" />
                                <span>Нет</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="blog" value="Пока не определились" />
                                <span>Пока не определились</span>
                            </label>
                        </fieldset>



                        <fieldset class="radio-glass-group">
                            <legend>Копирайтинг</legend>

                            <label class="glass-radio">
                                <input type="radio" name="copyright" value="нужна ваша помощь" />
                                <span>нужна ваша помощь</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="copyright" value="я сам напишу" />
                                <span>я сам напишу</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="copyright" value="Есть свой копирайтер" />
                                <span>Есть свой копирайтер</span>
                            </label>
                        </fieldset>

                    </fieldset>

                    <fieldset>
                        <h2>Материалы</h2>

                        <fieldset class="radio-glass-group">
                            <legend>Логотип</legend>

                            <label class="glass-radio">
                                <input type="radio" name="logo" value="Готов" />
                                <span>Готов</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="logo" value="Нужно обновить" />
                                <span>Нужно обновить</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="logo" value="Разработать с нуля" />
                                <span>Разработать с нуля</span>
                            </label>
                            <label class="glass-radio">
                                <input type="radio" name="logo" value="Сделать шаблонный" />
                                <span>Сделать шаблонный</span>
                            </label>
                        </fieldset>




                        <fieldset class="radio-glass-group">
                            <legend>Фирменный стиль</legend>

                            <label class="glass-radio">
                                <input type="radio" name="branding" value="Есть" />
                                <span>Есть</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="branding" value="Нужно разработать" />
                                <span>Нужно разработать</span>
                            </label>


                        </fieldset>




                        <fieldset class="radio-glass-group">
                            <legend>Фотографии по продукту</legend>

                            <label class="glass-radio">
                                <input type="radio" name="pproduct-photo" value="Да, всё готово!" />
                                <span>Да, всё готово!</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="pproduct-photo" value="Есть, но нужна обработка" />
                                <span>Есть, но нужна обработка</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="pproduct-photo" value="Предоставим в процессе" />
                                <span>Предоставим в процессе</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="pproduct-photo" value="ужен фотограф" />
                                <span>ужен фотограф</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="pproduct-photo" value="Фотографий не будет" />
                                <span>Фотографий продукта не будет</span>
                            </label>
                        </fieldset>




                        <fieldset class="radio-glass-group">
                            <legend>Фотографии команды</legend>

                            <label class="glass-radio">
                                <input type="radio" name="team-photo" value="Да, всё готово!" />
                                <span>Да, всё готово!</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="team-photo" value="Есть, но нужна обработка" />
                                <span>Есть, но нужна обработка</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="team-photo" value="Предоставим в процессе" />
                                <span>Предоставим в процессе</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="team-photo" value="ужен фотограф" />
                                <span>ужен фотограф</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="team-photo" value="Фотографий не будет" />
                                <span>Фотографий команды не будет</span>
                            </label>
                        </fieldset>


                        <fieldset class="radio-glass-group">
                            <legend>Фотографии процесса или производства</legend>

                            <label class="glass-radio">
                                <input type="radio" name="process-photo" value="Да, всё готово!" />
                                <span>Да, всё готово!</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="process-photo" value="Есть, но нужна обработка" />
                                <span>Есть, но нужна обработка</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="process-photo" value="Предоставим в процессе" />
                                <span>Предоставим в процессе</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="process-photo" value="ужен фотограф" />
                                <span>ужен фотограф</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="process-photo" value="Фотографий не будет" />
                                <span>Фотографий не будет</span>
                            </label>
                        </fieldset>




                        <fieldset class="radio-glass-group">
                            <legend>Иллюстрации</legend>

                            <label class="glass-radio">
                                <input type="radio" name="illustration" value="Да, всё готово!" />
                                <span>Да, всё готово!</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="illustration" value="Нет, нужен подбор или отрисовка" />
                                <span>Нет, нужен подбор или отрисовка</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="illustration" value="Купим на стоках" />
                                <span>Купим на стоках</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="illustration" value="Ищем бесплатные" />
                                <span>Ищем бесплатные</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="illustration" value="Не нужны" />
                                <span>Не нужны</span>
                            </label>
                        </fieldset>




                        <fieldset class="radio-glass-group">
                            <legend>Видеоролик</legend>

                            <label class="glass-radio">
                                <input type="radio" name="video" value="Есть" />
                                <span>Есть</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="video" value="Нет" />
                                <span>Нет</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="video" value="Отснимем" />
                                <span>Отснимем</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="video" value="Купим тематический на видео-стоке" />
                                <span>Купим тематический на видео-стоке</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="video" value="Не нужен" />
                                <span>Не нужен</span>
                            </label>
                        </fieldset>




                        <fieldset class="radio-glass-group">
                            <legend>Презентации, тексты, буклеты</legend>

                            <label class="glass-radio">
                                <input type="radio" name="presentation" value="Есть, отправим" />
                                <span>Есть, отправим</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="presentation" value="Готовим материалы" />
                                <span>Готовим материалы</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="presentation" value="Ничего нет" />
                                <span>Ничего нет</span>
                            </label>
                        </fieldset>



                        <label>Акции, скидки, УТП
                            <textarea placeholder="Укажите частоту, формат, особенности отображения"></textarea>
                        </label>




                        <fieldset class="radio-glass-group">
                            <legend>Сертификаты, патенты, свидетельства</legend>

                            <label class="glass-radio">
                                <input type="radio" name="dox" value="Есть" />
                                <span>Есть</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="dox" value="Есть, но не будем размещать" />
                                <span>Есть, но не будем размещать</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="dox" value="Нет" />
                                <span>Нет</span>
                            </label>
                        </fieldset>





                        <fieldset class="radio-glass-group">
                            <legend>Отзывы или письма благодарности</legend>

                            <label class="glass-radio">
                                <input type="radio" name="requests" value="Да, есть в формате текста, письма или видео" />
                                <span>Да, есть в формате текста, письма или видео</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="requests" value="Есть, но только скриншоты" />
                                <span>Есть, но только скриншоты</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="requests" value="Пока нет, но будут" />
                                <span>Пока нет, но будут</span>
                            </label>
                            <label class="glass-radio">
                                <input type="radio" name="requests" value="Нет отзывов" />
                                <span>Нет отзывов</span>
                            </label>
                        </fieldset>



                        <label>Дополнительные материалы
                            <textarea placeholder="Ссылки на папки в Google Drive, Яндекс.Диск и т.д."></textarea>
                        </label>

                    </fieldset>

                    <fieldset>
                        <h2>Дополнительная информация</h2>




                        <fieldset class="radio-glass-group">
                            <legend>Количество языковых версий</legend>

                            <label class="glass-radio">
                                <input type="radio" name="lang" value="1 язык" />
                                <span>1 язык</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="lang" value="2 языка" />
                                <span>2 языка</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="lang" value="Больше 2-х" />
                                <span>Больше 2-х</span>
                            </label>
                        </fieldset>


                        <label for="launchDate">Дата предполагаемого запуска
                            <input type="date" id="launchDate" name="launchDate" />
                        </label>


                        <label for="decisionPeople">Сколько человек будут принимать итоговое решение?
                            <input type="text" id="decisionPeople" name="decisionPeople" placeholder="Имена, должности" />
                        </label>




                        <fieldset class="radio-glass-group">
                            <legend>Планируемый или рассчитанный бюджет</legend>

                            <label class="glass-radio">
                                <input type="radio" name="budget" value="до 500е" />
                                <span>до 500е</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="budget" value="до 1000е" />
                                <span>до 1000е</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="budget" value="до 1500е" />
                                <span>до 1500е</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="budget" value="до 2000е" />
                                <span>до 2000е</span>
                            </label>
                        </fieldset>






                        <fieldset class="radio-glass-group">
                            <legend>Требуется ли администрирование сайта после запуска?</legend>

                            <label class="glass-radio">
                                <input type="radio" name="need-admin" value="Да" />
                                <span>Да</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="need-admin" value="Нет" />
                                <span>Нет</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="need-admin" value="неизвестно" />
                                <span>неизвестно</span>
                            </label>
                        </fieldset>





                        <fieldset class="radio-glass-group">
                            <legend>Будет ли участие маркетолога или других специалистов с вашей стороны?</legend>

                            <label class="glass-radio">
                                <input type="radio" name="marketing" value="Да" />
                                <span>Да</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="marketing" value="Нет" />
                                <span>Нет</span>
                            </label>

                            <label class="glass-radio">
                                <input type="radio" name="marketing" value="Пока неизвестно" />
                                <span>Пока неизвестно</span>
                            </label>
                        </fieldset>


                        <label for="extraInfo">Ожидания от работы с дизайнером / разработчиком
                            <textarea id="extraInfo" name="extraInfo" placeholder="бывало ли негативное сотрудничество, что важно в общении?" />
                        </label>

                        <label for="extraInfo">Предпочтительный способ сдачи проекта
                            <textarea id="extraInfo" name="extraInfo" placeholder="одним файлом, поэтапно, через платформу и т.д." />
                        </label>


                        <label for="extraInfo">Есть ли у вас техническое задание (ТЗ)?
                            <textarea id="extraInfo" name="extraInfo" placeholder="Напишите здесь всё, что считаете нужным" />
                        </label>


                        <label for="extraInfo">Есть ли ограничения по стилю?
                            <textarea id="extraInfo" name="extraInfo" placeholder="например: “не используйте шаблонные иконки”, “не хочу фиолетовый цвет”, “не использовать фото людей”" />
                        </label>



                        <label for="files">Файлы, которые у вас есть
                            <input type="file" id="files" name="files" multiple />
                        </label>


                        <label>
                            <input type="checkbox" name="policy" required />
                            Согласен с Политикой конфиденциальности
                        </label>
                        <label>
                            <input type="checkbox" name="terms" required />
                            Согласен с Пользовательским соглашением
                        </label>

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