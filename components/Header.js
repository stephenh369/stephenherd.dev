import Cta from './Cta'
import { useState, useEffect } from 'react'
import Link from 'next/link'

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
    <header className={`${scrollY > 300 ? "bg-gray-900 + bg-opacity-50" : ""} fixed top-0 left-0 z-50 w-full flex flex-col md:flex-row items-center justify-between py-2 px-10 md:px-20`}>
      <Link href="/"><a className="p-0"><h1 className="py-2"><span className="text-blue-400">sh</span>.dev</h1></a></Link>
      <Cta/>
    </header>
  );
}
