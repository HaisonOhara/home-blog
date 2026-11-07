import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Clock, Trophy } from 'lucide-react'
import { TopBar } from '@/components/hud/top-bar'
import { SiteFooter } from '@/components/hud/site-footer'
import { SfxLink } from '@/components/sfx-link'
import { CategoryBadge } from '@/components/home/post-card'
import { PostContent } from '@/components/post/post-content'
import { ReadingProgress } from '@/components/post/reading-progress'
import { formatDate, getAdjacentPosts, getAllPosts, getPost } from '@/lib/posts'
import { site } from '@/lib/site'

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.cover], type: 'article' },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()
  const { newer, older } = getAdjacentPosts(slug)

  return (
    <div className="night-sky min-h-dvh">
      <TopBar />
      <ReadingProgress />
      <main className="mx-auto max-w-3xl px-4 pt-6 sm:px-6">
        <SfxLink href="/home" sfx="back" className="btn-pixel btn-wood h-11 px-4 text-[10px]">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Voltar ao quadro
        </SfxLink>

        <article className="parchment anim-rise mt-8 p-4 md:p-8">
          <div className="relative aspect-video overflow-hidden px-border">
            <Image src={post.cover || '/placeholder.svg'} alt="" fill priority sizes="(min-width: 768px) 720px, 100vw" className="pixelated object-cover" />
          </div>

          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-4 text-xl text-wood">
              <CategoryBadge category={post.category} />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden="true" />
                {post.readingTime} min de leitura
              </span>
            </div>
            <h1 className="mt-5 font-display text-lg leading-relaxed text-ink text-balance md:text-2xl md:leading-relaxed">
              {post.title}
            </h1>
            <p className="mt-4 text-2xl text-wood-dark text-pretty md:text-[1.7rem]">{post.excerpt}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag} className="slot px-2 py-0.5 text-lg text-wood-dark">
                  #{tag}
                </li>
              ))}
            </ul>
          </header>

          <hr className="my-8 border-t-4 border-dashed border-parchment-dark" />

          <PostContent blocks={post.content} />

          <aside className="wood-panel mt-12 flex items-center gap-4 p-4">
            <Trophy className="anim-bob size-8 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-display text-[10px] text-primary">Missão concluída! +50 XP</p>
              <p className="mt-1 text-xl">
                Valeu por ler até aqui. {site.mascot} agradece com um café virtual.
              </p>
            </div>
          </aside>
        </article>

        <nav aria-label="Outros posts" className="mt-10 grid gap-6 sm:grid-cols-2">
          {older ? (
            <SfxLink href={`/posts/${older.slug}`} className="parchment group flex flex-col gap-2 p-4 transition-transform hover:-translate-y-1">
              <span className="flex items-center gap-2 font-display text-[9px] text-wood">
                <ArrowLeft className="size-3 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                Anterior
              </span>
              <span className="text-xl leading-tight text-ink">{older.title}</span>
            </SfxLink>
          ) : (
            <span aria-hidden="true" />
          )}
          {newer && (
            <SfxLink href={`/posts/${newer.slug}`} className="parchment group flex flex-col items-end gap-2 p-4 text-right transition-transform hover:-translate-y-1">
              <span className="flex items-center gap-2 font-display text-[9px] text-wood">
                Próximo
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
              <span className="text-xl leading-tight text-ink">{newer.title}</span>
            </SfxLink>
          )}
        </nav>
      </main>
      <SiteFooter />
    </div>
  )
}
