/** Deterministic pseudo-random sequence so server and client render identical decorations. */
export function seededRandom(seed: number) {
  let state = seed % 2147483647
  if (state <= 0) state += 2147483646
  return () => {
    state = (state * 16807) % 2147483647
    return (state - 1) / 2147483646
  }
}

export function round(value: number, digits = 2) {
  const f = 10 ** digits
  return Math.round(value * f) / f
}
