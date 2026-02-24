'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Globe } from '../components/Globe'

interface MethodologyCardProps {
  title: string
  description: string
  index: number
  total: number
}

function MethodologyCard({ title, description, index, total }: MethodologyCardProps) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const radius = 280
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius * 0.4

  return (
    <div
      className="methodology-card absolute p-5 rounded-lg border border-border-subtle bg-bg-secondary/90 backdrop-blur-sm w-48 transition-all duration-500 hover:border-border-hover hover:bg-bg-tertiary group"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-mono text-text-muted">0{index + 1}</span>
        <div className="h-px flex-1 bg-border-subtle group-hover:bg-border-hover transition-colors" />
      </div>
      <h3 className="text-sm font-bold text-text-primary mb-2 tracking-wide">{title}</h3>
      <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
    </div>
  )
}

export function NeuroPlanetScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  const methodologies = [
    { title: 'ИССЛЕДОВАНИЕ', description: 'Анализ и аудит. Погружение в контекст проекта, изучение рынка и конкурентов.' },
    { title: 'КОНЦЕПЦИЯ', description: 'Идея и позиционирование. Разработка концептуальных решений и УТП.' },
    { title: 'ПРОЕКТИРОВАНИЕ', description: 'Стратегия и архитектура. Брендирование, визуализация дизайна и UX/UI.' },
    { title: 'РАЗРАБОТКА', description: 'Создание. Прототипирование, производство, техническая разработка.' },
    { title: 'ЗАПУСК', description: 'Релиз. Вывод на рынок, маркетинговые кампании и сбор обратной связи.' },
    { title: 'РАЗВИТИЕ', description: 'Масштабирование. Поддержка, оптимизация и выход на новые рынки.' },
  ]

  useGSAP(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          gsap.fromTo('.methodology-card',
            { scale: 0.8, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.8, 
              stagger: 0.1,
              ease: 'power3.out'
            }
          )
          
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
      className="section bg-bg-primary relative overflow-hidden"
    >
      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      
      {/* 3D Globe */}
      {isVisible && <Globe />}

      {/* Methodology cards overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto h-full relative">
          {methodologies.map((m, i) => (
            <MethodologyCard
              key={m.title}
              title={m.title}
              description={m.description}
              index={i}
              total={methodologies.length}
            />
          ))}
        </div>
      </div>

      {/* Section title */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-10">
        <h2 className="globe-title text-2xl md:text-4xl font-black tracking-[0.2em] text-text-primary">
          ПОЛНЫЙ ЦИКЛ
        </h2>
        <p className="text-text-secondary text-xs md:text-sm mt-3 tracking-wider uppercase">
          от идеи до масштабирования
        </p>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center z-10">
        <p className="text-text-muted text-xs tracking-[0.3em] uppercase">
          Глобальная экосистема
        </p>
      </div>
    </section>
  )
}
