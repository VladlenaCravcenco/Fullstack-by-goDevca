import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useLocation } from '@builder.io/qwik-city';
import { getLocaleFromPathname } from '~/lib/i18n';

export default component$(() => {
    const loc = useLocation();
    const locale = getLocaleFromPathname(loc.url.pathname);
    const copy = {
        ru: 'go-dev blog',
        ro: 'go-dev blog',
        en: 'go-dev blog',
    }[locale];

    return <h1>{copy}</h1>;
});

export const head: DocumentHead = ({ url }) => {
    const locale = getLocaleFromPathname(url.pathname);
    const copy = {
        ru: {
            title: 'Мои инсайды | godevca',
            description: 'Здесь вы можете узнать что-то новое в сфере диджитал',
        },
        ro: {
            title: 'Insight-urile mele | godevca',
            description: 'Aici poti gasi lucruri noi din zona digitala',
        },
        en: {
            title: 'My insights | godevca',
            description: 'Here you can learn something new from the digital space',
        },
    }[locale];

    return {
        title: copy.title,
        meta: [
            {
                name: 'description',
                content: copy.description,
            },
        ],
    };
};
