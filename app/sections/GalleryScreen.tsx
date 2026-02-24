'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Architecture gallery component
function ArchitectureGallery() {
  const [images, setImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    // Scan architecture folder
    const archImages = [
      '/architecture/image_2024-08-21_21-32-32.png',
      '/architecture/image_2024-08-21_21-32-39.png',
      '/architecture/image_2024-08-21_21-32-44.png',
    ]
    setImages(archImages)
  }, [])

  return (
    <div className="mb-20">
      <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-text-primary tracking-wide uppercase">
        <span className="w-8 h-px bg-text-tertiary" />
        Дизайн архитектуры интерьеров и пространств
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="arch-item aspect-[4/3] overflow-hidden cursor-pointer group relative border border-border-subtle"
            onClick={() => setSelectedImage(src)}
          >
            <img
              src={src}
              alt={`Architecture ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] text-white/70 tracking-wider uppercase">Проект 0{i + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="max-w-full max-h-full object-contain"
          />
          <button 
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary text-2xl transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

// Fashion gallery component
function FashionGallery() {
  const [images, setImages] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
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
      <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-text-primary tracking-wide uppercase">
        <span className="w-8 h-px bg-text-tertiary" />
        Дизайнерская коллекция
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <div
            key={i}
            className="gallery-item aspect-[3/4] overflow-hidden cursor-pointer group relative border border-border-subtle"
            onClick={() => setSelectedImage(src)}
          >
            <img
              src={src}
              alt={`Fashion ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-[10px] text-white/70 tracking-wider">0{i + 1}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <img 
            src={selectedImage} 
            alt="Selected" 
            className="max-w-full max-h-full object-contain"
          />
          <button 
            className="absolute top-4 right-4 text-text-secondary hover:text-text-primary text-2xl transition-colors"
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
      <h3 className="text-xl font-bold mb-8 flex items-center gap-3 text-text-primary tracking-wide uppercase">
        <span className="w-8 h-px bg-text-tertiary" />
        Видеорелизы
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((video, i) => (
          <div key={i} className="video-card relative aspect-video bg-bg-secondary border border-border-subtle overflow-hidden group">
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
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={() => setPlaying(i)}
                    className="w-16 h-16 border border-text-secondary/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform hover:border-text-primary"
                  >
                    <svg className="w-6 h-6 text-text-primary ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-text-primary font-medium text-sm">{video.title}</h4>
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
      gsap.fromTo('.arch-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.arch-item',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.gallery-item',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-item',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.video-card',
        { scale: 0.95, opacity: 0 },
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

      gsap.fromTo('.gallery-title',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-title',
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
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="gallery-title text-3xl md:text-5xl font-black mb-4 text-text-primary tracking-tight uppercase">
            Галерея
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Визуальные исследования и креативные проекты
          </p>
        </div>

        <ArchitectureGallery />
        <FashionGallery />
        <VideoShowcase />
      </div>
    </section>
  )
}
