import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { site } from '@/lib/site'

export function CharacterSheet() {
  return (
    <section aria-labelledby="sheet-title" className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <div className="anim-rise flex flex-col gap-4">
        <div className="wood-panel p-3">
          <div className="anim-bob">
            <Image
              src="/images/mascot-portrait.png"
              alt={`Retrato de ${site.author} em pixel art, de óculos e camisa xadrez`}
              width={480}
              height={480}
              priority
              className="pixelated h-auto w-full"
            />
          </div>
        </div>
        <div className="wood-panel flex items-center justify-between px-4 py-3">
          <span className="font-display text-[10px] text-primary">{'Lv. '}{site.level}</span>
          <span className="font-display text-[10px] text-[#ffe58a]">{site.mascot}</span>
        </div>
      </div>

      <div className="parchment anim-rise p-6 md:p-8" style={{ animationDelay: '120ms' }}>
        <p className="font-display text-[10px] text-wood">Ficha do personagem</p>
        <h1 id="sheet-title" className="mt-4 font-display text-xl leading-relaxed text-ink md:text-2xl">
          {site.realName}({site.author})
        </h1>
        <p className="mt-2 text-2xl text-wood-dark">{site.role}</p>
        <p className="mt-1 flex items-center gap-2 text-xl text-wood">
          <MapPin className="size-4" aria-hidden="true" />
          {site.location}
        </p>

        <div className="mt-6 flex flex-col gap-4 text-2xl leading-relaxed text-ink">
          {site.bio.map((paragraph) => (
            <p key={paragraph} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </div>

        <h2 className="mt-8 font-display text-[11px] text-wood-dark">Atributos</h2>
        <dl className="mt-4 flex flex-col gap-3">
          {site.stats.map((stat, i) => (
            <div key={stat.label} className="grid grid-cols-[7.5rem_minmax(0,1fr)_3rem] items-center gap-3">
              <dt className="text-xl text-ink">{stat.label}</dt>
              <dd className="px-border h-5 bg-parchment-dark p-0.5">
                <div
                  className="h-full"
                  style={{
                    width: `${stat.value}%`,
                    backgroundColor: stat.color,
                    animation: `fill-bar 0.9s steps(10) ${0.3 + i * 0.12}s both`,
                  }}
                />
                <span className="sr-only">{stat.value} de 100</span>
              </dd>
              <span className="text-right font-display text-[9px] text-wood" aria-hidden="true">
                {stat.value}
              </span>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
