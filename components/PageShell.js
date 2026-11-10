import Link from 'next/link'
import Footer from './Footer'

/** Shared frame for every content page: back link, heading, content, footer. */
export default function PageShell({ title, eyebrow, backHref = '/', backLabel = 'Back to home', children }) {
  return (
    <>
      <main
        id="main"
        tabIndex={-1}
        className="min-h-dvh bg-linear-to-br from-navy-500 via-navy-600 to-navy-800 px-6 pt-28 pb-20 outline-none md:px-20"
      >
        <div className="mx-auto max-w-5xl">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded border-2 border-blue-400 px-4 py-2 hover:text-blue-300"
          >
            <span aria-hidden="true">&larr;</span> {backLabel}
          </Link>
          <header className="pt-10 pb-8">
            {eyebrow ? <p className="pb-2 text-sm font-semibold tracking-widest text-blue-300 uppercase">{eyebrow}</p> : null}
            <h1>{title}</h1>
          </header>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
