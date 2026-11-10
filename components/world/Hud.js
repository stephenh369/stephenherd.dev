'use client'

import Link from 'next/link'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import SiteTitle from '../SiteTitle'
import Terminal from '../Terminal'
import Typewriter from '../Typewriter'
import { CAMERA_OFFSET } from './Car'
import { WORLD } from './layout'

const panel = 'glass-solid'
const pill = `${panel} px-4 py-2 text-sm font-semibold transition-colors hover:bg-blue-400 hover:text-black`
const key = 'rounded border border-white/40 bg-white/10 px-1.5 py-0.5 font-mono text-xs'

function useMediaQuery(query) {
  return useSyncExternalStore(
    (callback) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', callback)
      return () => list.removeEventListener('change', callback)
    },
    () => window.matchMedia(query).matches,
    () => false
  )
}

export const useTouchDevice = () => useMediaQuery('(pointer: coarse)')

/** Welcome card shown at the garage until the visitor sets off. */
export function IntroCard({ home, touch, onStart, onSimpleView }) {
  return (
    <section
      aria-labelledby="intro-title"
      className={`${panel} pointer-events-auto w-full max-w-md animate-rise p-5 md:p-6`}
    >
      <h1 id="intro-title" className="text-2xl md:text-3xl">
        <SiteTitle title={home.title} />
      </h1>
      <Terminal className="mt-4">
        <Typewriter className="min-h-12 sm:min-h-0" prefix={home.typewriter?.prefix} phrases={home.typewriter?.phrases} />
      </Terminal>
      <p id="drive-help" className="pt-4 text-sm leading-relaxed text-white/80">
        {touch ? (
          <>Use the on-screen buttons to drive from the garage to each location, and park there to open its page.</>
        ) : (
          <>
            Drive with the <kbd className={key}>&uarr;</kbd> <kbd className={key}>&larr;</kbd> <kbd className={key}>&darr;</kbd>{' '}
            <kbd className={key}>&rarr;</kbd> arrow keys or <kbd className={key}>W</kbd> <kbd className={key}>A</kbd>{' '}
            <kbd className={key}>S</kbd> <kbd className={key}>D</kbd>. Park at a location to open its page.
          </>
        )}{' '}
        Prefer not to drive? Use the menu above, or switch to the simple view.
      </p>
      <div className="flex flex-wrap gap-3 pt-5">
        <button type="button" onClick={onStart} className="btn px-5 py-2">
          Start driving
        </button>
        <button type="button" onClick={onSimpleView} className="btn-outline px-5 py-2">
          Simple view
        </button>
      </div>
    </section>
  )
}

/** Asks whether to open a location's page once the car is parked there. */
export function ArrivalPrompt({ location, onOpen, onDismiss }) {
  const openRef = useRef(null)

  useEffect(() => {
    openRef.current?.focus({ preventScroll: true })
  }, [location.slug])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onDismiss()
      } else if (event.key === 'Enter') {
        // Enter opens the page unless focus is on some other control, which
        // should keep its own Enter behaviour.
        const active = document.activeElement
        if (!active || active === document.body || active.hasAttribute('data-world')) openRef.current?.click()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onDismiss])

  return (
    <div
      role="dialog"
      aria-labelledby="arrival-title"
      className={`${panel} pointer-events-auto w-full max-w-md animate-rise p-5 text-center`}
    >
      <p className="text-sm font-semibold tracking-widest text-white/60 uppercase">You have arrived</p>
      <h2 id="arrival-title" className="pt-1 text-blue-400">
        {location.name}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          ref={openRef}
          href={location.href}
          onClick={onOpen}
          className="btn px-5 py-2"
        >
          Open {location.title}
          <kbd className="rounded border border-black/50 px-1.5 py-0.5 font-mono text-xs" aria-hidden="true">
            Enter
          </kbd>
        </Link>
        <button
          type="button"
          onClick={onDismiss}
          className="btn-outline px-5 py-2"
        >
          Keep driving
          <kbd className={key} aria-hidden="true">
            Esc
          </kbd>
        </button>
      </div>
    </div>
  )
}

export function HudButtons({ onSimpleView, onReset }) {
  return (
    <div className="pointer-events-auto flex flex-wrap gap-2">
      <button type="button" className={pill} onClick={onSimpleView}>
        Simple view
      </button>
      <button type="button" className={pill} onClick={onReset}>
        Back to garage
      </button>
    </div>
  )
}

export function KeyboardHint() {
  return (
    <p className={`${panel} pointer-events-auto hidden px-4 py-2 text-sm md:block`} aria-hidden="true">
      <kbd className={key}>&uarr;</kbd> <kbd className={key}>&larr;</kbd> <kbd className={key}>&darr;</kbd>{' '}
      <kbd className={key}>&rarr;</kbd> / <kbd className={key}>WASD</kbd> drive &nbsp;&middot;&nbsp; <kbd className={key}>R</kbd> back to
      garage
    </p>
  )
}

function HoldButton({ label, onChange, children }) {
  const release = () => onChange(false)
  return (
    <button
      type="button"
      aria-label={label}
      className={`${panel} flex h-16 w-16 touch-none items-center justify-center text-2xl select-none active:bg-blue-400 active:text-black`}
      onPointerDown={(event) => {
        event.currentTarget.setPointerCapture(event.pointerId)
        onChange(true)
      }}
      onPointerUp={release}
      onPointerCancel={release}
      onLostPointerCapture={release}
      onContextMenu={(event) => event.preventDefault()}
    >
      <span aria-hidden="true">{children}</span>
    </button>
  )
}

/** On-screen driving controls for devices without a keyboard. */
export function TouchControls({ set }) {
  return (
    <div className="pointer-events-none flex w-full items-end justify-between" role="group" aria-label="Driving controls">
      <div className="pointer-events-auto flex gap-3">
        <HoldButton label="Steer left" onChange={(held) => set('left', held)}>
          &larr;
        </HoldButton>
        <HoldButton label="Steer right" onChange={(held) => set('right', held)}>
          &rarr;
        </HoldButton>
      </div>
      <div className="pointer-events-auto flex flex-col gap-3">
        <HoldButton label="Accelerate" onChange={(held) => set('up', held)}>
          &uarr;
        </HoldButton>
        <HoldButton label="Brake and reverse" onChange={(held) => set('down', held)}>
          &darr;
        </HoldButton>
      </div>
    </div>
  )
}

/** A small map of the glen. Up on the map matches up on the screen. */
export function Minimap({ layout, poseRef }) {
  const car = useRef(null)
  const turn = (Math.atan2(CAMERA_OFFSET.x, CAMERA_OFFSET.z) * 180) / Math.PI
  const { loch, driveRadius } = WORLD
  const extent = driveRadius + 8

  useEffect(() => {
    let frame
    const update = () => {
      const { x, z, heading } = poseRef.current
      car.current?.setAttribute('transform', `translate(${x.toFixed(1)} ${z.toFixed(1)}) rotate(${((-heading * 180) / Math.PI).toFixed(1)})`)
      frame = requestAnimationFrame(update)
    }
    update()
    return () => cancelAnimationFrame(frame)
  }, [poseRef])

  return (
    <svg
      aria-hidden="true"
      viewBox={`${-extent} ${-extent} ${extent * 2} ${extent * 2}`}
      className="h-28 w-28 rounded-full border-2 border-white/30 bg-[#5d9c47] shadow-xl md:h-36 md:w-36"
    >
      <g transform={`rotate(${turn})`}>
        <ellipse
          cx={loch.x}
          cy={loch.z}
          rx={loch.rx}
          ry={loch.rz}
          fill="#3d7ea6"
          transform={`rotate(${(loch.angle * 180) / Math.PI} ${loch.x} ${loch.z})`}
        />
        {layout.roads.map((path, index) => (
          <polyline
            key={index}
            points={path.filter((_, i) => i % 3 === 0 || i === path.length - 1).map((p) => `${p.x.toFixed(1)},${p.z.toFixed(1)}`).join(' ')}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        <g transform={`translate(${layout.home.x + 3} ${layout.home.z}) rotate(${-turn})`}>
          <path d="M-9 2 L0 -8 L9 2 V9 H-9 Z" fill="#f8fafc" stroke="#13151a" strokeWidth="2" />
        </g>
        {layout.locations.map((location) => (
          <g key={location.slug} transform={`translate(${location.pad.x} ${location.pad.z}) rotate(${-turn})`}>
            <circle r="10" fill="#13151a" stroke="#ffffff" strokeWidth="3" />
            <text textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="700" fill="#ffffff">
              {location.title.charAt(0)}
            </text>
          </g>
        ))}
        <g ref={car}>
          <path d="M0 11 L7 -8 L0 -4 L-7 -8 Z" fill="#facc15" stroke="#13151a" strokeWidth="2" strokeLinejoin="round" />
        </g>
      </g>
    </svg>
  )
}
