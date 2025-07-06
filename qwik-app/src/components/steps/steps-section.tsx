import {component$} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'

export default component$ (()=>{
    return <h1>Этапы</h1>;
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