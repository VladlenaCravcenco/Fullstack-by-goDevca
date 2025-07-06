import {component$} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'

export default component$ (()=>{
    return <h1>Все проекты</h1>;
});

export const head: DocumentHead = {
    title: 'Мои проекты | godevca',
    meta: [
        {
            name: 'description',
            content: 'Здесь вы можете посмотреть мои реализованные проекты.',

        },
    ],
};