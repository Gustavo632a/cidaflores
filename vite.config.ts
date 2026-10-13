import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { site } from "./src/config/site.ts";
import { safeHttps } from "./src/lib/contact.ts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "local-business-metadata",
      transformIndexHtml(html) {
        const canonical = safeHttps(site.canonical);
        const schema = {
          "@context": "https://schema.org",
          "@type": "Florist",
          name: "Floricultura Cida Flores Recife",
          ...(canonical ? { url: canonical } : {}),
          ...(site.addressConfirmed
            ? {
                address: {
                  "@type": "PostalAddress",
                  streetAddress: site.address,
                  addressLocality: "Recife",
                  addressRegion: "PE",
                  addressCountry: "BR",
                },
              }
            : {}),
        };
        const tags = [
          {
            tag: "script",
            attrs: { type: "application/ld+json" },
            children: JSON.stringify(schema).replace(/</g, "\\u003c"),
            injectTo: "head" as const,
          },
        ];
        if (canonical)
          html = html.replace(
            'content="/images/hero-buque.webp"',
            `content="${new URL("/images/hero-buque.webp", canonical).href.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`,
          );
        return {
          html,
          tags: [
            ...tags,
            ...(canonical
              ? [
                  {
                    tag: "link",
                    attrs: { rel: "canonical", href: canonical },
                    injectTo: "head" as const,
                  },
                  {
                    tag: "meta",
                    attrs: { property: "og:url", content: canonical },
                    injectTo: "head" as const,
                  },
                ]
              : []),
          ],
        };
      },
    },
  ],
});
