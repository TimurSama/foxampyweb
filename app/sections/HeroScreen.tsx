'use client'

import { useEffect, useState } from 'react'
import { PixelCanvas } from '../components/PixelCanvas'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export function HeroScreen() {
  const [pixelData1, setPixelData1] = useState<any>(null)
  const [pixelData2, setPixelData2] = useState<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch('/data/pixel-portrait-1.json').then(r => r.json()),
      fetch('/data/pixel-portrait-2.json').then(r => r.json())
    ]).then(([data1, data2]) => {
      setPixelData1(data1)
      setPixelData2(data2)
      setTimeout(() => setIsLoaded(true), 100)
    })
  }, [])

  useGSAP(() => {
    if (!isLoaded) return

    const tl = gsap.timeline()

    // Top right image (portrait 2)
    tl.fromTo('.hero-img-top',
      { x: 100, y: -100, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0.3
    )

    // Bottom left image (portrait 1)
    tl.fromTo('.hero-img-bottom',
      { x: -100, y: 100, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0.5
    )

    // Main text
    tl.fromTo('.hero-foxampy',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      0.8
    )

    tl.fromTo('.hero-name',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      1.0
    )

    tl.fromTo('.hero-role',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      1.2
    )

    return () => { tl.kill() }
  }, [isLoaded])

  return (
    <section id="hero" className="min-h-screen w-full bg-bg-primary relative overflow-hidden flex items-center justify-center">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Top Right Image - теперь portrait 2, в 2 раза больше */}
      <div className="hero-img-top absolute top-4 right-4 md:top-8 md:right-8 lg:top-12 lg:right-12 z-10">
        <div className="relative">
          {pixelData2 && (
            <PixelCanvas 
              data={pixelData2} 
              pixelScale={4}
              className="opacity-80"
              monochrome
            />
          )}
        </div>
      </div>

      {/* Bottom Left Image - теперь portrait 1, в 2 раза больше */}
      <div className="hero-img-bottom absolute bottom-4 left-4 md:bottom-8 md:left-8 lg:bottom-12 lg:left-12 z-10">
        <div className="relative">
          {pixelData1 && (
            <PixelCanvas 
              data={pixelData1} 
              pixelScale={4}
              className="opacity-80"
              monochrome
            />
          )}
        </div>
      </div>

      {/* Center Text Content */}
      <div className="relative z-20 text-center px-4">
        <h1 className="hero-foxampy font-pixel text-sm md:text-base lg:text-lg tracking-[0.3em] text-text-secondary mb-4 md:mb-6">
          — FOXAMPY —
        </h1>
        
        <h2 className="hero-name text-4xl md:text-6xl lg:text-8xl font-light font-vt323 text-text-primary tracking-tight mb-2 md:mb-4">
          Timur Cadik
        </h2>
        
        <p className="hero-role font-vt323 text-base md:text-lg lg:text-xl text-text-secondary tracking-[0.2em] uppercase">
          креативный инноватор
        </p>
      </div>
    </section>
  )
}
