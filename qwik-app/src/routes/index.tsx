import { component$ } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';

import Header from '~/components/header/header';
import HeroSection from './../components/hero/hero-section';
import ServicesSection from '~/components/services/services-section';
import StepsSection from '~/components/steps/steps-section';
import ProjectsSection from '~/components/projects/projects-section';
import PricingSection from '~/components/pricing/pricing-section';
import AboutSection from '~/components/about/about-section';
import BlogSection from '~/components/blog/blog-section';
import FaqSection from '~/components/faq/faq-section';
import FormSection from '~/components/form/brief-cta';
import Footer from '~/components/footer/footer';

export default component$(() => {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <StepsSection />
      <ProjectsSection />
      <PricingSection />
      <AboutSection />
      <BlogSection />
      <FaqSection />
      <FormSection />
      <Footer />
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