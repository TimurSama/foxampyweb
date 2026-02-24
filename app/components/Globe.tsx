'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

// Types
interface PlanetData {
  id: number
  name: string
  icon: string
  description: string
  fullText: string
  angle: number
}

interface GlobeProps {
  onPlanetClick?: (planet: PlanetData | null) => void
  selectedPlanet: PlanetData | null
}

// Blockchain network component - amorphous blob inside globe
function BlockchainNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const particlesRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  
  const { positions, velocities } = useMemo(() => {
    const particleCount = 100
    const positions = new Float32Array(particleCount * 3)
    const velocities: THREE.Vector3[] = []
    
    for (let i = 0; i < particleCount; i++) {
      const r = Math.random() * 1.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      
      velocities.push(new THREE.Vector3(
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01,
        (Math.random() - 0.5) * 0.01
      ))
    }
    
    return { positions, velocities }
  }, [])

  useFrame((state) => {
    if (!particlesRef.current) return
    
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < positions.length / 3; i++) {
      // Slowly drift particles
      positions[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001
      positions[i * 3 + 1] += Math.cos(state.clock.elapsedTime * 0.3 + i) * 0.001
      positions[i * 3 + 2] += Math.sin(state.clock.elapsedTime * 0.4 + i) * 0.001
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      {/* Amorphous particle cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ffffff"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

// Branching threads that extend from globe
function BranchingThreads() {
  const groupRef = useRef<THREE.Group>(null)
  const [threads, setThreads] = useState<{ id: number; points: THREE.Vector3[]; progress: number }[]>([])
  
  useEffect(() => {
    const interval = setInterval(() => {
      // Create new thread occasionally
      if (Math.random() > 0.7) {
        const angle = Math.random() * Math.PI * 2
        const height = (Math.random() - 0.5) * 2
        const startRadius = 2
        
        const startPoint = new THREE.Vector3(
          Math.cos(angle) * startRadius,
          height,
          Math.sin(angle) * startRadius
        )
        
        const points: THREE.Vector3[] = [startPoint]
        let currentPoint = startPoint.clone()
        
        // Generate branching path
        for (let i = 0; i < 10; i++) {
          const direction = new THREE.Vector3(
            Math.random() - 0.5,
            Math.random() - 0.5,
            Math.random() - 0.5
          ).normalize()
          
          currentPoint = currentPoint.clone().add(direction.multiplyScalar(0.3 + Math.random() * 0.5))
          points.push(currentPoint.clone())
        }
        
        setThreads(prev => [...prev.slice(-5), { id: Date.now(), points, progress: 0 }])
      }
    }, 800)
    
    return () => clearInterval(interval)
  }, [])
  
  useFrame(() => {
    setThreads(prev => prev.map(thread => ({
      ...thread,
      progress: Math.min(thread.progress + 0.02, 1.5)
    })).filter(thread => thread.progress < 1.5))
  })

  return (
    <group ref={groupRef}>
      {threads.map(thread => {
        const visiblePoints = thread.points.slice(0, Math.floor(thread.points.length * Math.min(thread.progress, 1)))
        if (visiblePoints.length < 2) return null
        
        const positions = new Float32Array(visiblePoints.length * 3)
        visiblePoints.forEach((p, i) => {
          positions[i * 3] = p.x
          positions[i * 3 + 1] = p.y
          positions[i * 3 + 2] = p.z
        })
        
        return (
          <line key={thread.id}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={visiblePoints.length}
                array={positions}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#666666" transparent opacity={1 - thread.progress / 1.5} />
          </line>
        )
      })}
    </group>
  )
}

// Main globe sphere
function GlobeSphere() {
  return (
    <group>
      {/* Inner core */}
      <mesh>
        <sphereGeometry args={[1.8, 64, 64]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[1.85, 32, 32]} />
        <meshBasicMaterial
          color="#333333"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  )
}

// Planet on the disk
function Planet({ 
  data, 
  isSelected, 
  onClick 
}: { 
  data: PlanetData
  isSelected: boolean
  onClick: () => void 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const x = Math.cos(data.angle) * 4.5
  const z = Math.sin(data.angle) * 4.5
  
  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
  })

  return (
    <group position={[x, 0, z]}>
      {/* Planet sphere */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
        scale={isSelected ? 1.3 : isHovered ? 1.1 : 1}
      >
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color={isSelected ? "#ffffff" : "#444444"}
          roughness={0.4}
          metalness={0.6}
          emissive={isSelected ? "#333333" : "#000000"}
        />
      </mesh>
      
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.55, 32]} />
        <meshBasicMaterial 
          color={isSelected ? "#ffffff" : "#333333"} 
          transparent 
          opacity={0.5}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Label */}
      <Html distanceFactor={10}>
        <div 
          className={`text-center cursor-pointer transition-all duration-300 ${isSelected ? 'scale-110' : ''}`}
          onClick={onClick}
        >
          <div className="text-2xl mb-1">{data.icon}</div>
          <div className={`text-[10px] uppercase tracking-wider whitespace-nowrap ${isSelected ? 'text-white' : 'text-gray-400'}`}>
            {data.name}
          </div>
        </div>
      </Html>
    </group>
  )
}

// Rotating disk with planets
function PlanetDisk({ 
  planets, 
  selectedPlanet, 
  onPlanetClick,
  isPaused 
}: { 
  planets: PlanetData[]
  selectedPlanet: PlanetData | null
  onPlanetClick: (planet: PlanetData) => void
  isPaused: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current || isPaused) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.08
  })

  return (
    <group ref={groupRef}>
      {/* Disk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.8, 4.2, 64]} />
        <meshBasicMaterial 
          color="#222222" 
          transparent 
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Disk lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.7, 3.75, 64]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.5} />
      </mesh>
      
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.25, 4.3, 64]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.5} />
      </mesh>
      
      {/* Planets */}
      {planets.map((planet) => (
        <Planet
          key={planet.id}
          data={planet}
          isSelected={selectedPlanet?.id === planet.id}
          onClick={() => onPlanetClick(planet)}
        />
      ))}
    </group>
  )
}

// Detail view that appears in center when planet selected
function DetailView({ planet, onClose }: { planet: PlanetData; onClose: () => void }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
      <div className="bg-bg-secondary/95 backdrop-blur-md border border-border-subtle p-8 max-w-lg mx-4 pointer-events-auto">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{planet.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-text-primary uppercase tracking-wider">
                {planet.name}
              </h3>
              <p className="text-sm text-text-secondary">{planet.description}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-text-tertiary hover:text-text-primary text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="prose prose-invert prose-sm max-w-none">
          <p className="text-text-secondary leading-relaxed whitespace-pre-line">
            {planet.fullText}
          </p>
        </div>
        
        <div className="mt-6 pt-4 border-t border-border-subtle">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-hover transition-colors text-sm"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}

// Scene component
function Scene({ onPlanetSelect, selectedPlanet }: { 
  onPlanetSelect: (planet: PlanetData | null) => void
  selectedPlanet: PlanetData | null 
}) {
  const planets: PlanetData[] = [
    {
      id: 0,
      name: 'Исследование',
      icon: '🔍',
      description: 'Анализ и аудит',
      fullText: 'Погружение в контекст проекта, изучение рынка, анализ конкурентов и целевой аудитории.\n\nНа этом этапе мы формируем глубокое понимание задачи, собираем инсайты и определяем ключевые точки роста.\n\n• Исследование рынка\n• Анализ конкурентов\n• Интервью с пользователями\n• Аудит текущих решений',
      angle: 0
    },
    {
      id: 1,
      name: 'Концепция',
      icon: '💡',
      description: 'Идея и позиционирование',
      fullText: 'Разработка концептуальных решений, креативных подходов и уникального торгового предложения.\n\nФормируем видение проекта, создаём концепции и тестируем гипотезы.\n\n• Брейнштормы\n• Концептуальные модели\n• Позиционирование\n• Визуальные метафоры',
      angle: Math.PI / 3
    },
    {
      id: 2,
      name: 'Проектирование',
      icon: '📐',
      description: 'Стратегия и архитектура',
      fullText: 'Стратегирование, разработка архитектуры, брендирование, визуализация дизайна и UX/UI.\n\nСоздаём детальные планы, проектируем интерфейсы и выстраиваем систему.\n\n• Информационная архитектура\n• UX-проектирование\n• Визуальный дизайн\n• Прототипирование',
      angle: (Math.PI * 2) / 3
    },
    {
      id: 3,
      name: 'Разработка',
      icon: '⚙️',
      description: 'Создание',
      fullText: 'Прототипирование, производство, строительство, техническая разработка и интеграции.\n\nПревращаем концепции в работающие продукты, пишем код и собираем решения.\n\n• Frontend разработка\n• Backend интеграции\n• Blockchain смарт-контракты\n• Тестирование',
      angle: Math.PI
    },
    {
      id: 4,
      name: 'Запуск',
      icon: '🚀',
      description: 'Релиз',
      fullText: 'Запуск продукта, вывод на рынок, маркетинговые кампании и первичный сбор обратной связи.\n\nОрганизуем запуск, привлекаем первых пользователей и собираем метрики.\n\n• Go-to-market стратегия\n• Маркетинговые кампании\n• PR и коммуникации\n• Сбор обратной связи',
      angle: (Math.PI * 4) / 3
    },
    {
      id: 5,
      name: 'Развитие',
      icon: '📈',
      description: 'Масштабирование',
      fullText: 'Поддержка, оптимизация, выход на новые рынки и масштабирование продукта.\n\nРазвиваем продукт, оптимизируем процессы и масштабируем успех.\n\n• Продуктовая аналитика\n• Оптимизация процессов\n• Масштабирование\n• Новые рынки',
      angle: (Math.PI * 5) / 3
    }
  ]

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} />
      
      <GlobeSphere />
      <BlockchainNetwork />
      <BranchingThreads />
      
      <PlanetDisk 
        planets={planets}
        selectedPlanet={selectedPlanet}
        onPlanetClick={onPlanetSelect}
        isPaused={!!selectedPlanet}
      />
      
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate={!selectedPlanet}
        autoRotateSpeed={0.2}
      />
    </>
  )
}

// Main export component
export function Globe() {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null)

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 4, 12], fov: 45 }}>
        <Scene 
          onPlanetSelect={setSelectedPlanet}
          selectedPlanet={selectedPlanet}
        />
      </Canvas>
      
      {selectedPlanet && (
        <DetailView 
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
    </div>
  )
}
