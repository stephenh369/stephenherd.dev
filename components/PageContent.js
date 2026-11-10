import Markdown from './Markdown'

/** The image / Markdown body / links / tags block shared by pages and collection items. */
export default function PageContent({ entry }) {
  const { image, imageAlt, body, links, link, tags } = entry
  const allLinks = [...(link ? [link] : []), ...(links ?? [])]
  if (!image && !body && !allLinks.length && !tags?.length) return null

  return (
    <section className="glass flex flex-col gap-8 p-6 md:flex-row md:p-10">
      {image ? (
        <img className="max-h-112 w-full self-start rounded-lg object-cover md:w-2/5" src={image} alt={imageAlt ?? ''} />
      ) : null}
      <div className="flex flex-1 flex-col gap-6">
        <Markdown>{body}</Markdown>
        {allLinks.length ? (
          <ul className="flex flex-wrap gap-4">
            {allLinks.map((item) => (
              <li key={item.url}>
                <a
                  className="btn"
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : null}
        {tags?.length ? (
          <ul className="flex flex-wrap gap-2" aria-label="Skills">
            {tags.map((tag) => (
              <li key={tag} className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400 ring-1 ring-green-500/50">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
