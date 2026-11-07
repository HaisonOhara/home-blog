'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'
import { playSfx } from '@/lib/sfx'

export function Inventory() {
  const [active, setActive] = useState<number | null>(null)
  const current = active === null ? null : site.inventory[active]

  return (
    <section aria-labelledby="inventory-title" className="wood-panel p-5 md:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="inventory-title" className="font-display text-sm text-primary text-outline">
          Inventário
        </h2>
        <p className="text-xl text-foreground/80" aria-live="polite">
          {current ? current.name : 'Passe o mouse ou foque em um item'}
        </p>
      </div>
      <ul className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-10 sm:gap-3">
        {site.inventory.map((item, i) => (
          <li key={item.short}>
            <button
              type="button"
              aria-label={item.name}
              onMouseEnter={() => {
                setActive(i)
                playSfx('move')
              }}
              onFocus={() => setActive(i)}
              onClick={() => {
                setActive(i)
                playSfx('select')
              }}
              className={cn(
                'slot grid aspect-square w-full place-items-center font-display text-[10px] text-ink transition-transform duration-100 ease-[steps(2)] hover:-translate-y-1',
                active === i && '-translate-y-1 outline-4 outline-primary',
              )}
            >
              {item.short}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
