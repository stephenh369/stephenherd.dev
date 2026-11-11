import Link from 'next/link'

/**
 * The two calls to action in the header, in the site's existing button styles:
 * the filled `btn` and the outlined `btn-outline` used in the intro card.
 */
export default function HeaderCtas() {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Link href="/portfolio" className="btn-outline px-3 py-1.5 text-sm md:px-5 md:py-2 md:text-base">
        View my work
      </Link>
      <Link href="/contact" className="btn px-3 py-1.5 text-sm md:px-5 md:py-2 md:text-base">
        Get in touch
      </Link>
    </div>
  )
}
