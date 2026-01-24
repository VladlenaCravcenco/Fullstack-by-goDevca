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

export type HomeProject = {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  cover?: any; // Sanity image object
};

const HOME_PROJECTS_QUERY = `
*[_type=="project"]|order(coalesce(publishedAt,_createdAt) desc)[0...6]{
  _id,
  title,
  "slug": slug.current,
  "tags": coalesce(hero.pills, tags, []),
  "cover": coalesce(mockupBlock.mockup, cover)
}
`;

export const useHomeProjects = routeLoader$<HomeProject[]>(async (ctx) => {
  try {
    const items = await sanity.fetch(HOME_PROJECTS_QUERY);

    if (!Array.isArray(items)) return [];

    // ✅ убираем проекты без slug, чтобы ссылки не ломались
    return items.filter((p: any) => typeof p?.slug === 'string' && p.slug.length > 0);
  } catch (e: any) {
    console.error('Sanity HOME_PROJECTS fetch failed:', e?.message || e);
    ctx.status(200); // ✅ не даём 500 на главной
    return [];
  }
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