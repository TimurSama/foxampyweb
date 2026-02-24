'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Stage {
  id: number
  name: string
  nameEn: string
  icon: string
  description: string
  details: string[]
}

const stages: Stage[] = [
  {
    id: 1,
    name: 'Исследование',
    nameEn: 'RESEARCH',
    icon: '◉',
    description: 'Погружение в контекст задачи',
    details: [
      'Анализ рынка и конкурентов',
      'Изучение целевой аудитории',
      'Сбор инсайтов и данных',
      'Формирование гипотез'
    ]
  },
  {
    id: 2,
    name: 'Концепция',
    nameEn: 'CONCEPT',
    icon: '◈',
    description: 'Разработка видения проекта',
    details: [
      'Генерация идей',
      'Позиционирование',
      'Креативные концепты',
      'Визуальные метафоры'
    ]
  },
  {
    id: 3,
    name: 'Проектирование',
    nameEn: 'DESIGN',
    icon: '◆',
    description: 'Создание архитектуры решения',
    details: [
      'Информационная архитектура',
      'UX/UI проектирование',
      'Прототипирование',
      'Дизайн-система'
    ]
  },
  {
    id: 4,
    name: 'Разработка',
    nameEn: 'DEVELOP',
    icon: '▣',
    description: 'Техническая реализация',
    details: [
      'Frontend разработка',
      'Backend и API',
      'Blockchain интеграция',
      'Тестирование'
    ]
  },
  {
    id: 5,
    name: 'Запуск',
    nameEn: 'LAUNCH',
    icon: '▲',
    description: 'Вывод продукта на рынок',
    details: [
      'Go-to-market стратегия',
      'Маркетинговые кампании',
      'PR и коммуникации',
      'Сбор обратной связи'
    ]
  },
  {
    id: 6,
    name: 'Развитие',
    nameEn: 'SCALE',
    icon: '◊',
    description: 'Масштабирование продукта',
    details: [
      'Продуктовая аналитика',
      'Оптимизация процессов',
      'Выход на новые рынки',
      'Итерации и улучшения'
    ]
  }
]

function StageCard({ stage, isActive, onClick }: { stage: Stage; isActive: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`
        stage-card relative p-6 border cursor-pointer transition-all duration-300
        ${isActive 
          ? 'bg-text-primary text-bg-primary border-text-primary' 
          : 'bg-bg-secondary border-border-subtle hover:border-text-tertiary'
        }
      `}
    >
      {/* Number */}
      <div className={`text-xs font-pixel mb-4 ${isActive ? 'text-bg-primary' : 'text-text-tertiary'}`}>
        0{stage.id}
      </div>

      {/* Icon */}
      <div className={`text-3xl mb-3 font-pixel ${isActive ? 'text-bg-primary' : 'text-text-secondary'}`}>
        {stage.icon}
      </div>

      {/* Name */}
      <h3 className={`text-lg font-bold mb-1 uppercase tracking-wider ${isActive ? 'text-bg-primary' : 'text-text-primary'}`}>
        {stage.name}
      </h3>
      <p className={`text-xs uppercase tracking-widest mb-3 ${isActive ? 'text-bg-primary/70' : 'text-text-tertiary'}`}>
        {stage.nameEn}
      </p>

      {/* Short description */}
      <p className={`text-sm ${isActive ? 'text-bg-primary/80' : 'text-text-secondary'}`}>
        {stage.description}
      </p>

      {/* Pixel corner decoration */}
      <div className={`
        absolute top-0 right-0 w-3 h-3
        ${isActive ? 'bg-bg-primary' : 'bg-text-primary'}
      `} />
    </div>
  )
}

function DetailPanel({ stage, onClose }: { stage: Stage; onClose: () => void }) {
  return (
    <div className="bg-bg-secondary border border-border-subtle p-8 animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <span className="text-4xl font-pixel text-text-primary">{stage.icon}</span>
          <div>
            <span className="text-xs text-text-tertiary font-pixel">ЭТАП 0{stage.id}</span>
            <h3 className="text-2xl font-bold text-text-primary uppercase tracking-wider">
              {stage.name}
            </h3>
            <p className="text-sm text-text-tertiary uppercase tracking-widest">{stage.nameEn}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-text-tertiary hover:text-text-primary text-xl px-2"
        >
          ×
        </button>
      </div>

      <p className="text-text-secondary mb-6 text-lg">{stage.description}</p>

      <div className="space-y-3">
        {stage.details.map((detail, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-text-tertiary font-pixel text-xs">▸</span>
            <span className="text-text-primary">{detail}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function NeuroPlanetScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState<Stage | null>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cycle-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cycle-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.stage-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stages-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="neuro" 
      ref={sectionRef}
      className="min-h-screen w-full bg-bg-primary relative overflow-hidden py-20"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="cycle-title font-pixel text-xs text-text-tertiary uppercase tracking-[0.3em] mb-4">
            Рабочий процесс
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-text-primary uppercase tracking-tight">
            Полный цикл
          </h3>
          <p className="text-text-secondary mt-4 max-w-xl mx-auto">
            От исследования до масштабирования — шесть этапов создания продукта
          </p>
        </div>

        {/* Detail Panel */}
        {activeStage && (
          <div className="max-w-3xl mx-auto mb-12">
            <DetailPanel 
              stage={activeStage} 
              onClose={() => setActiveStage(null)} 
            />
          </div>
        )}

        {/* Stages Grid */}
        <div className="stages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {stages.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              isActive={activeStage?.id === stage.id}
              onClick={() => setActiveStage(activeStage?.id === stage.id ? null : stage)}
            />
          ))}
        </div>

        {/* Bottom hint */}
        <div className="mt-12 text-center">
          <p className="text-text-tertiary text-sm font-pixel">
            [ КЛИКНИТЕ НА ЭТАП ДЛЯ ПОДРОБНОСТЕЙ ]
          </p>
        </div>
      </div>
    </section>
  )
}
