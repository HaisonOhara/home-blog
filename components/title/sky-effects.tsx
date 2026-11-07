import { seededRandom, round } from '@/lib/pixel-random'

const rand = seededRandom(7)

const stars = Array.from({ length: 26 }, () => ({
  left: round(rand() * 100),
  top: round(rand() * 38),
  size: rand() > 0.75 ? 6 : 4,
  duration: round(1.6 + rand() * 2.4),
  delay: round(rand() * 3),
}))

const fireflies = Array.from({ length: 16 }, () => ({
  left: round(rand() * 100),
  top: round(60 + rand() * 32),
  duration: round(4 + rand() * 4),
  delay: round(rand() * 5),
}))

const clouds = [
  { top: 14, duration: 70, delay: -10, scale: 1 },
  { top: 26, duration: 95, delay: -50, scale: 0.7 },
  { top: 8, duration: 120, delay: -85, scale: 1.3 },
]

export function SkyEffects() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {clouds.map((c, i) => (
        <div
          key={`cloud-${i}`}
          className="absolute left-0"
          style={{
            top: `${c.top}%`,
            animation: `drift ${c.duration}s linear ${c.delay}s infinite`,
          }}
        >
          <div className="px-cloud" style={{ transform: `scale(${c.scale})` }} />
        </div>
      ))}

      {stars.map((s, i) => (
        <span
          key={`star-${i}`}
          className="absolute bg-[#fff4d6]"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.duration}s steps(3) ${s.delay}s infinite`,
          }}
        />
      ))}

      {fireflies.map((f, i) => (
        <span
          key={`fly-${i}`}
          className="absolute size-1.5 bg-[#f7e36b] shadow-[0_0_8px_3px_rgba(247,227,107,0.65)]"
          style={{
            left: `${f.left}%`,
            top: `${f.top}%`,
            animation: `firefly ${f.duration}s steps(12) ${f.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
