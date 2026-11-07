import { site } from '@/lib/site'

export function GameTitle() {
  const letters = Array.from(site.name)

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="title-text font-display text-[clamp(1.75rem,7.5vw,4.5rem)] leading-none" aria-label={site.name}>
        {letters.map((char, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block"
            style={{ animation: `title-drop 0.7s steps(7) ${0.25 + i * 0.07}s both` }}
          >
            <span
              className="inline-block"
              style={{ animation: `letter-wave 2.8s steps(4) ${1.6 + i * 0.12}s infinite` }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </h1>
      <p
        className="anim-pop mt-8 font-display text-[clamp(0.6rem,2vw,1rem)] uppercase tracking-wider text-[#ffe58a] text-outline"
        style={{ animationDelay: '1.3s' }}
      >
        {site.tagline}
      </p>
      <p
        className="anim-pop mt-3 font-display text-[clamp(0.55rem,1.6vw,0.8rem)] text-berry text-outline"
        style={{ animationDelay: '1.5s' }}
      >
        {'By Haison Ohara'}
      </p>
    </div>
  )
}
