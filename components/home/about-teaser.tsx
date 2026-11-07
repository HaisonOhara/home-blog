import Image from 'next/image'
import { ScrollText } from 'lucide-react'
import { site } from '@/lib/site'
import { SfxLink } from '@/components/sfx-link'

export function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser-title" className="wood-panel grid gap-6 p-4 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:p-6">
      <div className="relative aspect-video overflow-hidden px-border">
        <Image
          src="/images/mascot-room.png"
          alt={`${site.mascot} programando em sua cabana aconchegante`}
          fill
          sizes="(min-width: 768px) 40vw, 100vw"
          className="pixelated object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-display text-[10px] text-[#ffe58a]">{'Lv. '}{site.level} {'•'} {site.role}</p>
        <h2 id="about-teaser-title" className="mt-3 font-display text-base leading-relaxed text-primary text-outline md:text-lg">
          Quem escreve por aqui?
        </h2>
        <p className="mt-3 text-2xl text-pretty">
          {'Sou o '}
          {site.author}
          {',ou Haison Ohara como me chamam no mundo real, um dev que ama tecnlogia, programação e games. Confira minha ficha completa de personagem.'}
        </p>
        <SfxLink href="/sobre" className="btn-pixel mt-6 h-12 self-start px-5 text-[10px]">
          <ScrollText className="size-4" aria-hidden="true" />
          Ver ficha do personagem
        </SfxLink>
      </div>
    </section>
  )
}
