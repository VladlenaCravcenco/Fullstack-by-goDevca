import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import './ServicesSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';

export default component$(() => {
    const services = [
        {
            tag: 'Figma',
            title: 'Дизайн сайта',
            description:
                'Работаю в Figma, чтобы создать уникальный, адаптивный и визуально сильный интерфейс. Подходит, если у вас нет готового дизайна и нужно всё с нуля.'
        },
        {
            tag: 'React / Qwik',
            title: 'Разработка сайта по готовому дизайну',
            description:
                'Перевожу ваш дизайн в чистый, быстрый и адаптивный код. Подходит, если у вас есть Figma-дизайн и нужно собрать рабочий сайт.'
        },
        {
            tag: 'Sanity',
            title: 'Интеграция CMS и админки',
            description:
                'Подключаю админ-панель Sanity, чтобы вы могли редактировать тексты, картинки и проекты без программиста. Подходит для бизнесов, которые хотят сами управлять контентом.'
        },
        {
            tag: 'Qwik / Sanity',
            title: 'SEO-настройка и оптимизация',
            description:
                'Прописываю мета-теги, alt, заголовки и структуру, чтобы сайт попадал в Google и работал быстро. Подходит, если вы хотите, чтобы сайт не просто существовал, а приносил трафик.'
        }
    ];

    return (
        <section class="services">
            <div class="container">
                <h2 class="services__title">Что я могу вам предложить</h2>
                <div class="services__list">
                    {services.map((service, index) => (
                        <GlassEffect class="service-card" key={index}>
                            <div class="service-card__tag">{service.tag}</div>
                            <div class="service-card__content">
                                <h3 class="service-card__title">{service.title}</h3>
                                <p class="service-card__desc">{service.description}</p>
                            </div>

                        </GlassEffect>

                    ))}
                </div>
            </div>
        </section>
    );
});

export const head: DocumentHead = {
    title: 'Обо мне',
    meta: [
        {
            name: 'description',
            content: 'Всё началось с желания сделать сайт для своей анимационной студии uhappy.md',

        },
    ],
};