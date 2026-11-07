import type { Metadata } from 'next'
import { TopBar } from '@/components/hud/top-bar'
import { SiteFooter } from '@/components/hud/site-footer'
import { CharacterSheet } from '@/components/about/character-sheet'
import { Inventory } from '@/components/about/inventory'
import { QuestLog } from '@/components/about/quest-log'
import { ContactBoard } from '@/components/about/contact-board'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Sobre mim',
  description: `Conheça ${site.author}, ${site.role.toLowerCase()} — atributos, inventário de tecnologias e log de missões.`,
}

export default function AboutPage() {
  return (
    <div className="night-sky min-h-dvh">
      <TopBar />
      <main className="mx-auto flex max-w-6xl flex-col gap-20 px-4 pt-10 sm:px-6 md:pt-14">
        <CharacterSheet />
        <Inventory />
        <QuestLog />
        <ContactBoard />
      </main>
      <SiteFooter />
    </div>
  )
}
