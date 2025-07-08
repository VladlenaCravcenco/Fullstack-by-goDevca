import { component$, useVisibleTask$ } from '@builder.io/qwik';

export const CalendlyPopup = component$(() => {
  useVisibleTask$(() => {
    const scriptId = 'calendly-widget';

    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  });

  return null;
});