import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  site: 'https://mo9a7i.github.io',
  base: 'ts_astro_arabic_reverse_typing'
});