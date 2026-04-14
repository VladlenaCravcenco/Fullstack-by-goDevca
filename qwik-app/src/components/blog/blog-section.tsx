import { component$, useSignal } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import "./blog-section.css";
import { GlassEffect } from "~/components/ui/GlassEffect";
import { getLocaleFromPathname, localizePath } from "~/lib/i18n";
import {
  blogCategories,
  blogCategoryCopy,
  blogPageCopy,
  type BlogCategory,
  type BlogListItem,
} from "~/lib/blog";

type BlogSectionProps = {
  posts?: BlogListItem[];
};

const fallbackPosts: BlogListItem[] = [
  {
    _id: "fallback-react",
    title: "Когда React-сайт начинает тормозить еще до рекламы",
    slug: "react-site-performance-for-business",
    category: "react",
    excerpt:
      "Где бизнес теряет скорость на тяжелом фронтенде и как это исправить без полной переделки.",
    publishedAt: "2026-01-15T09:00:00.000Z",
    readingTime: 6,
  },
  {
    _id: "fallback-qwik",
    title: "Qwik для лендинга: когда он реально выгоднее React",
    slug: "qwik-vs-react-for-landing-pages",
    category: "qwik",
    excerpt:
      "Разбираю, в каких задачах Qwik оправдывает сложность внедрения и приносит бизнесу пользу.",
    publishedAt: "2026-01-23T09:00:00.000Z",
    readingTime: 5,
  },
  {
    _id: "fallback-design",
    title: "Почему хороший UI не начинается с Figma",
    slug: "why-good-ui-starts-before-figma",
    category: "design",
    excerpt:
      "Структура, контент и сценарии сильнее влияют на продажи, чем красивые карточки и кнопки.",
    publishedAt: "2026-02-02T09:00:00.000Z",
    readingTime: 7,
  },
  {
    _id: "fallback-3d",
    title: "3D на сайте без перегруза: где проходит граница",
    slug: "3d-on-websites-without-overload",
    category: "3d",
    excerpt:
      "Как использовать 3D так, чтобы оно усиливало продукт, а не ломало скорость и восприятие.",
    publishedAt: "2026-02-10T09:00:00.000Z",
    readingTime: 6,
  },
];

export default component$<BlogSectionProps>(({ posts }) => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const selectedTag = useSignal<BlogCategory>("react");
  const backgroundImageUrl = "/images/form-cta-bg.jpg";
  const items = posts?.length ? posts : fallbackPosts;
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
          .filter((post) => post.category === selectedTag.value)
          .slice(0, 2)
          .map((post) => (
            <a
              key={post._id}
              href={localizePath(locale, `/blog/${post.slug}`)}
              class="blog__post-card"
            >
              <span class="blog__post-kicker">
                {categories[post.category].label}
                {post.featured ? ` · ${pageCopy.featured}` : ""}
              </span>
              <strong>{post.title}</strong>
              <span>{post.excerpt}</span>
            </a>
          ))}
      </div>
    </section>
  );
});
