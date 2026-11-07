'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { playSfx } from '@/lib/sfx'

interface DialogBoxProps {
  name: string
  portrait: string
  lines: string[]
}

export function DialogBox({ name, portrait, lines }: DialogBoxProps) {
  const [index, setIndex] = useState(0)
  const [count, setCount] = useState(0)
  const line = lines[index]
  const done = count >= line.length

  useEffect(() => {
    if (done) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(line.length)
      return
    }
    const id = window.setTimeout(() => {
      setCount((c) => c + 1)
      if (count % 4 === 0) playSfx('text')
    }, 26)
    return () => window.clearTimeout(id)
  }, [count, done, line.length])

  function advance() {
    if (!done) {
      setCount(line.length)
      return
    }
    playSfx('move')
    setIndex((i) => (i + 1) % lines.length)
    setCount(0)
  }

  return (
    <div className="anim-rise flex flex-col-reverse gap-6 md:flex-row md:items-stretch">
      <button
        type="button"
        onClick={advance}
        className="parchment relative flex-1 cursor-pointer px-6 py-5 text-left md:px-8 md:py-6"
        aria-label={done ? 'Próxima fala' : 'Mostrar fala completa'}
      >
        <p className="sr-only" aria-live="polite">
          {line}
        </p>
        <p aria-hidden="true" className="min-h-[5.5rem] text-2xl leading-snug md:text-[1.7rem]">
          {line.slice(0, count)}
          {!done && <span className="anim-blink">{'_'}</span>}
        </p>
        <div className="mt-3 flex items-center justify-between text-lg text-wood">
          <span>
            {index + 1}/{lines.length}
          </span>
          <span className={done ? 'anim-bob font-display text-xs text-ink' : 'invisible'} aria-hidden="true">
            {'▼'}
          </span>
        </div>
      </button>

      <div className="flex items-center gap-4 md:w-48 md:flex-col md:items-stretch md:gap-0">
        <div className="wood-panel p-2">
          <Image
            src={portrait || '/placeholder.svg'}
            alt={`Retrato de ${name}`}
            width={176}
            height={176}
            priority
            className="pixelated size-20 md:size-auto md:w-full"
          />
        </div>
        <p className="wood-panel px-3 py-2 text-center font-display text-[10px] text-primary md:mt-4">{name}</p>
      </div>
    </div>
  )
}
