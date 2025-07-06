import {component$} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'

export default component$ (()=>{
    return <h1>Блог</h1>;
});

export const head: DocumentHead = {
    title: 'Блог',
    meta: [
        {
            name: 'description',
            content: 'Описание',

        },
    ],
};