import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

/**
 * Content loader. Everything the site shows lives in `content/` as Markdown
 * with YAML front-matter (see content/README.md for the available fields):
 *
 *   content/home.md            intro text + the home garage
 *   content/pages/<slug>.md    one page per file, served at /<slug>
 *   content/<collection>/*.md  items a page can list via `collection: <name>`
 */

const CONTENT_DIR = path.join(process.cwd(), 'content')

function readFile(file, slug) {
  const { data, content } = matter(fs.readFileSync(file, 'utf8'))
  return { ...data, slug, body: content.trim() }
}

function readDir(dir) {
  const full = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(full)) return []
  return fs
    .readdirSync(full)
    .filter((name) => /\.mdx?$/.test(name))
    .map((name) => readFile(path.join(full, name), name.replace(/\.mdx?$/, '')))
    .sort(
      (a, b) =>
        (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) ||
        a.title.localeCompare(b.title)
    )
}

export function getHome() {
  return readFile(path.join(CONTENT_DIR, 'home.md'), 'home')
}

export function getPages() {
  return readDir('pages')
}

export function getPage(slug) {
  return getPages().find((page) => page.slug === slug) ?? null
}

/** Pages shown in menus. Add `nav: false` to a page to leave it out. */
export function getNavPages() {
  return getPages()
    .filter((page) => page.nav !== false)
    .map(({ slug, title, description = null }) => ({ slug, title, description, href: `/${slug}` }))
}

export function getCollection(name) {
  return name ? readDir(name) : []
}

export function getCollectionItem(name, slug) {
  return getCollection(name).find((item) => item.slug === slug) ?? null
}

/**
 * Everything the 3D world needs, as plain serialisable data: the home garage
 * and every page that declares a `location` in its front-matter.
 */
export function getWorld() {
  const home = getHome()
  return {
    home: {
      name: home.location?.name ?? 'Home',
      building: home.location?.building ?? 'home',
      position: home.location?.position ?? [0, 56],
      road: home.location?.road ?? [],
    },
    locations: getPages()
      .filter((page) => page.location?.position)
      .map((page) => ({
        slug: page.slug,
        title: page.title,
        href: `/${page.slug}`,
        name: page.location.name ?? page.title,
        building: page.location.building ?? 'cottage',
        position: page.location.position,
        road: page.location.road ?? [],
      })),
  }
}
