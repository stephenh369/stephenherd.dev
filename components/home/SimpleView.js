import Link from 'next/link'
import Footer from '../Footer'
import Terminal from '../Terminal'
import Typewriter from '../Typewriter'

/**
 * The plain version of the home page: the intro and a list of links to every
 * page. It is what is served as HTML, what visitors without WebGL or with
 * reduced motion get, and what the "Simple view" button switches to.
 */
export default function SimpleView({ home, pages, state = 'ready', notice, onEnter3d }) {
  // "Name - Role" titles get the name picked out in the accent gradient.
  const [name, ...rest] = home.title.split(' - ')
  const role = rest.join(' - ')

  return (
    <div data-simple-view={state}>
      <main id="main" tabIndex={-1} className="mx-auto flex min-h-[85dvh] max-w-3xl flex-col justify-center gap-8 px-6 pt-28 pb-12 outline-none">
        <h1 className="text-center text-5xl font-bold sm:text-6xl">
          <span className="bg-linear-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">{name}</span>
          {role ? <span className="block pt-3 text-2xl font-semibold text-white/80 sm:text-3xl">{role}</span> : null}
        </h1>

        <Terminal>
          <Typewriter className="min-h-14 text-lg sm:min-h-0 sm:text-xl" prefix={home.typewriter?.prefix} phrases={home.typewriter?.phrases} />
        </Terminal>

        <nav aria-label="Pages">
          <ul className="grid gap-6 sm:grid-cols-2">
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={page.href} className="glass link-card flex h-full items-center justify-between gap-6 p-6">
                  <span>
                    <span className="block text-xl font-semibold text-green-500">{page.title}</span>
                    {page.description ? <span className="block pt-2 text-white/80">{page.description}</span> : null}
                  </span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {notice || onEnter3d ? (
          <div className="text-center">
            {notice ? <p className="pb-4 text-white/70">{notice}</p> : null}
            {onEnter3d ? (
              <button type="button" onClick={onEnter3d} className="btn">
                Explore in 3D instead
              </button>
            ) : null}
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  )
}
