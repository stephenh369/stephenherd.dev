import Markdown from './Markdown'

const TAG_COLOURS = ['bg-yellow-300', 'bg-blue-300', 'bg-green-400', 'bg-purple-300', 'bg-pink-300', 'bg-orange-300']

/** The image / Markdown body / links / tags block shared by pages and collection items. */
export default function PageContent({ entry }) {
  const { image, imageAlt, body, links, link, tags } = entry
  const allLinks = [...(link ? [link] : []), ...(links ?? [])]
  if (!image && !body && !allLinks.length && !tags?.length) return null

  return (
    <section className="flex flex-col gap-8 rounded bg-navy-900/50 p-6 shadow-lg md:flex-row md:p-10">
      {image ? (
        <img className="max-h-112 w-full self-start rounded object-cover md:w-2/5" src={image} alt={imageAlt ?? ''} />
      ) : null}
      <div className="flex flex-1 flex-col gap-6">
        <Markdown>{body}</Markdown>
        {allLinks.length ? (
          <ul className="flex flex-wrap gap-4">
            {allLinks.map((item) => (
              <li key={item.url}>
                <a
                  className="inline-block rounded border-2 border-blue-400 px-4 py-2 hover:text-blue-300"
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
            {tags.map((tag, index) => (
              <li
                key={tag}
                className={`${TAG_COLOURS[index % TAG_COLOURS.length]} rounded-full px-3 py-1 text-sm font-semibold text-gray-800`}
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}
