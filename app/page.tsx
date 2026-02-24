'use client'

import { useEffect, useState } from 'react'
import { HeroScreen } from './sections/HeroScreen'
import { NeuroPlanetScreen } from './sections/NeuroPlanetScreen'
import { ProjectsScreen } from './sections/ProjectsScreen'
import { GalleryScreen } from './sections/GalleryScreen'
import { CasesScreen } from './sections/CasesScreen'

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div 
              key={i}
              className="loading-pixel"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <span className="text-text-secondary text-xs tracking-widest">FOXAMPY</span>
      </div>
    </div>
  )
}

function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'neuro', 'projects', 'gallery', 'cases']
      const scrollPos = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const { offsetTop, offsetHeight } = el
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'hero', label: '01' },
    { id: 'neuro', label: '02' },
    { id: 'projects', label: '03' },
    { id: 'gallery', label: '04' },
    { id: 'cases', label: '05' },
  ]

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-mono transition-all duration-300 ${
            activeSection === item.id
              ? 'bg-accent-cyan text-bg-primary'
              : 'bg-white/5 text-text-secondary hover:bg-white/10'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Защитный таймаут - показываем контент через 2 секунды в любом случае
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Пытаемся загрузить данные
    Promise.all([
      fetch('/data/pixel-portrait-1.json').then(r => r.json()).catch(() => null),
      fetch('/data/pixel-portrait-2.json').then(r => r.json()).catch(() => null)
    ]).then(() => {
      clearTimeout(timeoutId)
      setIsLoading(false)
    })

    return () => clearTimeout(timeoutId)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <main className="relative">
      <Navigation />
      <HeroScreen />
      <NeuroPlanetScreen />
      <ProjectsScreen />
      <GalleryScreen />
      <CasesScreen />
    </main>
  )
}
