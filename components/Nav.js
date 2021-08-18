import Link from 'next/link'


export default function Nav() {

  const handleClick = (e) => {
    e.preventDefault()
    const mobileNav = document.querySelector('.mobile-nav')
    const mobileBtn = document.querySelector('.mobile-button')
    mobileNav.classList.toggle('hidden')
    mobileNav.classList.toggle('flex')
    mobileNav.classList.toggle('animate-fade-in-right')
    mobileBtn.classList.toggle('animate-pulse')
  }

  return (
    <>
    <nav className="hidden md:flex items-center">
      <Link href="#about"><a className="nav-btn hover:text-blue-400">About</a></Link>
      <Link href="#services"><a className="nav-btn hover:text-blue-400">Services</a></Link>
      <Link href="#portfolio"><a className="nav-btn hover:text-blue-400">Portfolio</a></Link>
      <Link href="#contact"><a className="border-2 border-blue-400 hover:text-blue-400 nav-btn">Contact</a></Link>
    </nav>

      <div className="md:hidden flex items-center">
        <button className="mobile-button" onClick={handleClick}>
          <svg fill="white" viewBox="0 0 100 50" width="40" height="40">
            <rect width="100" height="10"></rect>
            <rect y="25" width="100" height="10"></rect>
            <rect y="50" width="100" height="10"></rect>
          </svg>
        </button>
      </div>
    </>
  )
}