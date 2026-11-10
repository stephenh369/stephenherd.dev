'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { CanvasTexture, ExtrudeGeometry, LinearFilter, Shape, SRGBColorSpace } from 'three'

/**
 * Small building blocks shared by everything in the world. The whole scene is
 * made from these primitives - there are no model files to load.
 */

export function Mat({ color, glow = 0, ...props }) {
  return (
    <meshStandardMaterial
      color={color}
      flatShading
      roughness={0.9}
      emissive={glow ? color : '#000000'}
      emissiveIntensity={glow}
      {...props}
    />
  )
}

export function Block({ size, color, glow, material, shadow = true, ...props }) {
  return (
    <mesh castShadow={shadow} receiveShadow {...props}>
      <boxGeometry args={size} />
      <Mat color={color} glow={glow} {...material} />
    </mesh>
  )
}

/** Cylinder / cone. `args` are [radiusTop, radiusBottom, height, sides]. */
export function Cyl({ args, color, glow, material, shadow = true, ...props }) {
  return (
    <mesh castShadow={shadow} receiveShadow {...props}>
      <cylinderGeometry args={args} />
      <Mat color={color} glow={glow} {...material} />
    </mesh>
  )
}

/**
 * A side-on outline pushed straight through from one side to the other, like
 * a shape cut out of a block. `points` are [z, y] pairs (z runs front to back,
 * y is up) and `width` is how far the shape extends across x, centred on 0.
 */
export function Extruded({ points, width, color, glow, material, shadow = true, ...props }) {
  const geometry = useMemo(() => {
    const shape = new Shape()
    points.forEach(([z, y], index) => (index ? shape.lineTo(z, y) : shape.moveTo(z, y)))
    shape.closePath()
    const extruded = new ExtrudeGeometry(shape, { depth: width, bevelEnabled: false })
    extruded.translate(0, 0, -width / 2)
    extruded.rotateY(-Math.PI / 2)
    return extruded
  }, [points, width])
  useEffect(() => () => geometry.dispose(), [geometry])

  return (
    <mesh geometry={geometry} castShadow={shadow} receiveShadow {...props}>
      <Mat color={color} glow={glow} {...material} />
    </mesh>
  )
}

/**
 * Pitched roof with its ridge running along x. Sits with its base at the local
 * origin (the top of the walls). `span` is the wall-to-wall depth it covers.
 */
export function GableRoof({ span, height, length, color = '#4b5563', wallColor = '#f3efe6', overhang = 0.5, ...props }) {
  const gable = useMemo(() => {
    const shape = new Shape()
    shape.moveTo(-span / 2, 0)
    shape.lineTo(span / 2, 0)
    shape.lineTo(0, height)
    shape.closePath()
    const geometry = new ExtrudeGeometry(shape, { depth: length, bevelEnabled: false })
    geometry.translate(0, 0, -length / 2)
    geometry.rotateY(Math.PI / 2)
    return geometry
  }, [span, height, length])

  const angle = Math.atan2(height, span / 2)
  const slope = Math.hypot(height, span / 2) + overhang
  const thickness = 0.3
  const shift = overhang / 2
  const y = height / 2 - shift * Math.sin(angle) + thickness / 2
  const z = span / 4 + shift * Math.cos(angle)

  return (
    <group {...props}>
      <mesh geometry={gable} castShadow receiveShadow>
        <Mat color={wallColor} />
      </mesh>
      <Block size={[length + 0.8, thickness, slope]} color={color} position={[0, y, z]} rotation={[angle, 0, 0]} />
      <Block size={[length + 0.8, thickness, slope]} color={color} position={[0, y, -z]} rotation={[-angle, 0, 0]} />
      <Block size={[length + 0.9, 0.3, 0.45]} color={color} position={[0, height + 0.12, 0]} />
    </group>
  )
}

/** A window: pale frame with dark glass, on a south-facing wall by default. */
export function Window({ size = [1.2, 1.2], ...props }) {
  return (
    <group {...props}>
      <Block size={[size[0] + 0.3, size[1] + 0.3, 0.12]} color="#fbfaf6" shadow={false} />
      <Block size={[size[0], size[1], 0.16]} color="#27405e" shadow={false} material={{ roughness: 0.3 }} />
      <Block size={[size[0], 0.08, 0.2]} color="#fbfaf6" shadow={false} />
      <Block size={[0.08, size[1], 0.2]} color="#fbfaf6" shadow={false} />
    </group>
  )
}

/** Stone cottage facing south: walls, slate roof, door, windows and a chimney. */
export function Cottage({
  width = 8,
  depth = 6,
  height = 3.2,
  roofHeight = 2.3,
  wall = '#f3efe6',
  roof = '#4b5563',
  door = '#2563eb',
  doorX = 0,
  chimney = true,
  ...props
}) {
  const front = depth / 2
  return (
    <group {...props}>
      <Block size={[width, height, depth]} color={wall} position={[0, height / 2, 0]} />
      <Block size={[width + 0.15, 0.5, depth + 0.15]} color="#8b8f95" position={[0, 0.25, 0]} />
      <GableRoof span={depth} height={roofHeight} length={width} color={roof} wallColor={wall} position={[0, height, 0]} />
      {chimney ? (
        <>
          <Block size={[0.9, 1.5, 0.9]} color="#a8a29a" position={[width / 2 - 0.7, height + roofHeight + 0.35, 0]} />
          <Block size={[1.05, 0.2, 1.05]} color="#6b7280" position={[width / 2 - 0.7, height + roofHeight + 1.15, 0]} />
        </>
      ) : null}
      {/* Door */}
      <Block size={[1.5, 2.35, 0.14]} color="#fbfaf6" position={[doorX, 1.18, front]} shadow={false} />
      <Block size={[1.15, 2.1, 0.2]} color={door} position={[doorX, 1.05, front]} shadow={false} />
      <Block size={[0.12, 0.12, 0.12]} color="#facc15" position={[doorX + 0.36, 1.05, front + 0.12]} shadow={false} />
      {/* Windows */}
      {[-1, 1].map((side) => (
        <Window key={side} position={[doorX + side * Math.max(2.1, width / 3.4), 1.85, front]} />
      ))}
      <Window position={[width / 2, 1.85, 0]} rotation={[0, Math.PI / 2, 0]} />
    </group>
  )
}

// ------------------------------------------------------------- textures ---

function createCanvas(width, height) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

function finishTexture(canvas) {
  const texture = new CanvasTexture(canvas)
  texture.colorSpace = SRGBColorSpace
  texture.minFilter = LinearFilter
  texture.generateMipmaps = false
  return texture
}

const FONT = 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

function roundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function useDisposeTexture(texture) {
  useEffect(() => () => texture.dispose(), [texture])
}

/** A name tag that floats above a place and always faces the camera. */
export function FloatingLabel({ title, subtitle, height = 2.5, ...props }) {
  const { texture, aspect } = useMemo(() => {
    const scale = 2
    const titleFont = `700 ${44 * scale}px ${FONT}`
    const subFont = `600 ${22 * scale}px ${FONT}`
    const measure = createCanvas(1, 1).getContext('2d')
    measure.font = titleFont
    const titleWidth = measure.measureText(title).width
    measure.font = subFont
    const sub = subtitle ? subtitle.toUpperCase() : ''
    const subWidth = sub ? measure.measureText(sub).width + sub.length * 2 * scale : 0

    const padX = 30 * scale
    const boxWidth = Math.ceil(Math.max(titleWidth, subWidth) + padX * 2)
    const boxHeight = (sub ? 112 : 78) * scale
    const pointer = 16 * scale
    const canvas = createCanvas(boxWidth + 8, boxHeight + pointer + 8)
    const ctx = canvas.getContext('2d')
    ctx.translate(4, 4)

    ctx.fillStyle = 'rgba(19, 21, 26, 0.92)'
    ctx.strokeStyle = '#60a5fa'
    ctx.lineWidth = 3 * scale
    roundedRect(ctx, 0, 0, boxWidth, boxHeight, 18 * scale)
    ctx.fill()
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(boxWidth / 2 - pointer, boxHeight - 1)
    ctx.lineTo(boxWidth / 2, boxHeight + pointer)
    ctx.lineTo(boxWidth / 2 + pointer, boxHeight - 1)
    ctx.closePath()
    ctx.fillStyle = '#60a5fa'
    ctx.fill()

    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    if (sub) {
      ctx.font = subFont
      ctx.fillStyle = '#93c5fd'
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${2 * scale}px`
      ctx.fillText(sub, boxWidth / 2, 30 * scale)
      if ('letterSpacing' in ctx) ctx.letterSpacing = '0px'
    }
    ctx.font = titleFont
    ctx.fillStyle = '#ffffff'
    ctx.fillText(title, boxWidth / 2, (sub ? 74 : 41) * scale)

    return { texture: finishTexture(canvas), aspect: canvas.width / canvas.height }
  }, [title, subtitle])
  useDisposeTexture(texture)

  return (
    <sprite scale={[height * aspect, height, 1]} renderOrder={20} {...props}>
      <spriteMaterial map={texture} transparent depthTest={false} depthWrite={false} fog={false} toneMapped={false} />
    </sprite>
  )
}

/** A painted sign fixed to a wall. */
export function SignBoard({ text, width = 4, height = 0.9, color = '#1f2937', textColor = '#f9fafb', ...props }) {
  const texture = useMemo(() => {
    const canvas = createCanvas(Math.round((512 * width) / height / 4) * 4, 512 / 4)
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = color
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = textColor
    ctx.lineWidth = 5
    ctx.strokeRect(7, 7, canvas.width - 14, canvas.height - 14)
    ctx.fillStyle = textColor
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    let size = canvas.height * 0.52
    ctx.font = `700 ${size}px ${FONT}`
    const available = canvas.width - 44
    const measured = ctx.measureText(text).width
    if (measured > available) {
      size *= available / measured
      ctx.font = `700 ${size}px ${FONT}`
    }
    ctx.fillText(text, canvas.width / 2, canvas.height / 2 + 3)
    return finishTexture(canvas)
  }, [text, width, height, color, textColor])
  useDisposeTexture(texture)

  return (
    <group {...props}>
      <Block size={[width + 0.2, height + 0.2, 0.12]} color="#111827" shadow={false} />
      <mesh position={[0, 0, 0.07]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial map={texture} roughness={0.8} />
      </mesh>
    </group>
  )
}

/** A few puffs of chimney smoke that rise, grow and fade on a loop. */
export function Smoke({ count = 4, ...props }) {
  const group = useRef(null)
  useFrame(({ clock }) => {
    const puffs = group.current?.children
    if (!puffs) return
    for (let i = 0; i < puffs.length; i++) {
      const t = (clock.elapsedTime * 0.22 + i / puffs.length) % 1
      const puff = puffs[i]
      puff.position.set(Math.sin(t * 5 + i) * 0.35 + t * 1.2, t * 4.2, Math.cos(t * 4 + i * 2) * 0.25)
      puff.scale.setScalar(0.35 + t * 0.9)
      puff.material.opacity = 0.75 * (1 - t) * Math.min(1, t * 8)
    }
  })
  return (
    <group ref={group} {...props}>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i}>
          <icosahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#f1f5f9" flatShading transparent opacity={0} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}
