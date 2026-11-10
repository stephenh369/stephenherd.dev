import PageShell from '@/components/PageShell'

export const metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <PageShell title="Page not found">
      <p>Sorry, there is nothing at this address.</p>
    </PageShell>
  )
}
