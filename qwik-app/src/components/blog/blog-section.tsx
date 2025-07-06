import {component$} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'
import './blog-section.scss';

export default component$ (()=>{
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

        <div class="blog__post-card">Product design</div>
        <div class="blog__post-card">UI/UX design</div>

        <div class="blog__filter">
          <ul>
            <li class="active">🎨 Дизайн</li>
            <li>Фреймворки</li>
            <li>Софты</li>
            <li>ИИ-шки</li>
          </ul>
          <button class="blog__all-posts-btn">Перейти к постам</button>
        </div>

        <div class="blog__post-card">Product design</div>
        <div class="blog__post-card">UI/UX design</div>

      </div>
    </section>
    )
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