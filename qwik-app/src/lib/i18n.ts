export const locales = ['ru', 'ro', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'ru';

export const localeLabels: Record<Locale, string> = {
  ru: 'РУ',
  ro: 'RO',
  en: 'EN',
};

export const localeDateFormats: Record<Locale, string> = {
  ru: 'ru-RU',
  ro: 'ro-RO',
  en: 'en-US',
};

export const localeHtmlLang: Record<Locale, string> = {
  ru: 'ru',
  ro: 'ro',
  en: 'en',
};

export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && locales.includes(value as Locale);
}

export function getLocaleFromPathname(pathname: string): Locale {
  const [firstSegment] = pathname.split('/').filter(Boolean);
  if (isLocale(firstSegment) && firstSegment !== defaultLocale) {
    return firstSegment;
  }

  return defaultLocale;
}

export function stripLocalePrefix(pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const stripped =
    normalized.replace(new RegExp(`^/(?:${locales.join('|')})(?=/|$)`), '') || '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

export function localizePath(locale: Locale, rawPath: string): string {
  if (!rawPath) return locale === defaultLocale ? '/' : `/${locale}`;

  if (
    rawPath.startsWith('http://') ||
    rawPath.startsWith('https://') ||
    rawPath.startsWith('mailto:') ||
    rawPath.startsWith('tel:')
  ) {
    return rawPath;
  }

  const hashIndex = rawPath.indexOf('#');
  const searchIndex = rawPath.indexOf('?');
  const splitIndex =
    hashIndex === -1 ? searchIndex : searchIndex === -1 ? hashIndex : Math.min(hashIndex, searchIndex);

  const pathname = splitIndex === -1 ? rawPath : rawPath.slice(0, splitIndex);
  const suffix = splitIndex === -1 ? '' : rawPath.slice(splitIndex);
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const cleanPath = stripLocalePrefix(normalizedPath);

  if (locale === defaultLocale) {
    return `${cleanPath}${suffix}`;
  }

  return cleanPath === '/' ? `/${locale}${suffix}` : `/${locale}${cleanPath}${suffix}`;
}

export function switchLocalePath(currentPath: string, targetLocale: Locale): string {
  return localizePath(targetLocale, currentPath);
}

export const uiCopy = {
  ru: { notFound: 'Страница не найдена', postNotFound: 'Статья не найдена.', project: 'Проект', tags: 'Теги', meta: 'О проекте', mockup: 'Макет', screen: 'Экран', agency: 'Агентство', categories: 'Категории блога', name: 'Кравченко Владлена', preview: 'Превью дизайн-проекта', education: ['Курс веб-дизайна — Vanar.md', 'USM, информационные и коммуникационные технологии', 'Skillbox, веб-дизайн с нуля до PRO'] },
  ro: { notFound: 'Pagina nu a fost găsită', postNotFound: 'Articolul nu a fost găsit.', project: 'Proiect', tags: 'Etichete', meta: 'Despre proiect', mockup: 'Machetă', screen: 'Ecran', agency: 'Agenție', categories: 'Categoriile blogului', name: 'Cravcenco Vladlena', preview: 'Previzualizare proiect de design', education: ['Curs de web design — Vanar.md', 'USM, tehnologii informaționale și de comunicații', 'Skillbox, web design de la zero la PRO'] },
  en: { notFound: 'Page not found', postNotFound: 'Post not found.', project: 'Project', tags: 'Tags', meta: 'About the project', mockup: 'Mockup', screen: 'Screen', agency: 'Agency', categories: 'Blog categories', name: 'Vladlena Cravcenco', preview: 'Design project preview', education: ['Web design course — Vanar.md', 'USM, Information and Communication Technologies', 'Skillbox, Web Design from Zero to PRO'] },
} satisfies Record<Locale, object>;
