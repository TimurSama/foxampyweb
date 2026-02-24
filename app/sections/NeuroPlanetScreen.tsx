'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

// Neural network lines component
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  
  const { positions, colors } = useMemo(() => {
    const pos: number[] = []
    const cols: number[] = []
    const particleCount = 80
    const particles: THREE.Vector3[] = []
    
    // Create particles on sphere surface
    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / particleCount)
      const theta = Math.sqrt(particleCount * Math.PI) * phi
      
      const r = 2.5
      const x = r * Math.cos(theta) * Math.sin(phi)
      const y = r * Math.sin(theta) * Math.sin(phi)
      const z = r * Math.cos(phi)
      
      particles.push(new THREE.Vector3(x, y, z))
    }
    
    // Create connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = particles[i].distanceTo(particles[j])
        if (dist < 1.8) {
          pos.push(
            particles[i].x, particles[i].y, particles[i].z,
            particles[j].x, particles[j].y, particles[j].z
          )
          
          const alpha = 1 - dist / 1.8
          cols.push(0, 0.94, 1, alpha, 0, 0.94, 1, alpha)
        }
      }
    }
    
    return { 
      positions: new Float32Array(pos), 
      colors: new Float32Array(cols) 
    }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive="#1a1a3a"
          emissiveIntensity={0.2}
          roughness={0.7}
          metalness={0.8}
        />
      </mesh>
      
      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[2.02, 24, 24]} />
        <meshBasicMaterial
          color="#00f0ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Neural connections */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 4}
            array={colors}
            itemSize={4}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, Math.PI / 4, 0]}>
        <torusGeometry args={[4.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

// Animated droplets
function Droplets() {
  const groupRef = useRef<THREE.Group>(null)
  
  const droplets = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i / 12) * Math.PI * 2,
      delay: i * 0.5,
      speed: 0.5 + Math.random() * 0.5
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    
    droplets.forEach((d, i) => {
      const mesh = groupRef.current!.children[i] as THREE.Mesh
      if (!mesh) return
      
      const time = state.clock.elapsedTime + d.delay
      const cycle = (time * d.speed) % 4
      
      if (cycle < 2) {
        // Forming phase
        const t = cycle / 2
        mesh.position.x = Math.cos(d.angle) * (3 + t * 2)
        mesh.position.z = Math.sin(d.angle) * (3 + t * 2)
        mesh.position.y = Math.sin(t * Math.PI) * 0.5
        mesh.scale.setScalar(0.1 + t * 0.4)
      } else {
        // Breaking away phase
        const t = (cycle - 2) / 2
        mesh.position.x = Math.cos(d.angle) * (5 + t * 8)
        mesh.position.z = Math.sin(d.angle) * (5 + t * 8)
        mesh.position.y = Math.sin(t * Math.PI) * 2
        mesh.scale.setScalar(0.5 - t * 0.5)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {droplets.map((d) => (
        <mesh key={d.id}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial 
            color="#00f0ff" 
            transparent 
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

interface MethodologyCardProps {
  title: string
  description: string
  icon: string
  color: string
  angle: number
  radius: number
}

function MethodologyCard({ title, description, icon, color, angle, radius }: MethodologyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius * 0.3

  return (
    <div
      ref={cardRef}
      className="methodology-card absolute p-4 rounded-lg border border-cyan-500/20 bg-bg-primary/90 backdrop-blur-sm w-40 transition-all duration-300 hover:scale-110 hover:border-cyan-500/50"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        boxShadow: `0 0 20px ${color}20`
      }}
    >
      <div 
        className="text-2xl mb-2"
        style={{ color }}
      >
        {icon}
      </div>
      <h3 className="text-xs font-bold text-text-primary mb-1">{title}</h3>
      <p className="text-[10px] text-text-secondary leading-tight">{description}</p>
    </div>
  )
}

export function NeuroPlanetScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useGSAP(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          
          // Animate cards
          gsap.fromTo('.methodology-card',
            { scale: 0, opacity: 0 },
            { 
              scale: 1, 
              opacity: 1, 
              duration: 0.6, 
              stagger: 0.1,
              ease: 'back.out(1.7)'
            }
          )
          
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const methodologies = [
    { title: 'КРЕАТИВНЫЙ', description: 'Нестандартные решения и арт-дирекшн', icon: '✦', color: '#00f0ff' },
    { title: 'ИННОВАТОРСКИЙ', description: 'Технологические прорывы и R&D', icon: '◈', color: '#7c3aed' },
    { title: 'НАУЧНЫЙ', description: 'Исследования и data-driven подход', icon: '◉', color: '#00d4aa' },
    { title: 'АРХИТЕКТУРНЫЙ', description: 'Системный дизайн и структуры', icon: '◆', color: '#ff6b6b' },
    { title: 'СИСТЕМНЫЙ', description: 'Интеграция и масштабирование', icon: '⚉', color: '#ffd93d' },
  ]

  return (
    <section 
      id="neuro" 
      ref={sectionRef}
      className="section bg-bg-primary relative"
    >
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
          
          {isVisible && (
            <>
              <NeuralNetwork />
              <Droplets />
              <Stars radius={50} depth={50} count={500} factor={3} saturation={0} fade speed={1} />
            </>
          )}
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Methodology cards overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="container mx-auto h-full relative">
          {methodologies.map((m, i) => (
            <MethodologyCard
              key={m.title}
              {...m}
              angle={(i / methodologies.length) * Math.PI * 2 - Math.PI / 2}
              radius={Math.min(300, window?.innerWidth ? window.innerWidth * 0.2 : 250)}
            />
          ))}
        </div>
      </div>

      {/* Section title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <h2 className="text-2xl md:text-4xl font-black tracking-widest">
          <span className="gradient-text">МЕТОДОЛОГИЯ</span>
        </h2>
        <p className="text-text-secondary text-xs md:text-sm mt-2 tracking-wider">
          БЛОКЧЕЙН-НЕЙРОСЕТЬ МЫШЛЕНИЯ
        </p>
      </div>
    </section>
  )
}
