'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Building from './Buildings'
import Car, { CAMERA_OFFSET } from './Car'
import { ArrivalPrompt, HudButtons, IntroCard, KeyboardHint, Minimap, TouchControls, useTouchDevice } from './Hud'
import { WORLD, buildWorldLayout } from './layout'
import { Cyl, FloatingLabel, Mat } from './parts'
import Scenery from './Scenery'
import { Roads, Sky, Terrain, Water } from './Terrain'
import { useDriveInput } from './useDriveInput'

const HORIZON = '#dcebf3'
const POSE_KEY = 'sh:car'

/** The car's last position survives page visits, so "back" returns you to where you parked. */
function loadPose(layout) {
  try {
    const saved = JSON.parse(sessionStorage.getItem(POSE_KEY))
    if (saved && [saved.x, saved.z, saved.heading].every(Number.isFinite) && Math.hypot(saved.x, saved.z) <= WORLD.driveRadius) {
      return { x: saved.x, z: saved.z, heading: saved.heading, restored: true }
    }
  } catch {
    // No saved position, or storage is unavailable: start at the garage.
  }
  return { ...layout.home.start, restored: false }
}

function savePose(pose) {
  try {
    sessionStorage.setItem(POSE_KEY, JSON.stringify({ x: pose.x, z: pose.z, heading: pose.heading }))
  } catch {
    // Storage unavailable: the car simply starts from the garage next time.
  }
}

const zoneAt = (layout, x, z) =>
  layout.locations.find((l) => Math.hypot(x - l.pad.x, z - l.pad.z) < WORLD.padRadius)?.slug ?? null

/**
 * Watches the frame rate and steps the picture quality down (sharpness first,
 * then shadows) if the device is struggling, so driving stays responsive.
 */
function QualityGuard({ quality, onLower }) {
  const sample = useRef({ time: 0, frames: 0 })
  useFrame((_, delta) => {
    const s = sample.current
    s.time += delta
    s.frames += 1
    if (s.time < 2.5) return
    const fps = s.frames / s.time
    s.time = 0
    s.frames = 0
    if (fps < 28 && quality < 2) onLower()
  })
  return null
}

/** Sunlight whose shadow area follows the car around the map. */
function Sun({ poseRef, shadows }) {
  const light = useRef(null)
  useFrame(() => {
    const { x, z } = poseRef.current
    light.current.position.set(x - 34, 52, z + 30)
    light.current.target.position.set(x, 0, z)
    light.current.target.updateMatrixWorld()
  })
  return (
    <directionalLight
      ref={light}
      color="#fff3dc"
      intensity={2.6}
      castShadow={shadows}
      shadow-mapSize={[2048, 2048]}
      shadow-bias={-0.0004}
      shadow-normalBias={0.05}
    >
      <orthographicCamera attach="shadow-camera" args={[-48, 48, 48, -48, 1, 160]} />
    </directionalLight>
  )
}

/** The parking spot in front of a location: gravel, a pulsing ring and a bobbing marker. */
function ParkingSpot({ location }) {
  const ring = useRef(null)
  const gem = useRef(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const pulse = 1 + Math.sin(t * 2.4) * 0.05
    ring.current.scale.set(pulse, pulse, 1)
    gem.current.position.y = 3.4 + Math.sin(t * 2) * 0.35
    gem.current.rotation.y = t * 1.2
  })
  return (
    <group position={[location.pad.x, location.pad.y, location.pad.z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.11, 0]} receiveShadow>
        <circleGeometry args={[WORLD.padRadius + 0.7, 28]} />
        <meshStandardMaterial color="#b9b3a4" roughness={1} polygonOffset polygonOffsetFactor={-4} polygonOffsetUnits={-4} />
      </mesh>
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.16, 0]}>
        <ringGeometry args={[WORLD.padRadius - 0.75, WORLD.padRadius - 0.25, 40]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.95} polygonOffset polygonOffsetFactor={-6} polygonOffsetUnits={-6} />
      </mesh>
      <mesh ref={gem} position={[0, 3.4, 0]} scale={[0.7, 1, 0.7]}>
        <octahedronGeometry args={[0.8, 0]} />
        <Mat color="#22c55e" glow={0.8} />
      </mesh>
    </group>
  )
}

function Scene({ layout, inputRef, poseRef, onZoneChange, zone, quality, onLowerQuality }) {
  return (
    <>
      <Sky horizon={HORIZON} />
      <fog attach="fog" args={[HORIZON, 70, 330]} />
      <hemisphereLight args={['#eaf5ff', '#6f8f58', 1.25]} />
      <QualityGuard quality={quality} onLower={onLowerQuality} />
      <Sun poseRef={poseRef} shadows={quality < 2} />

      <Terrain layout={layout} />
      <Water />
      <Roads layout={layout} />
      <Scenery layout={layout} />

      <Building kind={layout.home.building} position={[layout.home.x, layout.home.y, layout.home.z]} />
      <FloatingLabel
        title={layout.home.name}
        height={1.9}
        position={[layout.home.x, layout.home.y + layout.home.data.labelHeight, layout.home.z]}
      />
      {layout.locations.map((location) => (
        <group key={location.slug}>
          <Building kind={location.building} position={[location.x, location.y, location.z]} />
          <ParkingSpot location={location} />
          {/* Hidden while the car is parked here, so the name tag never covers the car. */}
          {zone === location.slug ? null : (
            <FloatingLabel
              title={location.title}
              subtitle={location.name === location.title ? undefined : location.name}
              height={2.9}
              position={[location.pad.x, location.pad.y + 7.2, location.pad.z]}
            />
          )}
        </group>
      ))}

      {layout.signposts.map((post) => (
        <group key={post.slug} position={[post.x, post.y, post.z]}>
          <Cyl args={[0.12, 0.14, 2.6, 6]} color="#f8fafc" position={[0, 1.3, 0]} />
          <FloatingLabel title={post.title} height={1.25} position={[0, 3.3, 0]} />
        </group>
      ))}

      <Car layout={layout} inputRef={inputRef} poseRef={poseRef} onZoneChange={onZoneChange} />
    </>
  )
}

/**
 * The drivable 3D home page. `world` comes from the content files (see
 * lib/content.js `getWorld`), so adding a page with a `location` adds a place
 * to drive to.
 */
export default function World({ world, home, onSimpleView }) {
  const layout = useMemo(() => buildWorldLayout(world), [world])
  const [start] = useState(() => loadPose(layout))
  const pose = useRef(null)
  if (pose.current == null) pose.current = { x: start.x, z: start.z, heading: start.heading, speed: 0, steer: 0 }

  // `zone` is the location the car is parked at; `dismissed` stops its prompt
  // coming back until the car has left and returned.
  const [zone, setZone] = useState(null)
  const [dismissed, setDismissed] = useState(() => (start.restored ? zoneAt(layout, start.x, start.z) : null))
  const [intro, setIntro] = useState(!start.restored)
  // 0 = full quality, 1 = lower resolution, 2 = lower resolution without shadows.
  const [quality, setQuality] = useState(0)
  const lowerQuality = useCallback(() => setQuality((level) => Math.min(2, level + 1)), [])
  const stage = useRef(null)
  const touch = useTouchDevice()

  const reset = useCallback(() => {
    Object.assign(pose.current, layout.home.start, { speed: 0, steer: 0, y: undefined })
  }, [layout])

  const { input, set } = useDriveInput({ onDrive: () => setIntro(false), onReset: reset })

  useEffect(() => {
    const save = () => savePose(pose.current)
    window.addEventListener('pagehide', save)
    return () => {
      window.removeEventListener('pagehide', save)
      save()
    }
  }, [])

  const onZoneChange = useCallback((slug) => {
    setZone(slug)
    if (slug === null) setDismissed(null)
  }, [])

  const dismiss = useCallback(() => {
    setDismissed(zone)
    stage.current?.focus({ preventScroll: true })
  }, [zone])

  const arrived = zone && zone !== dismissed ? layout.locations.find((l) => l.slug === zone) : null
  const placeNames = layout.locations.map((l) => l.title).join(', ')

  return (
    <main id="main" className="fixed inset-0 overflow-hidden bg-[#dcebf3] text-white">
      <div
        ref={stage}
        data-world
        tabIndex={-1}
        role="img"
        aria-label={`A 3D map of a Scottish glen. Drive the car from the home garage to these locations: ${placeNames}. Every page is also available from the main menu.`}
        className="absolute inset-0 outline-none"
      >
        <Canvas
          shadows="percentage"
          dpr={quality === 0 ? [1, 1.75] : 1}
          camera={{ fov: 36, near: 1, far: 2400, position: [start.x + CAMERA_OFFSET.x, 24, start.z + CAMERA_OFFSET.z] }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <Scene
            layout={layout}
            inputRef={input}
            poseRef={pose}
            onZoneChange={onZoneChange}
            zone={zone}
            quality={quality}
            onLowerQuality={lowerQuality}
          />
        </Canvas>
      </div>

      {/* Announces arrivals to screen readers. */}
      <p className="sr-only" role="status" aria-live="polite">
        {arrived ? `Arrived at ${arrived.name}. Press Enter to open the ${arrived.title} page, or Escape to keep driving.` : ''}
      </p>

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4 pt-20 md:p-6 md:pt-22">
        <div className="flex items-start justify-between gap-4">
          <HudButtons onSimpleView={onSimpleView} onReset={reset} />
          <div className={intro ? 'hidden sm:block' : ''}>
            <Minimap layout={layout} poseRef={pose} />
          </div>
        </div>

        {intro ? (
          <div className="absolute inset-x-4 top-34 sm:inset-x-auto sm:top-64 sm:right-6 sm:w-104">
            <IntroCard
              home={home}
              touch={touch}
              onSimpleView={onSimpleView}
              onStart={() => {
                setIntro(false)
                stage.current?.focus({ preventScroll: true })
              }}
            />
          </div>
        ) : null}

        <div className="relative flex flex-col items-center gap-4">
          {arrived ? <ArrivalPrompt location={arrived} onOpen={() => savePose(pose.current)} onDismiss={dismiss} /> : null}
          {touch ? (
            <TouchControls set={set} />
          ) : (
            <div className={arrived ? 'hidden' : 'self-start'}>
              <KeyboardHint />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
