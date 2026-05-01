import { component$ } from "@builder.io/qwik";
import {
  routeLoader$,
  type DocumentHead,
  useLocation,
} from "@builder.io/qwik-city";
import { PortableText } from "~/components/blog/portable-text";
import {
  blogCategoryCopy,
  blogPageCopy,
  formatBlogDate,
  type BlogPost,
} from "~/lib/blog";
import { getLocaleFromPathname, localizePath } from "~/lib/i18n";
import {
  localizedString,
  localizedStringArray,
  localizedPortableText,
  localizedText,
  sanity,
} from "~/lib/sanity";
import { urlFor } from "~/lib/imageUrl";
import { seededBlogPosts } from "~/lib/blogSeed";
import "./post-page.css";

const BLOG_POST_QUERY = `
*[_type=="post" && slug.current == $slug][0]{
  _id,
  "title": ${localizedString("titleI18n", "title", 'slug.current')},
  "slug": slug.current,
  category,
  "excerpt": ${localizedText("excerptI18n", "excerpt", '""')},
  publishedAt,
  readingTime,
  featured,
  cover,
  "content": ${localizedPortableText("content", "content", "[]")},
  "seoTitle": ${localizedString("seoTitleI18n", "seoTitle", '""')},
  "seoDescription": ${localizedText("seoDescriptionI18n", "seoDescription", '""')},
  "seoKeywords": ${localizedStringArray("seoKeywordsI18n")}
}
`;

export const useBlogPost = routeLoader$<BlogPost | null>(
  async ({ params, status, url }) => {
    try {
      const locale = getLocaleFromPathname(url.pathname);
      const post = await sanity.fetch(BLOG_POST_QUERY, {
        slug: params.post,
        locale,
      });

      if (post) return post;

      const fallbackPost =
        seededBlogPosts.find((item) => item.slug === params.post) || null;
      if (!fallbackPost) status(404);
      return fallbackPost;
    } catch (error: any) {
      console.error("Sanity BLOG_POST fetch failed:", error?.message || error);
      const fallbackPost =
        seededBlogPosts.find((item) => item.slug === params.post) || null;
      if (!fallbackPost) status(404);
      return fallbackPost;
    }
  },
);

export default component$(() => {
  const post = useBlogPost().value;
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const copy = blogPageCopy[locale];

  if (!post) {
    return (
      <section class="post-page">
        <div class="container">
          <div class="post-page__empty">Post not found.</div>
        </div>
      </section>
    );
  }

  const categoryCopy = blogCategoryCopy[locale][post.category];
  const coverUrl = (post.cover as any)?.asset?._ref
    ? urlFor(post.cover as any)
        .width(1600)
        .height(1000)
        .fit("crop")
        .auto("format")
        .url()
    : "";

  return (
    <article class="post-page">
      <div class="container">
        <a class="post-page__back" href={localizePath(locale, "/blog")}>
          ← {copy.back}
        </a>

        <header class="post-page__hero">
          <div class="post-page__meta">
            <span>{categoryCopy.label}</span>
            <span>
              {copy.published}: {formatBlogDate(locale, post.publishedAt)}
            </span>
            <span>
              {post.readingTime} {copy.minutes}
            </span>
          </div>

          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
        </header>

        {coverUrl ? (
          <div class="post-page__cover">
            <img
              src={coverUrl}
              width={1600}
              height={1000}
              alt={post.title}
              loading="eager"
              decoding="async"
            />
          </div>
        ) : null}

        <div class="post-page__content">
          <div class="post-page__article">
            <PortableText blocks={post.content} />
          </div>

          <aside class="post-page__sidebar">
            <div class="post-page__sidebar-card">
              <div class="post-page__sidebar-label">{categoryCopy.label}</div>
              <p>{blogCategoryCopy[locale][post.category].description}</p>
            </div>

            <div class="post-page__sidebar-card">
              <h2>{copy.ctaTitle}</h2>
              <p>{copy.ctaText}</p>
              <a href={localizePath(locale, "/brief")}>{copy.ctaLabel}</a>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const locale = getLocaleFromPathname(url.pathname);
  const post = resolveValue(useBlogPost);
  const copy = blogPageCopy[locale];

  if (!post) {
    return {
      title: `Post | godevca`,
      meta: [
        {
          name: "description",
          content: copy.description,
        },
      ],
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const keywords = post.seoKeywords?.filter(Boolean).join(", ");

  return {
    title: `${title} | godevca`,
    meta: [
      {
        name: "description",
        content: description,
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:description",
        content: description,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "article:published_time",
        content: post.publishedAt,
      },
      ...(keywords
        ? [
            {
              name: "keywords",
              content: keywords,
            },
          ]
        : []),
    ],
  };
};
