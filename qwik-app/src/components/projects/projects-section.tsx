import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './ProjectsSection.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  const projects = [
    {
      title: 'Intra Assets - Regional electricity trading company',
      tags: ['Prototyping', 'Design', 'React', 'CMS', 'SEO', 'Vercel'],
      imagePreview: '/images/projects/intraassets-prototype.jpg',
      imageFinal: '/images/projects/intraassets-final.jpg',
      link: '/projects/intra-assets',
    },
    {
      title: 'Verbatranslations - Birou traduceri autorizate MJ',
      tags: ['Prototyping', 'Design', 'SEO',],
      imagePreview: '/images/projects/verba-do.png',
      imageFinal: '/images/projects/verba-posle.png',
      link: '/projects/verbatraslations',
    },
    {
      title: 'Intra Assets - Regional electricity trading company',
      tags: ['Prototyping', 'Design', 'React', 'CMS', 'SEO', 'Vercel'],
      imagePreview: '/images/projects/intraassets-prototype.jpg',
      imageFinal: '/images/projects/intraassets-final.jpg',
      link: '/projects/intra-assets',
    },

  ];

  return (
    <section class="projects" id='projects'>
      <div class="container">
        <div class="projects__head">
          <h2 class="projects__title">Реальные проекты — от идеи до результата</h2>
          <p class="projects__desc">
            Каждый кейс — это полноценная работа с дизайном, разработкой, CMS, SEO и запуском.
            При клике вы переходите на страницу проекта, где подробно рассказано, что и как было сделано.
          </p>
          
          <GlassEffect class="projects__btn">
            <Link href="/projects"reload>проекты</Link>
          </GlassEffect>
        </div>

        <div class="projects__list">
          {projects.map((project, index) => (
            <a href={project.link} key={index} class="project-card">
              <div class="project-card__wrapper">
                <img
                  src={project.imagePreview}
                  alt="Черновой вариант"
                  class="project-card__image project-card__image--initial"
                />
                <img
                  src={project.imageFinal}
                  alt="Финальный вариант"
                  class="project-card__image project-card__image--final"
                />

                <div class="project-card__info">
                  <h3>{project.title}</h3>
                  <div class="tags">
                    {project.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}<div class="btn">→</div>
                  </div>
                  
                 
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Обо мне',
  meta: [
    {
      name: 'description',
      content: 'Всё началось с желания сделать сайт для своей анимационной студии uhappy.md',
    },
  ],
};