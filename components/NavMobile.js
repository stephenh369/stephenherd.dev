import Link from 'next/link'

export default function NavMobile() {
  return (
    <>
    <nav className="hidden mobile-nav items-center">
      <Link href="#about"><a className="block p-0 pr-4 hover:text-blue-400">About</a></Link>
      <Link href="#services"><a className="block p-0 px-4 hover:text-blue-400">Services</a></Link>
      <Link href="#portfolio"><a className="block p-0 px-4 hover:text-blue-400">Portfolio</a></Link>
      <Link href="#contact"><a className="block hover:text-blue-400 p-0 pl-4">Contact</a></Link>
    </nav>
    </>
  )
}