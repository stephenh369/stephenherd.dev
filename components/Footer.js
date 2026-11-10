const ICONS = {
  youtube: (
    <svg aria-hidden="true" className="h-7 w-10" viewBox="0 0 175 115">
      <path
        fill="#f00"
        d="m154 17.5c-1.82-6.73-7.07-12-13.8-13.8-9.04-3.49-96.6-5.2-122 0.1-6.73 1.82-12 7.07-13.8 13.8-4.08 17.9-4.39 56.6 0.1 74.9 1.82 6.73 7.07 12 13.8 13.8 17.9 4.12 103 4.7 122 0 6.73-1.82 12-7.07 13.8-13.8 4.35-19.5 4.66-55.8-0.1-75z"
      />
      <path fill="#fff" d="m105 55-40.8-23.4v46.8z" />
    </svg>
  ),
  linkedin: (
    <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 72 72">
      <rect width="72" height="72" rx="8" fill="#007EBB" />
      <path
        fill="#fff"
        d="M62 62H51.3V43.8c0-5-1.9-7.8-5.8-7.8-4.3 0-6.6 2.9-6.6 7.8V62H28.6V27.3h10.3V32s3.1-5.7 10.5-5.7S62 30.8 62 40.1V62ZM16.3 22.8a6.4 6.4 0 1 1 0-12.8 6.4 6.4 0 0 1 0 12.8ZM11 62h10.8V27.3H11V62Z"
      />
    </svg>
  ),
  github: (
    <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 16 16" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  ),
}

const LINKS = [
  { label: 'Stevo The Dev on YouTube', icon: 'youtube', url: 'https://www.youtube.com/@StevoTheDev' },
  { label: 'Stevo On Wheels on YouTube', icon: 'youtube', url: 'https://www.youtube.com/@StevoOnWheels' },
  { label: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/stephen-herd/' },
  { label: 'GitHub', icon: 'github', url: 'https://github.com/stephenh369' },
]

/** A floating glass pill of social links, with the copyright line underneath. */
export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-4 px-6 pt-4 pb-10">
      <ul className="glass flex h-16 items-center gap-2 px-4">
        {LINKS.map((link) => (
          <li key={link.url}>
            <a
              className="flex h-12 w-14 items-center justify-center rounded-lg transition-transform hover:-translate-y-0.5"
              href={link.url}
              target="_blank"
              rel="noreferrer"
              title={link.label}
            >
              {ICONS[link.icon]}
              <span className="sr-only">{link.label} (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      <p className="text-sm text-white/60">&copy; Stephen Herd {new Date().getFullYear()}</p>
    </footer>
  )
}
