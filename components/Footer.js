const LINKS = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/stephen-herd/' },
  { label: 'GitHub', url: 'https://github.com/stephenh369' },
]

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 bg-navy-800 px-6 py-8 md:justify-end md:px-20">
      <p>&copy; Stephen Herd {new Date().getFullYear()}</p>
      <ul className="flex gap-6">
        {LINKS.map((link) => (
          <li key={link.url}>
            <a className="underline underline-offset-4 hover:text-blue-300" href={link.url} target="_blank" rel="noreferrer">
              {link.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  )
}
