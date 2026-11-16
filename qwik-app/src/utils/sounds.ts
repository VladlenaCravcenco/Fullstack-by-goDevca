import { Howl, Howler } from "howler";

let glass: Howl | null = null;
let music: HTMLAudioElement | null = null;
let musicEnabled = false;

let audioUnlocked = false;
let lastGlassPlay = -Infinity;

function initGlass() {
  if (!glass) {
    glass = new Howl({
      // Same recording as glass-tap3.aiff, converted to browser-compatible PCM.
      src: ["/sounds/glass-tap3.wav"],
      volume: 0.1,
      preload: true,
    });
  }
  return glass;
}

function unlockAudio() {
  const ctx = Howler.ctx;
  if (ctx && ctx.state !== "running") void ctx.resume().catch(() => {});
}

export function attachAudioUnlockOnce() {
  if (typeof window === "undefined") return;
  initGlass();
  const handler = () => {
    audioUnlocked = true;
    unlockAudio();
    window.removeEventListener("pointerdown", handler, true);
    window.removeEventListener("keydown", handler, true);
  };
  window.addEventListener("pointerdown", handler, { capture: true, once: true });
  window.addEventListener("keydown", handler, { capture: true, once: true });
  return () => {
    window.removeEventListener("pointerdown", handler, true);
    window.removeEventListener("keydown", handler, true);
  };
}

export function playGlassHover() {
  if (typeof window === "undefined" || !audioUnlocked) return;
  // Avoid a second tap from nested glass elements or synthetic mouse events.
  const now = performance.now();
  if (now - lastGlassPlay < 90) return;
  lastGlassPlay = now;
  const sound = initGlass();
  unlockAudio();
  sound.stop();
  sound.play();
}

export function attachGlassSounds() {
  const selector = ".glass-wrap, .glass-card";
  const surface = (target: EventTarget | null) =>
    target instanceof Element ? target.closest(selector) : null;
  const onOver = (event: PointerEvent) => {
    const card = surface(event.target);
    if (event.pointerType !== "mouse" || !card) return;
    if (event.relatedTarget instanceof Node && card.contains(event.relatedTarget)) return;
    playGlassHover();
  };
  const onDown = (event: PointerEvent) => {
    if (surface(event.target)) playGlassHover();
  };
  const onKey = (event: KeyboardEvent) => {
    if (!event.repeat && (event.key === "Enter" || event.key === " ") && surface(event.target)) {
      playGlassHover();
    }
  };
  document.addEventListener("pointerover", onOver);
  document.addEventListener("pointerdown", onDown);
  document.addEventListener("keydown", onKey);
  return () => {
    document.removeEventListener("pointerover", onOver);
    document.removeEventListener("pointerdown", onDown);
    document.removeEventListener("keydown", onKey);
  };
}

// Background music starts automatically where autoplay is allowed.
let musicInitialized = false;
let musicWanted = false;
let playAttempt = 0;
const musicListeners = new Set<(playing: boolean) => void>();

function reportMusicState(playing: boolean) {
  musicEnabled = playing;
  musicListeners.forEach((listener) => listener(playing));
}

export function subscribeMusicState(listener: (playing: boolean) => void) {
  musicListeners.add(listener);
  listener(musicEnabled);
  return () => { musicListeners.delete(listener); };
}

function initMusic() {
  if (!music) {
    music = new Audio("/sounds/lofi.mp3");
    music.loop = true;
    music.volume = 0.25;
    music.preload = "auto";
    music.addEventListener("playing", () => reportMusicState(musicWanted));
    music.addEventListener("pause", () => reportMusicState(false));
    music.addEventListener("error", () => reportMusicState(false));
  }
  return music;
}

function removeMusicRetry() {
  document.removeEventListener("click", retryMusic);
  document.removeEventListener("touchend", retryMusic);
  document.removeEventListener("keydown", retryMusic);
}

function retryMusic(event: Event) {
  // Let the music button handle its own explicit action.
  if (event.target instanceof Element && event.target.closest(".sound-toggle")) return;
  if (event instanceof KeyboardEvent && event.repeat) return;
  if (musicWanted && !musicEnabled) startMusic();
}

function startMusic() {
  const player = initMusic();
  const attempt = ++playAttempt;
  void player.play().then(() => {
    if (attempt !== playAttempt) return;
    if (!musicWanted) { player.pause(); return; }
    reportMusicState(true);
    removeMusicRetry();
  }).catch(() => {
    if (attempt !== playAttempt || !musicWanted) return;
    reportMusicState(false);
    // Native gesture listeners preserve browser user activation.
    document.addEventListener("click", retryMusic);
    document.addEventListener("touchend", retryMusic);
    document.addEventListener("keydown", retryMusic);
  });
}

export function toggleMusic() {
  if (typeof window === "undefined") return;
  musicWanted = !musicEnabled;
  try { localStorage.setItem("musicEnabled", String(musicWanted)); } catch { /* Storage can be disabled. */ }
  if (musicWanted) {
    startMusic();
  } else {
    ++playAttempt;
    removeMusicRetry();
    music?.pause();
    reportMusicState(false);
  }
}

export function isMusicEnabled() {
  return musicEnabled;
}

export function restoreMusicState() {
  if (typeof window === "undefined" || musicInitialized) return;
  musicInitialized = true;
  let saved: string | null = null;
  try { saved = localStorage.getItem("musicEnabled"); } catch { /* Use the default. */ }
  musicWanted = saved !== "false";
  if (musicWanted) startMusic();
}
