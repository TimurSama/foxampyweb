'use client'

import { useEffect, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

interface Pixel {
  x: number
  y: number
  r: number
  g: number
  b: number
  a: number
  startX: number
  startY: number
  delay: number
}

interface PixelData {
  width: number
  height: number
  pixelSize: number
  pixels: Pixel[]
}

interface PixelCanvasProps {
  data: PixelData
  className?: string
  animated?: boolean
  pixelScale?: number
}

export function PixelCanvas({ 
  data, 
  className = '', 
  animated = true,
  pixelScale = 3 
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const animationRef = useRef<number>()

  const drawPixels = useCallback((progress: number = 1) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    pixelsRef.current.forEach(pixel => {
      const currentDelay = pixel.delay * 0.3
      let pixelProgress = Math.max(0, Math.min(1, (progress - currentDelay) / 0.7))
      
      // Easing
      pixelProgress = pixelProgress < 0.5 
        ? 4 * pixelProgress * pixelProgress * pixelProgress 
        : 1 - Math.pow(-2 * pixelProgress + 2, 3) / 2

      const x = pixel.startX + (pixel.x - pixel.startX) * pixelProgress
      const y = pixel.startY + (pixel.y - pixel.startY) * pixelProgress
      
      const alpha = pixel.a * pixelProgress / 255
      
      ctx.fillStyle = `rgba(${pixel.r}, ${pixel.g}, ${pixel.b}, ${alpha})`
      ctx.fillRect(
        x * pixelScale, 
        y * pixelScale, 
        pixelScale - 0.5, 
        pixelScale - 0.5
      )
    })
  }, [pixelScale])

  useGSAP(() => {
    if (!animated || !canvasRef.current) return

    pixelsRef.current = data.pixels
    
    const canvas = canvasRef.current
    canvas.width = data.width * pixelScale
    canvas.height = data.height * pixelScale

    // Initial draw (empty)
    drawPixels(0)

    // Animate
    const tl = gsap.timeline()
    
    tl.to({ progress: 0 }, {
      progress: 1,
      duration: 2.5,
      ease: 'power3.out',
      onUpdate: function() {
        drawPixels(this.targets()[0].progress)
      }
    })

    return () => {
      tl.kill()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [data, animated, drawPixels, pixelScale])

  // Static draw for non-animated
  useEffect(() => {
    if (animated) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = data.width * pixelScale
    canvas.height = data.height * pixelScale
    
    pixelsRef.current = data.pixels
    drawPixels(1)
  }, [data, animated, drawPixels, pixelScale])

  return (
    <canvas
      ref={canvasRef}
      className={`pixel-canvas ${className}`}
      style={{ 
        imageRendering: 'pixelated',
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  )
}
