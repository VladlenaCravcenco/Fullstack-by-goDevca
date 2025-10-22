
import { component$, useSignal, } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './Header.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { Link } from '@builder.io/qwik-city';
import { glassHover } from '~/utils/sounds';



export default component$(() => {
    const menuOpen = useSignal(false);

    return (
        <header class="header">
            <div class="container">
                <div class="header__left">
                    <a href='/' class="logo">godevca</a>
                </div>

                <nav class="header__nav">
                    <ul>
                        <li><a href="#services">Услуги</a></li>
                        <li><a href="#process">Процесс</a></li>
                        <li><a href="#projects">Проекты</a></li>
                        <li><a href="#pricing">Цены</a></li>
                        <li><a href="#about">Обо мне</a></li>
                        <li><a href="#blog">Блог</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contacts">Контакты</a></li>
                    </ul>
                </nav>

                <div class="header__right">
                    <div class="lang-switch">
                        <span class="icon"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.75 7.5C13.75 10.9518 10.9518 13.75 7.5 13.75M13.75 7.5C13.75 4.04822 10.9518 1.25 7.5 1.25M13.75 7.5H1.25M7.5 13.75C4.04822 13.75 1.25 10.9518 1.25 7.5M7.5 13.75C9.0633 12.0385 9.95172 9.81748 10 7.5C9.95172 5.18252 9.0633 2.96147 7.5 1.25M7.5 13.75C5.9367 12.0385 5.04828 9.81748 5 7.5C5.04828 5.18252 5.9367 2.96147 7.5 1.25M1.25 7.5C1.25 4.04822 4.04822 1.25 7.5 1.25" stroke="#1E1E1E" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        </span> ru
                    </div>
                    <GlassEffect class="brief-btn"
                        onMouseEnter$={() => {
                            // чтобы звук перезапускался при частых наведениях
                            glassHover.stop();
                            glassHover.play();
                        }}
                    >
                        <Link href="/brief">заполнить бриф</Link>
                    </GlassEffect>


                    <button
                        class="burger"
                        onClick$={() => (menuOpen.value = !menuOpen.value)}
                    >
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect y="0.5" width="12.5" height="2" rx="1" fill="#18181B" />
                            <rect y="5" width="12.5" height="2" rx="1" fill="#18181B" />
                            <rect y="9.5" width="12.5" height="2" rx="1" fill="#18181B" />
                        </svg>

                    </button>
                </div>
            </div>

            {menuOpen.value && (
                <div class="mobile-menu">
                    <ul>
                        <li><a href="#services">Услуги</a></li>
                        <li><a href="#process">Процесс</a></li>
                        <li><a href="#projects">Проекты</a></li>
                        <li><a href="#pricing">Цены</a></li>
                        <li><a href="#about">Обо мне</a></li>
                        <li><a href="#blog">Блог</a></li>
                        <li><a href="#faq">FAQ</a></li>
                        <li><a href="#contacts">Контакты</a></li>
                    </ul>
                </div>
            )}
        </header>
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