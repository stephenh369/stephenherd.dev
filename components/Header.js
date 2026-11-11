import Link from 'next/link'
import HeaderCtas from './HeaderCtas'

/**
 * Site-wide header for the content pages: the logo and two calls to action in
 * place of the old menu. Every page stays reachable from the simple view.
 */
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 bg-background/70 px-6 shadow-primary backdrop-blur-sm md:px-20">
      {/* Lines up with the page content beneath it. */}
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight md:text-3xl" aria-label="sh.dev home">
          <span className="text-blue-400">sh</span>.dev
        </Link>
        <HeaderCtas />
      </div>
    </header>
  )
}
