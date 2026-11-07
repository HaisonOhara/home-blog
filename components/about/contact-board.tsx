import { ExternalLink, Mail } from 'lucide-react'
import { site } from '@/lib/site'

export function ContactBoard() {
  return (
    <section aria-labelledby="contact-title" className="parchment p-6 text-center md:p-8">
      <h2 id="contact-title" className="font-display text-sm leading-relaxed text-ink">
        Bora conversar?
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-2xl text-wood-dark text-pretty">
        Projetos, ideias, convites para co-op ou só recomendar um jogo bom, só mandar uma mensagem :).
      </p>
      <ul className="mt-6 flex flex-wrap justify-center gap-4">
        {site.contacts.map((c) => {
          const external = c.href.startsWith('http')
          return (
            <li key={c.label}>
              <a
                href={c.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="btn-pixel h-12 px-5 text-[10px]"
              >
                {external ? <ExternalLink className="size-4" aria-hidden="true" /> : <Mail className="size-4" aria-hidden="true" />}
                {c.label}
                {external && <span className="sr-only">(abre em nova aba)</span>}
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
