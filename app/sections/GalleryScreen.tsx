'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Wave dots background
function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const draw = () => {
      ctx.fillStyle = '#0a0a0f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const cols = Math.ceil(canvas.width / 30)
      const rows = Math.ceil(canvas.height / 30)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const waveX = Math.sin(y * 0.1 + time) * 20
          const waveY = Math.cos(x * 0.1 + time) * 10
          
          const px = x * 30 + waveX
          const py = y * 30 + waveY
          
          const distFromCenter = Math.sqrt(
            Math.pow(px - canvas.width / 2, 2) + 
            Math.pow(py - canvas.height / 2, 2)
          )
          
          const opacity = Math.max(0, 1 - distFromCenter / 500) * 0.5
          
          ctx.beginPath()
          ctx.arc(px, py, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 240, 255, ${opacity})`
          ctx.fill()
        }
      }

      time += 0.02
      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      style={{ opacity: 0.6 }}
    />
  )
}

// Fashion gallery component
function FashionGallery() {
  const [images, setImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    // Scan fashion folder
    const fashionImages = [
      '/fation/photo_2026-01-30_12-26-56.jpg',
      '/fation/photo_2026-01-30_12-27-09.jpg',
      '/fation/photo_2026-01-30_12-27-19.jpg',
      '/fation/photo_2026-01-30_12-27-28.jpg',
      '/fation/photo_2026-01-30_12-27-32.jpg',
      '/fation/photo_2026-01-30_12-27-35.jpg',
      '/fation/photo_2026-01-30_12-27-39.jpg',
      '/fation/photo_2026-01-30_12-27-43.jpg',
    ]
    setImages(fashionImages)
  }, [])

  return (
    <div className="mb-20">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="w-8 h-px bg-accent-cyan" />
        ДИЗАЙНЕРСКАЯ КОЛЛЕКЦИЯ
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            className="gallery-item aspect-[3/4] overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedImage(src)}
          >
            <img
              src={src}
              alt={`Fashion ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="max-w-full max-h-full object-contain"
          />
          <button 
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

// Video showcase component
function VideoShowcase() {
  const [playing, setPlaying] = useState<number | null>(null)

  const videos = [
    {
      title: 'Need for Speed Underground',
      src: '/video/need-for-speed-underground-2-remaster-2022.mp4',
      thumbnail: '/video/nfs-thumb.jpg'
    },
    {
      title: 'Ryabov Project',
      src: '/video/ryabov.mp4',
      thumbnail: '/video/ryabov-thumb.jpg'
    }
  ]

  return (
    <div>
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <span className="w-8 h-px bg-accent-purple" />
        ВИДЕОРЕЛИКИ
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video, i) => (
          <div key={i} className="video-card relative aspect-video bg-bg-secondary rounded-lg overflow-hidden group">
            {playing === i ? (
              <video
                src={video.src}
                controls
                autoPlay
                className="w-full h-full"
                onEnded={() => setPlaying(null)}
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setPlaying(i)}
                    className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform"
                  >
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-white font-medium">{video.title}</h4>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function GalleryScreen() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-item',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.video-card',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.video-card',
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
      id="gallery" 
      ref={sectionRef}
      className="section bg-bg-primary relative overflow-hidden"
    >
      <WaveBackground />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="gradient-text">ГАЛЕРЕЯ</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Визуальные исследования и креативные проекты
          </p>
        </div>

        <FashionGallery />
        <VideoShowcase />
      </div>
    </section>
  )
}
