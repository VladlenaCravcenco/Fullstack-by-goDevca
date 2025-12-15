import { component$ } from '@builder.io/qwik';
import { GlassEffect } from '~/components/ui/GlassEffect';

import './footer.css';

export default component$(() => {
    return (
        <footer class="footer">
            {/* Фон-картинка */}
            <div class="footer__bg" aria-hidden="true" />
            <div class="container">
                {/* CTA */}
                <div class="footer__cta">
                    <div class="footer__kicker">Открыта к сотрудничеству</div>

                    <h2 class="footer__title">
                        давайте обсудим
                    </h2>

                    <p class="footer__text">
                        Готова к новым проектам и профессиональным знакомствам.
                    </p>

                    <GlassEffect>
                        <a class="footer__btn" href="/brief">заполнить бриф</a>
                    </GlassEffect>
                </div>

                {/* Нижние карточки */}
                <div class="footer__bottom">
                    <section class="glass-card">
                        <h3 class="glass-card__title">Контакты</h3>

                        <div class="glass-card__row">
                            <span class="glass-card__label">Cravcenco Vladlena</span>
                        </div>

                        <a class="glass-card__row glass-card__link" href="mailto:godevca@gmail.com">
                            godevca@gmail.com
                        </a>

                        <div class="glass-card__meta">© 2025 Cravcenco Vladlena. Все права защищены.</div>
                    </section>

                    <section class="glass-card glass-card--wide">
                        <div class="glass-card__grid">
                            <div>
                                <h3 class="glass-card__title">Навигация</h3>

                                <nav class="glass-card__nav">
                                    <a href="/services">Услуги</a>
                                    <a href="/projects">Проекты</a>
                                    <a href="/blog">Блог</a>
                                </nav>
                            </div>

                            <div class="glass-card__social">
                                <a class="soc" href="#" aria-label="LinkedIn">in</a>
                                <a class="soc" href="#" aria-label="Instagram">◎</a>
                                <a class="soc" href="#" aria-label="Behance">Be</a>
                                <a class="soc" href="#" aria-label="X">X</a>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </footer>
    );
});