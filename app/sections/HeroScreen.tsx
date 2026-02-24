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
    // Load pixel data
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

    // Animate text
    tl.fromTo('.hero-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      1.5
    )
    
    tl.fromTo('.hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      1.8
    )

    tl.fromTo('.hero-description',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      2.0
    )

    tl.fromTo('.hero-portrait',
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      1.2
    )

    return () => { tl.kill() }
  }, [isLoaded])

  return (
    <section id="hero" className="section bg-bg-primary relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 240, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 240, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-20">
          
          {/* Left side - Columns */}
          <div className="flex flex-col items-center lg:items-start">
            <PixelColumns />
            
            <div className="mt-8 text-center lg:text-left">
              <h1 className="hero-title text-4xl md:text-6xl font-black mb-2">
                <span className="gradient-text">TIMUR</span>
              </h1>
              <h2 className="hero-subtitle text-2xl md:text-3xl font-light text-text-secondary tracking-widest">
                CADIK
              </h2>
            </div>
          </div>

          {/* Right side - Portrait */}
          <div className="hero-portrait flex flex-col items-center lg:items-end">
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-accent-cyan/20 blur-3xl rounded-full opacity-50" />
              
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
                    className="opacity-70 hidden md:block"
                  />
                )}
              </div>

              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-accent-cyan/50" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-accent-cyan/50" />
            </div>

            {/* Description */}
            <div className="hero-description mt-8 max-w-md text-right">
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                Создаю устойчивые системы на пересечении бизнеса, 
                дизайна и технологий. Работаю с комплексными проектами, 
                требующими системного подхода и междисциплинарного мышления.
              </p>
              
              <div className="mt-6 flex gap-3 justify-end">
                <span className="px-3 py-1 text-xs border border-accent-cyan/30 text-accent-cyan rounded-full">
                  Blockchain
                </span>
                <span className="px-3 py-1 text-xs border border-accent-purple/30 text-accent-purple rounded-full">
                  AI
                </span>
                <span className="px-3 py-1 text-xs border border-cyan-500/30 text-cyan-400 rounded-full">
                  Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-[10px] tracking-widest text-text-secondary">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-accent-cyan to-transparent" />
      </div>
    </section>
  )
}
