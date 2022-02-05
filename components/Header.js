import Nav from './Nav'
import NavMobile from './NavMobile'
import { useState, useEffect } from 'react'

export default function Header() {

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const options = { passive: true }
    const scroll = () => {
     const { pageYOffset } = window
      setScrollY(pageYOffset)
    }
    document.addEventListener("scroll", scroll, options);
    () => document.removeEventListener("scroll", scroll, options)
   }, [])


  return (
    <>
    <header className={`${scrollY > 300 ? "bg-gray-900 + bg-opacity-50" : ""} fixed top-0 left-0 z-50 w-full flex items-center justify-between py-2 px-10 md:px-20`}>
      <a className="p-0" href="#main"><h1 className="py-2"><span className="text-blue-400">sh</span>.dev</h1></a>
      <Nav/>
    </header>
    <header className="md:hidden w-full fixed top-24 right-0 z-50 text-right">
      <NavMobile/>
    </header>
    </>
  );
}