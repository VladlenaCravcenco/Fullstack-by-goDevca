// src/routes/index.tsx
import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { sanity } from '~/lib/sanity';

import HeroSection from '~/components/hero/hero-section';
import ServicesSection from '~/components/services/services-section';
import StepsSection from '~/components/steps/steps-section';
import ProjectsSection from '~/components/projects/projects-section';
import AboutSection from '~/components/about/about-section';
import BlogSection from '~/components/blog/blog-section';
import FaqSection from '~/components/faq/faq-section';

type HomeProject = {
  _id: string;
  title: string;
  slug: string;
  tags?: string[];
  // будем брать из Sanity реально существующие поля:
  cover?: any; // твой cover
  before?: any; // beforeAfter.before
  after?: any;  // beforeAfter.after
  mockup?: any; // mockupBlock.mockup
};

const HOME_PROJECTS_QUERY = `
*[_type=="project" && defined(slug.current)]
| order(coalesce(publishedAt,_createdAt) desc)[0...6]{
  _id,
  title,
  "slug": slug.current,
  tags,
  cover,
  "before": beforeAfter.before,
  "after": beforeAfter.after,
  "mockup": mockupBlock.mockup
}
`;

export const useHomeProjects = routeLoader$<HomeProject[]>(async () => {
  const items = await sanity.fetch(HOME_PROJECTS_QUERY);
  return Array.isArray(items) ? items : [];
});

export default component$(() => {
  const projects = useHomeProjects().value;

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StepsSection />
      <ProjectsSection projects={projects} />
      <AboutSection />
      <BlogSection />
      <FaqSection />
    </>
  );
});

