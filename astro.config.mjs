import { defineConfig } from "astro/config";
import { astroImageTools } from "astro-imagetools";
import robotsTxt from "astro-robots-txt";
import prefetch from "@astrojs/prefetch";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";
import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  site: "https://ENTER-SITENAME.com",
  integrations: [
    astroImageTools,
    prefetch(),
    sitemap(),
    robotsTxt(),
    partytown(),
    compress({
      img: false,
      svg: false,
    }),
  ],
});
