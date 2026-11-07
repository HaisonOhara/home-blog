import Image from 'next/image'
import { site } from '@/lib/site'

export function MascotHint() {
  return (
    <div
      className="anim-rise pointer-events-none absolute bottom-4 left-4 z-10 hidden items-end gap-3 sm:flex"
      style={{ animationDelay: '2s' }}
    >
      <div className="anim-bob">
        <Image
          src="/images/mascot-portrait.png"
          alt={`${site.mascot}, o mascote programador`}
          width={88}
          height={88}
          className="pixelated px-border size-20 lg:size-22"
        />
      </div>
      <div className="parchment relative mb-6 max-w-52 px-3 py-2 text-lg leading-tight">
        <p className="font-display text-[9px] text-wood">{site.mascot}</p>
        <p className="mt-1">Psst... aperta START que eu te mostro meus posts!</p>
      </div>
    </div>
  )
}
