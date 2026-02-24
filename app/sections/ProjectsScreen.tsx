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
  statusColor: string
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
    statusColor: '#00d4aa',
    technologies: ['Blockchain', 'IoT', 'AI'],
    link: '#'
  },
  {
    id: 'tradeplus',
    title: 'TradePlus',
    category: 'Финтех / Трейдинг',
    description: 'Продвинутая платформа для торговли и инвестиций с интеграцией множественных криптовалютных бирж, инструментами технического и фундаментального анализа.',
    status: 'Активен · Active',
    statusColor: '#00d4aa',
    technologies: ['Fintech', 'Quant', 'UX'],
    link: '#'
  },
  {
    id: 'dogymorbios',
    title: 'Dogymorbios',
    category: 'Социальная сеть',
    description: 'Платформенная экосистема для собак и их владельцев. Интерактивная карта прогулок, GPS-трекинг, социальная лента, маркетплейс, внутренняя валюта BoneCoin.',
    status: 'Пилот · Pilot',
    statusColor: '#ffd93d',
    technologies: ['Geo', 'Mobile', 'Community'],
    link: '#'
  },
  {
    id: 'nexusvita',
    title: 'NexusVita',
    category: 'Здоровье',
    description: 'Платформа интеграции жизненных данных и сервисов в единую экосистему здоровья. Связность между медицинскими приложениями и фитнес-трекерами.',
    status: 'Активен · Active',
    statusColor: '#00d4aa',
    technologies: ['Health API', 'AI', 'Security'],
    link: '#'
  }
]

// Hexagon background component
function HexagonGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="hexagons" width="60" height="52" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path 
              d="M30 0 L60 13 L60 39 L30 52 L0 39 L0 13 Z" 
              fill="none" 
              stroke="#d1d1d9" 
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  )
}

// Neomorph hex with animation
function AnimatedHex({ delay }: { delay: number }) {
  return (
    <div 
      className="hex-cell neomorph w-12 h-14 flex items-center justify-center m-1"
      style={{
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        animationDelay: `${delay}s`
      }}
    >
      <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full opacity-50" />
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="neomorph w-full max-w-2xl p-8 relative animate-in fade-in zoom-in duration-300"
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full neomorph-inset flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        >
          ✕
        </button>

        <div className="mb-4">
          <span className="text-xs text-text-secondary tracking-wider">{project.category}</span>
          <h3 className="text-2xl font-bold text-gray-800 mt-1">{project.title}</h3>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ background: project.statusColor }}
            />
            <span className="text-xs text-gray-500">{project.status}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map(tech => (
            <span 
              key={tech}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity">
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
    const triggers: ScrollTrigger[] = []
    
    const ctx = gsap.context(() => {
      // Animate hexagons
      gsap.fromTo('.hex-cell',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: {
            each: 0.02,
            from: 'center'
          },
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      // Animate project cards
      gsap.fromTo('.project-window',
        { y: 100, opacity: 0 },
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
    }, sectionRef)

    return () => {
      triggers.forEach(t => t.kill())
      ctx.revert()
    }
  }, [])

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section bg-neomorph-bg relative"
    >
      <HexagonGrid />
      
      {/* Animated hex background */}
      <div className="absolute inset-0 flex flex-wrap content-center justify-center opacity-20 pointer-events-none">
        {Array.from({ length: 60 }).map((_, i) => (
          <AnimatedHex key={i} delay={i * 0.05} />
        ))}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-gray-800 mb-4">
            ПРОЕКТЫ
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Экосистема цифровых решений на стыке технологий и бизнеса
          </p>
        </div>

        {/* Projects grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-window neomorph p-6 cursor-pointer transition-all duration-300 hover:translate-y-[-4px]"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-[10px] tracking-wider text-gray-400 uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-1">
                    {project.title}
                  </h3>
                </div>
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ background: project.statusColor }}
                />
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map(tech => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-[10px] bg-gray-100 text-gray-500 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{project.status}</span>
                <button className="px-4 py-2 text-xs font-medium text-cyan-600 bg-cyan-50 rounded-lg hover:bg-cyan-100 transition-colors">
                  Открыть проект
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
