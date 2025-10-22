// src/utils/sounds.ts
import { Howl } from 'howler';

let glass: Howl | null = null;

export function playGlassHover() {
  // не делать ничего на сервере
  if (typeof window === 'undefined') return;

  if (!glass) {
    glass = new Howl({
      src: ['/sounds/glass-tap.wav'], // файл лежит в public/sounds/
      volume: 0.35,
      preload: true,
      html5: true, // стабильнее в Safari/iOS
    });
  }
  glass.stop();
  glass.play();
}