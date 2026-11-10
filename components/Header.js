import Link from 'next/link'
import NavMenu from './NavMenu'

/**
 * Site-wide header. It sits above every page, including the 3D world, so the
 * plain links in the menu are always available as a way to reach any page
 * without driving there.
 */
export default function Header({ pages }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-navy-800/75 px-5 backdrop-blur-sm md:px-10">
      <Link href="/" className="text-3xl font-bold tracking-tight" aria-label="sh.dev home">
        <span className="text-blue-400">sh</span>.dev
      </Link>
      <NavMenu pages={pages} />
    </header>
  )
}
