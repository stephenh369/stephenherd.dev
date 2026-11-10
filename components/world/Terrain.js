'use client'

import { useMemo } from 'react'
import { BackSide, BufferGeometry, Color, Float32BufferAttribute } from 'three'
import { WORLD, fbm, lerp, smoothstep } from './layout'

const PALETTE = {
  sand: new Color('#cdbf93'),
  lochBed: new Color('#5d7f78'),
  grass: [new Color('#6aa84f'), new Color('#5d9c47'), new Color('#7ab65a'), new Color('#6fae52')],
  moor: [new Color('#8f9a55'), new Color('#a09a5b'), new Color('#7f9150')],
  heather: [new Color('#9070a8'), new Color('#a17bb0')],
  rock: [new Color('#85888e'), new Color('#767a82')],
  snow: new Color('#f3f6f9'),
}

const pick = (list, t) => list[Math.min(list.length - 1, Math.floor(t * list.length))]

function faceColour(out, x, z, h, steepness, jitter) {
  const { waterLevel } = WORLD
  const patch = fbm(x * 0.16 + 3, z * 0.16 + 9)
  const heatherPatch = fbm(x * 0.05 + 100, z * 0.05 + 60)

  if (h < waterLevel + 0.5) {
    out.copy(PALETTE.sand).lerp(PALETTE.lochBed, smoothstep(waterLevel + 0.2, waterLevel - 1.2, h))
  } else if (h > 30 + patch * 6) {
    out.copy(PALETTE.snow)
  } else if (h > 17 + patch * 5 || (steepness > 0.36 && h > 8)) {
    out.copy(pick(PALETTE.rock, patch))
  } else if (h > 6.5 + patch * 3) {
    out.copy(heatherPatch > 0.5 ? pick(PALETTE.heather, patch) : pick(PALETTE.moor, patch))
  } else {
    out.copy(pick(PALETTE.grass, patch))
  }
  out.multiplyScalar(lerp(0.94, 1.06, jitter))
}

function buildTerrainGeometry(layout) {
  const { size, segments } = WORLD
  const cell = size / segments
  const stride = segments + 1
  const { heights } = layout

  const positions = new Float32Array(segments * segments * 18)
  const colours = new Float32Array(segments * segments * 18)
  const colour = new Color()
  let o = 0

  const vertex = (ix, iz) => [ix * cell - size / 2, heights[iz * stride + ix], iz * cell - size / 2]
  const triangle = (a, b, c, seed) => {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2]
    const vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2]
    const nx = uy * vz - uz * vy
    const ny = uz * vx - ux * vz
    const nz = ux * vy - uy * vx
    const steepness = 1 - ny / Math.hypot(nx, ny, nz)
    const jitter = Math.abs(Math.sin(seed * 12.9898) * 43758.5453) % 1
    faceColour(colour, (a[0] + b[0] + c[0]) / 3, (a[2] + b[2] + c[2]) / 3, (a[1] + b[1] + c[1]) / 3, steepness, jitter)
    for (const p of [a, b, c]) {
      positions[o] = p[0]
      positions[o + 1] = p[1]
      positions[o + 2] = p[2]
      colours[o] = colour.r
      colours[o + 1] = colour.g
      colours[o + 2] = colour.b
      o += 3
    }
  }

  for (let iz = 0; iz < segments; iz++) {
    for (let ix = 0; ix < segments; ix++) {
      const p00 = vertex(ix, iz)
      const p10 = vertex(ix + 1, iz)
      const p01 = vertex(ix, iz + 1)
      const p11 = vertex(ix + 1, iz + 1)
      // Same diagonal as layout.heightAt, so the car sits exactly on the mesh.
      triangle(p00, p01, p10, iz * stride + ix)
      triangle(p10, p01, p11, iz * stride + ix + 0.5)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new Float32BufferAttribute(colours, 3))
  geometry.computeVertexNormals()
  return geometry
}

export function Terrain({ layout }) {
  const geometry = useMemo(() => buildTerrainGeometry(layout), [layout])
  return (
    <mesh geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors roughness={1} />
    </mesh>
  )
}

export function Water() {
  const { loch, waterLevel } = WORLD
  return (
    <mesh position={[loch.x, waterLevel, loch.z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <circleGeometry args={[Math.max(loch.rx, loch.rz) * 1.7, 40]} />
      <meshStandardMaterial color="#3d7ea6" roughness={0.25} metalness={0.15} transparent opacity={0.86} />
    </mesh>
  )
}

function buildRoadGeometry(path, heightAt, lift) {
  const across = 4
  const half = WORLD.roadWidth / 2
  const positions = []
  const colours = []
  const indices = []
  const centre = new Color('#565a61')
  const edge = new Color('#6c7076')

  for (let i = 0; i < path.length; i++) {
    const prev = path[Math.max(0, i - 1)]
    const next = path[Math.min(path.length - 1, i + 1)]
    const tx = next.x - prev.x
    const tz = next.z - prev.z
    const length = Math.hypot(tx, tz) || 1
    const nx = -tz / length
    const nz = tx / length
    for (let k = 0; k <= across; k++) {
      const offset = (k / across - 0.5) * 2 * half
      const x = path[i].x + nx * offset
      const z = path[i].z + nz * offset
      positions.push(x, heightAt(x, z) + lift, z)
      const c = k === 0 || k === across ? edge : centre
      colours.push(c.r, c.g, c.b)
    }
    if (i < path.length - 1) {
      const row = i * (across + 1)
      for (let k = 0; k < across; k++) {
        const a = row + k
        const b = row + k + 1
        const c = row + across + 1 + k
        const d = c + 1
        indices.push(a, b, c, b, d, c)
      }
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('color', new Float32BufferAttribute(colours, 3))
  geometry.setIndex(indices)
  geometry.computeVertexNormals()
  return geometry
}

export function Roads({ layout }) {
  const geometries = useMemo(
    () => layout.roads.map((path, index) => buildRoadGeometry(path, layout.heightAt, 0.07 + index * 0.012)),
    [layout]
  )
  return geometries.map((geometry, index) => (
    <mesh key={index} geometry={geometry} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.95} side={2} polygonOffset polygonOffsetFactor={-2} polygonOffsetUnits={-2} />
    </mesh>
  ))
}

const SKY_VERTEX = /* glsl */ `
  varying vec3 vDirection;
  void main() {
    vDirection = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const SKY_FRAGMENT = /* glsl */ `
  uniform vec3 top;
  uniform vec3 horizon;
  varying vec3 vDirection;
  void main() {
    float t = pow(clamp(vDirection.y, 0.0, 1.0), 0.55);
    gl_FragColor = vec4(mix(horizon, top, t), 1.0);
  }
`

export function Sky({ horizon }) {
  const uniforms = useMemo(
    () => ({ top: { value: new Color('#5d9fd6') }, horizon: { value: new Color(horizon) } }),
    [horizon]
  )
  return (
    <mesh>
      <sphereGeometry args={[900, 24, 12]} />
      <shaderMaterial
        vertexShader={SKY_VERTEX}
        fragmentShader={SKY_FRAGMENT}
        uniforms={uniforms}
        side={BackSide}
        depthWrite={false}
        fog={false}
        toneMapped={false}
      />
    </mesh>
  )
}
