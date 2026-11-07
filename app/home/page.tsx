import type { Metadata } from 'next'
import { TopBar } from '@/components/hud/top-bar'
import { SiteFooter } from '@/components/hud/site-footer'
import { DialogBox } from '@/components/home/dialog-box'
import { PostsBoard } from '@/components/home/posts-board'
import { AboutTeaser } from '@/components/home/about-teaser'
import { getAllPosts } from '@/lib/posts'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Início',
  description: 'Os posts mais recentes sobre tecnologia, programação, games e causos diversos.',
}

const greeting = [
  `Eaee pessoa do outro lado da tela, seja bem-vindo ao meu dump cerebral! Eu sou o ${site.mascot} uma representação do Haison no mundo digital.`,
  'Aqui eu escrevo sobre tecnologia, programação, games e o que mais aparecer na minha mente.',
  'Dá uma olhada nos posts abaixo :) E não se preocupe: Não vou te vender nenhum curso kkk',
]

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div className="night-sky min-h-dvh">
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 md:pt-14">
        <section aria-label="Boas-vindas">
          <DialogBox name={site.mascot} portrait="/images/mascot-portrait.png" lines={greeting} />
        </section>

        <section aria-labelledby="board-title" className="mt-20">
          <div className="mb-8 flex flex-col items-center text-center">
            <h2
              id="board-title"
              className="wood-panel px-6 py-4 font-display text-sm text-primary text-outline md:text-lg"
            >
              Quadro de Posts
            </h2>
            <p className="mt-5 text-2xl text-muted-foreground">Posts novos e antigos, é o dump cerebral né?!.</p>
          </div>
          <PostsBoard posts={posts} />
        </section>

        <div className="mt-24">
          <AboutTeaser />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
