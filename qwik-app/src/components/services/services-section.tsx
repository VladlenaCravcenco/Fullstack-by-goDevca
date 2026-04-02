import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import './ServicesSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { playGlassHover } from '~/utils/sounds';
import { getLocaleFromPathname } from '~/lib/i18n';

export default component$(() => {
    const loc = useLocation();
    const locale = getLocaleFromPathname(loc.url.pathname);

    const copy = {
        ru: {
            title: 'Что я могу вам предложить',
            services: [
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
                        'Подключаю админ-панель Sanity, чтобы вы могли редактировать тексты, картинки и проекты без программиста.'
                },
                {
                    tag: 'Qwik / Sanity',
                    title: 'SEO-настройка и оптимизация',
                    description:
                        'Прописываю мета-теги, alt, заголовки и структуру, чтобы сайт попадал в Google и работал быстро.'
                }
            ]
        },
        ro: {
            title: 'Ce iti pot oferi',
            services: [
                {
                    tag: 'Figma',
                    title: 'Design de site',
                    description:
                        'Lucrez in Figma pentru a crea o interfata unica, adaptiva si puternica vizual. Potrivit daca nu ai design gata si trebuie sa pornim de la zero.'
                },
                {
                    tag: 'React / Qwik',
                    title: 'Dezvoltare dupa design existent',
                    description:
                        'Transform designul tau in cod curat, rapid si adaptiv. Potrivit daca ai deja designul in Figma si trebuie construit site-ul.'
                },
                {
                    tag: 'Sanity',
                    title: 'Integrare CMS si admin',
                    description:
                        'Conectez panoul Sanity ca sa poti edita textele, imaginile si proiectele fara programator.'
                },
                {
                    tag: 'Qwik / Sanity',
                    title: 'SEO si optimizare',
                    description:
                        'Setez meta taguri, alt-uri, headings si structura ca site-ul sa intre in Google si sa ramana rapid.'
                }
            ]
        },
        en: {
            title: 'What I can offer you',
            services: [
                {
                    tag: 'Figma',
                    title: 'Website design',
                    description:
                        'I use Figma to create a unique, responsive, visually strong interface. A good fit if you do not have a final design and need to start from scratch.'
                },
                {
                    tag: 'React / Qwik',
                    title: 'Development from a ready design',
                    description:
                        'I turn your design into clean, fast and responsive code. A good fit if you already have a Figma design and need a working site.'
                },
                {
                    tag: 'Sanity',
                    title: 'CMS and admin integration',
                    description:
                        'I connect a Sanity admin panel so you can edit text, images and projects without relying on a developer.'
                },
                {
                    tag: 'Qwik / Sanity',
                    title: 'SEO setup and optimization',
                    description:
                        'I configure meta tags, alt text, headings and structure so the website performs well and is indexable in Google.'
                }
            ]
        }
    }[locale];

    const services = copy.services;

    return (
        <section class="services" id='services'>
            <div class="container">
                <h2 class="services__title">{copy.title}</h2>
                <div class="services__list">
                    {services.map((service, index) => (
                        <GlassEffect class="service-card" key={index}>
                            <div onMouseEnter$={() => playGlassHover()}
                                onPointerDown$={() => playGlassHover()}>
                                <div class="service-card__tag">{service.tag}</div>
                                <div class="service-card__content">
                                    <h3 class="service-card__title">{service.title}</h3>
                                    <p class="service-card__desc">{service.description}</p>
                                </div>
                            </div>
                        </GlassEffect>
                    ))}
                </div>
            </div>
        </section>
    );
});
