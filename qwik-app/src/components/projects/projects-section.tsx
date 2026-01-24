import { component$ } from '@builder.io/qwik';
import './ProjectsSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { urlFor } from '~/lib/imageUrl';

export type HomeProject = {
  _id: string;
  title: string;
  slug: string;
  tags?: string[];

  // изображения из Sanity (например from beforeAfter)
  imagePreview?: any;
  imageFinal?: any;
};

export default component$((props: { projects: HomeProject[] }) => {
  const projects = props.projects ?? [];

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

          <GlassEffect class="projects__btn">
            <a href="/projects" rel="external">посмотреть проекты</a>
          </GlassEffect>
        </div>

        <div class="projects__list">
          {projects.map((p) => {
            const previewUrl = p.imagePreview
              ? urlFor(p.imagePreview).width(1100).height(700).fit('crop').auto('format').url()
              : '';

            const finalUrl = p.imageFinal
              ? urlFor(p.imageFinal).width(1100).height(700).fit('crop').auto('format').url()
              : '';

            return (
              <a href={`/projects/${p.slug}`} key={p._id} class="project-card">
                <div class="project-card__wrapper">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Черновой вариант"
                      class="project-card__image project-card__image--initial"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}

                  {finalUrl ? (
                    <img
                      src={finalUrl}
                      alt="Финальный вариант"
                      class="project-card__image project-card__image--final"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}

                  <div class="project-card__info">
                    <h3>{p.title}</h3>

                    <div class="tags">
                      {(p.tags || []).slice(0, 6).map((t, i) => (
                        <span key={`${p._id}-${t}-${i}`}>{t}</span>
                      ))}
                      <div class="btn">→</div>
                    </div>
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