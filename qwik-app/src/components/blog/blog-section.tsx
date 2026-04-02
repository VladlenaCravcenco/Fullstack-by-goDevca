import { component$, useSignal } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import './blog-section.css';
import { GlassEffect } from '~/components/ui/GlassEffect';
import { getLocaleFromPathname, localizePath } from '~/lib/i18n';

export default component$(() => {
  const loc = useLocation();
  const locale = getLocaleFromPathname(loc.url.pathname);
  const selectedTag = useSignal<'design' | 'framework' | 'soft' | 'ai'>('design');
  const backgroundImageUrl = '/images/form-cta-bg.jpg';
  const copy = {
    ru: {
      title: 'Dev-блог',
      description:
        'Здесь я делюсь личным опытом работы с Figma, Sanity, Qwik, React, Blender и подходами, которые реально помогают в работе.',
      tags: { design: 'Дизайн', framework: 'Фреймворки', soft: 'Инструменты', ai: 'AI-технологии' },
      cta: 'Перейти к постам',
      posts: [
        { id: 1, tag: 'design', title: 'Product design', url: '/blog/product-design-1' },
        { id: 2, tag: 'design', title: 'UI/UX design', url: '/blog/uiux-design-1' },
        { id: 3, tag: 'framework', title: 'React hooks', url: '/blog/react-hooks' },
        { id: 4, tag: 'framework', title: 'Qwik vs React', url: '/blog/qwik-vs-react' },
        { id: 5, tag: 'soft', title: 'VS Code extensions', url: '/blog/vscode-tools' },
        { id: 6, tag: 'soft', title: 'Design productivity apps', url: '/blog/design-apps' },
        { id: 7, tag: 'ai', title: 'ChatGPT для дизайнера', url: '/blog/chatgpt-design' },
        { id: 8, tag: 'ai', title: 'Midjourney workflow', url: '/blog/midjourney-workflow' },
      ],
    },
    ro: {
      title: 'Dev-blog',
      description:
        'Aici impartasesc experienta mea cu Figma, Sanity, Qwik, React, Blender si abordari care chiar ajuta in proiecte.',
      tags: { design: 'Design', framework: 'Framework-uri', soft: 'Instrumente', ai: 'AI' },
      cta: 'Vezi toate postarile',
      posts: [
        { id: 1, tag: 'design', title: 'Product design', url: '/blog/product-design-1' },
        { id: 2, tag: 'design', title: 'UI/UX design', url: '/blog/uiux-design-1' },
        { id: 3, tag: 'framework', title: 'React hooks', url: '/blog/react-hooks' },
        { id: 4, tag: 'framework', title: 'Qwik vs React', url: '/blog/qwik-vs-react' },
        { id: 5, tag: 'soft', title: 'VS Code extensions', url: '/blog/vscode-tools' },
        { id: 6, tag: 'soft', title: 'Design productivity apps', url: '/blog/design-apps' },
        { id: 7, tag: 'ai', title: 'ChatGPT pentru designeri', url: '/blog/chatgpt-design' },
        { id: 8, tag: 'ai', title: 'Midjourney workflow', url: '/blog/midjourney-workflow' },
      ],
    },
    en: {
      title: 'Dev blog',
      description:
        'Here I share practical experience with Figma, Sanity, Qwik, React, Blender and the workflows that actually help in production.',
      tags: { design: 'Design', framework: 'Frameworks', soft: 'Tools', ai: 'AI' },
      cta: 'Go to posts',
      posts: [
        { id: 1, tag: 'design', title: 'Product design', url: '/blog/product-design-1' },
        { id: 2, tag: 'design', title: 'UI/UX design', url: '/blog/uiux-design-1' },
        { id: 3, tag: 'framework', title: 'React hooks', url: '/blog/react-hooks' },
        { id: 4, tag: 'framework', title: 'Qwik vs React', url: '/blog/qwik-vs-react' },
        { id: 5, tag: 'soft', title: 'VS Code extensions', url: '/blog/vscode-tools' },
        { id: 6, tag: 'soft', title: 'Design productivity apps', url: '/blog/design-apps' },
        { id: 7, tag: 'ai', title: 'ChatGPT for designers', url: '/blog/chatgpt-design' },
        { id: 8, tag: 'ai', title: 'Midjourney workflow', url: '/blog/midjourney-workflow' },
      ],
    },
  }[locale];

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
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <ul class={`blog__tabs blog__tabs--${selectedTag.value}`}>
            <li
              class={selectedTag.value === 'design' ? 'active' : ''}
              onClick$={() => (selectedTag.value = 'design')}
            >
              {copy.tags.design}
            </li>
            <li
              class={selectedTag.value === 'framework' ? 'active' : ''}
              onClick$={() => (selectedTag.value = 'framework')}
            >
              {copy.tags.framework}
            </li>
            <li
              class={selectedTag.value === 'soft' ? 'active' : ''}
              onClick$={() => (selectedTag.value = 'soft')}
            >
              {copy.tags.soft}
            </li>
            <li
              class={selectedTag.value === 'ai' ? 'active' : ''}
              onClick$={() => (selectedTag.value = 'ai')}
            >
              {copy.tags.ai}
            </li>
          </ul>

          <GlassEffect class="blog__all-posts-btn">
            <a href={localizePath(locale, '/blog')} rel="external">
              {copy.cta}
            </a>
          </GlassEffect>
        </div>

        {copy.posts
          .filter((post) => post.tag === selectedTag.value)
          .map((post) => (
            <a key={post.id} href={localizePath(locale, post.url)} class="blog__post-card">
              {post.title}
            </a>
          ))}
      </div>
    </section>
  );
});
