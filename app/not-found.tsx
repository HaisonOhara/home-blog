import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="night-sky grid min-h-dvh place-items-center px-4">
      <div className="parchment anim-pop max-w-md p-8 text-center">
        <p className="font-display text-3xl text-berry">404</p>
        <h1 className="mt-4 font-display text-sm leading-relaxed text-ink">Game Over?</h1>
        <p className="mt-3 text-2xl text-wood-dark">Essa área do mapa ainda não foi desbloqueada.</p>
        <Link href="/home" className="btn-pixel mt-6 h-12 px-5 text-[10px]">
          Continuar
        </Link>
      </div>
    </main>
  )
}
