'use client'

import { useEffect, useState } from 'react'
import { HeroScreen } from './sections/HeroScreen'
import { NeuroPlanetScreen } from './sections/NeuroPlanetScreen'
import { ProjectsScreen } from './sections/ProjectsScreen'
import { GalleryScreen } from './sections/GalleryScreen'
import { CasesScreen } from './sections/CasesScreen'
import { ExperienceScreen } from './sections/ExperienceScreen'
import { ContactButton } from './components/ContactButton'

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
        <span className="text-text-secondary text-xs tracking-[0.3em] uppercase">Foxampy</span>
      </div>
    </div>
  )
}

function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'experience', 'neuro', 'projects', 'gallery', 'cases']
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
    { id: 'experience', label: '02' },
    { id: 'neuro', label: '03' },
    { id: 'projects', label: '04' },
    { id: 'gallery', label: '05' },
    { id: 'cases', label: '06' },
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
          className={`w-8 h-8 flex items-center justify-center text-[10px] font-mono transition-all duration-300 border ${
            activeSection === item.id
              ? 'bg-text-primary text-bg-primary border-text-primary' 
              : 'bg-transparent text-text-tertiary border-border-subtle hover:border-border-hover hover:text-text-secondary'
          }`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  )
}

// Noise overlay component
function NoiseOverlay() {
  return <div className="noise-overlay" />
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

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
      <NoiseOverlay />
      <Navigation />
      <HeroScreen />
      <ExperienceScreen />
      <NeuroPlanetScreen />
      <ProjectsScreen />
      <GalleryScreen />
      <CasesScreen />
      <ContactButton />
    </main>
  )
}
