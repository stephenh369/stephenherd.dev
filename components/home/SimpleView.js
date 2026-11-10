import Link from 'next/link'
import Footer from '../Footer'
import Typewriter from '../Typewriter'

/**
 * The plain version of the home page: the intro and a list of links to every
 * page. It is what is served as HTML, what visitors without WebGL or with
 * reduced motion get, and what the "Simple view" button switches to.
 */
export default function SimpleView({ home, pages, state = 'ready', notice, onEnter3d }) {
  return (
    <div data-simple-view={state}>
      <main id="main" tabIndex={-1} className="outline-none">
        <section className="flex min-h-[70dvh] items-center bg-blue-900/60 bg-[url('/hero.jpeg')] bg-cover bg-center bg-blend-overlay">
          <div className="mx-6 mt-16 rounded bg-navy-800/60 p-6 shadow-lg md:mx-16">
            <h1>{home.title}</h1>
            <Typewriter className="min-h-14 pt-3 text-xl sm:min-h-0" prefix={home.typewriter?.prefix} phrases={home.typewriter?.phrases} />
          </div>
        </section>

        <section aria-labelledby="explore-title" className="bg-linear-to-br from-navy-500 via-navy-600 to-navy-800 px-6 py-16 md:px-20">
          <div className="mx-auto max-w-5xl">
            <h2 id="explore-title" className="pb-8 text-3xl">
              Explore
            </h2>
            <ul className="grid gap-5 sm:grid-cols-2">
              {pages.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={page.href}
                    className="flex h-full items-center justify-between gap-4 rounded border-2 border-white/20 bg-white/10 p-6 text-xl font-semibold shadow-lg hover:border-blue-300 hover:text-blue-200"
                  >
                    {page.title}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-12">
              {notice ? <p className="pb-4 text-blue-100">{notice}</p> : null}
              {onEnter3d ? (
                <button
                  type="button"
                  onClick={onEnter3d}
                  className="rounded bg-blue-400 px-6 py-3 font-semibold text-navy-800 hover:bg-blue-300"
                >
                  Explore in 3D instead
                </button>
              ) : null}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
