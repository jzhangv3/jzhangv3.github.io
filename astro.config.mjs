// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import path from 'path';

import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://jzhangv3.github.io',
  integrations: [sitemap(), mdx(), icon()],

  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Inter',
      cssVariable: '--font-inter',
      fallbacks: ['ui-sans-serif', 'system-ui'],
      options: {
        variants: [
          {
            weight: '100 900',
            style: 'normal',
            src: ['./src/assets/fonts/InterVariable.woff2'],
          },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        // Path aliases for cleaner imports
        '@src': path.resolve('./src'),
        '@public': path.resolve('./public'),
        '@assets': path.resolve('./src/assets'),
        '@components': path.resolve('./src/components'),
        '@layouts': path.resolve('./src/layouts'),
        '@pages': path.resolve('./src/pages'),
        '@utils': path.resolve('./src/utils'),

        // Aliases for configuration and types
        '@config': path.resolve('./src/config.ts'),
        '@types': path.resolve('./src/types.d.ts'),
        '@content': path.resolve('./src/content.config.ts'),
      },
    },
  },
});
