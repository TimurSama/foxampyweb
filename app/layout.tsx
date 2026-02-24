import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Foxampy | Timur Cadik - Creative Innovator',
  description: 'Создаю устойчивые системы на пересечении бизнеса, дизайна и технологий',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="antialiased">{children}</body>
    </html>
  )
}
