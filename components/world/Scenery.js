'use client'

import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useMemo, useRef } from 'react'
import { Color, Object3D } from 'three'
import { WORLD, mulberry32 } from './layout'
import { Block, Cyl, Mat } from './parts'

const dummy = new Object3D()
const tint = new Color()

/** Draws many copies of one shape in a single draw call. */
function Instances({ items, place, colours, children, shadow = true }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const mesh = ref.current
    items.forEach((item, i) => {
      dummy.position.set(0, 0, 0)
      dummy.rotation.set(0, 0, 0)
      dummy.scale.set(1, 1, 1)
      place(dummy, item, i)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      if (colours) mesh.setColorAt(i, tint.set(colours[i % colours.length]))
    })
    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    mesh.computeBoundingSphere()
  }, [items, place, colours])
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} castShadow={shadow} receiveShadow>
      {children}
    </instancedMesh>
  )
}

const PINE_GREENS = ['#2f6b45', '#356f3f', '#2b6150', '#3d7a48']

const placeTrunk = (o, t) => {
  o.position.set(t.x, t.y + 0.9 * t.scale, t.z)
  o.scale.setScalar(t.scale)
}
const placePineLow = (o, t) => {
  o.position.set(t.x, t.y + 3.1 * t.scale, t.z)
  o.rotation.y = t.turn
  o.scale.setScalar(t.scale)
}
const placePineHigh = (o, t) => {
  o.position.set(t.x, t.y + 5.2 * t.scale, t.z)
  o.rotation.y = t.turn + 0.5
  o.scale.setScalar(t.scale)
}
const placeRock = (o, r) => {
  o.position.set(r.x, r.y + 0.25 * r.scale, r.z)
  o.rotation.set(r.turn, r.turn * 2, r.turn * 0.5)
  o.scale.set(r.scale * 1.2, r.scale * 0.8, r.scale)
}
const placeHeather = (o, h) => {
  o.position.set(h.x, h.y + 0.12, h.z)
  o.rotation.y = h.turn
  o.scale.set(h.scale * 0.75, h.scale * 0.38, h.scale * 0.75)
}

function Pines({ trees }) {
  return (
    <>
      <Instances items={trees} place={placeTrunk}>
        <cylinderGeometry args={[0.22, 0.34, 1.8, 6]} />
        <Mat color="#6b4a32" />
      </Instances>
      <Instances items={trees} place={placePineLow} colours={PINE_GREENS}>
        <coneGeometry args={[1.9, 3.4, 7]} />
        <Mat color="#ffffff" />
      </Instances>
      <Instances items={trees} place={placePineHigh} colours={PINE_GREENS}>
        <coneGeometry args={[1.35, 2.9, 7]} />
        <Mat color="#ffffff" />
      </Instances>
    </>
  )
}

function Sheep({ sheep }) {
  return sheep.map((s, i) => (
    <group key={i} position={[s.x, s.y, s.z]} rotation={[0, s.turn, 0]} scale={0.72}>
      <mesh position={[0, 1.0, 0]} scale={[0.75, 0.7, 1.05]} castShadow>
        <icosahedronGeometry args={[1, 0]} />
        <Mat color="#f5f1e6" />
      </mesh>
      <Block size={[0.5, 0.55, 0.6]} color="#27272a" position={[0, 1.25, 1.05]} />
      {[
        [-0.35, 0.5],
        [0.35, 0.5],
        [-0.35, -0.5],
        [0.35, -0.5],
      ].map(([x, z]) => (
        <Block key={`${x}${z}`} size={[0.16, 0.6, 0.16]} color="#27272a" position={[x, 0.3, z]} />
      ))}
    </group>
  ))
}

function Clouds() {
  const group = useRef(null)
  const clouds = useMemo(() => {
    const random = mulberry32(77)
    return Array.from({ length: 11 }, () => ({
      x: (random() - 0.5) * 420,
      y: 46 + random() * 22,
      z: (random() - 0.5) * 380,
      speed: 1.2 + random() * 1.4,
      puffs: Array.from({ length: 3 + Math.floor(random() * 3) }, (_, i) => ({
        x: i * 5 - 6 + random() * 2,
        y: random() * 1.5,
        z: (random() - 0.5) * 5,
        s: 4 + random() * 3.5,
      })),
    }))
  }, [])
  useFrame((_, delta) => {
    group.current?.children.forEach((cloud, i) => {
      cloud.position.x += clouds[i].speed * delta
      if (cloud.position.x > 230) cloud.position.x = -230
    })
  })
  return (
    <group ref={group}>
      {clouds.map((cloud, i) => (
        <group key={i} position={[cloud.x, cloud.y, cloud.z]}>
          {cloud.puffs.map((puff, j) => (
            <mesh key={j} position={[puff.x, puff.y, puff.z]} scale={[puff.s, puff.s * 0.55, puff.s * 0.8]}>
              <icosahedronGeometry args={[1, 0]} />
              <meshStandardMaterial color="#ffffff" flatShading roughness={1} fog={false} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}

/** Something stirs in the loch. */
function Nessie() {
  const group = useRef(null)
  const { loch, waterLevel } = WORLD
  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime * 0.12
    group.current.position.set(loch.x + Math.cos(t) * loch.rx * 0.45, waterLevel, loch.z + Math.sin(t) * loch.rz * 0.4)
    group.current.rotation.y = -t
    group.current.position.y += Math.sin(clock.elapsedTime * 1.3) * 0.08
  })
  return (
    <group ref={group}>
      <Cyl args={[0.28, 0.42, 2.4, 6]} color="#2f5d4a" position={[0, 0.9, 2.2]} rotation={[0.35, 0, 0]} />
      <Block size={[0.5, 0.5, 1]} color="#2f5d4a" position={[0, 2.15, 2.85]} />
      {[0.6, -0.9, -2.3].map((z, i) => (
        <mesh key={z} position={[0, -0.15, z]} scale={[0.75 - i * 0.12, 0.8 - i * 0.14, 0.9]} castShadow>
          <icosahedronGeometry args={[1, 0]} />
          <Mat color="#2f5d4a" />
        </mesh>
      ))}
    </group>
  )
}

export default function Scenery({ layout }) {
  const { trees, rocks, heather, sheep } = layout.scenery
  return (
    <>
      <Pines trees={trees} />
      <Instances items={rocks} place={placeRock} colours={['#8a8d93', '#777b83', '#9a9da2']}>
        <dodecahedronGeometry args={[1, 0]} />
        <Mat color="#ffffff" />
      </Instances>
      <Instances items={heather} place={placeHeather} colours={['#946aa8', '#86609b', '#a57bb3', '#7a6a8f']} shadow={false}>
        <icosahedronGeometry args={[0.8, 0]} />
        <Mat color="#ffffff" />
      </Instances>
      <Sheep sheep={sheep} />
      <Clouds />
      <Nessie />
    </>
  )
}
