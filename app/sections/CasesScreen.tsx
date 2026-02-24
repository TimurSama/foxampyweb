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
  shortDesc: string
  fullDescription: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 'water-analyzer',
    title: 'Карманный анализатор',
    subtitle: 'Интегрированный блокчейн в IoT',
    shortDesc: 'Портативное мультисенсорное устройство для анализа качества водных источников с блокчейн-верификацией данных.',
    fullDescription: `Разработка портативного мультисенсорного устройства для анализа качества водных источников широкого спектра. Прибор размером с карманное зарядное устройство оснащён цифровыми электродами для измерения pH, растворённого кислорода, электропроводности, турбидности, ОВП, общего содержания растворённых твёрдых веществ и температуры.

Система автоматизированного сбора проб с микроконтроллером ESP32 обеспечивает криптографическое хеширование данных SHA-256 и запечатывание в блокчейн-ноды для гарантии неизменности и происхождения данных.

Интеграция с DeFi-протоколами позволяет передавать верифицированные экологические данные в Big Data-маркетплейсы с вознаграждением поставщиков данных в нативных токенах экосистемы.`,
    tags: ['IoT', 'Blockchain', 'ESP32', 'DeFi', 'Big Data', 'Sensors']
  },
  {
    id: 'sensor-dao',
    title: 'Токенизация воды',
    subtitle: 'SensorDAO Protocol',
    shortDesc: 'Децентрализованная физическая сеть, где IoT-сенсоры эмитируют токены в обмен на верифицированные данные.',
    fullDescription: `Публичное превью исследования: «SensorDAO Protocol — Прозрачный мониторинг через автономную эмиссию данных»

КОНЦЕПЦИЯ
SensorDAO Protocol — это архитектура децентрализованной физической сети, где IoT-сенсоры выступают не просто как сборщики данных, а как полноценные экономические агенты, способные самостоятельно эмитировать токены в обмен на криптографически верифицированные пакеты измерений. Система исключает человеческий фактор при валидации экологических или технических метрик, заменяя централизованные сервера на автономные ноды с консенсусом DAO.

АРХИТЕКТУРА СИСТЕМЫ

1. Уровень сбора (Edge Layer)
Автономные сенсорные кластеры (вода, воздух, почва, инфраструктура) оснащены защищенными элементами (Secure Enclaves). Каждое измерение:
• Подписывается приватным ключом устройства
• Снабжается временной меткой и геолокацией
• Упаковывается в DataHash (SHA-3 от сырых данных + метаданных)

2. Уровень валидации (Node Layer)
Данные попадают в ближайшую ноду сети (может быть развернута на edge-computing сервере или смартфоне валидатора). Нода выполняет:
• Проверку цифровой подписи сенсора
• Сверку с аномалиями (cross-reference с соседними датчиками)
• Формирование Merkle Tree из пакетов данных за временной слот

3. Уровень консенсуса (DAO Layer)
Управление через DAO-валидаторов:
• Proof-of-Sensor (PoSe): Механизм подтверждения физического существования датчика через случайные криптографические вызовы
• Data-Finality: Голосование за включение блока данных в основную цепь (tendermint-подобный консенсус)
• Репутационный слой: Датчики накапливают reputation-score вместо/наряду с токенами; низкая репутация = снижение эмиссии

МЕХАНИКА ЭМИССИИ: SENSOR-TO-TOKEN (S2T)
В отличие от классических DeFi-моделей, где эмиссия контролируется контрактом-владельцем, здесь эмитентом выступает само устройство:

Trigger: Датчик фиксирует событие (например, уровень pH = 7.2, температура = 18°C)
Packet: Формируется структура {DataHash, Timestamp, Geo, Signature}
Oracle-Bridge: Нода упаковывает хеш в транзакцию, но не передает сами данные (сохраняя конфиденциальность, если требуется)
Emission: При достижении кворума валидаторов смарт-контракт минтит токены $SENSE на адрес, привязанный к публичному ключу сенсора (или оператора)
Data-Availability: Сырые данные хранятся в децентрализованном хранилище (IPFS/Filecoin) с доступом по хешу из блокчейна

Формула эмиссии:
Emission = Base_Reward × Quality_Coefficient × Time_Decay
где Quality_Coefficient зависит от частоты измерений, стабильности соединения и соответствия ожидаемым паттернам (анти-спам).

ПРОЗРАЧНОСТЬ КАК ТЕХНИЧЕСКИЙ СТАНДАРТ
• Verifiable Telemetry: Любой участник может проверить, что данные не подделаны, сравнив хеш в блокчейне с публично доступным исходным файлом
• Anti-Tampering: Попытка физического взлома датчика (отключение, перенос) фиксируется акселерометром и немедленно маркирует последующие данные как "подозрительные"
• Open Telemetry API: Публичный доступ к потоку хешей без раскрытия точных координат приватных объектов (geofencing на уровне смарт-контракта)`,
    tags: ['DAO', 'IoT', 'Blockchain', 'Tokenization', 'Sensors', 'DeFi']
  }
]

function ProjectCard({ project, isExpanded, onClick }: { project: Project; isExpanded: boolean; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`
        project-card relative cursor-pointer transition-all duration-300 border overflow-hidden
        ${isExpanded 
          ? 'bg-bg-tertiary shadow-[inset_4px_4px_8px_rgba(0,0,0,0.5),inset_-4px_-4px_8px_rgba(255,255,255,0.05)]' 
          : 'bg-bg-secondary shadow-[4px_4px_8px_rgba(0,0,0,0.5),-4px_-4px_8px_rgba(255,255,255,0.05)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.5),-6px_-6px_12px_rgba(255,255,255,0.05)]'
        }
        border-border-subtle
        ${isExpanded ? 'md:col-span-2' : ''}
      `}
    >
      {/* Corner button */}
      <div className={`
        absolute top-0 right-0 w-10 h-10 flex items-center justify-center z-10
        text-sm font-pixel
        ${isExpanded 
          ? 'bg-bg-primary text-text-secondary' 
          : 'bg-text-primary text-bg-primary'
        }
      `}>
        {isExpanded ? '×' : '→'}
      </div>

      {/* Content container */}
      <div className={`${isExpanded ? 'h-[500px] overflow-y-auto' : ''}`}>
        <div className="p-6">
          {/* Subtitle */}
          <div className={`text-xs uppercase tracking-wider mb-2 font-pixel ${isExpanded ? 'text-text-tertiary' : 'text-text-tertiary'}`}>
            {project.subtitle}
          </div>

          {/* Title */}
          <h3 className={`text-2xl font-bold mb-3 uppercase tracking-wide ${isExpanded ? 'text-text-primary' : 'text-text-primary'}`}>
            {project.title}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, isExpanded ? project.tags.length : 3).map(tag => (
              <span 
                key={tag}
                className={`px-2 py-1 text-xs border font-vt323 ${isExpanded ? 'bg-bg-primary text-text-secondary border-border-subtle' : 'bg-bg-primary text-text-tertiary border-border-subtle'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Description */}
          {!isExpanded ? (
            <p className="text-text-secondary font-vt323 text-lg leading-relaxed">
              {project.shortDesc}
            </p>
          ) : (
            <div className="mt-4 pt-4 border-t border-border-subtle animate-fade-in">
              <div className="prose prose-invert max-w-none">
                <p className="text-text-secondary leading-relaxed whitespace-pre-line font-vt323 text-lg">
                  {project.fullDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Pixel corner */}
      <div className={`
        absolute bottom-0 left-0 w-2 h-2
        ${isExpanded ? 'bg-text-tertiary' : 'bg-text-primary'}
      `} />
    </div>
  )
}

export function CasesScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

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
        </div>

        {/* Project Cards */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedProject === project.id}
              onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
