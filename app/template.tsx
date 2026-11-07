import { seededRandom, round } from '@/lib/pixel-random'

const COLS = 12
const ROWS = 8
const rand = seededRandom(42)
const delays = Array.from({ length: COLS * ROWS }, () => round(rand() * 0.45))

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[100] grid"
        style={{ gridTemplateColumns: `repeat(${COLS}, 1fr)`, gridTemplateRows: `repeat(${ROWS}, 1fr)` }}
      >
        {delays.map((delay, i) => (
          <span
            key={i}
            className="bg-night"
            style={{ animation: `pixel-out 1ms ${delay}s forwards` }}
          />
        ))}
      </div>
    </>
  )
}
