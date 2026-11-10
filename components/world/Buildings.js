'use client'

import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { buildingKind } from './buildingData'
import { Block, Cottage, Cyl, GableRoof, Mat, SignBoard, Smoke, Window } from './parts'

/**
 * The buildings. Each one is drawn around its own origin, standing on y = 0
 * and facing south (+z, towards the camera). Solid shapes for collisions live
 * next door in buildingData.js.
 */

const STONE = '#a9a79f'
const SLATE = '#4b5563'

/** Home: a white-washed cottage with the garage the car sets off from. */
function Home() {
  return (
    <group>
      <Cottage position={[-3, 0, 0]} door="#2563eb" />
      <Smoke position={[0.3, 6.8, 0]} />
      {/* Garage, with its door open on the east side */}
      <Block size={[6.4, 3, 6.6]} color="#f3efe6" position={[4.2, 1.5, 0]} />
      <GableRoof span={6.6} height={1.9} length={6.4} position={[4.2, 3, 0]} />
      <Block size={[0.16, 2.6, 4.6]} color="#111827" position={[7.36, 1.3, 0]} shadow={false} />
      <Block size={[0.3, 0.5, 4.9]} color="#93c5fd" position={[7.4, 2.75, 0]} shadow={false} />
      <Block size={[0.24, 2.9, 0.3]} color="#fbfaf6" position={[7.4, 1.45, 2.45]} shadow={false} />
      <Block size={[0.24, 2.9, 0.3]} color="#fbfaf6" position={[7.4, 1.45, -2.45]} shadow={false} />
      <Window position={[4.2, 1.7, 3.3]} size={[1.4, 1]} />
      {/* Garden */}
      {[
        [-6.2, 4.4, 0.9],
        [-1.2, 4.6, 0.7],
        [-8.4, 1.5, 1.1],
      ].map(([x, z, s]) => (
        <mesh key={`${x}${z}`} position={[x, s * 0.6, z]} scale={[s, s * 0.8, s]} castShadow>
          <icosahedronGeometry args={[1, 0]} />
          <Mat color="#3f8f4f" />
        </mesh>
      ))}
    </group>
  )
}

function PlainCottage() {
  return (
    <group>
      <Cottage door="#16a34a" />
      <Smoke position={[3.3, 6.8, 0]} />
    </group>
  )
}

/** About: a red-and-white lighthouse on the loch shore, with a keeper's hut. */
function Lighthouse() {
  const beam = useRef(null)
  useFrame((_, delta) => {
    if (beam.current) beam.current.rotation.y += delta * 0.9
  })
  return (
    <group>
      <Cyl args={[3.6, 4.3, 0.9, 9]} color={STONE} position={[0, 0.3, 0]} />
      <Cyl args={[1.55, 2.5, 11, 12]} color="#f8f7f2" position={[0, 6.2, 0]} />
      <Cyl args={[2.3, 2.52, 1.7, 12]} color="#c0392b" position={[0, 2.7, 0]} />
      <Cyl args={[1.93, 2.1, 1.7, 12]} color="#c0392b" position={[0, 7.4, 0]} />
      {/* Gallery and lantern */}
      <Cyl args={[2.3, 1.9, 0.4, 12]} color="#1f2937" position={[0, 11.9, 0]} />
      <mesh position={[0, 12.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.06, 4, 12]} />
        <Mat color="#1f2937" />
      </mesh>
      <Cyl args={[1.25, 1.25, 1.7, 8]} color="#fde68a" glow={1.6} position={[0, 12.95, 0]} material={{ roughness: 0.2 }} />
      <Cyl args={[0, 1.65, 1.5, 8]} color="#c0392b" position={[0, 14.55, 0]} />
      <mesh position={[0, 15.45, 0]}>
        <icosahedronGeometry args={[0.22, 0]} />
        <Mat color="#1f2937" />
      </mesh>
      <group ref={beam} position={[0, 12.95, 0]}>
        {[0, Math.PI].map((turn) => (
          <mesh key={turn} rotation={[Math.PI / 2, 0, turn]} position={[0, 0, turn ? -7.2 : 7.2]}>
            <cylinderGeometry args={[2.6, 0.4, 12, 8, 1, true]} />
            <meshBasicMaterial color="#fef3c7" transparent opacity={0.16} depthWrite={false} fog={false} side={2} />
          </mesh>
        ))}
      </group>
      {/* Door and windows */}
      <Block size={[1.1, 2, 0.3]} color="#1e3a5f" position={[0, 1.6, 2.45]} shadow={false} />
      <Block size={[0.5, 0.8, 0.3]} color="#27405e" position={[0, 5.4, 2.05]} shadow={false} />
      <Block size={[0.5, 0.8, 0.3]} color="#27405e" position={[0, 9.4, 1.72]} shadow={false} />
      {/* Keeper's hut */}
      <Cottage position={[-6.2, 0, 0.6]} width={4.2} depth={3.6} height={2.5} roofHeight={1.5} door="#c0392b" chimney={false} />
    </group>
  )
}

/** Services: a stone workshop with a rusty tin roof, tools and a smoking flue. */
function Workshop() {
  return (
    <group>
      <Block size={[10, 4.2, 8]} color="#b9b2a3" position={[0, 2.1, 0]} />
      <Block size={[10.2, 0.6, 8.2]} color="#8b8f95" position={[0, 0.3, 0]} />
      <GableRoof span={8} height={2.6} length={10} color="#a8452f" wallColor="#b9b2a3" position={[0, 4.2, 0]} />
      {/* Sliding doors, one pulled open */}
      <Block size={[4.6, 3.3, 0.14]} color="#15171c" position={[0, 1.65, 4]} shadow={false} />
      <Block size={[2.4, 3.3, 0.2]} color="#2f6b57" position={[-2.5, 1.65, 4.12]} />
      <Block size={[2.4, 3.3, 0.2]} color="#2f6b57" position={[1.2, 1.65, 4.12]} />
      <Block size={[7.6, 0.16, 0.24]} color="#1f2937" position={[-0.6, 3.38, 4.14]} shadow={false} />
      <SignBoard text="WORKSHOP" width={4.4} height={0.9} color="#1f2937" textColor="#fde68a" position={[0, 3.85, 4.5]} rotation={[-0.6, 0, 0]} />
      <Window position={[3.7, 2.2, 4]} size={[1.3, 1.3]} />
      <Window position={[5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]} size={[1.6, 1.3]} />
      {/* Flue */}
      <Cyl args={[0.3, 0.3, 2.6, 6]} color="#374151" position={[-3.2, 7, -1.2]} />
      <Smoke position={[-3.2, 8.4, -1.2]} />
      {/* Crates and a barrel */}
      <Block size={[1.5, 1.5, 1.5]} color="#b98a4f" position={[6.6, 0.75, 3.2]} rotation={[0, 0.3, 0]} />
      <Block size={[1.1, 1.1, 1.1]} color="#c99a5b" position={[6.4, 2.05, 3.1]} rotation={[0, -0.2, 0]} />
      <Cyl args={[0.55, 0.55, 1.3, 8]} color="#7c4a2d" position={[6.9, 0.65, 1.3]} />
      {/* Anvil on a stump */}
      <Cyl args={[0.5, 0.6, 0.8, 7]} color="#7c5a3c" position={[-5.8, 0.4, 5]} />
      <Block size={[1.2, 0.3, 0.45]} color="#374151" position={[-5.8, 1.1, 5]} />
      <Block size={[0.5, 0.3, 0.4]} color="#374151" position={[-5.8, 0.88, 5]} />
    </group>
  )
}

function Battlements({ width, depth, y }) {
  const merlons = []
  const step = 1.55
  for (let x = -width / 2 + 0.45; x <= width / 2 - 0.4; x += step) {
    merlons.push([x, depth / 2 - 0.35], [x, -depth / 2 + 0.35])
  }
  for (let z = -depth / 2 + 0.45 + step; z <= depth / 2 - 0.4 - step; z += step) {
    merlons.push([width / 2 - 0.35, z], [-width / 2 + 0.35, z])
  }
  return merlons.map(([x, z]) => <Block key={`${x}:${z}`} size={[0.9, 0.9, 0.7]} color={STONE} position={[x, y + 0.45, z]} />)
}

/** Portfolio: a tower-house castle flying the Saltire. */
function Castle() {
  const flag = useRef(null)
  useFrame(({ clock }) => {
    if (flag.current) flag.current.rotation.y = Math.sin(clock.elapsedTime * 2.2) * 0.25
  })
  return (
    <group>
      <Block size={[10.6, 0.7, 10.6]} color="#8f8d86" position={[0, 0.25, 0]} />
      <Block size={[9, 9.5, 9]} color={STONE} position={[0, 4.75, 0]} />
      <Block size={[9.5, 0.5, 9.5]} color="#9a988f" position={[0, 9.5, 0]} />
      <Battlements width={9.5} depth={9.5} y={9.75} />
      {/* Corner towers */}
      <Cyl args={[2.4, 2.5, 12.6, 10]} color="#b3b1a8" position={[5, 6.3, 4.6]} />
      <Cyl args={[2.75, 2.4, 0.6, 10]} color="#9a988f" position={[5, 12.6, 4.6]} />
      <Cyl args={[0, 2.9, 3.6, 10]} color="#3f5873" position={[5, 14.7, 4.6]} />
      <Cyl args={[2, 2.1, 11.4, 10]} color="#b3b1a8" position={[-5, 5.7, -4.6]} />
      <Cyl args={[0, 2.45, 3.1, 10]} color="#3f5873" position={[-5, 12.95, -4.6]} />
      {/* Gate */}
      <Block size={[2.6, 2.7, 0.3]} color="#3b2a1e" position={[-0.6, 1.5, 4.45]} shadow={false} />
      <Cyl args={[1.3, 1.3, 0.3, 12]} color="#3b2a1e" position={[-0.6, 2.85, 4.45]} rotation={[Math.PI / 2, 0, 0]} shadow={false} />
      <Block size={[0.12, 2.9, 0.36]} color="#1f140d" position={[-0.6, 1.6, 4.47]} shadow={false} />
      {/* Arrow slits */}
      {[
        [-3, 6.2],
        [-0.6, 7],
        [1.8, 6.2],
        [-3, 3.2],
      ].map(([x, y]) => (
        <Block key={`${x}${y}`} size={[0.36, 1.3, 0.3]} color="#1f2937" position={[x, y, 4.45]} shadow={false} />
      ))}
      {[-2.2, 1.6].map((z) => (
        <Block key={z} size={[0.3, 1.3, 0.36]} color="#1f2937" position={[4.45, 6.4, z - 1.6]} shadow={false} />
      ))}
      <Block size={[0.4, 1.1, 0.3]} color="#1f2937" position={[5, 8.6, 6.95]} shadow={false} />
      {/* Saltire */}
      <Cyl args={[0.07, 0.07, 3.6, 5]} color="#e5e7eb" position={[5, 18.1, 4.6]} />
      <group ref={flag} position={[5, 19.1, 4.6]}>
        <group position={[1.2, 0, 0]}>
          <Block size={[2.4, 1.5, 0.05]} color="#1d5fb4" shadow={false} />
          <Block size={[2.75, 0.24, 0.07]} color="#ffffff" rotation={[0, 0, 0.56]} shadow={false} />
          <Block size={[2.75, 0.24, 0.07]} color="#ffffff" rotation={[0, 0, -0.56]} shadow={false} />
        </group>
      </group>
    </group>
  )
}

/** Contact: the village post office, with a pillar box and a phone box. */
function PostOffice() {
  return (
    <group>
      <Cottage width={9} depth={6} wall="#e9e1d2" door="#c0392b" roof={SLATE} />
      <Smoke position={[3.8, 6.8, 0]} />
      <SignBoard text="POST OFFICE" width={4.6} height={0.8} color="#b3261e" textColor="#fde68a" position={[0, 2.85, 3.5]} rotation={[-0.6, 0, 0]} />
      {/* Pillar box */}
      <group position={[6.2, 0, 4.4]}>
        <Cyl args={[0.52, 0.56, 0.2, 10]} color="#1f2937" position={[0, 0.1, 0]} />
        <Cyl args={[0.46, 0.46, 1.5, 10]} color="#d32f2f" position={[0, 0.95, 0]} />
        <Cyl args={[0.3, 0.56, 0.3, 10]} color="#d32f2f" position={[0, 1.85, 0]} />
        <Block size={[0.5, 0.08, 0.1]} color="#111827" position={[0, 1.35, 0.44]} shadow={false} />
      </group>
      {/* Phone box */}
      <group position={[-6.4, 0, 4.2]}>
        <Block size={[1.3, 0.2, 1.3]} color="#1f2937" position={[0, 0.1, 0]} />
        <Block size={[1.15, 2.6, 1.15]} color="#d32f2f" position={[0, 1.5, 0]} />
        <Block size={[1.3, 0.3, 1.3]} color="#d32f2f" position={[0, 2.95, 0]} />
        <Block size={[0.9, 0.2, 0.9]} color="#d32f2f" position={[0, 3.2, 0]} />
        <Block size={[0.8, 1.7, 1.2]} color="#27405e" position={[0, 1.7, 0]} shadow={false} material={{ roughness: 0.3 }} />
        <Block size={[1.2, 1.7, 0.8]} color="#27405e" position={[0, 1.7, 0]} shadow={false} material={{ roughness: 0.3 }} />
        <Block size={[0.9, 0.22, 1.22]} color="#f9fafb" position={[0, 2.72, 0]} shadow={false} />
      </group>
      {/* Bench */}
      <Block size={[1.8, 0.12, 0.55]} color="#7c5a3c" position={[3, 0.55, 3.6]} />
      <Block size={[0.12, 0.5, 0.5]} color="#374151" position={[2.3, 0.28, 3.6]} />
      <Block size={[0.12, 0.5, 0.5]} color="#374151" position={[3.7, 0.28, 3.6]} />
    </group>
  )
}

/** YouTube: a drive-in cinema, with a projection booth and a popcorn stand. */
function DriveIn() {
  return (
    <group>
      {/* Screen on a steel frame */}
      {[-5, 0, 5].map((x) => (
        <group key={x}>
          <Block size={[0.4, 3, 0.4]} color="#374151" position={[x, 1.5, -0.3]} />
          <Block size={[0.3, 4.6, 0.3]} color="#374151" position={[x, 2, -1.6]} rotation={[-0.5, 0, 0]} />
        </group>
      ))}
      <Block size={[12.8, 7.4, 0.5]} color="#e5e7eb" position={[0, 6.4, 0]} />
      <Block size={[12, 6.6, 0.2]} color="#111318" position={[0, 6.4, 0.22]} shadow={false} />
      {/* Play button */}
      <Block size={[4, 2.8, 0.14]} color="#ff0000" glow={0.5} position={[0, 6.4, 0.36]} shadow={false} />
      <group position={[0.08, 6.4, 0.46]} rotation={[0, 0, Math.PI / 2]}>
        <Cyl args={[0.9, 0.9, 0.08, 3]} color="#ffffff" glow={0.6} rotation={[Math.PI / 2, 0, 0]} shadow={false} />
      </group>
      <SignBoard text="DRIVE-IN" width={5} height={1} color="#16181c" textColor="#22c55e" position={[0, 10.75, 0.1]} />
      {/* Projection booth */}
      <group position={[9.2, 0, 5]}>
        <Block size={[3, 2.6, 3]} color="#f3efe6" position={[0, 1.3, 0]} />
        <Block size={[3.4, 0.3, 3.4]} color={SLATE} position={[0, 2.75, 0]} />
        <Block size={[0.9, 0.5, 0.14]} color="#fde68a" glow={1.4} position={[-0.6, 1.9, -1.5]} shadow={false} />
        <Block size={[1, 2, 0.14]} color="#b3261e" position={[0.4, 1, 1.5]} shadow={false} />
        <Window position={[-1.5, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} size={[1.1, 0.9]} />
      </group>
      {/* Popcorn stand */}
      <group position={[-9, 0, 5.4]}>
        <Block size={[2, 1.3, 1.6]} color="#f8fafc" position={[0, 0.65, 0]} />
        {[-0.75, -0.25, 0.25, 0.75].map((x) => (
          <Block key={x} size={[0.25, 1.32, 1.62]} color="#dc2626" position={[x, 0.65, 0]} shadow={false} />
        ))}
        <Block size={[0.1, 1.5, 0.1]} color="#374151" position={[-0.9, 2, 0.7]} />
        <Block size={[0.1, 1.5, 0.1]} color="#374151" position={[0.9, 2, 0.7]} />
        <Block size={[2.4, 0.2, 2]} color="#dc2626" position={[0, 2.8, 0]} />
        <Block size={[0.6, 0.5, 0.5]} color="#fde68a" position={[0.3, 1.55, 0]} />
      </group>
      {/* Speaker posts either side of the parking spot */}
      {[-6.5, 6.5].map((x) => (
        <group key={x} position={[x, 0, 11]}>
          <Cyl args={[0.08, 0.1, 1.5, 6]} color="#374151" position={[0, 0.75, 0]} />
          <Block size={[0.4, 0.5, 0.3]} color="#9ca3af" position={[0, 1.6, 0]} />
        </group>
      ))}
    </group>
  )
}

const BUILDINGS = {
  home: Home,
  cottage: PlainCottage,
  lighthouse: Lighthouse,
  workshop: Workshop,
  castle: Castle,
  postOffice: PostOffice,
  driveIn: DriveIn,
}

export default function Building({ kind, ...props }) {
  const Component = BUILDINGS[buildingKind(kind)] ?? PlainCottage
  return (
    <group {...props}>
      <Component />
    </group>
  )
}
