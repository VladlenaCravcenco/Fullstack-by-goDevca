import { component$, isDev, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import {
  restoreMusicState,
  attachAudioUnlockOnce,
} from "~/utils/sounds";

import "./global.css";

export default component$(() => {
  // 🔒 ЭТО КЛЮЧЕВОЕ МЕСТО
  useVisibleTask$(() => {
    attachAudioUnlockOnce(); // один раз разблокирует аудио
    restoreMusicState();     // 👈 если музыка была включена — она ВОЗОБНОВИТСЯ
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});