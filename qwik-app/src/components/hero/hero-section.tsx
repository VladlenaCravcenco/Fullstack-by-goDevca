import type { DocumentHead } from '@builder.io/qwik-city';
import './HeroSection.scss';

import { component$, useSignal, useResource$, Resource } from '@builder.io/qwik';
import { sanityClient } from '~/lib/sanity';

export default component$(() => {
    const lang = useSignal<'ru' | 'en' | 'ro'>('ru');
    
    const data = useResource$<any>(async () => {
        const header = await sanityClient.fetch(`*[_type == "header"][0]`);
        const data = await sanityClient.fetch(`*[_type == "header" && language == "${lang.value}"][0]`);
        return header;
    });

    return (
        <Resource
            value={data}
            onResolved={(header) => (
                <header class="header">
                    <div class="container">
                        <div class="header__left">
                            <span class="logo">{header.logo}</span>
                        </div>
                        <nav class="header__nav">
                            <ul>
                                {header.navLinks.ru.map((item: string) => (
                                    <li><a href="#">{item}</a></li>
                                ))}
                            </ul>
                        </nav>
                        <div class="header__right">
                            
                            <div class="lang-switch">
                                <button onClick$={() => (lang.value = 'ru')}>🌐 ru</button>
                                <button onClick$={() => (lang.value = 'en')}>🌐 en</button>
                                <button onClick$={() => (lang.value = 'ro')}>🌐 ro</button>
                            </div>
                            <button class="brief-btn">{header.briefButton.ru}</button>
                            <button class="burger">☰</button>
                        </div>
                    </div>
                </header>
            )}
        />
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