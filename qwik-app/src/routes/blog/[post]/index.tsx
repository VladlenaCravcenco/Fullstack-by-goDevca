import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { useLocation } from '@builder.io/qwik-city';
import { getLocaleFromPathname } from '~/lib/i18n';

export default component$(() => {
    const loc = useLocation();
    const locale = getLocaleFromPathname(loc.url.pathname);
    const copy = {
        ru: 'Пост',
        ro: 'Articol',
        en: 'Post',
    }[locale];

    return <h1>{copy}</h1>;
});

export const head: DocumentHead = ({ url }) => {
    const locale = getLocaleFromPathname(url.pathname);
    const copy = {
        ru: {
            title: 'Пост | godevca',
            description: 'Публикация в блоге godevca',
        },
        ro: {
            title: 'Articol | godevca',
            description: 'Articol din blogul godevca',
        },
        en: {
            title: 'Post | godevca',
            description: 'A post from the godevca blog',
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
