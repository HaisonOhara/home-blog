import type { Block } from '@/lib/posts'

export function PostContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6 text-2xl leading-relaxed text-ink md:text-[1.6rem]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} className="mt-6 flex items-center gap-3 font-display text-sm leading-relaxed text-wood-dark md:text-base">
                <span className="size-3 shrink-0 bg-accent px-border" aria-hidden="true" />
                {block.text}
              </h2>
            )
          case 'quote':
            return (
              <blockquote key={i} className="slot px-6 py-4 text-wood-dark">
                <p>{block.text}</p>
              </blockquote>
            )
          case 'code':
            return (
              <figure key={i} className="px-border overflow-hidden bg-night">
                <figcaption className="flex items-center justify-between bg-ink px-4 py-2 font-display text-[9px] uppercase text-primary">
                  <span>{block.lang ?? 'code'}</span>
                  <span className="flex gap-1.5" aria-hidden="true">
                    <span className="size-2 bg-berry" />
                    <span className="size-2 bg-primary" />
                    <span className="size-2 bg-accent" />
                  </span>
                </figcaption>
                <pre className="overflow-x-auto p-4 text-xl leading-snug text-[#c9f2a8]">
                  <code>{block.text}</code>
                </pre>
              </figure>
            )
          case 'list':
            return (
              <ul key={i} className="flex flex-col gap-2">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-[0.55em] size-2.5 shrink-0 bg-primary px-border" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )
          default:
            return (
              <p key={i} className="text-pretty">
                {block.text}
              </p>
            )
        }
      })}
    </div>
  )
}
