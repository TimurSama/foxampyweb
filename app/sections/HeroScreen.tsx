'use client'

import { useEffect, useState } from 'react'
import { PixelColumns } from '../components/PixelColumns'
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

    // Animate text with stagger
    tl.fromTo('.hero-title',
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0.5
    )
    
    tl.fromTo('.hero-subtitle',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      0.8
    )

    tl.fromTo('.hero-description',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      1.0
    )

    tl.fromTo('.hero-portrait',
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
      0.3
    )

    tl.fromTo('.hero-tag',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
      1.2
    )

    return () => { tl.kill() }
  }, [isLoaded])

  return (
    <section id="hero" className="section bg-bg-primary relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary/80" />

      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-20">
          
          {/* Left side - Columns */}
          <div className="flex flex-col items-center lg:items-start">
            <PixelColumns />
            
            <div className="mt-8 text-center lg:text-left">
              <h1 className="hero-title text-4xl md:text-6xl font-black mb-2 tracking-tight">
                <span className="gradient-text">TIMUR</span>
              </h1>
              <h2 className="hero-subtitle text-2xl md:text-3xl font-light text-text-secondary tracking-[0.3em]">
                CADIK
              </h2>
            </div>
          </div>

          {/* Right side - Portrait */}
          <div className="hero-portrait flex flex-col items-center lg:items-end">
            <div className="relative">
              {/* Subtle glow */}
              <div className="absolute -inset-4 bg-white/5 blur-3xl rounded-full" />
              
              {/* Pixel portraits */}
              <div className="relative flex gap-4">
                {pixelData1 && (
                  <PixelCanvas 
                    data={pixelData1} 
                    pixelScale={2.5}
                    className="opacity-90"
                  />
                )}
                {pixelData2 && (
                  <PixelCanvas 
                    data={pixelData2} 
                    pixelScale={2.5}
                    className="opacity-60 hidden md:block"
                  />
                )}
              </div>

              {/* Decorative frame - monochrome */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-text-tertiary/50" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-text-tertiary/50" />
            </div>

            {/* Description */}
            <div className="hero-description mt-8 max-w-md text-right">
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                Создаю устойчивые системы на пересечении бизнеса, 
                дизайна и технологий. Работаю с комплексными проектами, 
                требующими системного подхода и междисциплинарного мышления.
              </p>
              
              <div className="mt-6 flex gap-3 justify-end flex-wrap">
                <span className="hero-tag px-3 py-1 text-xs border border-border-default text-text-secondary rounded-full hover:border-border-hover transition-colors">
                  Blockchain
                </span>
                <span className="hero-tag px-3 py-1 text-xs border border-border-default text-text-secondary rounded-full hover:border-border-hover transition-colors">
                  AI
                </span>
                <span className="hero-tag px-3 py-1 text-xs border border-border-default text-text-secondary rounded-full hover:border-border-hover transition-colors">
                  Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] tracking-[0.3em] text-text-tertiary uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-tertiary to-transparent" />
      </div>
    </section>
  )
}
