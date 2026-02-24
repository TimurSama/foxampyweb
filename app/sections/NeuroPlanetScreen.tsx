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
  shortDesc: string
  details: string[]
}

const stages: Stage[] = [
  {
    id: 1,
    name: 'Исследование',
    nameEn: 'RESEARCH',
    icon: '◉',
    shortDesc: 'Погружение в контекст задачи',
    details: [
      'Анализ рынка и конкурентов',
      'Изучение целевой аудитории',
      'Сбор инсайтов и данных',
      'Формирование гипотез',
      'Аудит текущих решений'
    ]
  },
  {
    id: 2,
    name: 'Концепция',
    nameEn: 'CONCEPT',
    icon: '◈',
    shortDesc: 'Разработка видения проекта',
    details: [
      'Генерация идей и подходов',
      'Позиционирование и УТП',
      'Креативные концепты',
      'Визуальные метафоры',
      'Тестирование гипотез'
    ]
  },
  {
    id: 3,
    name: 'Проектирование',
    nameEn: 'DESIGN',
    icon: '◆',
    shortDesc: 'Создание структуры решения',
    details: [
      'Архитектура системы',
      'Стратегия реализации',
      'Планирование ресурсов',
      'Прототипирование',
      'Визуализация концепции'
    ]
  },
  {
    id: 4,
    name: 'Разработка',
    nameEn: 'BUILD',
    icon: '▣',
    shortDesc: 'Реализация и производство',
    details: [
      'Создание продукта',
      'Техническая реализация',
      'Производственные процессы',
      'Интеграция компонентов',
      'Контроль качества'
    ]
  },
  {
    id: 5,
    name: 'Запуск',
    nameEn: 'LAUNCH',
    icon: '▲',
    shortDesc: 'Вывод на рынок',
    details: [
      'Go-to-market стратегия',
      'Маркетинговые кампании',
      'PR и коммуникации',
      'Сбор обратной связи',
      'Первичная аналитика'
    ]
  },
  {
    id: 6,
    name: 'Развитие',
    nameEn: 'SCALE',
    icon: '◊',
    shortDesc: 'Масштабирование',
    details: [
      'Продуктовая аналитика',
      'Оптимизация процессов',
      'Выход на новые рынки',
      'Итерации и улучшения',
      'Долгосрочное развитие'
    ]
  }
]

function StageCard({ stage, isExpanded, onClick }: { stage: Stage; isExpanded: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`
        stage-card relative p-6 cursor-pointer transition-all duration-300
        ${isExpanded 
          ? 'bg-bg-tertiary shadow-[inset_4px_4px_8px_rgba(0,0,0,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.05)]' 
          : 'bg-bg-secondary shadow-[4px_4px_8px_rgba(0,0,0,0.5),-4px_-4px_8px_rgba(255,255,255,0.05)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.5),-6px_-6px_12px_rgba(255,255,255,0.05)]'
        }
        border border-border-subtle
      `}
    >
      {/* Corner detail button */}
      <div className={`
        absolute top-0 right-0 w-8 h-8 flex items-center justify-center
        text-[10px] font-pixel uppercase tracking-wider
        ${isExpanded 
          ? 'bg-bg-primary text-text-secondary' 
          : 'bg-text-primary text-bg-primary'
        }
      `}>
        {isExpanded ? '×' : '→'}
      </div>

      {/* Number */}
      <div className={`text-xs font-pixel mb-4 ${isExpanded ? 'text-text-tertiary' : 'text-text-tertiary'}`}>
        0{stage.id}
      </div>

      {/* Icon */}
      <div className={`text-3xl mb-3 font-pixel ${isExpanded ? 'text-text-primary' : 'text-text-secondary'}`}>
        {stage.icon}
      </div>

      {/* Name */}
      <h3 className={`text-lg font-bold mb-1 uppercase tracking-wider ${isExpanded ? 'text-text-primary' : 'text-text-primary'}`}>
        {stage.name}
      </h3>
      <p className={`text-xs uppercase tracking-widest mb-3 ${isExpanded ? 'text-text-tertiary' : 'text-text-tertiary'}`}>
        {stage.nameEn}
      </p>

      {!isExpanded ? (
        /* Short description - shown when collapsed */
        <p className="text-sm text-text-secondary">
          {stage.shortDesc}
        </p>
      ) : (
        /* Expanded details - shown when clicked */
        <div className="mt-4 pt-4 border-t border-border-subtle animate-fade-in">
          <p className="text-xs text-text-tertiary uppercase tracking-wider mb-3">
            Методология:
          </p>
          <ul className="space-y-2">
            {stage.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span className="text-text-tertiary mt-1">▸</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Pixel corner decoration */}
      <div className={`
        absolute bottom-0 left-0 w-2 h-2
        ${isExpanded ? 'bg-text-tertiary' : 'bg-text-primary'}
      `} />
    </div>
  )
}

export function NeuroPlanetScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [expandedStage, setExpandedStage] = useState<number | null>(null)

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
          <h2 className="cycle-title text-3xl md:text-5xl font-bold text-text-primary tracking-tight uppercase font-vt323">
            Рабочий процесс полного цикла
          </h2>
        </div>

        {/* Stages Grid */}
        <div className="stages-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stages.map((stage) => (
            <StageCard
              key={stage.id}
              stage={stage}
              isExpanded={expandedStage === stage.id}
              onClick={() => setExpandedStage(expandedStage === stage.id ? null : stage.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
