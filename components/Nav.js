import Link from 'next/link'

export default function Nav() {
  return (
    <>
    <nav className="flex items-center">
      <Link href="#about"><a className="nav-btn">About</a></Link>
      <Link href="#services"><a className="nav-btn">Services</a></Link>
      <Link href="#portfolio"><a className="nav-btn">Portfolio</a></Link>
      <Link href="#contact"><a className="border-2 border-blue-400 nav-btn">Contact</a></Link>
    </nav>
    </>
  )
}