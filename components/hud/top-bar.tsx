'use client'

import { usePathname } from 'next/navigation'
import { Gamepad2, House, ScrollText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { site } from '@/lib/site'
import { SfxLink } from '@/components/sfx-link'
import { SoundToggle } from '@/components/sound-toggle'

const links = [
  { href: '/home', label: 'Início', icon: House },
  { href: '/sobre', label: 'Sobre', icon: ScrollText },
  { href: '/', label: 'Menu', icon: Gamepad2 },
]

export function TopBar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-6">
      <div className="wood-panel mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-3 sm:px-5">
        <SfxLink href="/home" className="group flex items-center gap-3" aria-label={`${site.name} — página inicial`}>
          <span className="slot grid size-9 place-items-center font-display text-[10px] text-ink transition-transform group-hover:-rotate-6">
            M&B
          </span>
          <span className="hidden font-display text-xs leading-none text-primary text-outline sm:block">
            {site.name}
          </span>
        </SfxLink>

        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-2 sm:gap-3">
            {links.map(({ href, label, icon: Icon }) => {
              const active = href === '/home' ? pathname === '/home' || pathname.startsWith('/posts') : pathname === href
              return (
                <li key={href}>
                  <SfxLink
                    href={href}
                    sfx={href === '/' ? 'back' : 'select'}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'btn-pixel h-11 px-3 text-[10px] sm:px-4',
                      active ? '' : 'btn-wood',
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <span className="hidden md:inline">{label}</span>
                    <span className="sr-only md:hidden">{label}</span>
                  </SfxLink>
                </li>
              )
            })}
            <li>
              <SoundToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
