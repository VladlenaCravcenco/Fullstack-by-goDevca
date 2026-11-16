import type { Locale } from './i18n';

// Reviewed translations for published legacy CMS values. New CMS translations take
// precedence; exact matching prevents an old translation overriding edited content.
const translations: Array<{ source: string } & Record<Locale, string>> = [
  {
    "source": "Мультиязычный лендинг с банковской интеграцией MAIB для продажи электронной книги.",
    "ru": "Мультиязычный лендинг с банковской интеграцией MAIB для продажи электронной книги.",
    "ro": "Landing page multilingv cu integrare bancară MAIB pentru vânzarea unei cărți electronice.",
    "en": "A multilingual landing page with MAIB banking integration for selling an e-book."
  },
  {
    "source": "создать максимально простой по интерфейсу сайт с кнопкой оплаты, но с полноценной банковской интеграцией. Нужно было реализовать не просто редирект на платёжную страницу, а корректную работу через API MAIB с подтверждением транзакции. Дополнительно требовалась автоматическая отправка письма покупателю после успешной оплаты и поддержка двух языковых версий сайта.",
    "ru": "создать максимально простой по интерфейсу сайт с кнопкой оплаты, но с полноценной банковской интеграцией. Нужно было реализовать не просто редирект на платёжную страницу, а корректную работу через API MAIB с подтверждением транзакции. Дополнительно требовалась автоматическая отправка письма покупателю после успешной оплаты и поддержка двух языковых версий сайта.",
    "ro": "Crearea unui site cu o interfață cât mai simplă și un buton de plată, dar cu integrare bancară completă. Era necesară integrarea corectă cu API-ul MAIB și confirmarea tranzacțiilor, nu doar redirecționarea către o pagină de plată. În plus, site-ul trebuia să trimită automat un e-mail cumpărătorului după plata reușită și să ofere două versiuni lingvistice.",
    "en": "Create a website with a simple interface and payment button backed by a complete banking integration. This required working with the MAIB API and confirming transactions, rather than simply redirecting to a payment page. The website also needed to email buyers automatically after successful payment and support two language versions."
  },
  {
    "source": "Главная задача — не просто показать услуги, а передать атмосферу студии через:\n\t•\tдинамичную композицию\n\t•\tакцент на визуал\n\t•\tсовременную типографику\n\t•\tнестандартную подачу блоков",
    "ru": "Главная задача — не просто показать услуги, а передать атмосферу студии через:\n\t•\tдинамичную композицию\n\t•\tакцент на визуал\n\t•\tсовременную типографику\n\t•\tнестандартную подачу блоков",
    "ro": "Scopul principal a fost să transmit atmosfera studioului, nu doar să prezint serviciile, prin:\n• compoziție dinamică\n• accent pe elementele vizuale\n• tipografie modernă\n• prezentarea neconvențională a secțiunilor",
    "en": "The main goal was to convey the atmosphere of the studio as well as present its services through:\n• dynamic composition\n• a focus on visuals\n• modern typography\n• unconventional section layouts"
  },
  {
    "source": "Сайт должен был:\n\t•\tвызывать ощущение стабильности\n\t•\tотражать финансовую дисциплину\n\t•\tбыть понятным для международной аудитории\n\t•\tмасштабироваться под рост компании",
    "ru": "Сайт должен был:\n\t•\tвызывать ощущение стабильности\n\t•\tотражать финансовую дисциплину\n\t•\tбыть понятным для международной аудитории\n\t•\tмасштабироваться под рост компании",
    "ro": "Site-ul trebuia să:\n• inspire stabilitate\n• reflecte disciplina financiară\n• fie clar pentru un public internațional\n• permită extinderea odată cu dezvoltarea companiei",
    "en": "The website needed to:\n• convey stability\n• reflect financial discipline\n• be clear to an international audience\n• scale with the company’s growth"
  },
  {
    "source": "Клиент обратился с запросом на обновление корпоративного сайта, который не отражал позиционирование компании и имел низкие позиции в поиске.",
    "ru": "Клиент обратился с запросом на обновление корпоративного сайта, который не отражал позиционирование компании и имел низкие позиции в поиске.",
    "ro": "Clientul a solicitat modernizarea site-ului corporativ, care nu reflecta poziționarea companiei și avea o vizibilitate redusă în căutări.",
    "en": "The client requested an update to a corporate website that did not reflect the company’s positioning and ranked poorly in search results."
  },
  {
    "source": "Основная цель — сделать современный, динамичный сайт с анимацией и улучшить SEO-показатели.",
    "ru": "Основная цель — сделать современный, динамичный сайт с анимацией и улучшить SEO-показатели.",
    "ro": "Obiectivul principal a fost crearea unui site modern și dinamic, cu animații și performanțe SEO îmbunătățite.",
    "en": "The main goal was to create a modern, dynamic website with animations and improved SEO performance."
  },
  {
    "source": "Digital presence for a creative design studio.",
    "ru": "Сайт для креативной дизайн-студии.",
    "ro": "Prezență digitală pentru un studio de design creativ.",
    "en": "Digital presence for a creative design studio."
  },
  {
    "source": "Corporate Website for Energy Trading Company",
    "ru": "Корпоративный сайт компании по торговле энергоресурсами",
    "ro": "Site corporativ pentru o companie de comercializare a energiei",
    "en": "Corporate website for an energy trading company"
  },
  {
    "source": "Valentine’s Campaign Landing",
    "ru": "Лендинг ко Дню святого Валентина",
    "ro": "Landing page pentru campania de Ziua Îndrăgostiților",
    "en": "Valentine’s Day campaign landing page"
  },
  {
    "source": "перейти на сайт",
    "ru": "перейти на сайт",
    "ro": "Accesează site-ul",
    "en": "Visit website"
  },
  {
    "source": "посмотреть сайт",
    "ru": "посмотреть сайт",
    "ro": "Accesează site-ul",
    "en": "Visit website"
  },
  {
    "source": "← Back to Projects",
    "ru": "← Назад к проектам",
    "ro": "← Înapoi la proiecte",
    "en": "← Back to projects"
  },
  {
    "source": "2 месяца",
    "ru": "2 месяца",
    "ro": "2 luni",
    "en": "2 months"
  },
  {
    "source": "2 недели",
    "ru": "2 недели",
    "ro": "2 săptămâni",
    "en": "2 weeks"
  },
  {
    "source": "2 month",
    "ru": "2 месяца",
    "ro": "2 luni",
    "en": "2 months"
  },
  {
    "source": "Проект выполнен для агентства в рамках долгосрочного сотрудничества.",
    "ru": "Проект выполнен для агентства в рамках долгосрочного сотрудничества.",
    "ro": "Proiect realizat pentru agenție în cadrul unei colaborări pe termen lung.",
    "en": "Project completed for the agency as part of a long-term collaboration."
  },
  {
    "source": "Проект выполнен для агентства в рамках кроткосрочного сотрудничества.",
    "ru": "Проект выполнен для агентства в рамках краткосрочного сотрудничества.",
    "ro": "Proiect realizat pentru agenție în cadrul unei colaborări pe termen scurt.",
    "en": "Project completed for the agency as part of a short-term collaboration."
  }
];

export function translateLegacyProject<T>(value: T, locale: Locale): T {
  if (typeof value === 'string') {
    const entry = translations.find((item) => item.source === value.trim());
    return (entry ? entry[locale] : value) as T;
  }
  if (Array.isArray(value)) return value.map((item) => translateLegacyProject(item, locale)) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, translateLegacyProject(item, locale)])) as T;
  }
  return value;
}
