import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import partytown from '@astrojs/partytown';

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    icon(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  site: 'https://arabic-keyboard.mo9a7i.com',
  base: '/',
});