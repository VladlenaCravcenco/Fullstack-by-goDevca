
import { component$, useSignal, } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './Header.css';
import { GlassEffect } from '~/components/ui/GlassEffect';

export default component$(() => {

    const menuOpen = useSignal(false);
    
    return (
        <header class="header">
            <div class="container">
                <div class="header__left">
                    <span class="logo">godevca</span>
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
                        <span class="icon">🌐</span> ru
                    </div>
                    <GlassEffect class="brief-btn">
                        Заполнить бриф
                    </GlassEffect>


                    <button
                        class="burger"
                        onClick$={() => (menuOpen.value = !menuOpen.value)}
                    >
                        ☰
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