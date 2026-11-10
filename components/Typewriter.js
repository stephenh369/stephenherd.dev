'use client'

import { useEffect, useState } from 'react'

const TYPE_MS = 110
const HOLD_MS = 2000

/**
 * Types each phrase in turn after a fixed prefix. Screen readers get the whole
 * sentence once instead of a stream of single letters, and visitors who prefer
 * reduced motion see the phrases without animation.
 */
export default function Typewriter({ prefix, phrases = [], className = '' }) {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [length, setLength] = useState(0)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const phrase = phrases[phraseIndex] ?? ''

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) return
    const typing = length < phrase.length
    const timer = setTimeout(
      () => {
        if (typing) {
          setLength(length + 1)
        } else {
          setPhraseIndex((phraseIndex + 1) % phrases.length)
          setLength(0)
        }
      },
      typing ? TYPE_MS : HOLD_MS
    )
    return () => clearTimeout(timer)
  }, [reducedMotion, phrases.length, phrase, phraseIndex, length])

  if (phrases.length === 0) return null

  const cleaned = phrases.map((item) => item.replace(/\.$/, ''))
  const sentence = `${prefix} ${
    cleaned.length > 1 ? `${cleaned.slice(0, -1).join(', ')} and ${cleaned.at(-1)}` : cleaned[0]
  }.`

  return (
    <p className={className}>
      <span className="sr-only">{sentence}</span>
      <span aria-hidden="true">
        {prefix}{' '}
        {reducedMotion ? (
          <span className="text-green-500">{sentence.slice(prefix.length + 1)}</span>
        ) : (
          <>
            <span className="text-green-500">{phrase.slice(0, length)}</span>
            <span className="animate-cursor text-green-500">|</span>
          </>
        )}
      </span>
    </p>
  )
}
