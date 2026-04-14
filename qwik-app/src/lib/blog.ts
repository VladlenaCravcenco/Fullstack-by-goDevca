import type { Locale } from '~/lib/i18n';

export const blogCategories = ['react', 'qwik', 'design', '3d'] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type PortableTextChild = {
  _key?: string;
  text?: string;
};

export type PortableTextBlock = {
  _key?: string;
  _type?: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: PortableTextChild[];
};

export type BlogListItem = {
  _id: string;
  title: string;
  slug: string;
  category: BlogCategory;
  excerpt: string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  cover?: unknown;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

export type BlogPost = BlogListItem & {
  content: PortableTextBlock[];
};

export const blogCategoryCopy: Record<
  Locale,
  Record<
    BlogCategory,
    {
      label: string;
      description: string;
    }
  >
> = {
  ru: {
    react: {
      label: 'React',
      description: 'Архитектура интерфейсов, производительность и удобная поддержка продукта.',
    },
    qwik: {
      label: 'Qwik',
      description: 'SSR, resumability и практичные решения для быстрых сайтов и лендингов.',
    },
    design: {
      label: 'Дизайн',
      description: 'UI, UX, контент-структура и визуальные решения, которые помогают продавать.',
    },
    '3d': {
      label: '3D',
      description: 'Blender, CGI и приемы, которые усиливают digital-подачу продукта.',
    },
  },
  ro: {
    react: {
      label: 'React',
      description: 'Arhitectura interfetelor, performanta si mentenanta clara a produsului.',
    },
    qwik: {
      label: 'Qwik',
      description: 'SSR, resumability si solutii practice pentru site-uri foarte rapide.',
    },
    design: {
      label: 'Design',
      description: 'UI, UX si structuri vizuale care ajuta produsul sa vanda mai bine.',
    },
    '3d': {
      label: '3D',
      description: 'Blender, CGI si prezentari vizuale care cresc perceptia de valoare.',
    },
  },
  en: {
    react: {
      label: 'React',
      description: 'Interface architecture, performance, and maintainable product delivery.',
    },
    qwik: {
      label: 'Qwik',
      description: 'SSR, resumability, and practical patterns for extremely fast websites.',
    },
    design: {
      label: 'Design',
      description: 'UI, UX, and visual systems that help a product convert better.',
    },
    '3d': {
      label: '3D',
      description: 'Blender, CGI, and visual techniques that elevate digital presentation.',
    },
  },
};

export const blogPageCopy: Record<
  Locale,
  {
    title: string;
    description: string;
    all: string;
    featured: string;
    empty: string;
    minutes: string;
    published: string;
    ctaTitle: string;
    ctaText: string;
    ctaLabel: string;
    back: string;
  }
> = {
  ru: {
    title: 'Блог о React, Qwik, дизайне и 3D',
    description:
      'Пишу для клиентов и команд о решениях, которые помогают запускать сайты быстрее, выглядеть сильнее и не терять деньги на хаосе в продукте.',
    all: 'Все статьи',
    featured: 'Рекомендовано',
    empty: 'В этой теме пока нет публикаций.',
    minutes: 'мин чтения',
    published: 'Опубликовано',
    ctaTitle: 'Нужен сайт, интерфейс или визуал для продукта?',
    ctaText: 'Могу помочь со стратегией, дизайном, разработкой и производственной частью проекта.',
    ctaLabel: 'Заполнить бриф',
    back: 'Все статьи',
  },
  ro: {
    title: 'Blog despre React, Qwik, design si 3D',
    description:
      'Scriu pentru clienti si echipe despre decizii care accelereaza lansarea, imbunatatesc prezentarea si reduc haosul din produs.',
    all: 'Toate articolele',
    featured: 'Recomandat',
    empty: 'In aceasta categorie nu exista inca articole.',
    minutes: 'min citire',
    published: 'Publicat',
    ctaTitle: 'Ai nevoie de un site, un UI sau vizualuri pentru produs?',
    ctaText: 'Pot ajuta cu strategia, designul, dezvoltarea si partea de productie a proiectului.',
    ctaLabel: 'Completeaza brief-ul',
    back: 'Toate articolele',
  },
  en: {
    title: 'Blog about React, Qwik, design, and 3D',
    description:
      'I write for clients and teams about decisions that speed up launch, improve presentation, and reduce product chaos.',
    all: 'All posts',
    featured: 'Featured',
    empty: 'There are no posts in this category yet.',
    minutes: 'min read',
    published: 'Published',
    ctaTitle: 'Need a website, interface, or visuals for your product?',
    ctaText: 'I can help with strategy, design, development, and production execution.',
    ctaLabel: 'Fill out the brief',
    back: 'All posts',
  },
};

export function formatBlogDate(locale: Locale, value: string): string {
  try {
    return new Intl.DateTimeFormat(locale === 'ru' ? 'ru-RU' : locale === 'ro' ? 'ro-RO' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function isBlogCategory(value: string | null | undefined): value is BlogCategory {
  return !!value && blogCategories.includes(value as BlogCategory);
}

export function getPortableTextQuery(fieldName: string): string {
  return `coalesce(${fieldName}[$locale], ${fieldName}.ru)`;
}
