import Link from 'next/link'
import Markdown from './Markdown'

const tint = (colour, amount) => (colour ? `color-mix(in srgb, ${colour} ${amount}%, transparent)` : undefined)

/** `collectionLayout: rows` - each item in full, one under the other. */
function Rows({ items }) {
  return (
    <ul className="grid gap-8">
      {items.map((item) => (
        <li
          key={item.slug}
          className="flex flex-col items-center gap-8 rounded bg-white/10 p-8 shadow-lg lg:flex-row lg:p-10"
          style={{ backgroundColor: tint(item.colour, 35) }}
        >
          <div className="shrink-0 text-center lg:w-56">
            {item.image ? (
              <img className="mx-auto max-h-44 w-auto" src={item.image} alt={item.imageAlt ?? ''} loading="lazy" />
            ) : null}
            <h2 className="pt-4">{item.title}</h2>
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
              <img className="aspect-video w-full object-cover object-top" src={item.image} alt={item.imageAlt ?? ''} loading="lazy" />
            ) : null}
            <h2 className="px-4 py-4 text-center text-xl">{item.title}</h2>
          </>
        )
        const className = 'block h-full overflow-hidden rounded border-2 border-navy-900 bg-white/10 shadow-lg'
        return (
          <li key={item.slug}>
            {itemPages ? (
              <Link
                href={`${basePath}/${item.slug}`}
                className={`${className} transition-transform hover:-translate-y-1 hover:border-blue-300`}
                style={{ backgroundColor: tint(item.colour, 55) }}
              >
                {card}
              </Link>
            ) : (
              <div className={className} style={{ backgroundColor: tint(item.colour, 55) }}>
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
