'use client'

import { useSyncExternalStore } from 'react'

/**
 * Which version of the home page a visitor sees: the drivable 3D world or the
 * plain "simple view". The choice is remembered in localStorage; without a
 * stored choice it follows the visitor's reduced-motion setting.
 *
 * The same decision is made by a tiny inline script in app/layout.js before
 * first paint (so the wrong view never flashes), which is why the logic is
 * also exported as a string.
 */
const STORAGE_KEY = 'sh:view'
const EVENT = 'sh:viewchange'

export const VIEW_INIT_SCRIPT = `(function(){try{var v=localStorage.getItem('${STORAGE_KEY}');if(v!=='3d'&&v!=='simple'){v=window.matchMedia('(prefers-reduced-motion: reduce)').matches?'simple':'3d'}document.documentElement.dataset.view=v}catch(e){document.documentElement.dataset.view='3d'}})()`

function subscribe(callback) {
  window.addEventListener(EVENT, callback)
  return () => window.removeEventListener(EVENT, callback)
}

function getSnapshot() {
  return document.documentElement.dataset.view === 'simple' ? 'simple' : '3d'
}

/** `'pending'` on the server and during hydration, then `'3d'` or `'simple'`. */
export function useViewPreference() {
  return useSyncExternalStore(subscribe, getSnapshot, () => 'pending')
}

export function setViewPreference(view, { remember = true } = {}) {
  document.documentElement.dataset.view = view
  if (remember) {
    try {
      localStorage.setItem(STORAGE_KEY, view)
    } catch {
      // Storage can be unavailable (private mode); the choice then lasts for this visit.
    }
  }
  window.dispatchEvent(new Event(EVENT))
}
