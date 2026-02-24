'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Company {
  id: string
  name: string
  url: string
  logo: string
  role: string
  period?: string
  description: string
  achievements: string[]
}

const companies: Company[] = [
  {
    id: 'done',
    name: 'Done',
    url: 'https://done.co.il',
    logo: 'DONE',
    role: 'Brand & Creative Lead',
    period: '2023-2024',
    description: 'Комплексная работа над экосистемой бренда и цифровыми продуктами',
    achievements: [
      'Проработка брендинга и айдентики',
      'Участие в разработке мобильного приложения',
      'Ведение маркетинговых кампаний',
      'Режиссирование и продюсирование видеосъёмок рекламы и видеоматериалов'
    ]
  },
  {
    id: 'unicap',
    name: 'UNICAP',
    url: 'https://unicap.invest.org',
    logo: 'UNICAP',
    role: 'Creative Director',
    period: '2022-2023',
    description: 'Работа с портфелем инвестиционных проектов в роли Креативного Директора',
    achievements: [
      'Разработка маркетинговой стратегии фонда',
      'Презентация инвестиционных проектов',
      'Айдентика портфельных компаний',
      'Стратегические коммуникации с инвесторами'
    ]
  },
  {
    id: 'culligan',
    name: 'Culligan Eurasia',
    url: 'https://www.culligan.com',
    logo: 'CULLIGAN',
    role: 'Marketing Specialist',
    period: '2020-2022',
    description: 'Работа в штате отдела маркетинга международной корпорации',
    achievements: [
      'Работа над тендерами и корпоративными закупками',
      'Организация участия в выставках и индустриальных событиях',
      'Развитие Евразийского направления корпорации',
      'B2B маркетинг и работа с ключевыми клиентами'
    ]
  },
  {
    id: 'realting',
    name: 'Realting',
    url: 'https://realting.uz',
    logo: 'REALTING',
    role: 'Product & Research Lead',
    period: '2019-2020',
    description: 'Глубинное исследование рынка недвижимости и разработка DeFi-решения',
    achievements: [
      'Глубинное исследование рынка B2B, B2C, B2G сегментов',
      'Концептуализация программы токенизации недвижимости',
      'Система аккредитации риелторов и агентств',
      'Цифровой реестр прав собственности (Title Registry) с полной историей сделок (Chain of Title)',
      'Унификация документации через смарт-контракты для прозрачности сделок'
    ]
  }
]

function CompanyCard({ company, index }: { company: Company; index: number }) {
  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      className="company-card group block bg-bg-secondary border border-border-subtle p-6 transition-all duration-500 hover:border-border-hover hover:bg-bg-tertiary"
    >
      {/* Header with logo and name */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <span className="text-2xl font-black tracking-wider text-text-primary group-hover:text-white transition-colors">
            {company.logo}
          </span>
          <span className="text-xs text-text-tertiary ml-2">↗</span>
        </div>
        {company.period && (
          <span className="text-xs text-text-tertiary font-mono">
            {company.period}
          </span>
        )}
      </div>

      {/* Role */}
      <div className="mb-4">
        <span className="text-xs text-text-tertiary uppercase tracking-wider">Роль</span>
        <h3 className="text-lg font-bold text-text-primary mt-1">{company.role}</h3>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm leading-relaxed mb-4">
        {company.description}
      </p>

      {/* Achievements */}
      <div className="space-y-2">
        {company.achievements.map((achievement, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-text-tertiary mt-1">→</span>
            <span className="text-xs text-text-secondary leading-relaxed">{achievement}</span>
          </div>
        ))}
      </div>

      {/* Hover line */}
      <div className="absolute bottom-0 left-0 h-px bg-text-primary transition-all duration-500 w-0 group-hover:w-full" />
    </a>
  )
}

export function ExperienceScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.experience-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-title',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.company-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.companies-grid',
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
      id="experience" 
      ref={sectionRef}
      className="section bg-bg-primary relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="experience-title text-3xl md:text-5xl font-black mb-4 text-text-primary tracking-tight uppercase">
            Опыт работы
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Компании и проекты, с которыми я сотрудничал
          </p>
        </div>

        {/* Companies Grid */}
        <div className="companies-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {companies.map((company, index) => (
            <CompanyCard key={company.id} company={company} index={index} />
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 text-center">
          <p className="text-text-tertiary text-sm">
            Нажмите на карточку, чтобы перейти на сайт компании
          </p>
        </div>
      </div>
    </section>
  )
}
