'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { playSfx } from '@/lib/sfx'
import { SoundToggle } from '@/components/sound-toggle'
import { GameTitle } from './game-title'
import { MascotHint } from './mascot-hint'
import { SkyEffects } from './sky-effects'

interface MenuOption {
  label: string
  href: string
  hint: string
}

export function TitleScreen({ latestPostHref }: { latestPostHref: string }) {
  const router = useRouter()
  const options: MenuOption[] = [
    { label: 'Start', href: '/home', hint: 'Explorar os posts' },
    { label: 'Sobre mim', href: '/sobre', hint: 'Ficha do personagem' },
    { label: 'Last Posts', href: latestPostHref, hint: 'Continuar de onde parou' },
  ]

  const [selected, setSelected] = useState(0)
  const [loadingLabel, setLoadingLabel] = useState<string | null>(null)

  useEffect(() => {
    options.forEach((o) => router.prefetch(o.href))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, latestPostHref])

  const choose = useCallback(
    (index: number) => {
      if (loadingLabel) return
      const option = options[index]
      setSelected(index)
      setLoadingLabel(option.label)
      playSfx(index === 0 ? 'start' : 'select')
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.setTimeout(() => router.push(option.href), reduce ? 100 : 1100)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loadingLabel, router, latestPostHref],
  )

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (loadingLabel) return
      const key = e.key.toLowerCase()
      if (key === 'arrowdown' || key === 's') {
        e.preventDefault()
        setSelected((s) => (s + 1) % options.length)
        playSfx('move')
      } else if (key === 'arrowup' || key === 'w') {
        e.preventDefault()
        setSelected((s) => (s - 1 + options.length) % options.length)
        playSfx('move')
      } else if (key === 'enter' && !(e.target instanceof HTMLButtonElement)) {
        e.preventDefault()
        choose(selected)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [choose, loadingLabel, options.length, selected])

  return (
    <main className="relative h-dvh min-h-[560px] w-full select-none overflow-hidden bg-night">
      <Image
        src="/images/title-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pixelated object-cover object-[60%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-night/30 via-transparent to-night/50" aria-hidden="true" />
      <SkyEffects />
      <div className="scanlines absolute inset-0" aria-hidden="true" />

      <div className="absolute right-4 top-4 z-20">
        <SoundToggle />
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-between px-4 pb-6 pt-[12vh]">
        <GameTitle />

        <nav aria-label="Menu principal" className="anim-pop flex flex-col items-center" style={{ animationDelay: '1.8s' }}>
          <ul className="flex flex-col items-center gap-5">
            {options.map((option, i) => {
              const isSelected = selected === i
              const isPrimary = i === 0
              return (
                <li key={option.label} className="relative flex items-center">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute -left-10 font-display text-lg text-primary text-outline',
                      isSelected ? 'anim-nudge visible' : 'invisible',
                    )}
                  >
                    {'▶'}
                  </span>
                  <button
                    type="button"
                    onMouseEnter={() => {
                      if (!isSelected) {
                        setSelected(i)
                        playSfx('move')
                      }
                    }}
                    onFocus={() => setSelected(i)}
                    onClick={() => choose(i)}
                    data-pressed={loadingLabel === option.label}
                    aria-describedby={`hint-${i}`}
                    className={cn(
                      'btn-pixel',
                      isPrimary ? 'h-16 min-w-56 px-10 text-xl sm:min-w-64 sm:text-2xl' : 'btn-wood h-11 min-w-48 px-5 text-[10px] sm:min-w-56 sm:text-xs',
                      isSelected && !isPrimary && 'btn-leaf',
                    )}
                  >
                    {isPrimary && <Play className="size-6 fill-current" aria-hidden="true" />}
                    {option.label}
                  </button>
                  <span id={`hint-${i}`} className="sr-only">
                    {option.hint}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-6 h-6 text-xl text-foreground text-outline" aria-live="polite">
            {options[selected].hint}
          </p>
        </nav>

        <p className="anim-blink font-display text-[9px] text-foreground/90 text-outline sm:text-[10px]">
          <span className="hidden sm:inline">{'↑ ↓ para escolher • ENTER para confirmar'}</span>
          <span className="sm:hidden">Toque para escolher</span>
        </p>
      </div>

      <MascotHint />

      {loadingLabel && <LoadingOverlay label={loadingLabel} />}
    </main>
  )
}

function LoadingOverlay({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 z-50" role="status" aria-live="assertive">
      <div className="absolute inset-0 bg-[#fff4d6]" style={{ animation: 'flash 0.35s steps(3) both' }} />
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-night"
        style={{ animation: 'rise-in 0.2s steps(2) 0.3s both' }}
      >
        <p className="font-display text-sm text-primary text-outline">{label}</p>
        <div className="px-border h-6 w-64 bg-muted p-1">
          <div className="h-full bg-accent" style={{ animation: 'load-bar 0.7s steps(10) 0.35s both' }} />
        </div>
        <p className="anim-blink font-display text-[10px] text-foreground">Carregando...</p>
      </div>
    </div>
  )
}
