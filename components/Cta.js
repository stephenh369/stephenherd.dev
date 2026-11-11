import Link from 'next/link'

export default function Cta() {
  return (
    <div className="flex items-center gap-4 py-2 md:py-0">
      <Link href="/#portfolio"><a className="border-2 border-blue-400 hover:text-blue-400 nav-btn text-sm md:text-base px-4 md:px-8">View my work</a></Link>
      <Link href="/#contact"><a className="border-2 border-blue-400 hover:text-blue-400 nav-btn text-sm md:text-base px-4 md:px-8">Get in touch</a></Link>
    </div>
  )
}
