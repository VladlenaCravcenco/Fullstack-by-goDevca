import { component$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import './ProjectsSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { urlFor } from '~/lib/imageUrl';
import { getLocaleFromPathname, localizePath } from '~/lib/i18n';

export type HomeProject = {
  _id: string;
  title: string;
  slug: string;
  tags?: string[];
  cover?: any;
  // опционально: если позже добавишь duration в Sanity — подключим
  duration?: string;
};

export default component$(({ projects }: { projects: HomeProject[] }) => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = {
    ru: {
      title: ['От идеи', 'до результата'],
      description: 'Каждый кейс, это полноценная работа с дизайном, разработкой, CMS, SEO и запуском.',
      cta: 'посмотреть проекты',
    },
    ro: {
      title: ['De la idee', 'la rezultat'],
      description: 'Fiecare caz este o lucrare completă cu design, dezvoltare, CMS, SEO și lansare.',
      cta: 'vezi proiectele',
    },
    en: {
      title: ['From idea', 'to launch'],
      description: 'Each case study is a full scope project covering design, development, CMS, SEO and launch.',
      cta: 'view projects',
    },
  }[locale];

  return (
    <section class="projects" id="projects">
      <div class="container">
        <div class="projects__head">
          <h2 class="projects__title">
            {copy.title[0]}
            <br />
            {copy.title[1]}
          </h2>

          <p class="projects__desc">{copy.description}</p>

          <GlassEffect class="projects__btn">
            <a href={localizePath(locale, '/projects')} rel="external">
              {copy.cta}
            </a>
          </GlassEffect>
        </div>

        <div class="projects__grid">
          {(projects || []).map((p) => {
            const coverUrl =
              p.cover?.asset?._ref
                ? urlFor(p.cover).width(1400).height(900).fit('crop').auto('format').url()
                : '';

            return (
              <a href={localizePath(locale, `/projects/${p.slug}`)} key={p._id} class="pCard">
                <div class="pCard__media">
                  {coverUrl ? (
                    <img
                      class="pCard__img"
                      src={coverUrl}
                      alt={p.title}
                      loading="lazy"
                      decoding="async"
                      width={1400}
                      height={900}
                    />
                  ) : (
                    <div class="pCard__img pCard__placeholder" aria-hidden="true" />
                  )}
                </div>

                <div class="pCard__body">
                  <h3 class="pCard__title">{p.title}</h3>

                  <div class="pCard__meta">
                    {p.duration ? (
                      <span class="pBadge">
                        <span class="pBadge__icon" aria-hidden="true">⏱</span>
                        {p.duration}
                      </span>
                    ) : null}
                  </div>

                  <div class="pCard__tags">
                    {(p.tags || []).slice(0, 4).map((t, i) => (
                      <span class="pTag" key={`${p._id}-${t}-${i}`}>{t}</span>
                    ))}
                    <span class="pArrow" aria-hidden="true">→</span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
});
