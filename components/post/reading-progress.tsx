'use client'

import { useEffect, useRef, useState } from 'react'
import { playSfx } from '@/lib/sfx'

const SEGMENTS = 20

export function ReadingProgress() {
  const [filled, setFilled] = useState(0)
  const celebrated = useRef(false)

  useEffect(() => {
    function update() {
      const el = document.documentElement
      const max = el.scrollHeight - el.clientHeight
      const ratio = max > 0 ? Math.min(1, el.scrollTop / max) : 0
      const next = Math.round(ratio * SEGMENTS)
      setFilled(next)
      if (next === SEGMENTS && !celebrated.current) {
        celebrated.current = true
        playSfx('coin')
      }
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const percent = Math.round((filled / SEGMENTS) * 100)

  return (
    <div className="sticky top-[88px] z-40 mx-auto mt-3 max-w-6xl px-3 sm:px-6">
      <div
        role="progressbar"
        aria-label="Progresso de leitura"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="ml-auto flex w-full max-w-xs items-center gap-2 bg-ink/90 px-2 py-1.5 px-border"
      >
        <span className="font-display text-[8px] text-primary">XP</span>
        <div className="flex flex-1 gap-0.5">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <span key={i} className={i < filled ? 'h-2.5 flex-1 bg-accent' : 'h-2.5 flex-1 bg-muted'} />
          ))}
        </div>
        <span className="w-9 text-right font-display text-[8px] text-foreground">{percent}%</span>
      </div>
    </div>
  )
}
