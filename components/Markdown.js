import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const isExternal = (href = '') => /^https?:\/\//.test(href)

const components = {
  a({ href, children, node, ...props }) {
    if (isExternal(href)) {
      return (
        <a href={href} target="_blank" rel="noreferrer" {...props}>
          {children}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  },
  img({ node, alt = '', ...props }) {
    return <img alt={alt} loading="lazy" {...props} />
  },
}

/** Renders a Markdown string from a content file. */
export default function Markdown({ children, className = '' }) {
  if (!children) return null
  return (
    <div className={`prose-content ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
