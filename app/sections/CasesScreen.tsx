'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  fullDescription: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 'water-analyzer',
    title: 'Карманный анализатор',
    subtitle: 'Интегрированный блокчейн в IoT',
    description: 'Портативное мультисенсорное устройство для анализа качества водных источников с блокчейн-верификацией данных.',
    fullDescription: `Разработка портативного мультисенсорного устройства для анализа качества водных источников широкого спектра. Прибор размером с карманное зарядное устройство оснащён цифровыми электродами для измерения pH, растворённого кислорода, электропроводности, турбидности, ОВП, общего содержания растворённых твёрдых веществ и температуры.

Система автоматизированного сбора проб с микроконтроллером ESP32 обеспечивает криптографическое хеширование данных SHA-256 и запечатывание в блокчейн-ноды для гарантии неизменности и происхождения данных.

Интеграция с DeFi-протоколами позволяет передавать верифицированные экологические данные в Big Data-маркетплейсы с вознаграждением поставщиков данных в нативных токенах экосистемы.`,
    tags: ['IoT', 'Blockchain', 'ESP32', 'DeFi', 'Big Data', 'Sensors']
  },
  {
    id: 'eco-expeditor',
    title: 'Эко Экспедитор',
    subtitle: 'Прозрачный мониторинг',
    description: 'Единая платформа для подключения и управления IoT-устройствами в инфраструктуре умного города.',
    fullDescription: `Разработка единой платформы для подключения и управления IoT-устройствами в инфраструктуре умного города с интеграцией блокчейн-протоколов для обеспечения прозрачности и неизменности данных мониторинга окружающей среды.

Платформа собирает данные с распределённой сети сенсоров: качество воздуха, уровень шума, состояние водных ресурсов, энергопотребление и другие экологические показатели. Все данные хранятся в децентрализованном реестре с возможностью аудита и верификации.

Смарт-контракты автоматизируют процессы оплаты за данные, управления доступом и интеграции с городскими сервисами.`,
    tags: ['Smart City', 'IoT Platform', 'Blockchain', 'Monitoring', 'Smart Contracts']
  }
]

export function CasesScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

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

      gsap.fromTo('.project-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
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
      id="cases" 
      ref={sectionRef}
      className="section bg-bg-primary relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="cases-title text-3xl md:text-5xl font-bold mb-4 text-text-primary tracking-tight uppercase font-vt323">
            Исследования и разработки
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto font-vt323 text-lg">
            Реальные проекты на стыке IoT, блокчейна и экологического мониторинга
          </p>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto">
          {selectedProject ? (
            <div className="bg-bg-secondary border border-border-subtle p-8 mb-8 animate-fade-in">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="font-pixel text-xs text-text-tertiary uppercase tracking-wider">
                    {selectedProject.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-text-primary mt-2 uppercase tracking-wide">
                    {selectedProject.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-text-tertiary hover:text-text-primary text-2xl px-2"
                >
                  ×
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-xs bg-bg-primary text-text-secondary border border-border-subtle font-vt323"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary leading-relaxed whitespace-pre-line font-vt323 text-lg">
                  {selectedProject.fullDescription}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-bg-secondary border border-border-subtle p-8 mb-8">
              <h3 className="text-xl font-bold text-text-primary mb-4 uppercase tracking-wider font-pixel">
                О проектах
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4 font-vt323 text-lg">
                Мои исследования сосредоточены на создании технологических решений 
                для экологического мониторинга и прозрачности данных. 
                Объединяя IoT-сенсоры с блокчейн-инфраструктурой, 
                я разрабатываю системы, где экологические данные становятся 
                достоверными, проверяемыми и ценными для всех участников рынка.
              </p>
              <p className="text-text-secondary leading-relaxed font-vt323 text-lg">
                Каждый проект — это шаг к тому, чтобы сделать экологический контроль 
                доступным, автоматизированным и экономически мотивированным.
              </p>
            </div>
          )}

          {/* Project Cards */}
          <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`
                  project-card relative p-6 border cursor-pointer transition-all duration-300
                  ${selectedProject?.id === project.id
                    ? 'bg-text-primary text-bg-primary border-text-primary' 
                    : 'bg-bg-secondary border-border-subtle hover:border-text-tertiary'
                  }
                `}
              >
                <div className={`text-xs uppercase tracking-wider mb-2 ${selectedProject?.id === project.id ? 'text-bg-primary/70' : 'text-text-tertiary'}`}>
                  {project.subtitle}
                </div>
                <h3 className={`text-xl font-bold mb-3 uppercase tracking-wide ${selectedProject?.id === project.id ? 'text-bg-primary' : 'text-text-primary'}`}>
                  {project.title}
                </h3>
                <p className={`text-sm leading-relaxed ${selectedProject?.id === project.id ? 'text-bg-primary/80' : 'text-text-secondary'}`}>
                  {project.description}
                </p>
                
                {/* Pixel corner */}
                <div className={`
                  absolute top-0 right-0 w-2 h-2
                  ${selectedProject?.id === project.id ? 'bg-bg-primary' : 'bg-text-primary'}
                `} />
              </div>
            ))}
          </div>

          {/* Bottom hint */}
          <div className="mt-8 text-center">
            <p className="text-text-tertiary text-sm font-pixel">
              [ КЛИКНИТЕ НА ПРОЕКТ ДЛЯ ПОДРОБНОСТЕЙ ]
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
