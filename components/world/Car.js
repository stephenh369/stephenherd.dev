'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils, Vector3 } from 'three'
import { WORLD, clamp } from './layout'
import { Block, Cyl, Extruded, Mat } from './parts'

/** How the car handles. Speeds are in world units per second. */
const DRIVE = {
  maxForward: 21,
  maxReverse: 7,
  acceleration: 15,
  braking: 32,
  coasting: 8,
  offRoadFactor: 0.62,
  steerRate: 2.3,
  wheelBase: 2.6,
  track: 1.72,
  wheelRadius: 0.43,
}

/** Where the camera sits relative to the car: up high, to the south-east. */
export const CAMERA_OFFSET = new Vector3(21, 32, 31)
const CAMERA_AIM = new Vector3(-CAMERA_OFFSET.x, 0, -CAMERA_OFFSET.z).normalize().multiplyScalar(7)

const PAINT = '#5b616b' // graphite grey
const TRIM = '#16181c'
const GLASS = '#0e1620'
const SILVER = '#cfd4da'
const paint = { roughness: 0.55, metalness: 0.1 }
const gloss = { roughness: 0.6 }

// Side-on outlines as [z, y] pairs: z runs from the tail (-) to the nose (+).
const arch = (z) => [
  [z - 0.52, 0.24],
  [z - 0.52, 0.52],
  [z - 0.32, 0.84],
  [z, 0.94],
  [z + 0.32, 0.84],
  [z + 0.52, 0.52],
  [z + 0.52, 0.24],
]
const AXLE = DRIVE.wheelBase / 2

/** Centre of the body: low nose, a bonnet that rises to the screen and a short tail. */
const BODY_PROFILE = [
  [2.2, 0.24],
  [2.3, 0.44],
  [2.25, 0.64],
  [1.72, 0.86],
  [0.86, 0.98],
  [-0.7, 1.0],
  [-1.4, 1.05],
  [-2.06, 0.98],
  [-2.26, 0.88],
  [-2.3, 0.5],
  [-2.2, 0.24],
  ...arch(-AXLE),
  ...arch(AXLE),
]
/** The wings down each side stand proud of the bonnet and swell into wide rear haunches. */
const WING_PROFILE = [
  [2.16, 0.24],
  [2.26, 0.44],
  [2.2, 0.7],
  [1.74, 0.99],
  [1.0, 1.07],
  [0.2, 1.05],
  [-0.7, 1.08],
  [-1.35, 1.18],
  [-2.0, 1.04],
  [-2.24, 0.9],
  [-2.28, 0.5],
  [-2.18, 0.24],
  ...arch(-AXLE),
  ...arch(AXLE),
]
/** Cabin: a steep screen, a short roof and one long fastback sweep down to the tail. */
const CABIN_PROFILE = [
  [0.9, 1.0],
  [0.2, 1.4],
  [-0.4, 1.44],
  [-1.2, 1.26],
  [-1.95, 1.0],
]
/** The teardrop side glass, set a hair proud of the cabin sides. */
const SIDE_GLASS_PROFILE = [
  [0.68, 1.07],
  [0.2, 1.34],
  [-0.38, 1.38],
  [-1.0, 1.24],
  [-1.22, 1.07],
]

/** A flat panel laid along a sloping line of a side-on outline, from [z, y] to [z, y]. */
function Panel({ from, to, width, lift = 0.02, thickness = 0.05, ...props }) {
  const dz = to[0] - from[0]
  const dy = to[1] - from[1]
  const length = Math.hypot(dz, dy)
  // Nudge the panel out along the surface normal so it sits on top of the bodywork.
  const side = dz < 0 ? 1 : -1
  const ny = (-dz / length) * side
  const nz = (dy / length) * side
  return (
    <Block
      size={[width, length, thickness]}
      position={[0, (from[1] + to[1]) / 2 + ny * lift, (from[0] + to[0]) / 2 + nz * lift]}
      rotation={[Math.atan2(dz, dy), 0, 0]}
      shadow={false}
      {...props}
    />
  )
}

const SPOKES = [0, 1, 2, 3, 4].map((i) => (i * Math.PI * 2) / 5)

/** `out` is +1 or -1: which way the wheel's face points. */
function Wheel({ out, spinRef }) {
  const r = DRIVE.wheelRadius
  return (
    <group position={[0, r, 0]}>
      <group ref={spinRef}>
        <Cyl args={[r, r, 0.34, 14]} color="#1b1d21" rotation={[0, 0, Math.PI / 2]} />
        <Cyl args={[r * 0.7, r * 0.7, 0.36, 14]} color="#3a3d43" rotation={[0, 0, Math.PI / 2]} shadow={false} />
        {/* Five-spoke alloy */}
        {SPOKES.map((angle) => (
          <group key={angle} rotation={[angle, 0, 0]}>
            <Block size={[0.05, r * 0.7, 0.11]} color={SILVER} position={[out * 0.18, r * 0.36, 0]} shadow={false} material={gloss} />
          </group>
        ))}
        <Cyl args={[0.08, 0.08, 0.42, 8]} color={SILVER} rotation={[0, 0, Math.PI / 2]} shadow={false} material={gloss} />
      </group>
      {/* Red brake caliper, showing between the spokes */}
      <Block size={[0.05, 0.2, 0.13]} color="#dc2626" position={[out * 0.165, 0.06, 0.2]} rotation={[0.5, 0, 0]} shadow={false} />
    </group>
  )
}

/**
 * A low-poly mid-engined sports coupe in graphite grey: long sloping fastback,
 * wide rear haunches with an intake ahead of each rear wheel, oval headlights
 * and five-spoke alloys over red calipers. Built with its nose along +z.
 */
function CarModel({ poseRef }) {
  const side = DRIVE.track / 2
  const body = useRef(null)
  const frontLeft = useRef(null)
  const frontRight = useRef(null)
  const rearLeft = useRef(null)
  const rearRight = useRef(null)
  const steerLeft = useRef(null)
  const steerRight = useRef(null)
  const spin = useRef(0)

  useFrame((_, delta) => {
    const { speed, steer } = poseRef.current
    spin.current += (speed * Math.min(delta, 0.05)) / DRIVE.wheelRadius
    frontLeft.current.rotation.x = spin.current
    frontRight.current.rotation.x = spin.current
    rearLeft.current.rotation.x = spin.current
    rearRight.current.rotation.x = spin.current
    // The front wheels turn with the steering, and the body leans out of corners a touch.
    steerLeft.current.rotation.y = steer * 0.5
    steerRight.current.rotation.y = steer * 0.5
    body.current.rotation.z = steer * (speed / DRIVE.maxForward) * 0.05
  })

  return (
    <group ref={body}>
      {/* Bodywork */}
      <Extruded points={BODY_PROFILE} width={1.72} color={PAINT} material={paint} />
      <Extruded points={WING_PROFILE} width={0.16} color={PAINT} material={paint} position={[0.93, 0, 0]} />
      <Extruded points={WING_PROFILE} width={0.16} color={PAINT} material={paint} position={[-0.93, 0, 0]} />
      <Extruded points={CABIN_PROFILE} width={1.56} color={PAINT} material={paint} />
      <Block size={[1.3, 0.5, 4]} color={TRIM} position={[0, 0.5, 0]} shadow={false} />
      {/* Glass: side windows, windscreen and the long rear hatch */}
      <Extruded points={SIDE_GLASS_PROFILE} width={1.6} color={GLASS} material={gloss} shadow={false} />
      <Panel from={[0.84, 1.04]} to={[0.24, 1.385]} width={1.3} color={GLASS} material={gloss} />
      <Panel from={[-0.52, 1.415]} to={[-1.2, 1.26]} width={1.2} color={GLASS} material={gloss} />
      <Panel from={[-1.2, 1.26]} to={[-1.62, 1.115]} width={1.2} color={GLASS} material={gloss} />
      {/* Nose: oval headlights on the wings, three intakes, number plate */}
      <Block size={[0.72, 0.2, 0.08]} color={TRIM} position={[0, 0.4, 2.27]} shadow={false} />
      <Block size={[0.4, 0.13, 0.04]} color="#f8fafc" position={[0, 0.58, 2.29]} rotation={[-0.25, 0, 0]} shadow={false} />
      <Block size={[1.96, 0.07, 0.3]} color={TRIM} position={[0, 0.26, 2.12]} shadow={false} />
      {/* Tail: light clusters, plate, twin centre exhausts and the spoiler lip */}
      <Block size={[0.46, 0.13, 0.04]} color="#facc15" position={[0, 0.62, -2.3]} shadow={false} />
      <Block size={[1.3, 0.2, 0.08]} color={TRIM} position={[0, 0.33, -2.24]} shadow={false} />
      <Block size={[1.5, 0.05, 0.22]} color={PAINT} position={[0, 1.0, -2.12]} rotation={[-0.25, 0, 0]} material={paint} shadow={false} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.8, 0.85, 1.98]} rotation={[0.56, 0, 0]} scale={[1, 1, 1.5]}>
            <cylinderGeometry args={[0.14, 0.14, 0.08, 8]} />
            <Mat color="#fff7d6" glow={0.8} />
          </mesh>
          <Block size={[0.44, 0.22, 0.08]} color={TRIM} position={[s * 0.7, 0.42, 2.24]} shadow={false} />
          <Block size={[0.3, 0.05, 0.05]} color="#fde68a" glow={1} position={[s * 0.7, 0.57, 2.27]} shadow={false} />
          <Block size={[0.46, 0.15, 0.1]} color="#ef4444" glow={0.9} position={[s * 0.76, 0.84, -2.26]} rotation={[0.1, 0, 0]} shadow={false} />
          <Cyl args={[0.07, 0.07, 0.16, 8]} color={SILVER} position={[s * 0.1, 0.33, -2.28]} rotation={[Math.PI / 2, 0, 0]} shadow={false} material={gloss} />
          {/* Engine intake in front of the rear wheel */}
          <Block size={[0.05, 0.34, 0.3]} color={TRIM} position={[s * 1.0, 0.72, -0.6]} shadow={false} />
          <Block size={[0.07, 0.04, 0.3]} color={PAINT} position={[s * 1.0, 0.72, -0.6]} shadow={false} material={paint} />
          {/* Sill and door mirror */}
          <Block size={[0.06, 0.1, 1.5]} color={TRIM} position={[s * 1.0, 0.3, 0]} shadow={false} />
          <Block size={[0.26, 0.13, 0.2]} color={PAINT} position={[s * 0.92, 1.14, 0.56]} shadow={false} material={paint} />
        </group>
      ))}
      {/* Wheels */}
      <group ref={steerLeft} position={[side, 0, AXLE]}>
        <Wheel out={1} spinRef={frontLeft} />
      </group>
      <group ref={steerRight} position={[-side, 0, AXLE]}>
        <Wheel out={-1} spinRef={frontRight} />
      </group>
      <group position={[side, 0, -AXLE]}>
        <Wheel out={1} spinRef={rearLeft} />
      </group>
      <group position={[-side, 0, -AXLE]}>
        <Wheel out={-1} spinRef={rearRight} />
      </group>
    </group>
  )
}

/**
 * The car: arcade-style driving, terrain following, collisions, the camera
 * that follows it and the check for arriving at a location.
 *
 * `poseRef` is a ref owned by the World ({ x, z, heading, speed, ... }); the car
 * reads and updates it every frame, which also lets the HUD move or reset it.
 */
export default function Car({ layout, inputRef, poseRef, onZoneChange }) {
  const group = useRef(null)
  const focus = useRef(null)
  const zone = useRef(undefined)

  /** Advances the driving simulation by `dt` seconds. */
  const step = (car, keys, dt) => {
    // --- Speed ---
    const throttle = (keys.up ? 1 : 0) - (keys.down ? 1 : 0)
    const steerInput = (keys.left ? 1 : 0) - (keys.right ? 1 : 0)
    const onRoad = layout.roadDistance(car.x, car.z) < WORLD.roadWidth / 2 + 0.8
    const maxForward = DRIVE.maxForward * (onRoad ? 1 : DRIVE.offRoadFactor)

    if (throttle > 0) car.speed += (car.speed < 0 ? DRIVE.braking : DRIVE.acceleration) * dt
    else if (throttle < 0) car.speed -= (car.speed > 0 ? DRIVE.braking : DRIVE.acceleration * 0.7) * dt
    else car.speed -= Math.sign(car.speed) * Math.min(Math.abs(car.speed), DRIVE.coasting * dt)
    if (car.speed > maxForward) car.speed = Math.max(maxForward, car.speed - DRIVE.braking * dt)
    car.speed = Math.max(car.speed, -DRIVE.maxReverse)

    // --- Steering ---
    car.steer = MathUtils.damp(car.steer, steerInput, 9, dt)
    const speedRatio = Math.abs(car.speed) / DRIVE.maxForward
    const grip = clamp(Math.abs(car.speed) / 5, 0, 1) * (1 - 0.4 * speedRatio)
    car.heading += car.steer * DRIVE.steerRate * grip * Math.sign(car.speed) * dt

    const fx = Math.sin(car.heading)
    const fz = Math.cos(car.heading)
    let x = car.x + fx * car.speed * dt
    let z = car.z + fz * car.speed * dt

    // --- Collisions: push the car back out of anything solid ---
    const radius = WORLD.carRadius
    for (const c of layout.colliders) {
      let nx = 0
      let nz = 0
      let overlap = 0
      if (c.r) {
        const dx = x - c.x
        const dz = z - c.z
        const distance = Math.hypot(dx, dz) || 1e-4
        overlap = c.r + radius - distance
        nx = dx / distance
        nz = dz / distance
      } else {
        const dx = x - clamp(x, c.x - c.hw, c.x + c.hw)
        const dz = z - clamp(z, c.z - c.hd, c.z + c.hd)
        const distance = Math.hypot(dx, dz)
        if (distance > 1e-4) {
          overlap = radius - distance
          nx = dx / distance
          nz = dz / distance
        } else {
          // Centre is inside the box: leave through the nearest wall.
          const toEast = c.x + c.hw - x
          const toWest = x - (c.x - c.hw)
          const toSouth = c.z + c.hd - z
          const toNorth = z - (c.z - c.hd)
          const nearest = Math.min(toEast, toWest, toSouth, toNorth)
          overlap = nearest + radius
          if (nearest === toEast) nx = 1
          else if (nearest === toWest) nx = -1
          else if (nearest === toSouth) nz = 1
          else nz = -1
        }
      }
      if (overlap > 0) {
        x += nx * overlap
        z += nz * overlap
        const into = -(fx * nx + fz * nz) * Math.sign(car.speed)
        if (into > 0) car.speed *= into > 0.75 ? 0.3 : Math.exp(-into * 10 * dt)
      }
    }

    // --- Stay in the glen and out of the loch ---
    const fromCentre = Math.hypot(x, z)
    if (fromCentre > WORLD.driveRadius) {
      x *= WORLD.driveRadius / fromCentre
      z *= WORLD.driveRadius / fromCentre
      car.speed *= Math.exp(-5 * dt)
    }
    if (layout.heightAt(x, z) < WORLD.waterLevel + 0.35) {
      x = car.x
      z = car.z
      car.speed *= -0.25
    }
    car.x = x
    car.z = z
  }

  useFrame((state, delta) => {
    const car = poseRef.current
    const { heightAt } = layout

    // Simulate in small fixed steps so the car drives at the same speed, and
    // collides just as reliably, whatever the frame rate.
    let remaining = Math.min(delta, 0.3)
    while (remaining > 1e-5) {
      const slice = Math.min(remaining, 1 / 45)
      step(car, inputRef.current, slice)
      remaining -= slice
    }

    const dt = Math.min(delta, 0.1)
    const { x, z } = car
    const fx = Math.sin(car.heading)
    const fz = Math.cos(car.heading)

    // --- Sit on the terrain ---
    const axle = DRIVE.wheelBase / 2
    const side = DRIVE.track / 2
    const front = heightAt(x + fx * axle, z + fz * axle)
    const back = heightAt(x - fx * axle, z - fz * axle)
    const left = heightAt(x + fz * side, z - fx * side)
    const right = heightAt(x - fz * side, z + fx * side)
    const ground = (front + back + left + right) / 4
    const snap = car.y === undefined
    car.y = snap ? ground : MathUtils.damp(car.y, ground, 20, dt)
    car.pitch = MathUtils.damp(car.pitch ?? 0, Math.atan2(back - front, DRIVE.wheelBase), 12, dt)
    car.roll = MathUtils.damp(car.roll ?? 0, Math.atan2(left - right, DRIVE.track), 12, dt)

    group.current.position.set(x, car.y, z)
    group.current.rotation.set(car.pitch, car.heading, car.roll, 'YXZ')
    // --- Camera: fixed angle, glides after the car, looks a little ahead ---
    const lookAhead = car.speed * 0.22
    const targetX = x + fx * lookAhead
    const targetZ = z + fz * lookAhead
    if (!focus.current || Math.hypot(focus.current.x - x, focus.current.z - z) > 40) {
      focus.current = new Vector3(targetX, car.y, targetZ)
    } else {
      const ease = 1 - Math.exp(-4 * dt)
      focus.current.x += (targetX - focus.current.x) * ease
      focus.current.y += (car.y - focus.current.y) * ease
      focus.current.z += (targetZ - focus.current.z) * ease
    }
    // The view is aimed a little beyond the car, so the car sits below the
    // middle of the screen and tall buildings ahead of it fit in.
    const aspect = state.size.width / state.size.height
    const zoom = aspect < 0.75 ? 1.35 : aspect < 1.2 ? 1.15 : 1
    const aimX = focus.current.x + CAMERA_AIM.x * zoom
    const aimZ = focus.current.z + CAMERA_AIM.z * zoom
    state.camera.position.set(aimX + CAMERA_OFFSET.x * zoom, focus.current.y + CAMERA_OFFSET.y * zoom, aimZ + CAMERA_OFFSET.z * zoom)
    state.camera.lookAt(aimX, focus.current.y + 1.2, aimZ)

    // --- Arrivals ---
    // You arrive by driving onto a parking spot, and stay "arrived" until you
    // are well clear of it, so overshooting slightly does not dismiss the prompt.
    let current = null
    for (const location of layout.locations) {
      const reach = location.slug === zone.current ? WORLD.padRadius + 5 : WORLD.padRadius
      if (Math.hypot(x - location.pad.x, z - location.pad.z) < reach) {
        current = location.slug
        break
      }
    }
    if (current !== zone.current) {
      zone.current = current
      onZoneChange(current)
    }
  })

  return (
    <group ref={group}>
      <CarModel poseRef={poseRef} />
    </group>
  )
}
