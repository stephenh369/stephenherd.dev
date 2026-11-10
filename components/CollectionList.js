import Link from 'next/link'
import Markdown from './Markdown'

/** `collectionLayout: rows` - each item in full, one under the other. */
function Rows({ items }) {
  return (
    <ul className="grid gap-8">
      {items.map((item) => (
        <li
          key={item.slug}
          className="glass flex flex-col items-center gap-8 border-l-4 border-blue-400 p-8 lg:flex-row lg:p-10"
          style={{ borderLeftColor: item.colour }}
        >
          <div className="shrink-0 text-center lg:w-56">
            {item.image ? (
              <img className="mx-auto max-h-44 w-auto" src={item.image} alt={item.imageAlt ?? ''} loading="lazy" />
            ) : null}
            <h2 className="pt-4 text-blue-400">{item.title}</h2>
          </div>
          <Markdown>{item.body}</Markdown>
        </li>
      ))}
    </ul>
  )
}

/** `collectionLayout: cards` - a grid of cards, linking to item pages when `itemPages: true`. */
function Cards({ items, basePath, itemPages }) {
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        const card = (
          <>
            {item.image ? (
              <img
                className="aspect-video w-full border-b-4 border-blue-400 object-cover object-top"
                style={{ borderBottomColor: item.colour }}
                src={item.image}
                alt={item.imageAlt ?? ''}
                loading="lazy"
              />
            ) : null}
            <h2 className="px-4 py-4 text-center text-xl text-blue-400">{item.title}</h2>
          </>
        )
        return (
          <li key={item.slug}>
            {itemPages ? (
              <Link href={`${basePath}/${item.slug}`} className="glass link-card block h-full overflow-hidden">
                {card}
              </Link>
            ) : (
              <div className="glass h-full overflow-hidden">
                {card}
                <Markdown className="px-4 pb-4">{item.body}</Markdown>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default function CollectionList({ items, layout = 'cards', basePath, itemPages = false }) {
  if (!items?.length) return null
  return layout === 'rows' ? <Rows items={items} /> : <Cards items={items} basePath={basePath} itemPages={itemPages} />
}
