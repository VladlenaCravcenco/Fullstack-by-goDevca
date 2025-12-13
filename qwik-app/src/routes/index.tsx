import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';


import HeroSection from './../components/hero/hero-section';
import ServicesSection from '~/components/services/services-section';
import StepsSection from '~/components/steps/steps-section';
import ProjectsSection from '~/components/projects/projects-section';
import AboutSection from '~/components/about/about-section';
import BlogSection from '~/components/blog/blog-section';
import FaqSection from '~/components/faq/faq-section';
import FormSection from '~/components/form/brief-cta';


export default component$(() => {
  return (
    <>
      
      <HeroSection />
      <ServicesSection />
      <StepsSection />
      <ProjectsSection />
      <AboutSection />
      <BlogSection />
      <FaqSection />
      <FormSection />
      
    </>
  );
});

export const head: DocumentHead = {
    title: 'Мои проекты | godevca',
    meta: [
        {
            name: 'description',
            content: 'Здесь вы можете посмотреть мои реализованные проекты.',

        },
    ],
};