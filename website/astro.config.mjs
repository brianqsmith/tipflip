import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { SITE_URL } from './src/site.ts';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    // Put all CSS in the page itself: one request per page, nothing render-blocking.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({ filter: (page) => !page.includes('/404') }),
  ],
});
