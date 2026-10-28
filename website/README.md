# TipFlip website

The landing page for TipFlip, built with [Astro](https://astro.build) as a plain static site: no JavaScript is sent to visitors, all CSS is inlined, and the app screenshots are served as AVIF/WebP at several sizes.

## Pages

- `/` home: hero, how it works, features, FAQ
- `/guides/` plus two guides that target searches about tip screen pranks and tip screen fatigue
- `/privacy/` and `/terms/`, which reuse the app's own text from `../src/content/info.ts`
- `robots.txt`, `sitemap-index.xml`, `llms.txt`, `og-image.png` (social preview), icons and web manifest

## Things to update

Everything that changes at launch lives in `src/site.ts`:

- `SITE_URL`: the real domain. Canonical links, the sitemap and social previews use it.
- `LINKS.appStore` / `LINKS.googlePlay`: store links. While empty, the buttons say "Coming soon".
- `LINKS.tiktok`: shown in the footer and in the structured data once set.

## Commands

Run these from this folder:

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # builds to dist/
```

## Hosting on Cloudflare Pages

Create a Pages project connected to this GitHub repo with these build settings:

- Production branch: `main`
- Root directory: `website`
- Build command: `npm run build`
- Build output directory: `dist`

`public/_headers` sets long-term caching for built files and basic security headers.

## After launch

1. Add the domain in Cloudflare Pages under Custom domains.
2. Add the site to Google Search Console and Bing Webmaster Tools, and submit `https://<domain>/sitemap-index.xml`.
3. When the app is live, add the store links to `src/site.ts`. Adding the App Store id as an `apple-itunes-app` meta tag shows Safari's "Open in App Store" banner.
