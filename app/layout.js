import './globals.css'
import Header from '@/components/Header'
import { getNavPages } from '@/lib/content'
import { VIEW_INIT_SCRIPT } from '@/lib/viewPreference'

export const metadata = {
  title: { default: 'sh.dev', template: '%s | sh.dev' },
  description: 'Web Development by Stephen Herd',
  keywords: ['web development'],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#13151a',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: VIEW_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh font-sans text-white antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header pages={getNavPages()} />
        {children}
      </body>
    </html>
  )
}
