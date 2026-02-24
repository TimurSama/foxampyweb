'use client'

import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  category: string
  description: string
  status: string
  technologies: string[]
  link?: string
}

const projects: Project[] = [
  {
    id: 'civilization',
    title: 'Civilization Protocol',
    category: 'Блокчейн / Экосистема',
    description: 'Децентрализованная кибер-физическая платформа для управления водными ресурсами через блокчейн. VODeco включает двойную токеномику, DAO-управление, мониторинг через IoT и AI.',
    status: 'Активен · Phase 2',
    technologies: ['Blockchain', 'IoT', 'AI'],
    link: '#'
  },
  {
    id: 'tradeplus',
    title: 'TradePlus',
    category: 'Финтех / Трейдинг',
    description: 'Продвинутая платформа для торговли и инвестиций с интеграцией множественных криптовалютных бирж, инструментами технического и фундаментального анализа.',
    status: 'Активен · Active',
    technologies: ['Fintech', 'Quant', 'UX'],
    link: '#'
  },
  {
    id: 'dogymorbios',
    title: 'Dogymorbios',
    category: 'Социальная сеть',
    description: 'Платформенная экосистема для собак и их владельцев. Интерактивная карта прогулок, GPS-трекинг, социальная лента, маркетплейс, внутренняя валюта BoneCoin.',
    status: 'Пилот · Pilot',
    technologies: ['Geo', 'Mobile', 'Community'],
    link: '#'
  },
  {
    id: 'nexusvita',
    title: 'NexusVita',
    category: 'Здоровье',
    description: 'Платформа интеграции жизненных данных и сервисов в единую экосистему здоровья. Связность между медицинскими приложениями и фитнес-трекерами.',
    status: 'Активен · Active',
    technologies: ['Health API', 'AI', 'Security'],
    link: '#'
  }
]

// Hexagon background component
function HexagonGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="hexagons-mono" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path 
              d="M30 0 L60 13 L60 39 L30 52 L0 39 L0 13 Z" 
              fill="none" 
              stroke="#444444" 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons-mono)" />
      </svg>
    </div>
  )
}

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl p-8 relative bg-bg-secondary border border-border-subtle rounded-lg"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
        >
          ✕
        </button>

        <div className="mb-4">
          <span className="text-xs text-text-tertiary tracking-wider uppercase">{project.category}</span>
          <h3 className="text-2xl font-bold text-text-primary mt-1">{project.title}</h3>
        </div>

        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-text-secondary" />
            <span className="text-xs text-text-tertiary">{project.status}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map(tech => (
            <span 
              key={tech}
              className="px-3 py-1 text-xs bg-bg-tertiary text-text-secondary rounded-full border border-border-subtle"
            >
              {tech}
            </span>
          ))}
        </div>

        <button className="w-full py-3 bg-text-primary text-bg-primary font-medium rounded hover:bg-text-secondary transition-colors">
          Открыть проект
        </button>
      </div>
    </div>
  )
}

export function ProjectsScreen() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.projects-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-title',
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
      id="projects" 
      ref={sectionRef}
      className="section bg-bg-secondary relative overflow-hidden"
    >
      <HexagonGrid />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="projects-title text-3xl md:text-5xl font-black text-text-primary mb-4 tracking-tight">
            ПРОЕКТЫ
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Экосистема цифровых решений на стыке технологий и бизнеса
          </p>
        </div>

        {/* Projects grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card bg-bg-tertiary border border-border-subtle p-6 cursor-pointer transition-all duration-300 hover:border-border-hover hover:bg-bg-elevated group"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] tracking-wider text-text-tertiary uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-text-primary mt-1 group-hover:text-white transition-colors">
                    {project.title}
                  </h3>
                </div>
                <div className="w-2 h-2 rounded-full bg-text-secondary" />
              </div>

              <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-[10px] bg-bg-primary text-text-tertiary rounded border border-border-subtle"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-text-tertiary">{project.status}</span>
                <button className="px-4 py-2 text-xs font-medium text-text-primary bg-bg-primary rounded hover:bg-bg-secondary transition-colors border border-border-subtle">
                  Подробнее
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  )
}
