'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { MathUtils, Vector3 } from 'three'
import { WORLD, clamp } from './layout'
import { Block, Cyl } from './parts'

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
  track: 1.9,
  wheelRadius: 0.5,
}

/** Where the camera sits relative to the car: up high, to the south-east. */
export const CAMERA_OFFSET = new Vector3(21, 32, 31)
const CAMERA_AIM = new Vector3(-CAMERA_OFFSET.x, 0, -CAMERA_OFFSET.z).normalize().multiplyScalar(7)

const BODY = '#2f7fe6'
const TRIM = '#1f2937'

function Wheel({ x, z, spinRef }) {
  return (
    <group position={[x, DRIVE.wheelRadius, z]}>
      <group ref={spinRef}>
        <Cyl args={[DRIVE.wheelRadius, DRIVE.wheelRadius, 0.42, 10]} color="#22262d" rotation={[0, 0, Math.PI / 2]} />
        <Cyl args={[0.26, 0.26, 0.46, 6]} color="#cbd5e1" rotation={[0, 0, Math.PI / 2]} shadow={false} />
      </group>
    </group>
  )
}

/** A boxy little 4x4. Built with its nose pointing along +z. */
function CarModel({ poseRef }) {
  const half = DRIVE.wheelBase / 2
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
    body.current.rotation.z = steer * (speed / DRIVE.maxForward) * 0.07
  })

  return (
    <group ref={body}>
      {/* Body */}
      <Block size={[1.9, 0.62, 4.1]} color={BODY} position={[0, 0.86, 0]} />
      <Block size={[1.8, 0.36, 1.35]} color={BODY} position={[0, 1.3, 1.3]} />
      <Block size={[1.82, 0.98, 2.6]} color={BODY} position={[0, 1.62, -0.66]} />
      <Block size={[1.9, 0.12, 2.7]} color="#f8fafc" position={[0, 2.17, -0.66]} />
      {/* Glass */}
      <Block size={[1.6, 0.6, 0.08]} color="#16263c" position={[0, 1.72, 0.64]} shadow={false} material={{ roughness: 0.2 }} />
      <Block size={[1.6, 0.5, 0.08]} color="#16263c" position={[0, 1.76, -1.96]} shadow={false} material={{ roughness: 0.2 }} />
      <Block size={[1.86, 0.52, 2.1]} color="#16263c" position={[0, 1.76, -0.66]} shadow={false} material={{ roughness: 0.2 }} />
      <Block size={[1.88, 0.56, 0.14]} color={BODY} position={[0, 1.76, -0.5]} shadow={false} />
      {/* Bumpers, grille and lights */}
      <Block size={[2, 0.28, 0.3]} color={TRIM} position={[0, 0.66, 2.1]} />
      <Block size={[2, 0.28, 0.3]} color={TRIM} position={[0, 0.66, -2.1]} />
      <Block size={[1, 0.34, 0.08]} color={TRIM} position={[0, 1.02, 2.06]} shadow={false} />
      {[-1, 1].map((s) => (
        <group key={s}>
          <Block size={[0.34, 0.3, 0.1]} color="#fef9c3" glow={1.4} position={[s * 0.7, 1.02, 2.06]} shadow={false} />
          <Block size={[0.3, 0.3, 0.1]} color="#ef4444" glow={0.9} position={[s * 0.75, 1.0, -2.06]} shadow={false} />
          <Block size={[0.5, 0.2, 1.2]} color={TRIM} position={[s * 0.96, 0.98, half]} shadow={false} />
          <Block size={[0.5, 0.2, 1.2]} color={TRIM} position={[s * 0.96, 0.98, -half]} shadow={false} />
        </group>
      ))}
      {/* Spare wheel and roof rack */}
      <Cyl args={[0.46, 0.46, 0.3, 10]} color="#22262d" position={[0, 1.5, -2.14]} rotation={[Math.PI / 2, 0, 0]} />
      <Block size={[1.3, 0.34, 1]} color="#9a6b3f" position={[0, 2.4, -1]} />
      <Block size={[0.7, 0.26, 0.8]} color="#d97706" position={[0.2, 2.36, 0.05]} />
      {/* Wheels */}
      <group ref={steerLeft} position={[side, 0, half]}>
        <Wheel x={0} z={0} spinRef={frontLeft} />
      </group>
      <group ref={steerRight} position={[-side, 0, half]}>
        <Wheel x={0} z={0} spinRef={frontRight} />
      </group>
      <Wheel x={side} z={-half} spinRef={rearLeft} />
      <Wheel x={-side} z={-half} spinRef={rearRight} />
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
