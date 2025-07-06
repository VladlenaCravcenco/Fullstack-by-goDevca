import {component$} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'

export default component$ (()=>{
    return <h1>go-dev blog</h1>;
});

export const head: DocumentHead = {
    title: 'Мои инсайды | godevca',
    meta: [
        {
            name: 'description',
            content: 'Здесь вы можете узнать что-то новое в сфере диджитал',

        },
    ],
};