import { defineConfig } from "astro/config";
// import NetlifyCMS from "astro-netlify-cms";
import { astroImageTools } from "astro-imagetools";
import robotsTxt from "astro-robots-txt";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import compress from "astro-compress";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [astroImageTools, prefetch(), sitemap(), robotsTxt(), compress({
    img: false,
    svg: false
  })]
});