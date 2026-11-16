import { component$, isDev, useVisibleTask$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import {
  restoreMusicState,
  attachAudioUnlockOnce,
  attachGlassSounds,
} from "~/utils/sounds";

import "./global.css";

export default component$(() => {
  useVisibleTask$(({ cleanup }) => {
    const detachUnlock = attachAudioUnlockOnce();
    const detachGlass = attachGlassSounds();
    restoreMusicState();
    cleanup(() => {
      detachUnlock?.();
      detachGlass();
    });
  }, { strategy: "document-ready" });

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
      <body>
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
