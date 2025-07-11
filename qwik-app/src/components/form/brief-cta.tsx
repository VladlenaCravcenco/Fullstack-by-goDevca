import {component$} from '@builder.io/qwik'
import type {DocumentHead} from '@builder.io/qwik-city'
import { Link } from '@builder.io/qwik-city';
import './brief-cta.css';
import { GlassEffect } from '~/components/ui/GlassEffect';

export default component$(() => {
  return (
    <section class="brief-cta">
      <div class="brief-cta__overlay">
        <h2>Начнём с маленького шага — вы заполняете, а я предложу решение.</h2>
        
         <GlassEffect class="brief-cta__btn">
            <Link href="/brief">заполнить бриф</Link>
          </GlassEffect>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
    title: 'Обо мне',
    meta: [
        {
            name: 'description',
            content: 'Всё началось с желания сделать сайт для своей анимационной студии uhappy.md',

        },
    ],
};