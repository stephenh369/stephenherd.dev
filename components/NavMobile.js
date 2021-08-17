import Link from 'next/link'

export default function NavMobile() {
  return (
    <>
    <nav className="hidden mobile-nav flex-col">
      <Link href="#about"><a className="block p-0 pb-4 hover:text-blue-400">About</a></Link>
      <Link href="#services"><a className="block p-0 pb-4 hover:text-blue-400">Services</a></Link>
      <Link href="#portfolio"><a className="block p-0 pb-4 hover:text-blue-400">Portfolio</a></Link>
      <Link href="#contact"><a className="block hover:text-blue-400 p-0">Contact</a></Link>
    </nav>
    </>
  )
}