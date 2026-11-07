import Image from 'next/image'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categories, formatDate, type Post } from '@/lib/posts'
import { SfxLink } from '@/components/sfx-link'

export function CategoryBadge({ category }: { category: Post['category'] }) {
  const meta = categories[category]
  return (
    <span
      className="px-border inline-block px-2 py-1 font-display text-[9px] leading-none text-ink"
      style={{ backgroundColor: meta.color }}
    >
      {meta.label}
    </span>
  )
}

export function PostCard({ post, featured = false, index = 0 }: { post: Post; featured?: boolean; index?: number }) {
  return (
    <article
      className={cn('anim-rise h-full', featured && 'sm:col-span-2 lg:row-span-2')}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <SfxLink
        href={`/posts/${post.slug}`}
        className="parchment group flex h-full flex-col p-3 transition-transform duration-150 ease-[steps(3)] hover:-translate-y-1.5 focus-visible:-translate-y-1.5"
      >
        <div className={cn('relative overflow-hidden px-border', featured ? 'aspect-video lg:aspect-auto lg:min-h-64 lg:flex-1' : 'aspect-video')}>
          <Image
            src={post.cover || '/placeholder.svg'}
            alt=""
            fill
            sizes={featured ? '(min-width: 1024px) 66vw, 100vw' : '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            className="pixelated object-cover transition-transform duration-300 ease-[steps(4)] group-hover:scale-105"
          />
          <div className="absolute left-2 top-2">
            <CategoryBadge category={post.category} />
          </div>
          {featured && (
            <span className="anim-bob absolute right-2 top-2 bg-primary px-2 py-1 font-display text-[9px] leading-none text-ink px-border">Novo!</span>
          )}
        </div>

        <div className={cn('flex flex-col px-1 pb-1 pt-4', !featured && 'flex-1')}>
          <h3
            className={cn(
              'font-display leading-relaxed text-ink text-balance',
              featured ? 'text-sm md:text-base' : 'text-[11px] md:text-xs',
            )}
          >
            {post.title}
          </h3>
          <p className={cn('mt-3 flex-1 text-wood-dark text-pretty', featured ? 'text-2xl' : 'text-xl')}>{post.excerpt}</p>
          <div className="mt-4 flex items-center justify-between border-t-4 border-dashed border-parchment-dark pt-3 text-lg text-wood">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              {post.readingTime} min
            </span>
          </div>
          <span className="mt-3 font-display text-[10px] text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
            {'▶ Ler post'}
          </span>
        </div>
      </SfxLink>
    </article>
  )
}
