'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Globe } from '../components/Globe'

export function NeuroPlanetScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useGSAP(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          gsap.fromTo('.globe-title',
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
          )
          
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      id="neuro" 
      ref={sectionRef}
      className="h-screen w-full bg-bg-primary relative overflow-hidden"
    >
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      
      {/* 3D Globe - full screen */}
      {isVisible && <Globe />}

      {/* Section title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <h2 className="globe-title text-xl md:text-2xl font-black tracking-[0.3em] text-text-primary uppercase">
          Полный цикл
        </h2>
        <p className="text-text-secondary text-xs md:text-sm mt-2 tracking-wider uppercase">
          от идеи до масштабирования
        </p>
      </div>

      {/* Bottom hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none">
        <p className="text-text-muted text-xs tracking-[0.2em] uppercase">
          Кликни на планету для подробностей
        </p>
      </div>
    </section>
  )
}
