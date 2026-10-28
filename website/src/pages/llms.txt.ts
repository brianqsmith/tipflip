import type { APIRoute } from 'astro';

import { SITE_URL } from '../site';

// A plain summary for AI assistants and answer engines (https://llmstxt.org).
const body = `# TipFlip

> TipFlip is a prank app for iPhone and Android that parodies restaurant tip screens. The diner hands their phone to the waiter, who sees "Please select a customer discount" with 20%, 30%, 40% and Custom buttons. It is a joke: no real discount, no payments, and it works fully offline with no account or data collection.

## Pages

- [Home](${SITE_URL}/): What TipFlip is, how the prank works, features and FAQ
- [How to pull the tip screen prank](${SITE_URL}/guides/tip-screen-prank/): Step-by-step guide and etiquette
- [Why every screen asks for a tip now](${SITE_URL}/guides/why-every-screen-asks-for-a-tip/): Tip screen fatigue explained
- [Privacy](${SITE_URL}/privacy/): TipFlip stores everything on the phone and collects nothing
- [Terms](${SITE_URL}/terms/): TipFlip is a parody app; records are not real discounts
`;

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
