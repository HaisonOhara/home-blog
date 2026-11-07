import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'byte-folk-sfx-muted'
const listeners = new Set<() => void>()
let audioCtx: AudioContext | null = null

function isMuted() {
  if (typeof window === 'undefined') return true
  return window.localStorage.getItem(STORAGE_KEY) === '1'
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  window.addEventListener('storage', callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', callback)
  }
}

export function setMuted(muted: boolean) {
  window.localStorage.setItem(STORAGE_KEY, muted ? '1' : '0')
  listeners.forEach((listener) => listener())
}

export function useMuted() {
  return useSyncExternalStore(subscribe, isMuted, () => false)
}

function getCtx() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    audioCtx = new AC()
  }
  if (audioCtx.state === 'suspended') void audioCtx.resume()
  return audioCtx
}

function tone(freq: number, start: number, duration: number, type: OscillatorType = 'square', volume = 0.035) {
  const ctx = getCtx()
  if (!ctx) return
  const t = ctx.currentTime + start
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  gain.gain.setValueAtTime(volume, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(gain).connect(ctx.destination)
  osc.start(t)
  osc.stop(t + duration + 0.02)
}

const sounds = {
  move: () => tone(880, 0, 0.04),
  select: () => {
    tone(660, 0, 0.06)
    tone(990, 0.06, 0.1)
  },
  start: () => [523, 659, 784, 1047, 1319].forEach((f, i) => tone(f, i * 0.08, 0.14)),
  back: () => {
    tone(440, 0, 0.06)
    tone(294, 0.06, 0.1)
  },
  coin: () => {
    tone(988, 0, 0.06)
    tone(1319, 0.06, 0.22)
  },
  text: () => tone(1200, 0, 0.015, 'triangle', 0.02),
}

export type SfxName = keyof typeof sounds

export function playSfx(name: SfxName) {
  if (isMuted()) return
  try {
    sounds[name]()
  } catch {
    // Audio can be blocked by the browser; silently ignore.
  }
}
