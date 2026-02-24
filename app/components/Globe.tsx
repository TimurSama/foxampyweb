'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// Globe with connection lines
function GlobeMesh() {
  const groupRef = useRef<THREE.Group>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  
  const { positions, spherePositions } = useMemo(() => {
    const pos: number[] = []
    const spherePos: THREE.Vector3[] = []
    const particleCount = 150
    
    // Create particles on sphere surface (Fibonacci sphere)
    const phi = Math.PI * (3 - Math.sqrt(5))
    
    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = phi * i
      
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
      
      const vec = new THREE.Vector3(x, y, z).multiplyScalar(2)
      spherePos.push(vec)
    }
    
    // Create connections between nearby particles
    for (let i = 0; i < spherePos.length; i++) {
      for (let j = i + 1; j < spherePos.length; j++) {
        const dist = spherePos[i].distanceTo(spherePos[j])
        if (dist < 0.8) {
          pos.push(
            spherePos[i].x, spherePos[i].y, spherePos[i].z,
            spherePos[j].x, spherePos[j].y, spherePos[j].z
          )
        }
      }
    }
    
    return { 
      positions: new Float32Array(pos), 
      spherePositions: spherePos 
    }
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Inner sphere - dark core */}
      <mesh>
        <sphereGeometry args={[1.95, 64, 64]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Wireframe sphere */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial
          color="#333333"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#555555"
          transparent
          opacity={0.4}
        />
      </lineSegments>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.005, 16, 100]} />
        <meshBasicMaterial color="#444444" transparent opacity={0.5} />
      </mesh>
      
      {/* Second ring - tilted */}
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[3.5, 0.003, 16, 100]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.3} />
      </mesh>

      {/* Data points */}
      {spherePositions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial 
            color="#666666" 
            transparent 
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

// Floating particles around globe
function OrbitingParticles() {
  const groupRef = useRef<THREE.Group>(null)
  
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      angle: (i / 20) * Math.PI * 2,
      radius: 4 + Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.3,
      yOffset: (Math.random() - 0.5) * 2
    }))
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return
    
    particles.forEach((p, i) => {
      const mesh = groupRef.current!.children[i] as THREE.Mesh
      if (!mesh) return
      
      const time = state.clock.elapsedTime * p.speed
      mesh.position.x = Math.cos(time + p.angle) * p.radius
      mesh.position.z = Math.sin(time + p.angle) * p.radius
      mesh.position.y = Math.sin(time * 0.5) * 0.5 + p.yOffset
    })
  })

  return (
    <group ref={groupRef}>
      {particles.map((p) => (
        <mesh key={p.id}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial 
            color="#888888" 
            transparent 
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  )
}

// Connection lines from globe to cards
function ConnectionLines({ cardPositions }: { cardPositions: { x: number, y: number }[] }) {
  const linesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!linesRef.current) return
    linesRef.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <group ref={linesRef}>
      {cardPositions.map((pos, i) => {
        const angle = (i / cardPositions.length) * Math.PI * 2
        const startX = Math.cos(angle) * 2.5
        const startZ = Math.sin(angle) * 2.5
        
        return (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={2}
                array={new Float32Array([startX, 0, startZ, pos.x * 0.01, pos.y * 0.01, 5])}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#444444" transparent opacity={0.2} />
          </line>
        )
      })}
    </group>
  )
}

interface GlobeProps {
  cardPositions?: { x: number, y: number }[]
}

export function Globe({ cardPositions }: GlobeProps) {
  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />
        
        <GlobeMesh />
        <OrbitingParticles />
        {cardPositions && <ConnectionLines cardPositions={cardPositions} />}
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  )
}
