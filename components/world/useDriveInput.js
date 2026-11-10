'use client'

import { useEffect, useRef } from 'react'

const KEY_BINDINGS = {
  ArrowUp: 'up',
  KeyW: 'up',
  ArrowDown: 'down',
  KeyS: 'down',
  ArrowLeft: 'left',
  KeyA: 'left',
  ArrowRight: 'right',
  KeyD: 'right',
}

const isTyping = (target) =>
  target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))

/**
 * Tracks which driving controls are held. Arrow keys and WASD are bound here;
 * the on-screen touch buttons write to the same object through `set`.
 * Returns a ref of { up, down, left, right } booleans that the car reads every
 * frame, so holding a key never causes a React re-render.
 */
export function useDriveInput({ onDrive, onReset } = {}) {
  const input = useRef({ up: false, down: false, left: false, right: false })
  const handlers = useRef({ onDrive, onReset })
  useEffect(() => {
    handlers.current = { onDrive, onReset }
  })

  useEffect(() => {
    const held = input.current
    const release = () => {
      held.up = held.down = held.left = held.right = false
    }
    const onKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey || isTyping(event.target)) return
      const control = KEY_BINDINGS[event.code]
      if (control) {
        // Stop the arrow keys scrolling the page while they are driving the car.
        event.preventDefault()
        if (!held[control]) {
          held[control] = true
          handlers.current.onDrive?.()
        }
      } else if (event.code === 'KeyR' && !event.repeat) {
        handlers.current.onReset?.()
      }
    }
    const onKeyUp = (event) => {
      const control = KEY_BINDINGS[event.code]
      if (control) held[control] = false
    }
    const onVisibility = () => {
      if (document.hidden) release()
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', release)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', release)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const set = (control, value) => {
    if (value && !input.current[control]) handlers.current.onDrive?.()
    input.current[control] = value
  }

  return { input, set }
}
