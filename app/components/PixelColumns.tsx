'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface ColumnPixel {
  x: number
  y: number
  char: string
  targetY: number
  speed: number
  delay: number
  opacity: number
}

export function PixelColumns() {
  const containerRef = useRef<HTMLDivElement>(null)
  const columnsRef = useRef<HTMLDivElement[]>([])
  const pixelsRef = useRef<ColumnPixel[][]>([[], [], []])

  // ASCII characters for column texture
  const chars = '▓▒░█▄▀■□▪▫▬▲▼◄►◊○●◘◙◦'
  
  useEffect(() => {
    // Generate column pixels
    const columns = [0, 1, 2]
    columns.forEach((colIdx) => {
      const pixels: ColumnPixel[] = []
      const baseX = colIdx * 15 // Column spacing
      
      // Create column shape
      for (let y = 0; y < 60; y++) {
        // Column width varies by height (tapered)
        const width = y < 5 || y > 55 ? 6 : y < 10 || y > 50 ? 8 : 10
        const startX = baseX + (12 - width) / 2
        
        for (let x = 0; x < width; x++) {
          if (Math.random() > 0.3) { // Random gaps for pixelated look
            pixels.push({
              x: startX + x,
              y,
              char: chars[Math.floor(Math.random() * chars.length)],
              targetY: y,
              speed: 0.5 + Math.random() * 1,
              delay: Math.random() * 1.5 + colIdx * 0.3,
              opacity: 0.1 + Math.random() * 0.4
            })
          }
        }
      }
      
      // Add capital decorations
      if (colIdx === 0 || colIdx === 2) {
        for (let x = -1; x < 13; x++) {
          for (let y = 0; y < 4; y++) {
            if (Math.random() > 0.4) {
              pixels.push({
                x: baseX + x,
                y: y,
                char: '▓',
                targetY: y,
                speed: 1 + Math.random(),
                delay: 0.5 + Math.random() * 0.5,
                opacity: 0.6 + Math.random() * 0.4
              })
            }
          }
        }
      }
      
      pixelsRef.current[colIdx] = pixels
    })
  }, [])

  useGSAP(() => {
    const container = containerRef.current
    if (!container) return

    // Animate each column
    columnsRef.current.forEach((col, idx) => {
      if (!col) return
      
      const pixels = col.querySelectorAll('.column-pixel')
      
      gsap.fromTo(pixels, 
        {
          y: -200,
          opacity: 0,
          scale: 0
        },
        {
          y: 0,
          opacity: (i) => pixelsRef.current[idx][i]?.opacity || 0.3,
          scale: 1,
          duration: 1,
          stagger: {
            each: 0.01,
            from: 'random'
          },
          ease: 'power3.out',
          delay: idx * 0.2
        }
      )
    })
  }, [])

  return (
    <div ref={containerRef} className="relative flex justify-center items-end gap-8 h-[400px] md:h-[500px]">
      {[0, 1, 2].map((colIdx) => (
        <div
          key={colIdx}
          ref={(el) => { if (el) columnsRef.current[colIdx] = el }}
          className="relative"
          style={{ 
            width: '120px',
            fontFamily: 'monospace',
            fontSize: '8px',
            lineHeight: '8px'
          }}
        >
          {pixelsRef.current[colIdx].map((pixel, i) => (
            <span
              key={i}
              className="column-pixel absolute text-cyan-400 select-none"
              style={{
                left: `${pixel.x * 8}px`,
                top: `${pixel.y * 8}px`,
                opacity: pixel.opacity,
                textShadow: '0 0 4px rgba(0, 240, 255, 0.5)'
              }}
            >
              {pixel.char}
            </span>
          ))}
          
          {/* Column sign */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-[100px] py-3 px-2 border border-cyan-500/30 bg-bg-primary/80 backdrop-blur-sm"
            style={{ top: '120px' }}
          >
            <p className="text-[8px] text-cyan-300 text-center leading-tight">
              {colIdx === 0 && 'КРЕАТИВНЫЙ'}
              {colIdx === 1 && 'FOXAMPY'}
              {colIdx === 2 && 'ИННОВАТОР'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
