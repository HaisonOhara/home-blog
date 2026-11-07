import { site } from '@/lib/site'

export function QuestLog() {
  return (
    <section aria-labelledby="quests-title">
      <h2 id="quests-title" className="wood-panel inline-block px-5 py-3 font-display text-sm text-primary text-outline">
        Log de Missões
      </h2>
      <ol className="mt-8 flex flex-col gap-6 border-l-4 border-dashed border-wood-light pl-6 md:pl-8">
        {site.quests.map((quest, i) => (
          <li key={quest.title} className="anim-rise relative" style={{ animationDelay: `${i * 100}ms` }}>
            <span
              aria-hidden="true"
              className="px-border absolute -left-[38px] top-5 size-4 bg-primary md:-left-[46px]"
            />
            <article className="parchment p-5">
              <p className="font-display text-[9px] text-wood">{quest.period}</p>
              <h3 className="mt-3 font-display text-xs leading-relaxed text-ink">{quest.title}</h3>
              <p className="mt-1 text-xl text-wood-dark">{quest.place}</p>
              <p className="mt-3 text-2xl text-ink text-pretty">{quest.text}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  )
}
