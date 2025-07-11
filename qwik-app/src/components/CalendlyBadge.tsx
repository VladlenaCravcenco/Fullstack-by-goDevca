import { component$, useVisibleTask$ } from '@builder.io/qwik';

export const CalendlyBadge = component$(() => {
  useVisibleTask$(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-expect-error — Calendly будет доступен после загрузки скрипта
      window.Calendly?.initBadgeWidget?.({
        url: 'https://calendly.com/godevca/30min',
        text: '☻',
        color: '#fb651e',
        textColor: '#ffffff',
        
      });
    };
  });

  return <></>;
});