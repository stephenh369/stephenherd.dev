# Content guide

All site content is Markdown with a YAML front-matter block at the top. Edit a
file to change the copy; add a file to add a page, project or service.

## `home.md`

The intro shown on the home page (both the 3D world's welcome card and the
simple view), plus where the home garage sits on the map.

```yaml
---
title: Stephen Herd - Web Developer
typewriter:
  prefix: I can build websites      # fixed text
  phrases:                           # typed one after another
    - using custom code.
    - with WordPress.
location:
  name: Home
  building: home
  position: [0, 56]                  # see "The map" below
  road: [[17, 54], [22, 46], [22, 36]]
---
```

## `pages/<slug>.md`

Each file becomes a page at `/<slug>` and, unless `nav: false`, a link in the
main menu and on the simple view.

```yaml
---
title: About              # menu label, page <title>, sign in the 3D world
heading: About Me         # optional: page heading if different from title
order: 1                  # position in menus (lowest first)
nav: false                # optional: leave the page out of menus
description: ...          # optional: meta description, also shown on the simple view's link card

image: /about.jpg         # optional: image beside the text (file in /public)
imageAlt: Stephen Herd
links:                    # optional: buttons under the text
  - label: GitHub
    url: https://github.com/stephenh369
tags: ["#JavaScript", "#React"]   # optional: pill list under the text

collection: projects      # optional: list the items in content/projects/
collectionLayout: cards   # cards (grid) or rows (each item in full)
itemPages: true           # optional: give each item its own page at /<slug>/<item>

form: contact             # optional: show the contact form

videos:                   # optional: show recent videos from YouTube channels
  limit: 5                # videos per channel (the first is shown large)
  channels:
    - name: Stevo The Dev
      handle: "@StevoTheDev"            # used for the "Visit channel" link
      id: UCQ6N2aj0Aog4_S2SewLIhnw      # channel ID, see "YouTube videos" below
      description: What the channel is about.

location:                 # optional: put this page on the 3D map
  name: The Lighthouse    # name of the place
  building: lighthouse    # home | cottage | lighthouse | workshop | castle | postOffice | driveIn
  position: [-46, 29]     # where the building stands
  road:                   # waypoints of the road leading to it
    - [22, 36]
    - [4, 40]
---

The page text, in Markdown.
```

A page without `location` is still a normal page; it just is not a place you
can drive to.

## Collections: `projects/`, `services/`, ...

A collection is a folder of Markdown files. Any page can list one with
`collection: <folder name>`, so a new collection (say `content/talks/`) only
needs the folder and a page that points at it.

```yaml
---
title: React Synth
order: 1
image: /react_synth.png
imageAlt: Screenshot of the React Synth app
colour: "#61DBFB"         # optional: accent colour for the item's card
link:                     # optional: button (item pages)
  label: Try it Here!
  url: https://example.com
---

Item text, in Markdown.
```

## YouTube videos

A page with a `videos` block lists the most recent uploads of each channel,
read from the channel's public feed (no API key). The list is fetched when the
site is built, and refreshed in the visitor's browser through the small
Netlify function at `/api/youtube`, so new uploads appear without a redeploy.

A channel's ID starts with `UC` and is not the same as its `@handle`. To find
it, open the channel on YouTube, choose "Share channel" then "Copy channel ID"
(under the channel description's "More" link).

## The map

Positions are `[x, z]` on a map roughly 200 units across, centred on `[0, 0]`:

- `+x` is east, `-x` is west; `+z` is south, `-z` is north.
- Keep places within about 85 units of the centre; mountains ring the glen
  beyond that.
- The loch covers roughly x -70 to -10, z -13 to 21.
- Buildings face south, with their parking spot in front of them.

`road` is the list of points a location's road passes through, starting where
it branches off an existing road; the last stretch to the parking spot is added
automatically. Start a road at a point another road already uses (for example
the crossroads at `[22, 36]`) so that they join up. The ground is levelled
under roads and buildings automatically, and a signpost is placed near the
start of each road.
