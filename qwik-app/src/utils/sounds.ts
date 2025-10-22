import { Howl } from 'howler';

export const glassClick = new Howl({
  src: ['qwik-app/public/sounds/glass-tap.wav'],
  volume: 0.3,
});

export const uiHover = new Howl({
  src: ['qwik-app/public/sounds/glass-tap.wav'],
  volume: 0.15,
});


export const glassHover = new Howl({
  src: ['/sounds/glass-tap.wav'], // файл лежит в public/sounds/
  volume: 0.25,
  preload: true,
});