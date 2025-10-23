import { Howl, Howler } from 'howler';

let glass: Howl | null = null;

function unlockAudio() {
  const ctx = (Howler as any).ctx as AudioContext | undefined;
  if (ctx && ctx.state !== 'running') ctx.resume().catch(() => {});
}

export function attachAudioUnlockOnce() {
  if (typeof window === 'undefined') return;
  const handler = () => {
    unlockAudio();
    window.removeEventListener('pointerdown', handler);
    window.removeEventListener('keydown', handler);
  };
  window.addEventListener('pointerdown', handler, { once: true });
  window.addEventListener('keydown', handler, { once: true });
}

export function playGlassHover() {
  if (typeof window === 'undefined') return;

  if (!glass) {
    glass = new Howl({
      src: ['/sounds/glass-tap3.aiff'],
      volume: 0.1,
      preload: true,
      html5: true,
    });
  }
  unlockAudio();
  glass.stop();
  glass.play();
}