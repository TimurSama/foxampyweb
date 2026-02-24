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
  year: string
  description: string
  fullDescription: string
  image?: string
}

const cases: CaseItem[] = [
  {
    id: 'arch-1',
    title: 'Архитектурная визуализация',
    type: 'case',
    year: '2024',
    description: '3D моделирование и визуализация архитектурных концептов.',
    fullDescription: '3D моделирование и визуализация архитектурных концептов для городских пространств. Использование современных инструментов рендеринга и параметрического дизайна для создания фотореалистичных изображений и интерактивных презентаций.\n\nИнструменты: Blender, Rhino, Grasshopper, Unreal Engine.',
    image: '/architecture/image_2024-08-21_21-32-32.png'
  },
  {
    id: 'research-1',
    title: 'Токеномика водных ресурсов',
    type: 'research',
    year: '2024',
    description: 'Исследование механизмов токенизации природных ресурсов.',
    fullDescription: 'Исследование механизмов токенизации природных ресурсов на блокчейн-платформах. Разработка концепции VODeco - децентрализованной экосистемы управления водными ресурсами.\n\nФокус: двойная токеномика, DAO-управление, IoT-интеграция, AI-мониторинг.',
    image: undefined
  },
  {
    id: 'dev-1',
    title: 'AI-ассистент для трейдинга',
    type: 'development',
    year: '2023',
    description: 'Нейросетевой ассистент для анализа рыночных паттернов.',
    fullDescription: 'Разработка нейросетевого ассистента для анализа рыночных паттернов. Модели машинного обучения для прогнозирования ценовых движений и автоматизации торговых стратегий.\n\nТехнологии: Python, TensorFlow, WebSocket API, Technical Analysis.',
    image: undefined
  },
  {
    id: 'arch-2',
    title: 'Пространственный дизайн',
    type: 'case',
    year: '2024',
    description: 'Концептуальные разработки интерьеров и экстерьеров.',
    fullDescription: 'Концептуальные разработки интерьеров и экстерьеров с использованием генеративного дизайна. Алгоритмический подход к созданию уникальных пространственных решений.\n\nПодход: генеративный дизайн, параметрическая архитектура, sustainable design.',
    image: '/architecture/image_2024-08-21_21-32-39.png'
  },
  {
    id: 'research-2',
    title: 'Нейроинтерфейсы в UX',
    type: 'research',
    year: '2024',
    description: 'Изучение возможностей BCI для пользовательских интерфейсов.',
    fullDescription: 'Изучение возможностей BCI (Brain-Computer Interface) для создания иммерсивных пользовательских интерфейсов. Исследование взаимодействия мозг-компьютер в контексте UX/UI дизайна.\n\nНаправления: EEG-интерфейсы, когнитивная нагрузка, attention tracking.',
    image: undefined
  },
  {
    id: 'dev-2',
    title: 'Децентрализованная идентичность',
    type: 'development',
    year: '2023',
    description: 'Система Self-Sovereign Identity на DID-стандартах.',
    fullDescription: 'Прототип системы Self-Sovereign Identity на основе DID-стандартов (Decentralized Identifiers). Управление цифровой идентичностью без посредников.\n\nСтандарты: DID, Verifiable Credentials, Web3 Authentication.',
    image: undefined
  },
  {
    id: 'arch-3',
    title: 'Параметрическая архитектура',
    type: 'case',
    year: '2024',
    description: 'Алгоритмический дизайн архитектурных форм.',
    fullDescription: 'Алгоритмический дизайн архитектурных форм с использованием Grasshopper и Rhino. Создание сложных геометрий через параметрические алгоритмы.\n\nИнструменты: Grasshopper, Rhino, Python scripting, Ladybug.',
    image: '/architecture/image_2024-08-21_21-32-44.png'
  },
  {
    id: 'research-3',
    title: 'DeFi протоколы ликвидности',
    type: 'research',
    year: '2023',
    description: 'Анализ AMM-моделей и оптимизация slippage.',
    fullDescription: 'Анализ эффективности AMM-моделей (Automated Market Maker) и оптимизация slippage в децентрализованных биржах. Исследование concentrated liquidity и impermanent loss.\n\nПротоколы: Uniswap v3, Curve, Balancer.',
    image: undefined
  }
]

const typeLabels = {
  research: 'ИССЛЕДОВАНИЕ',
  development: 'РАЗРАБОТКА',
  case: 'КЕЙС'
}

export function CasesScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null)

  const totalCount = cases.length
  const researchCount = cases.filter(c => c.type === 'research').length
  const devCount = cases.filter(c => c.type === 'development').length
  const caseCount = cases.filter(c => c.type === 'case').length

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

      gsap.fromTo('.case-btn',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cases-buttons',
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
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="cases-title text-3xl md:text-5xl font-black mb-4 text-text-primary tracking-tight uppercase">
            Исследования и разработки
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Научно-творческий подход к решению сложных задач
          </p>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          {selectedCase ? (
            <div className="bg-bg-secondary border border-border-subtle p-8 mb-8 animate-fade-in">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  {selectedCase.image && (
                    <img 
                      src={selectedCase.image} 
                      alt={selectedCase.title}
                      className="w-24 h-24 object-cover border border-border-subtle"
                    />
                  )}
                  <div>
                    <span className="text-xs text-text-tertiary tracking-wider uppercase">
                      {typeLabels[selectedCase.type]} · {selectedCase.year}
                    </span>
                    <h3 className="text-2xl font-bold text-text-primary mt-1">
                      {selectedCase.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCase(null)}
                  className="text-text-tertiary hover:text-text-primary text-xl"
                >
                  ✕
                </button>
              </div>

              <div className="prose prose-invert prose-sm max-w-none">
                <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                  {selectedCase.fullDescription}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-bg-secondary border border-border-subtle p-8 mb-8">
              <h3 className="text-xl font-bold text-text-primary mb-4 uppercase tracking-wider">
                Методология
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                Мой подход сочетает научную строгость с креативной свободой. 
                Каждый проект начинается с глубокого исследования и анализа, 
                за которым следует этап экспериментов и прототипирования. 
                Результат — решения, основанные на данных, но воплощённые 
                через призму творческого видения.
              </p>
              <p className="text-text-secondary leading-relaxed">
                В архиве представлены кейсы из различных областей: от архитектурной 
                визуализации до блокчейн-исследований. Выберите проект ниже, 
                чтобы узнать подробнее.
              </p>
            </div>
          )}

          {/* Project Buttons */}
          <div className="cases-buttons grid grid-cols-2 md:grid-cols-4 gap-2 mb-12">
            {cases.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedCase(item)}
                className={`case-btn p-3 text-left border transition-all duration-300 ${
                  selectedCase?.id === item.id
                    ? 'bg-text-primary text-bg-primary border-text-primary'
                    : 'bg-bg-secondary border-border-subtle hover:border-border-hover'
                }`}
              >
                <span className="text-[9px] tracking-wider uppercase opacity-60 block mb-1">
                  {typeLabels[item.type]}
                </span>
                <span className="text-xs font-medium line-clamp-2">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 border-t border-border-subtle pt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary">{totalCount}</div>
              <div className="text-[10px] text-text-tertiary uppercase tracking-wider mt-1">Всего</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary">{caseCount}</div>
              <div className="text-[10px] text-text-tertiary uppercase tracking-wider mt-1">Кейсов</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary">{researchCount}</div>
              <div className="text-[10px] text-text-tertiary uppercase tracking-wider mt-1">Исследований</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-text-primary">{devCount}</div>
              <div className="text-[10px] text-text-tertiary uppercase tracking-wider mt-1">Разработок</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
