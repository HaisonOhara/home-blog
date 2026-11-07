'use client'

import { useMemo, useState } from 'react'
import { Code2, Cpu, Gamepad2, LayoutGrid, Leaf, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { categories, type Category, type Post } from '@/lib/posts'
import { playSfx } from '@/lib/sfx'
import { PostCard } from './post-card'

type Filter = 'todos' | Category

const filters: { id: Filter; label: string; icon: typeof Cpu }[] = [
  { id: 'todos', label: 'Todos', icon: LayoutGrid },
  { id: 'tech', label: categories.tech.label, icon: Cpu },
  { id: 'programacao', label: categories.programacao.label, icon: Code2 },
  { id: 'games', label: categories.games.label, icon: Gamepad2 },
  { id: 'diversos', label: categories.diversos.label, icon: Leaf },
]

export function PostsBoard({ posts }: { posts: Post[] }) {
  const [filter, setFilter] = useState<Filter>('todos')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((p) => {
      if (filter !== 'todos' && p.category !== filter) return false
      if (!q) return true
      return [p.title, p.excerpt, ...p.tags].some((t) => t.toLowerCase().includes(q))
    })
  }, [posts, filter, query])

  const showFeatured = filter === 'todos' && !query.trim()

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrar por categoria" className="flex flex-wrap gap-3 p-1">
          {filters.map(({ id, label, icon: Icon }) => {
            const active = filter === id
            const count = id === 'todos' ? posts.length : posts.filter((p) => p.category === id).length
            return (
              <button
                key={id}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  setFilter(id)
                  playSfx('move')
                }}
                className={cn('btn-pixel h-11 px-3 text-[10px]', active ? 'btn-leaf' : 'btn-wood')}
              >
                <Icon className="size-4" aria-hidden="true" />
                {label}
                <span className={cn('px-1 text-[8px]', active ? 'bg-ink text-primary' : 'bg-wood-dark')}>{count}</span>
              </button>
            )
          })}
        </div>

        <label className="parchment flex h-12 items-center gap-2 px-3 lg:w-72">
          <Search className="size-5 shrink-0 text-wood" aria-hidden="true" />
          <span className="sr-only">Buscar posts</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar Post..."
            className="w-full bg-transparent text-xl text-ink placeholder:text-wood/70 focus:outline-none"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? 'post encontrado' : 'posts encontrados'}
      </p>

      {visible.length > 0 ? (
        <div key={`${filter}-${query}`} className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} featured={showFeatured && i === 0} />
          ))}
        </div>
      ) : (
        <div className="parchment anim-pop mx-auto mt-10 max-w-md p-8 text-center">
          <p className="font-display text-xs text-ink">Nenhuma missão encontrada</p>
          <p className="mt-3 text-xl text-wood">Tente outra palavra ou categoria.</p>
          <button
            type="button"
            onClick={() => {
              setFilter('todos')
              setQuery('')
              playSfx('back')
            }}
            className="btn-pixel mt-6 h-11 px-4 text-[10px]"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
