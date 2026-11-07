import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
import { site } from '@/lib/site'
import './globals.css'

const press = Press_Start_2P({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-press',
  display: 'swap',
})

const vt323 = VT323({
  weight: '400',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-vt323',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} — devlog de tecnologia, programação e games`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  generator: 'v0.app',
  openGraph: {
    title: site.name,
    description: site.description,
    images: ['/images/title-bg.png'],
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#221e3d',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${press.variable} ${vt323.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
