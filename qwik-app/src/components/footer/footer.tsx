import { component$ } from '@builder.io/qwik';
import { GlassEffect } from '~/components/ui/GlassEffect';

import './footer.css';

export default component$(() => {
    return (
        <footer class="footer">
            {/* Фон-картинка */}
            <div class="footer__bg" aria-hidden="true" />
            <div class="container">
                <div class="footer-flex">
                    {/* CTA */}
                    <div class="footer__cta">
                        <div class="footer__kicker">Открыта к сотрудничеству</div>

                        <h1 class="footer__title">
                            давайте обсудим
                        </h1>

                        <h3 class="footer__text">
                            Готова к новым проектам и профессиональным знакомствам.
                        </h3>

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

                            <div class="glass-card__social left">


                                <a
                                    class="soc"
                                    href="https://instagram.com/godevca"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="18"
                                            height="18"
                                            rx="5"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        />
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="4"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        />
                                        <circle
                                            cx="17"
                                            cy="7"
                                            r="1.2"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </a>


                                <a
                                    class="soc"
                                    href="https://t.me/Cravcenco_frontend"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Telegram"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                                        <path
                                            d="M21.8 4.6L2.9 11.9c-.8.3-.8 1.4.1 1.7l4.7 1.5 1.8 5.4c.2.6 1 .7 1.4.2l2.7-3.3 4.9 3.6c.5.4 1.2.1 1.3-.5l3.3-15.2c.1-.6-.4-1.1-1-.7Z"
                                            stroke="currentColor"
                                            stroke-width="1.7"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M7.6 13.4l9.1-5.6"
                                            stroke="currentColor"
                                            stroke-width="1.7"
                                            stroke-linecap="round"
                                        />
                                    </svg>
                                </a>


                                <a
                                    class="soc"
                                    href="https://wa.me/37378158084"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                        <path d="M12 2a10 10 0 0 0-8.4 15.4L2 22l4.7-1.6A10 10 0 1 0 12 2Zm4.9 14.2c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.5-.1-1.6-.5-2.8-1.5-3.8-2.6-1-1.1-1.7-2.5-1.9-4-.1-.6 0-1.1.3-1.4.3-.4.6-.4.9-.4h.7c.2 0 .4.1.5.4l.6 1.4c.1.3.1.5-.1.7l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.2-.2.4-.2.7-.1l1.4.6c.3.1.4.3.3.7Z" />
                                    </svg>
                                </a>


                                <a
                                    class="soc"
                                    href="https://www.linkedin.com/in/vladlena-cravcenco/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        width="18"
                                        height="18"
                                        aria-hidden="true"
                                    >

                                        <path
                                            fill="currentColor"
                                            d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0.2 23.8h4.6V7.8H0.2v16ZM8.2 7.8h4.4v2.2h.06c.62-1.18 2.14-2.42 4.4-2.42 4.7 0 5.6 3.1 5.6 7.1v9.1h-4.6v-8.1c0-1.94-.04-4.44-2.7-4.44-2.7 0-3.1 2.1-3.1 4.28v8.26H8.2v-16Z"
                                        />
                                    </svg>
                                </a>


                                <a
                                    class="soc"
                                    href="https://www.upwork.com/freelancers/~011348261026e68780?mp_source=share"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Upwork"
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 800 568"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M618.7 322.2C581.967 322.2 547.533 306.633 516.233 281.3L523.833 245.433L524.1 244.033C531 205.933 552.4 142.033 618.733 142.033C668.467 142.033 708.833 182.433 708.833 232.133C708.8 281.767 668.433 322.2 618.7 322.2ZM618.7 50.8667C534.067 50.8667 468.367 105.833 441.7 196.4C401.033 135.267 370.1 61.8667 352.133 0H260.933V237.067C260.867 283.933 222.9 321.933 176.033 322C129.2 321.933 91.2667 283.9 91.2 237.067V0H0V237.067C0 334.2 79 413.833 176.033 413.833C273.133 413.833 352.133 334.2 352.133 237.067V197.4C369.767 234.3 391.533 271.7 417.933 304.767L362.167 567.2H455.4L495.833 376.867C531.267 399.5 572 413.833 618.7 413.833C718.7 413.833 800 332.1 800 232.167C800 132.167 718.7 50.8667 618.7 50.8667Z"
                                            fill="#ffffff"
                                        />
                                    </svg>

                                </a>


                                <a
                                    class="soc"
                                    href="https://github.com/VladlenaCravcenco"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.82 5.62-5.5 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                                    </svg>
                                </a>

                            </div>

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

                                <div class="glass-card__social right">
                                    <a
                                        class="soc"
                                        href="https://instagram.com/godevca"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Instagram"
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <rect
                                                x="3"
                                                y="3"
                                                width="18"
                                                height="18"
                                                rx="5"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            />
                                            <circle
                                                cx="12"
                                                cy="12"
                                                r="4"
                                                stroke="currentColor"
                                                stroke-width="2"
                                            />
                                            <circle
                                                cx="17"
                                                cy="7"
                                                r="1.2"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </a>


                                    <a
                                        class="soc"
                                        href="https://t.me/Cravcenco_frontend"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Telegram"
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                                            <path
                                                d="M21.8 4.6L2.9 11.9c-.8.3-.8 1.4.1 1.7l4.7 1.5 1.8 5.4c.2.6 1 .7 1.4.2l2.7-3.3 4.9 3.6c.5.4 1.2.1 1.3-.5l3.3-15.2c.1-.6-.4-1.1-1-.7Z"
                                                stroke="currentColor"
                                                stroke-width="1.7"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M7.6 13.4l9.1-5.6"
                                                stroke="currentColor"
                                                stroke-width="1.7"
                                                stroke-linecap="round"
                                            />
                                        </svg>
                                    </a>


                                    <a
                                        class="soc"
                                        href="https://wa.me/37378158084"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="WhatsApp"
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                            <path d="M12 2a10 10 0 0 0-8.4 15.4L2 22l4.7-1.6A10 10 0 1 0 12 2Zm4.9 14.2c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.1-1.5-.1-1.6-.5-2.8-1.5-3.8-2.6-1-1.1-1.7-2.5-1.9-4-.1-.6 0-1.1.3-1.4.3-.4.6-.4.9-.4h.7c.2 0 .4.1.5.4l.6 1.4c.1.3.1.5-.1.7l-.5.6c.5 1 1.3 1.8 2.3 2.3l.6-.5c.2-.2.4-.2.7-.1l1.4.6c.3.1.4.3.3.7Z" />
                                        </svg>
                                    </a>


                                    <a
                                        class="soc"
                                        href="https://www.linkedin.com/in/vladlena-cravcenco/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="LinkedIn"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="18"
                                            height="18"
                                            aria-hidden="true"
                                        >

                                            <path
                                                fill="currentColor"
                                                d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM0.2 23.8h4.6V7.8H0.2v16ZM8.2 7.8h4.4v2.2h.06c.62-1.18 2.14-2.42 4.4-2.42 4.7 0 5.6 3.1 5.6 7.1v9.1h-4.6v-8.1c0-1.94-.04-4.44-2.7-4.44-2.7 0-3.1 2.1-3.1 4.28v8.26H8.2v-16Z"
                                            />
                                        </svg>
                                    </a>


                                    <a
                                        class="soc"
                                        href="https://www.upwork.com/freelancers/~011348261026e68780?mp_source=share"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="Upwork"
                                    >
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 800 568"
                                            xmlns="http://www.w3.org/2000/svg"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M618.7 322.2C581.967 322.2 547.533 306.633 516.233 281.3L523.833 245.433L524.1 244.033C531 205.933 552.4 142.033 618.733 142.033C668.467 142.033 708.833 182.433 708.833 232.133C708.8 281.767 668.433 322.2 618.7 322.2ZM618.7 50.8667C534.067 50.8667 468.367 105.833 441.7 196.4C401.033 135.267 370.1 61.8667 352.133 0H260.933V237.067C260.867 283.933 222.9 321.933 176.033 322C129.2 321.933 91.2667 283.9 91.2 237.067V0H0V237.067C0 334.2 79 413.833 176.033 413.833C273.133 413.833 352.133 334.2 352.133 237.067V197.4C369.767 234.3 391.533 271.7 417.933 304.767L362.167 567.2H455.4L495.833 376.867C531.267 399.5 572 413.833 618.7 413.833C718.7 413.833 800 332.1 800 232.167C800 132.167 718.7 50.8667 618.7 50.8667Z"
                                                fill="#ffffff"
                                            />
                                        </svg>

                                    </a>


                                    <a
                                        class="soc"
                                        href="https://github.com/VladlenaCravcenco"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="GitHub"
                                    >
                                        <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58v-2.17c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.82 5.62-5.5 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>


            </div>
        </footer>
    );
});