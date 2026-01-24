import { component$ } from '@builder.io/qwik';
import './ProjectsSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { urlFor } from '~/lib/imageUrl';

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
  return (
    <section class="projects" id="projects">
      <div class="container">
        <div class="projects__head">
          <h2 class="projects__title">
            От идеи<br />до результата
          </h2>

          <p class="projects__desc">
            Каждый кейс — это полноценная работа с дизайном, разработкой, CMS, SEO и запуском.
          </p>

          {/* кнопки НЕ трогаю */}
          <GlassEffect class="projects__btn">
            <a href="/projects" rel="external">посмотреть проекты</a>
          </GlassEffect>
        </div>

        <div class="projects__grid">
          {(projects || []).map((p) => {
            const coverUrl =
              p.cover?.asset?._ref
                ? urlFor(p.cover).width(1400).height(900).fit('crop').auto('format').url()
                : '';

            return (
              <a href={`/projects/${p.slug}`} key={p._id} class="pCard">
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
                    {/* если duration нет — просто не показываем */}
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