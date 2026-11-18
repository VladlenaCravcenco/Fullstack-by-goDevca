import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";


/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Onest:wght@300;500&display=swap"
        rel="stylesheet"
      />
      <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet"></link>
      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png?v=2" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=2" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=2" />
      <meta name="p:domain_verify" content="c8c19c82bc63051e372a28e22f4b74d8"/>


      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
