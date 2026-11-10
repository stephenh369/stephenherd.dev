import Link from 'next/link'
import Footer from './Footer'
import Header from './Header'
import { getNavPages } from '@/lib/content'

/** Shared frame for every content page: back link, heading, content, footer. */
export default function PageShell({ title, eyebrow, backHref = '/', backLabel = 'Back to home', children }) {
  return (
    <>
      <Header pages={getNavPages()} />
      <main id="main" tabIndex={-1} className="min-h-dvh px-6 pt-28 pb-16 outline-none md:px-20">
        <div className="mx-auto max-w-5xl">
          <Link href={backHref} className="inline-flex items-center gap-2 text-xl text-blue-400 transition-colors hover:text-white">
            <span aria-hidden="true">&larr;</span> {backLabel}
          </Link>
          <header className="pt-10 pb-8">
            {eyebrow ? <p className="pb-2 text-sm font-semibold tracking-widest text-white/60 uppercase">{eyebrow}</p> : null}
            <h1 className="text-blue-400 lg:text-5xl">{title}</h1>
          </header>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}
