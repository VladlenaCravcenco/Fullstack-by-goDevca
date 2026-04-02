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
  const locale = getLocaleFromPathname(normalized);

  if (locale === defaultLocale) {
    return normalized || '/';
  }

  const stripped = normalized.replace(new RegExp(`^/${locale}(?=/|$)`), '') || '/';
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
