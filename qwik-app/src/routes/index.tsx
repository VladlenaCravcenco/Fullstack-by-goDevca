import { translateLegacyProject } from '~/lib/projectTranslations';
// src/routes/index.tsx
import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import {
  sanity,
  localizedString,
  localizedText,
} from "~/lib/sanity";
import { getLocaleFromPathname } from "~/lib/i18n";
import type { BlogListItem } from "~/lib/blog";
import { getSeededBlogPosts } from "~/lib/blogSeed";

import HeroSection from "~/components/hero/hero-section";
import ServicesSection from "~/components/services/services-section";
import StepsSection from "~/components/steps/steps-section";
import ProjectsSection from "~/components/projects/projects-section";
import AboutSection from "~/components/about/about-section";
import BlogSection from "~/components/blog/blog-section";
import FaqSection from "~/components/faq/faq-section";

export type HomeProject = {
  _id: string;
  title: string;
  slug: string;
  tags: string[];
  cover?: any; // Sanity image object
};

const HOME_PROJECTS_QUERY = `
*[_type=="project" && defined(slug.current)]|order(coalesce(publishedAt,_createdAt) desc)[0...3]{
  _id,
  "title": coalesce(select($locale != "ru" => titleI18n[$locale]), title, ${localizedString("titleI18n", undefined, 'slug.current')}),
  "slug": slug.current,
  "tags": coalesce(select($locale != "ru" => hero.pillsI18n[$locale]), hero.pills, hero.pillsI18n.ru, []),
  "cover": mockupBlock.mockup
}
`;

const HOME_POSTS_QUERY = `
*[_type=="post" && (count(content[$locale]) > 0 || count(content.ru) > 0 || count(content) > 0) && defined(slug.current)]|order(featured desc, publishedAt desc)[0...8]{
  _id,
  "title": ${localizedString("titleI18n", "title", 'slug.current')},
  "slug": slug.current,
  category,
  "excerpt": ${localizedText("excerptI18n", "excerpt", '""')},
  publishedAt,
  readingTime,
  featured,
  cover
}
`;

export const useHomeProjects = routeLoader$<HomeProject[]>(async (ctx) => {
  try {
    const locale = getLocaleFromPathname(ctx.url.pathname);
    const items = await sanity.fetch(HOME_PROJECTS_QUERY, { locale });

    if (!Array.isArray(items)) return [];

    // ✅ убираем проекты без slug, чтобы ссылки не ломались
    return translateLegacyProject(items.filter(
      (p: any) => typeof p?.slug === "string" && p.slug.length > 0,
    ), locale);
  } catch (e: any) {
    console.error("Sanity HOME_PROJECTS fetch failed:", e?.message || e);
    ctx.status(200); // ✅ не даём 500 на главной
    return [];
  }
});

export const useHomeBlogPosts = routeLoader$<BlogListItem[]>(async (ctx) => {
  try {
    const locale = getLocaleFromPathname(ctx.url.pathname);
    const items = await sanity.fetch(HOME_POSTS_QUERY, { locale });

    if (!Array.isArray(items)) return [];

    const normalized = items.filter(
      (post: any) => typeof post?.slug === "string" && post.slug.length > 0,
    );
    return normalized.length ? normalized : getSeededBlogPosts(getLocaleFromPathname(ctx.url.pathname));
  } catch (e: any) {
    console.error("Sanity HOME_POSTS fetch failed:", e?.message || e);
    ctx.status(200);
    return getSeededBlogPosts(getLocaleFromPathname(ctx.url.pathname));
  }
});

export default component$(() => {
  const projects = useHomeProjects().value;
  const blogPosts = useHomeBlogPosts().value;

  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StepsSection />
      <ProjectsSection projects={projects} />
      <AboutSection />
      <BlogSection posts={blogPosts} />
      <FaqSection />
    </>
  );
});
