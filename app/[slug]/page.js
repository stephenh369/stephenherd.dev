import { notFound } from 'next/navigation'
import CollectionList from '@/components/CollectionList'
import ContactForm from '@/components/ContactForm'
import PageContent from '@/components/PageContent'
import PageShell from '@/components/PageShell'
import { getCollection, getPage, getPages } from '@/lib/content'

/** Forms a page can ask for with `form: <name>` in its front-matter. */
const FORMS = {
  contact: ContactForm,
}

export const dynamicParams = false

export function generateStaticParams() {
  return getPages().map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const page = getPage(slug)
  return page ? { title: page.title, description: page.description } : {}
}

export default async function Page({ params }) {
  const { slug } = await params
  const page = getPage(slug)
  if (!page) notFound()

  const Form = FORMS[page.form]
  const items = getCollection(page.collection)

  return (
    <PageShell title={page.heading ?? page.title} eyebrow={page.location?.name}>
      <div className="grid gap-10">
        {Form ? <Form /> : null}
        <PageContent entry={page} />
        <CollectionList
          items={items}
          layout={page.collectionLayout}
          basePath={`/${page.slug}`}
          itemPages={page.itemPages === true}
        />
      </div>
    </PageShell>
  )
}
