# stephenherd.dev

Portfolio site for Stephen Herd. The home page is a small 3D world, a low-poly
Scottish glen, where you drive a car from the home garage to a building for each
page. Parking at a building offers to open its page.

Built with [Next.js](https://nextjs.org/) (App Router, static export),
[React Three Fiber](https://r3f.docs.pmnd.rs/) / [three.js](https://threejs.org/)
and [Tailwind CSS](https://tailwindcss.com/). All content is Markdown.

## Getting started

Requires Node 20.9 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in ./out
npm run start   # serve ./out locally
npm run lint
```

## Editing content

Everything the site says lives in [`content/`](content/). No code changes are
needed to edit copy, add a page, add a project or add a place to the map. See
[`content/README.md`](content/README.md) for every available field.

| Path | What it is |
| --- | --- |
| `content/home.md` | Intro text and the home garage |
| `content/pages/*.md` | One page per file, served at `/<file-name>` |
| `content/projects/*.md` | Portfolio projects, listed on (and linked from) `/portfolio` |
| `content/services/*.md` | Services, listed on `/services` |

## Getting around without driving

The 3D world is an enhancement, never the only way in:

- **Calls to action** – the header on each content page links to the portfolio
  and contact form. Every page is also listed in the simple view.
- **Simple view** – a plain home page (intro plus a list of links). It is what
  is served as HTML, so it works without JavaScript. It is used automatically
  when WebGL is unavailable or the visitor prefers reduced motion, and anyone
  can switch between it and the 3D world; the choice is remembered.
- **Keyboard** – drive with the arrow keys or WASD, `R` returns to the garage.
  On arrival, focus moves to the "Open page" link (`Enter` opens, `Esc`
  dismisses) and the arrival is announced to screen readers.
- **Touch** – on-screen steer / accelerate / brake buttons appear on devices
  without a precise pointer.

Every page is a real URL (`/about`, `/portfolio/dobble`, ...), so pages can be
linked, bookmarked and indexed. The car's position is kept for the browser
session, so coming back from a page puts you where you parked.

## How the code is organised

```
app/                    Routes: home, /[slug] pages, /[slug]/[item] collection items
components/             Page templates (header, Markdown, contact form, lists)
components/home/        Home page: picks 3D world or simple view
components/world/       The 3D world
  layout.js             Pure data: terrain heights, roads, parking spots, colliders, scenery
  buildingData.js       Per-building parking distance and collision shapes
  Buildings.js          The buildings, made from primitives
  Car.js                Driving, collisions, follow camera, arrival detection
  Terrain.js Scenery.js Ground, loch, roads, sky, trees, sheep, clouds
  Hud.js                Intro card, arrival prompt, minimap, touch controls
  World.js              Puts the scene and HUD together
lib/content.js          Reads the Markdown in content/
lib/youtube*.js         Recent videos for pages with a `videos` block
netlify/functions/      /api/youtube: keeps those videos fresh between deploys
lib/viewPreference.js   3D / simple view preference
```

There are no 3D model files: the car, buildings and landscape are all generated
in code, so the world is cheap to download and easy to restyle.

### Adding a new kind of building

1. Add its parking distance and collision shapes to
   `components/world/buildingData.js`.
2. Add a component for it in `components/world/Buildings.js` and register it in
   the `BUILDINGS` map there.
3. Use its key as `location.building` in a page's front-matter.

## Deployment

The site is exported as static HTML (`output: 'export'`) and deployed on
Netlify; `netlify.toml` sets the build command and publish directory (`out`).

The contact form uses [Netlify Forms](https://docs.netlify.com/forms/setup/).
Netlify detects it by finding `data-netlify="true"` in the exported
`contact.html`, so the form in `components/ContactForm.js` must stay
server-rendered. Submissions redirect to `/success`.

The YouTube page's videos are fetched from each channel's public feed during
the build. `netlify/functions/youtube.mjs` serves the same data at
`/api/youtube` (cached for half an hour) so the page can show uploads made
since the last deploy. If YouTube cannot be reached, the build still succeeds
and the page links to the channels instead.
