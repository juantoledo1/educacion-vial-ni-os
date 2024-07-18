import { defineConfig } from 'astro/config';

export default defineConfig({
  // Otras configuraciones...
  vite: {
    ssr: {
      external: ["@popperjs/core"],
    },
  },
});