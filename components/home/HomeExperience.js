'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { setViewPreference, useViewPreference } from '@/lib/viewPreference'
import SimpleView from './SimpleView'

// The 3D world (and three.js with it) is only downloaded when it will be shown.
const World = dynamic(() => import('../world/World'), {
  ssr: false,
  loading: () => (
    <main id="main" className="fixed inset-0 flex items-center justify-center bg-navy-700">
      <p role="status">Loading the 3D world&hellip;</p>
    </main>
  ),
})

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

/**
 * The home page. Shows the drivable 3D world when the browser can run it and
 * the visitor has not opted out, and the plain SimpleView otherwise.
 */
export default function HomeExperience({ home, pages, world }) {
  const view = useViewPreference()
  const webgl = useMemo(() => (view === '3d' ? detectWebGL() : true), [view])

  if (view === '3d' && webgl) {
    return <World world={world} home={home} onSimpleView={() => setViewPreference('simple')} />
  }

  return (
    <SimpleView
      home={home}
      pages={pages}
      state={view === 'pending' ? 'pending' : 'ready'}
      notice={webgl ? undefined : 'The 3D version of this site needs WebGL, which is not available in this browser.'}
      onEnter3d={view === 'simple' ? () => setViewPreference('3d') : undefined}
    />
  )
}
