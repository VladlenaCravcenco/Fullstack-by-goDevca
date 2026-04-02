import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { isLocale, localizePath } from '~/lib/i18n';

export const onRequest: RequestHandler = ({ params, redirect, error, url }) => {
  if (params.lang === 'ru') {
    throw redirect(308, localizePath('ru', `${url.pathname}${url.search}`));
  }

  if (!isLocale(params.lang) || params.lang === 'ru') {
    throw error(404, 'Not Found');
  }
};

export default component$(() => <Slot />);
