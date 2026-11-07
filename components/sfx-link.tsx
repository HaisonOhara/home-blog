'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'
import { playSfx, type SfxName } from '@/lib/sfx'

type SfxLinkProps = ComponentProps<typeof Link> & { sfx?: SfxName }

export function SfxLink({ sfx = 'select', onClick, ...props }: SfxLinkProps) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        playSfx(sfx)
        onClick?.(e)
      }}
    />
  )
}
