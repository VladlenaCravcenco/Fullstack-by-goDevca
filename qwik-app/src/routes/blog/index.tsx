import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  useLocation,
} from "@builder.io/qwik-city";
import { localizedString, localizedText, sanity } from "~/lib/sanity";
import {
  blogCategories,
  blogCategoryCopy,
  blogPageCopy,
  formatBlogDate,
  isBlogCategory,
  type BlogListItem,
} from "~/lib/blog";
import { seededBlogPosts } from "~/lib/blogSeed";
import { getLocaleFromPathname, localizePath } from "~/lib/i18n";
import { urlFor } from "~/lib/imageUrl";
import "./blog-page.css";

const BLOG_LIST_QUERY = `
*[_type=="post" && defined(slug.current)]|order(featured desc, publishedAt desc){
  _id,
  "title": ${localizedString("titleI18n")},
  "slug": slug.current,
  category,
  "excerpt": ${localizedText("excerptI18n")},
  publishedAt,
  readingTime,
  featured,
  cover
}
`;

export const useBlogPosts = routeLoader$<BlogListItem[]>(async (ctx) => {
  try {
    const locale = getLocaleFromPathname(ctx.url.pathname);
    const posts = await sanity.fetch(BLOG_LIST_QUERY, { locale });

    if (!Array.isArray(posts)) return seededBlogPosts;

    const normalized = posts.filter(
      (post: any) => typeof post?.slug === "string" && post.slug.length > 0,
    );
    return normalized.length ? normalized : seededBlogPosts;
  } catch (error: any) {
    console.error("Sanity BLOG_LIST fetch failed:", error?.message || error);
    ctx.status(200);
    return seededBlogPosts;
  }
});

export default component$(() => {
  const posts = useBlogPosts().value;
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = blogPageCopy[locale];
  const categoryCopy = blogCategoryCopy[locale];
  const activeCategory = isBlogCategory(loc.url.searchParams.get("topic"))
    ? (loc.url.searchParams.get("topic") as (typeof blogCategories)[number])
    : null;

  const counts = new Map<(typeof blogCategories)[number], number>();
  for (const category of blogCategories) counts.set(category, 0);
  posts.forEach((post) =>
    counts.set(post.category, (counts.get(post.category) || 0) + 1),
  );

  const filteredPosts = activeCategory
    ? posts.filter((post) => post.category === activeCategory)
    : posts;

  return (
    <section class="blog-page">
      <div class="container">
        <header class="blog-page__hero">
          <div class="blog-page__eyebrow">godevca journal</div>
          <h1>{copy.title}</h1>
          <p>{copy.description}</p>
        </header>

        <nav class="blog-page__tabs" aria-label="Blog categories">
          <a
            href={localizePath(locale, "/blog")}
            class={{
              "blog-page__tab": true,
              "blog-page__tab--active": !activeCategory,
            }}
          >
            {copy.all}
            <span>{posts.length}</span>
          </a>

          {blogCategories.map((category) => (
            <a
              key={category}
              href={localizePath(locale, `/blog?topic=${category}`)}
              class={{
                "blog-page__tab": true,
                "blog-page__tab--active": activeCategory === category,
              }}
            >
              {categoryCopy[category].label}
              <span>{counts.get(category) || 0}</span>
            </a>
          ))}
        </nav>

        {activeCategory ? (
          <div class="blog-page__topic-note">
            {categoryCopy[activeCategory].description}
          </div>
        ) : null}

        {filteredPosts.length ? (
          <div class="blog-page__grid">
            {filteredPosts.map((post) => {
              const coverUrl = (post.cover as any)?.asset?._ref
                ? urlFor(post.cover as any)
                    .width(1200)
                    .height(800)
                    .fit("crop")
                    .auto("format")
                    .url()
                : "";

              return (
                <a
                  key={post._id}
                  href={localizePath(locale, `/blog/${post.slug}`)}
                  class="blog-card"
                >
                  {coverUrl ? (
                    <img
                      class="blog-card__image"
                      src={coverUrl}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      alt={post.title}
                    />
                  ) : null}

                  <div class="blog-card__body">
                    <div class="blog-card__meta">
                      <span>{categoryCopy[post.category].label}</span>
                      <span>{formatBlogDate(locale, post.publishedAt)}</span>
                      <span>
                        {post.readingTime} {copy.minutes}
                      </span>
                    </div>

                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>

                    <div class="blog-card__footer">
                      {post.featured ? (
                        <strong>{copy.featured}</strong>
                      ) : (
                        <span />
                      )}
                      <span>→</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div class="blog-page__empty">{copy.empty}</div>
        )}

        <aside class="blog-page__cta">
          <div>
            <h2>{copy.ctaTitle}</h2>
            <p>{copy.ctaText}</p>
          </div>

          <a href={localizePath(locale, "/brief")}>{copy.ctaLabel}</a>
        </aside>
      </div>
    </section>
  );
});

export const head: DocumentHead = ({ url }) => {
  const locale = getLocaleFromPathname(url.pathname);
  const copy = blogPageCopy[locale];

  return {
    title: `${copy.title} | godevca`,
    meta: [
      {
        name: "description",
        content: copy.description,
      },
    ],
  };
};
