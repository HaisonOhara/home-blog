import { site } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="mt-20">
      <div className="grass-strip" aria-hidden="true" />
      <div className="bg-wood-dark px-4 py-6 text-center">
        <p className="font-display text-[10px] leading-relaxed text-primary">
          {site.name} {'•'} 2026
        </p>
        <p className="mt-2 text-lg text-foreground/80">Feito com café, pixels, Código e algumas músicas de fundo.</p>
      </div>
    </footer>
  )
}
