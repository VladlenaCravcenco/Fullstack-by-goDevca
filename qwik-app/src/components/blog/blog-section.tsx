import { getSeededBlogPosts } from '~/lib/blogSeed';
import { component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import "./blog-section.css";
import { GlassEffect } from "~/components/ui/GlassEffect";
import { getLocaleFromPathname, localizePath } from "~/lib/i18n";
import {
  blogCategories,
  blogCategoryCopy,
  blogPageCopy,
  normalizeBlogCategory,
  type BlogCategory,
  type BlogListItem,
} from "~/lib/blog";

type BlogSectionProps = {
  posts?: BlogListItem[];
};

export default component$<BlogSectionProps>(({ posts }) => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const selectedTag = useSignal<BlogCategory>("react");
  const backgroundImageUrl = "/images/form-cta-bg.jpg";
  const items = posts?.length ? posts : getSeededBlogPosts(locale);
  const copy = {
    ru: {
      title: "Полезный блог для клиентов",
      description:
        "Объясняю без воды, как React, Qwik, дизайн и 3D влияют на скорость запуска, конверсию и восприятие продукта.",
      cta: "Перейти к постам",
    },
    ro: {
      title: "Blog util pentru clienti",
      description:
        "Explic clar cum React, Qwik, designul si 3D influenteaza viteza lansarii, conversia si perceptia produsului.",
      cta: "Vezi toate postarile",
    },
    en: {
      title: "Useful blog for clients",
      description:
        "I break down how React, Qwik, design, and 3D affect launch speed, conversion, and overall product perception.",
      cta: "Go to posts",
    },
  }[locale];
  const pageCopy = blogPageCopy[locale];
  const categories = blogCategoryCopy[locale];

  return (
    <section class="blog" id="blog">
      <div class="blog__grid container">
        <div class="blog__text">
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>

        <div
          class="blog__filter"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <ul class={`blog__tabs blog__tabs--${selectedTag.value}`}>
            {blogCategories.map((category) => (
              <li
                key={category}
                class={selectedTag.value === category ? "active" : ""}
                onClick$={() => (selectedTag.value = category)}
              >
                {categories[category].label}
              </li>
            ))}
          </ul>

          <p class="blog__filter-description">
            {categories[selectedTag.value].description}
          </p>

          <GlassEffect class="blog__all-posts-btn">
            <a
              href={localizePath(locale, `/blog?topic=${selectedTag.value}`)}
              rel="external"
            >
              {copy.cta}
            </a>
          </GlassEffect>
        </div>

        {items
          .filter((post) => normalizeBlogCategory(post.category) === selectedTag.value)
          .slice(0, 2)
          .map((post) => {
            const category = normalizeBlogCategory(post.category);

            return (
              <a
                key={post._id}
                href={localizePath(locale, `/blog/${post.slug}`)}
                class="blog__post-card"
              >
                <span class="blog__post-kicker">
                  {categories[category].label}
                  {post.featured ? ` · ${pageCopy.featured}` : ""}
                </span>
                <strong>{post.title}</strong>
                <span>{post.excerpt}</span>
              </a>
            );
          })}
      </div>
    </section>
  );
});
