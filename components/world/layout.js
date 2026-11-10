import { CatmullRomCurve3, Vector3 } from 'three'
import { buildingData } from './buildingData'

/**
 * Turns the world description from the content files (home + locations, each
 * with a map position and optional road waypoints) into everything the scene
 * needs: terrain heights, road paths, parking spots, colliders and scenery
 * positions. Pure data - no rendering - and fully deterministic, so the world
 * looks the same on every visit.
 *
 * Map coordinates are [x, z] in metres-ish units: +x is east, +z is south.
 */

export const WORLD = {
  size: 340, // width of the terrain mesh
  segments: 170, // terrain grid resolution
  driveRadius: 102, // how far from the centre the car may go
  waterLevel: -1.1,
  roadWidth: 5.4,
  padRadius: 4.8, // radius of a location's parking spot (and its trigger zone)
  carRadius: 1.5,
  loch: { x: -40, z: 4, rx: 30, rz: 16, angle: 0.22 },
}

// ---------------------------------------------------------------- maths ---

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
export const lerp = (a, b, t) => a + (b - a) * t
export function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

/** Small seeded random number generator. */
export function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hash2(ix, iz) {
  const n = Math.sin(ix * 127.1 + iz * 311.7) * 43758.5453123
  return n - Math.floor(n)
}

function valueNoise(x, z) {
  const ix = Math.floor(x)
  const iz = Math.floor(z)
  const fx = x - ix
  const fz = z - iz
  const u = fx * fx * (3 - 2 * fx)
  const v = fz * fz * (3 - 2 * fz)
  return lerp(lerp(hash2(ix, iz), hash2(ix + 1, iz), u), lerp(hash2(ix, iz + 1), hash2(ix + 1, iz + 1), u), v)
}

/** Fractal noise in the range 0..1. */
export function fbm(x, z) {
  return (
    valueNoise(x, z) * 0.57 + valueNoise(x * 2.03 + 5.2, z * 2.03 + 1.3) * 0.29 + valueNoise(x * 4.1 + 9.1, z * 4.1 + 7.7) * 0.14
  )
}

// -------------------------------------------------------------- terrain ---

/** 0 in the middle of the loch, 1 at its nominal shoreline, growing outwards. */
function lochDistance(x, z) {
  const { loch } = WORLD
  const dx = x - loch.x
  const dz = z - loch.z
  const cos = Math.cos(loch.angle)
  const sin = Math.sin(loch.angle)
  const lx = dx * cos + dz * sin
  const lz = -dx * sin + dz * cos
  // A little noise so the shore is not a perfect ellipse.
  const wobble = 1 + (fbm(x * 0.05 + 30, z * 0.05 + 80) - 0.5) * 0.35
  return Math.hypot(lx / loch.rx, lz / loch.rz) / wobble
}

/** The natural landscape, before roads and building plots are levelled into it. */
function naturalHeight(x, z) {
  // Rolling glen floor.
  let h = fbm(x * 0.021, z * 0.021) * 5.2 + (fbm(x * 0.09 + 11, z * 0.09 + 3) - 0.5) * 0.9
  // A ring of mountains closes the glen in.
  const m = smoothstep(86, 158, Math.hypot(x, z))
  h += m * 5 + m * m * (26 + 34 * fbm(x * 0.027 + 40, z * 0.027 + 17))
  // The loch.
  const basin = 1 - smoothstep(0.6, 1.25, lochDistance(x, z))
  return lerp(h, -4.6, basin)
}

function nearestOnPath(points, x, z, best) {
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i]
    const b = points[i + 1]
    const abx = b.x - a.x
    const abz = b.z - a.z
    const t = clamp(((x - a.x) * abx + (z - a.z) * abz) / (abx * abx + abz * abz || 1), 0, 1)
    const px = a.x + abx * t
    const pz = a.z + abz * t
    const d = (x - px) * (x - px) + (z - pz) * (z - pz)
    if (d < best.d2) {
      best.d2 = d
      best.y = lerp(a.y, b.y, t)
    }
  }
}

// --------------------------------------------------------------- layout ---

function densePath(waypoints, spacing = 1.25) {
  if (waypoints.length < 2) return []
  const curve = new CatmullRomCurve3(
    waypoints.map(([x, z]) => new Vector3(x, 0, z)),
    false,
    'centripetal'
  )
  const count = Math.max(2, Math.ceil(curve.getLength() / spacing))
  return curve.getSpacedPoints(count).map((p) => ({ x: p.x, z: p.z, y: 0 }))
}

export function buildWorldLayout(world) {
  const { waterLevel, roadWidth, padRadius } = WORLD

  // --- Places ---------------------------------------------------------------
  const [hx, hz] = world.home.position
  const home = {
    ...world.home,
    x: hx,
    z: hz,
    data: buildingData(world.home.building),
    // The car starts on the driveway outside the garage door, facing east.
    start: { x: hx + 12.5, z: hz, heading: Math.PI / 2 },
    plot: { x: hx + 3, z: hz, r: 13 },
  }

  const locations = world.locations.map((location) => {
    const [x, z] = location.position
    const data = buildingData(location.building)
    const pad = { x, z: z + data.parking }
    return {
      ...location,
      x,
      z,
      data,
      pad,
      plot: { x, z: z + data.parking / 2, r: data.parking / 2 + padRadius + 2 },
    }
  })

  const places = [home, ...locations]

  // --- Heights --------------------------------------------------------------
  for (const place of places) {
    place.y = Math.max(naturalHeight(place.x, place.z), waterLevel + 1.1)
  }

  // Natural landscape with each building plot levelled off.
  const plotHeight = (x, z) => {
    let h = naturalHeight(x, z)
    for (const place of places) {
      const d = Math.hypot(x - place.plot.x, z - place.plot.z)
      const w = 1 - smoothstep(place.plot.r, place.plot.r + 9, d)
      if (w > 0) h = lerp(h, place.y, w)
    }
    return h
  }

  // --- Roads ----------------------------------------------------------------
  const routes = locations.filter((l) => l.road.length)
  const roadWaypoints = [
    [[hx + 7.4, hz], [home.start.x, home.start.z], ...home.road],
    ...routes.map((l) => [...l.road, [l.pad.x, l.pad.z]]),
  ]
  const roads = roadWaypoints.map((waypoints) => densePath(waypoints))

  for (const path of roads) {
    for (const p of path) p.y = Math.max(plotHeight(p.x, p.z), waterLevel + 0.7)
    // Smooth the profile so the road rises and falls gently.
    for (let pass = 0; pass < 6; pass++) {
      const ys = path.map((p) => p.y)
      for (let i = 1; i < path.length - 1; i++) path[i].y = (ys[i - 1] + ys[i] * 2 + ys[i + 1]) / 4
    }
  }

  const roadInfo = (x, z) => {
    const best = { d2: Infinity, y: 0 }
    for (const path of roads) nearestOnPath(path, x, z, best)
    return { distance: Math.sqrt(best.d2), y: best.y }
  }
  const roadDistance = (x, z) => roadInfo(x, z).distance

  const half = roadWidth / 2
  const finalHeight = (x, z) => {
    const h = plotHeight(x, z)
    const road = roadInfo(x, z)
    const w = 1 - smoothstep(half + 1, half + 7, road.distance)
    return w > 0 ? lerp(h, road.y, w) : h
  }

  // --- Terrain grid ---------------------------------------------------------
  const { size, segments } = WORLD
  const cell = size / segments
  const stride = segments + 1
  const heights = new Float32Array(stride * stride)
  for (let iz = 0; iz <= segments; iz++) {
    for (let ix = 0; ix <= segments; ix++) {
      heights[iz * stride + ix] = finalHeight(ix * cell - size / 2, iz * cell - size / 2)
    }
  }

  /** Height of the terrain mesh at any point (matches its triangles exactly). */
  const heightAt = (x, z) => {
    const gx = clamp((x + size / 2) / cell, 0, segments - 1e-4)
    const gz = clamp((z + size / 2) / cell, 0, segments - 1e-4)
    const ix = Math.floor(gx)
    const iz = Math.floor(gz)
    const fx = gx - ix
    const fz = gz - iz
    const h00 = heights[iz * stride + ix]
    const h10 = heights[iz * stride + ix + 1]
    const h01 = heights[(iz + 1) * stride + ix]
    const h11 = heights[(iz + 1) * stride + ix + 1]
    return fx + fz <= 1 ? h00 + (h10 - h00) * fx + (h01 - h00) * fz : h11 + (h01 - h11) * (1 - fx) + (h10 - h11) * (1 - fz)
  }

  for (const place of places) place.y = heightAt(place.x, place.z)
  for (const location of locations) location.pad.y = heightAt(location.pad.x, location.pad.z)

  // A signpost a short way along each location's road, on the verge, so it is
  // clear at a junction which way leads where.
  const signposts = routes.map((location, index) => {
    const path = roads[index + 1]
    const i = Math.min(path.length - 2, 11)
    const dx = path[i + 1].x - path[i].x
    const dz = path[i + 1].z - path[i].z
    const length = Math.hypot(dx, dz) || 1
    const x = path[i].x + (dz / length) * (half + 1.6)
    const z = path[i].z - (dx / length) * (half + 1.6)
    return { slug: location.slug, title: location.title, x, y: heightAt(x, z), z }
  })

  // --- Colliders ------------------------------------------------------------
  const colliders = []
  for (const place of places) {
    for (const c of place.data.colliders) {
      colliders.push(
        c.r
          ? { x: place.x + c.x, z: place.z + c.z, r: c.r }
          : { x: place.x + c.x, z: place.z + c.z, hw: c.w / 2, hd: c.d / 2 }
      )
    }
  }

  // --- Scenery --------------------------------------------------------------
  const random = mulberry32(20211)
  const nearPlot = (x, z, margin) => places.some((p) => Math.hypot(x - p.plot.x, z - p.plot.z) < p.plot.r + margin)
  const scatter = (count, attempts, accept) => {
    const out = []
    for (let i = 0; i < attempts && out.length < count; i++) {
      const angle = random() * Math.PI * 2
      const radius = Math.sqrt(random()) * 150
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      const y = heightAt(x, z)
      const item = accept(x, z, y)
      if (item) out.push({ x, y, z, scale: 0.75 + random() * 0.7, turn: random() * Math.PI * 2, ...item })
    }
    return out
  }

  const trees = scatter(230, 2600, (x, z, y) => {
    if (y < waterLevel + 0.9 || y > 21) return null
    if (roadDistance(x, z) < half + 6 || nearPlot(x, z, 4)) return null
    // Cluster the pines into patches of forest.
    if (fbm(x * 0.035 + 7, z * 0.035 + 21) < 0.5 + random() * 0.08) return null
    return {}
  })
  const rocks = scatter(70, 900, (x, z, y) => {
    if (y < waterLevel - 0.4) return null
    if (roadDistance(x, z) < half + 2.5 || nearPlot(x, z, 1)) return null
    return {}
  })
  const heather = scatter(420, 4000, (x, z, y) => {
    if (y < waterLevel + 0.6 || y > 26) return null
    if (roadDistance(x, z) < half + 1 || nearPlot(x, z, -2)) return null
    if (fbm(x * 0.05 + 100, z * 0.05 + 60) < 0.52) return null
    return {}
  })
  const sheep = scatter(16, 900, (x, z, y) => {
    if (Math.hypot(x, z) > 88 || y < waterLevel + 1) return null
    if (roadDistance(x, z) < half + 5 || nearPlot(x, z, 3)) return null
    if (trees.some((t) => Math.hypot(t.x - x, t.z - z) < 4)) return null
    return {}
  })

  for (const post of signposts) colliders.push({ x: post.x, z: post.z, r: 0.3 })
  for (const tree of trees) colliders.push({ x: tree.x, z: tree.z, r: 0.55 * tree.scale })
  for (const rock of rocks) colliders.push({ x: rock.x, z: rock.z, r: 0.8 * rock.scale })
  for (const animal of sheep) colliders.push({ x: animal.x, z: animal.z, r: 0.9 })

  return {
    home,
    locations,
    roads,
    signposts,
    heights,
    heightAt,
    roadDistance,
    colliders,
    scenery: { trees, rocks, heather, sheep },
  }
}
