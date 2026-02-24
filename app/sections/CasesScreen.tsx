'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CaseItem {
  id: string
  title: string
  type: 'research' | 'development' | 'case'
  description: string
  year: string
  tags: string[]
  image?: string
}

const cases: CaseItem[] = [
  {
    id: 'arch-1',
    title: 'Архитектурная визуализация',
    type: 'case',
    description: '3D моделирование и визуализация архитектурных концептов для городских пространств.',
    year: '2024',
    tags: ['3D', 'Architecture', 'Visualization'],
    image: '/architecture/image_2024-08-21_21-32-32.png'
  },
  {
    id: 'research-1',
    title: 'Токеномика водных ресурсов',
    type: 'research',
    description: 'Исследование механизмов токенизации природных ресурсов на блокчейн-платформах.',
    year: '2024',
    tags: ['Blockchain', 'Research', 'Tokenomics']
  },
  {
    id: 'dev-1',
    title: 'AI-ассистент для трейдинга',
    type: 'development',
    description: 'Разработка нейросетевого ассистента для анализа рыночных паттернов.',
    year: '2023',
    tags: ['AI', 'Trading', 'ML']
  },
  {
    id: 'arch-2',
    title: 'Пространственный дизайн',
    type: 'case',
    description: 'Концептуальные разработки интерьеров и экстерьеров с использованием генеративного дизайна.',
    year: '2024',
    tags: ['Design', 'Generative', '3D'],
    image: '/architecture/image_2024-08-21_21-32-39.png'
  },
  {
    id: 'research-2',
    title: 'Нейроинтерфейсы в UX',
    type: 'research',
    description: 'Изучение возможностей BCI для создания иммерсивных пользовательских интерфейсов.',
    year: '2024',
    tags: ['BCI', 'UX', 'Neuro']
  },
  {
    id: 'dev-2',
    title: 'Децентрализованная идентичность',
    type: 'development',
    description: 'Прототип системы Self-Sovereign Identity на основе DID-стандартов.',
    year: '2023',
    tags: ['DID', 'Web3', 'Identity']
  },
  {
    id: 'arch-3',
    title: 'Параметрическая архитектура',
    type: 'case',
    description: 'Алгоритмический дизайн архитектурных форм с использованием Grasshopper.',
    year: '2024',
    tags: ['Parametric', 'Rhino', 'Design'],
    image: '/architecture/image_2024-08-21_21-32-44.png'
  },
  {
    id: 'research-3',
    title: 'DeFi протоколы ликвидности',
    type: 'research',
    description: 'Анализ эффективности AMM-моделей и оптимизация slippage.',
    year: '2023',
    tags: ['DeFi', 'Research', 'AMM']
  }
]

const typeColors = {
  research: '#7c3aed',
  development: '#00f0ff',
  case: '#00d4aa'
}

const typeLabels = {
  research: 'ИССЛЕДОВАНИЕ',
  development: 'РАЗРАБОТКА',
  case: 'КЕЙС'
}

function CaseCard({ item, index }: { item: CaseItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="case-card group relative overflow-hidden rounded-xl bg-bg-secondary/50 border border-white/5 backdrop-blur-sm transition-all duration-500"
      style={{
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px ${typeColors[item.type]}20` : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image or gradient */}
      <div className="aspect-[16/10] overflow-hidden relative">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div 
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${typeColors[item.type]}20 0%, transparent 100%)`
            }}
          >
            <span className="text-4xl opacity-30">
              {item.type === 'research' && '◉'}
              {item.type === 'development' && '◈'}
              {item.type === 'case' && '◆'}
            </span>
          </div>
        )}
        
        {/* Type badge */}
        <div 
          className="absolute top-3 left-3 px-2 py-1 text-[9px] font-bold tracking-wider rounded"
          style={{ 
            background: `${typeColors[item.type]}30`,
            color: typeColors[item.type]
          }}
        >
          {typeLabels[item.type]}
        </div>

        {/* Year */}
        <div className="absolute top-3 right-3 text-[10px] text-text-secondary">
          {item.year}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-sm font-bold text-text-primary mb-2 line-clamp-2 group-hover:text-accent-cyan transition-colors">
          {item.title}
        </h3>
        <p className="text-[11px] text-text-secondary leading-relaxed line-clamp-2 mb-3">
          {item.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {item.tags.map(tag => (
            <span 
              key={tag}
              className="px-2 py-0.5 text-[9px] bg-white/5 text-text-secondary rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Hover line */}
      <div 
        className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
        style={{
          width: isHovered ? '100%' : '0%',
          background: typeColors[item.type]
        }}
      />
    </div>
  )
}

export function CasesScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<'all' | 'research' | 'development' | 'case'>('all')

  const filteredCases = filter === 'all' 
    ? cases 
    : cases.filter(c => c.type === filter)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cases-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cases-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.filter-btn',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.filter-container',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.case-card',
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cases-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="cases" 
      ref={sectionRef}
      className="section bg-bg-primary relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="cases-title text-3xl md:text-5xl font-black mb-4">
            <span className="gradient-text">КЕЙСЫ</span>
            <span className="text-text-primary"> & </span>
            <span className="text-accent-purple">ИССЛЕДОВАНИЯ</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Архив проектов, научных работ и экспериментальных разработок
          </p>
        </div>

        {/* Filters */}
        <div className="filter-container flex flex-wrap justify-center gap-2 mb-12">
          {(['all', 'case', 'research', 'development'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`filter-btn px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                filter === type 
                  ? 'bg-accent-cyan text-bg-primary' 
                  : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}
            >
              {type === 'all' && 'ВСЕ'}
              {type === 'case' && 'КЕЙСЫ'}
              {type === 'research' && 'ИССЛЕДОВАНИЯ'}
              {type === 'development' && 'РАЗРАБОТКИ'}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="cases-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCases.map((item, index) => (
            <CaseCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="text-center p-4 border border-white/10 rounded-lg">
            <div className="text-2xl font-bold text-accent-cyan">{cases.filter(c => c.type === 'case').length}</div>
            <div className="text-[10px] text-text-secondary uppercase tracking-wider">Кейсов</div>
          </div>
          <div className="text-center p-4 border border-white/10 rounded-lg">
            <div className="text-2xl font-bold text-accent-purple">{cases.filter(c => c.type === 'research').length}</div>
            <div className="text-[10px] text-text-secondary uppercase tracking-wider">Исследований</div>
          </div>
          <div className="text-center p-4 border border-white/10 rounded-lg">
            <div className="text-2xl font-bold text-emerald-400">{cases.filter(c => c.type === 'development').length}</div>
            <div className="text-[10px] text-text-secondary uppercase tracking-wider">Разработок</div>
          </div>
        </div>
      </div>
    </section>
  )
}
