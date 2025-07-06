import {component$} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'
import './ProjectsSection.scss';


export default component$ (()=>{
    const projects = [
    {
      title: 'Intra Assets - Regional electricity trading company',
      tags: ['Prototyping', 'Design', 'React', 'CMS', 'SEO', 'Vercel'],
      imagePreview: '/images/projects/intraassets-prototype.jpg',
      imageFinal: '/images/projects/intraassets-final.jpg',
      link: '/projects/intra-assets',
    },
    // Добавь остальные проекты по аналогии
  ];

  return (
    <section class="projects">
      <div class="container">
        <div class="projects__head">
          <h2 class="projects__title">Реальные проекты — от идеи до результата</h2>
          <p class="projects__desc">
            Каждый кейс — это полноценная работа с дизайном, разработкой, CMS, SEO и запуском.
            При клике вы переходите на страницу проекта, где подробно рассказано, что и как было сделано.
          </p>
          <a href="#pricing" class="projects__btn">проекты</a>
        </div>

        <div class="projects__grid">
          {projects.map((project, index) => (
            <a href={project.link} key={index} class="project-card">
              <div class="project-card__image">
                <img src={project.imagePreview} class="preview" alt="Проект черновик" />
                <img src={project.imageFinal} class="final" alt="Проект финальный" />
              </div>
              <div class="project-card__info">
                <h3>{project.title}</h3>
                <ul class="project-card__tags">
                  {project.tags.map((tag, i) => (
                    <li key={i}>{tag}</li>
                  ))}
                </ul>
                <span class="project-card__cta">→</span>
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