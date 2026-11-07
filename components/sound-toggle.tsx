'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { playSfx, setMuted, useMuted } from '@/lib/sfx'

export function SoundToggle({ className }: { className?: string }) {
  const muted = useMuted()

  return (
    <button
      type="button"
      onClick={() => {
        setMuted(!muted)
        if (muted) playSfx('coin')
      }}
      aria-pressed={!muted}
      aria-label={muted ? 'Ativar efeitos sonoros' : 'Desativar efeitos sonoros'}
      title={muted ? 'Som desligado' : 'Som ligado'}
      className={cn('btn-pixel btn-wood size-11 shrink-0 text-xs', className)}
    >
      {muted ? <VolumeX className="size-5" aria-hidden="true" /> : <Volume2 className="size-5" aria-hidden="true" />}
    </button>
  )
}
