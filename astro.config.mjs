import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://mo9a7i.github.io',
  base: 'ts_astro_arabic_reverse_typing',

});