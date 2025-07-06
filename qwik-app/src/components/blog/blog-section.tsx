import { component$, useSignal } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import './blog-section.scss';

const posts = [
  { id: 1, tag: 'design', title: 'Product design', url: '/blog/product-design-1' },
  { id: 2, tag: 'design', title: 'UI/UX design', url: '/blog/uiux-design-1' },
  { id: 3, tag: 'framework', title: 'React hooks', url: '/blog/react-hooks' },
  { id: 4, tag: 'framework', title: 'Qwik vs React', url: '/blog/qwik-vs-react' },
  { id: 5, tag: 'soft', title: 'VS Code extensions', url: '/blog/vscode-tools' },
  { id: 6, tag: 'soft', title: 'Design productivity apps', url: '/blog/design-apps' },
  { id: 7, tag: 'ai', title: 'ChatGPT для дизайнера', url: '/blog/chatgpt-design' },
  { id: 8, tag: 'ai', title: 'Midjourney workflow', url: '/blog/midjourney-workflow' },
];

export default component$(() => {
  const selectedTag = useSignal<'design' | 'framework' | 'soft' | 'ai'>('design');

  return (
    <section class="blog">
      <div class="blog__grid container">
        <div class="blog__text">
          <h2>Dev-блог</h2>
          <p>
            Здесь я делюсь личным опытом работы с инструментами вроде Figma, Sanity, Qwik, React, Blender,
            а также мыслями про дизайн, тренды, фичи и подходы, которые реально помогают в работе.
          </p>
        </div>

        <div class="blog__filter">
          <ul>
            <li class={selectedTag.value === 'design' ? 'active' : ''} onClick$={() => selectedTag.value = 'design'}>🎨 Дизайн</li>
            <li class={selectedTag.value === 'framework' ? 'active' : ''} onClick$={() => selectedTag.value = 'framework'}>Фреймворки</li>
            <li class={selectedTag.value === 'soft' ? 'active' : ''} onClick$={() => selectedTag.value = 'soft'}>Софты</li>
            <li class={selectedTag.value === 'ai' ? 'active' : ''} onClick$={() => selectedTag.value = 'ai'}>ИИ-шки</li>
          </ul>
          <button class="blog__all-posts-btn">Перейти к постам</button>
        </div>

        {posts.filter(post => post.tag === selectedTag.value).map(post => (
          <a key={post.id} href={post.url} class="blog__post-card">
            {post.title}
          </a>
        ))}
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: 'Блог',
  meta: [
    {
      name: 'description',
      content: 'Описание',
    },
  ],
};