import { Howl, Howler } from "howler";

let glass: Howl | null = null;
let music: Howl | null = null;
let musicEnabled = false;

/* =========================
   UNLOCK AUDIO (у тебя уже идеально)
========================= */
function unlockAudio() {
  const ctx = (Howler as any).ctx as AudioContext | undefined;
  if (ctx && ctx.state !== "running") ctx.resume().catch(() => {});
}

export function attachAudioUnlockOnce() {
  if (typeof window === "undefined") return;

  const handler = () => {
    unlockAudio();
    window.removeEventListener("pointerdown", handler);
    window.removeEventListener("keydown", handler);
  };

  window.addEventListener("pointerdown", handler, { once: true });
  window.addEventListener("keydown", handler, { once: true });
}

/* =========================
   UI SOUND — ВСЕГДА ИГРАЕТ
========================= */
export function playGlassHover() {
  if (typeof window === "undefined") return;

  if (!glass) {
    glass = new Howl({
      src: ["/sounds/glass-tap3.aiff"],
      volume: 0.1,
      preload: true,
      html5: true,
    });
  }

  unlockAudio();
  glass.stop();
  glass.play();
}

/* =========================
   🎵 LOFI MUSIC
========================= */
function initMusic() {
  if (!music) {
    music = new Howl({
      src: ["/sounds/lofi.mp3"],
      loop: true,
      volume: 0.12, // 🔥 ~50% от твоего текущего 0.25
      html5: true,
    });
  }
}

export function toggleMusic() {
  if (typeof window === "undefined") return;

  unlockAudio();
  initMusic();

  if (!music) return;

  if (musicEnabled) {
    music.fade(music.volume(), 0, 600);
    setTimeout(() => music?.pause(), 600);
  } else {
    music.play();
    music.fade(0, 0.25, 800);
  }

  musicEnabled = !musicEnabled;
  localStorage.setItem("musicEnabled", String(musicEnabled));
}

export function isMusicEnabled() {
  return musicEnabled;
}

/* =========================
   RESTORE STATE
========================= */
export function restoreMusicState() {
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem("musicEnabled");
  if (saved === "true") {
    unlockAudio();
    initMusic();
    music?.play();
    music?.fade(0, 0.25, 800);
    musicEnabled = true;
  }
}
