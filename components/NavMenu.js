'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function NavMenu({ pages }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  const isCurrent = (href) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <nav aria-label="Main" className="flex items-center">
      <button
        ref={buttonRef}
        type="button"
        className="rounded p-2 md:hidden"
        aria-expanded={open}
        aria-controls="main-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
        </svg>
      </button>
      <ul
        id="main-menu"
        className={`${
          open ? 'flex' : 'hidden'
        } absolute inset-x-0 top-16 flex-col gap-1 bg-background/95 p-4 shadow-primary md:shadow-none md:static md:flex md:flex-row md:items-center md:gap-2 md:bg-transparent md:p-0`}
      >
        {pages.map((page, index) => {
          const last = index === pages.length - 1
          return (
            <li key={page.slug}>
              <Link
                href={page.href}
                aria-current={isCurrent(page.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-4 py-2 transition-colors hover:text-blue-400 aria-[current=page]:text-blue-400 md:px-4 ${
                  last ? 'md:ml-2 md:bg-blue-400 md:font-semibold md:text-black md:hover:bg-blue-300 md:hover:text-black md:aria-[current=page]:text-black' : ''
                }`}
              >
                {page.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
