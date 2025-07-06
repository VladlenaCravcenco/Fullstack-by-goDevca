import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './HeroSection.scss';

export default component$(() => {
    return (
        <section class="hero">
            <div class="container">
                <div class="hero__content">
                    <div class="hero__left">
                        <h1>
                            Cravcenco Vladlena —
                            <br />
                            веб-дизайнер и fullstack-разработчик
                        </h1>
                        <p>
                            Cайт под ключ — от идеи до полноценного запуска с SEO-оптимизацией.
                        </p>
                        <p>
                            Без шаблонов. Разрабатываю адаптивные лендинги с маркетинговой структурой на <strong>Qwik</strong> и корпоративные сайты на <strong>React</strong>, полностью готовые к индексации в поисковых системах.
                        </p>
                        
                        <div class="hero__buttons">
                            <button class="btn btn--primary">Посмотреть кейсы</button>
                            <button class="btn btn--secondary">Обсудить проект</button>
                        </div>
                    </div>

                    <div class="hero__right">
                        <div class="hero__video-wrapper">
                            
                            <iframe
                                class="hero__video"
                                src="https://www.youtube.com/embed/WJeN12BEPn4"
                                title="Visit card for Fiverr profile"
                                style="border: none"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullscreen
                            ></iframe>
                        </div>
                    </div>
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
            content:
                'Всё началось с желания сделать сайт для своей анимационной студии uhappy.md',
        },
    ],
};