/**
 * Data about each kind of building that the world layout needs without
 * touching any 3D code: how far in front of the building its parking spot
 * sits, and the solid shapes the car cannot drive through.
 *
 * Everything is relative to the building's position, with the building facing
 * south (+z), towards the camera. Colliders are either boxes
 * ({ x, z, w, d } - centre, width, depth) or circles ({ x, z, r }).
 *
 * To add a new kind of building: add an entry here, add a matching component
 * in Buildings.js, then use its key as `location.building` in a content file.
 */
export const BUILDING_DATA = {
  home: {
    parking: null,
    colliders: [
      { x: -3, z: 0, w: 8, d: 6 },
      { x: 4.2, z: 0, w: 6.4, d: 6.6 },
    ],
    labelHeight: 8,
  },
  cottage: {
    parking: 8.5,
    colliders: [{ x: 0, z: 0, w: 8, d: 6 }],
    labelHeight: 8,
  },
  lighthouse: {
    parking: 8.5,
    colliders: [
      { x: 0, z: 0, r: 2.9 },
      { x: -6.2, z: 0.6, w: 4.4, d: 3.8 },
    ],
    labelHeight: 17,
  },
  workshop: {
    parking: 10,
    colliders: [
      { x: 0, z: 0, w: 10.4, d: 8.4 },
      { x: 6.6, z: 3.2, r: 1.3 },
    ],
    labelHeight: 10,
  },
  castle: {
    parking: 11,
    colliders: [
      { x: 0, z: 0, w: 9.4, d: 9.4 },
      { x: 5, z: 4.6, r: 2.6 },
      { x: -5, z: -4.6, r: 2.2 },
    ],
    labelHeight: 18,
  },
  postOffice: {
    parking: 9,
    colliders: [
      { x: 0, z: 0, w: 9.4, d: 6.4 },
      { x: 6.2, z: 4.4, r: 0.7 },
      { x: -6.4, z: 4.2, r: 0.9 },
    ],
    labelHeight: 8.5,
  },
}

export function buildingData(kind) {
  return BUILDING_DATA[kind] ?? BUILDING_DATA.cottage
}

export function buildingKind(kind) {
  return BUILDING_DATA[kind] ? kind : 'cottage'
}
