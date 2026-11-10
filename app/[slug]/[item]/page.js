import { notFound } from 'next/navigation'
import PageContent from '@/components/PageContent'
import PageShell from '@/components/PageShell'
import { getCollection, getCollectionItem, getPage, getPages } from '@/lib/content'

/**
 * Detail pages for collection items, e.g. /portfolio/dobble. A page opts in
 * with `collection: <name>` and `itemPages: true` in its front-matter.
 */
export const dynamicParams = false

export function generateStaticParams() {
  return getPages()
    .filter((page) => page.collection && page.itemPages === true)
    .flatMap((page) => getCollection(page.collection).map((item) => ({ slug: page.slug, item: item.slug })))
}

async function load(params) {
  const { slug, item: itemSlug } = await params
  const page = getPage(slug)
  if (!page?.collection || page.itemPages !== true) return {}
  return { page, item: getCollectionItem(page.collection, itemSlug) }
}

export async function generateMetadata({ params }) {
  const { item } = await load(params)
  return item ? { title: item.title, description: item.description } : {}
}

export default async function ItemPage({ params }) {
  const { page, item } = await load(params)
  if (!item) notFound()

  return (
    <PageShell title={item.title} eyebrow={page.title} backHref={`/${page.slug}`} backLabel={`Back to ${page.title}`}>
      <PageContent entry={item} />
    </PageShell>
  )
}
