import Link from 'next/link'
import Footer from './Footer'

/** Calls to action shown beside the back link. The one for the current page is left out. */
const CALLS_TO_ACTION = [
  { href: '/portfolio', label: 'View my work' },
  { href: '/contact', label: 'Get in touch' },
]

const linkClass = 'inline-flex items-center gap-2 text-xl text-blue-400 transition-colors hover:text-white'

/** Shared frame for every content page: back link and calls to action, heading, content, footer. */
export default function PageShell({ title, eyebrow, backHref = '/', backLabel = 'Back to home', current, children }) {
  const ctas = CALLS_TO_ACTION.filter((cta) => cta.href !== current && cta.href !== backHref)

  // A sticky-footer column: short pages still end with the footer at the
  // bottom of the screen, and long pages keep one consistent gap above it.
  return (
    <div className="flex min-h-dvh flex-col">
      <main id="main" tabIndex={-1} className="flex-1 px-6 pt-10 pb-12 outline-none md:px-20">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <Link href={backHref} className={linkClass}>
              <span aria-hidden="true">&larr;</span> {backLabel}
            </Link>
            {ctas.length ? (
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                {ctas.map((cta) => (
                  <Link key={cta.href} href={cta.href} className={linkClass}>
                    {cta.label} <span aria-hidden="true">&rarr;</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <header className="pt-8 pb-10">
            {eyebrow ? <p className="pb-2 text-sm font-semibold tracking-widest text-white/60 uppercase">{eyebrow}</p> : null}
            <h1 className="text-blue-400 lg:text-5xl">{title}</h1>
          </header>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
