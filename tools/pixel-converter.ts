/**
 * Pixel Art Converter
 * Конвертирует изображение в пиксельную сетку для анимации
 */

import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

interface Pixel {
  x: number
  y: number
  r: number
  g: number
  b: number
  a: number
}

interface PixelGrid {
  width: number
  height: number
  pixels: Pixel[]
}

export async function convertToPixels(
  inputPath: string,
  outputPath: string,
  options: {
    pixelSize?: number
    targetWidth?: number
    targetHeight?: number
    threshold?: number
  } = {}
): Promise<void> {
  const {
    pixelSize = 4,
    targetWidth = 80,
    targetHeight = 120,
    threshold = 30
  } = options

  // Читаем и ресайзим изображение
  const image = sharp(inputPath)
  const { data, info } = await image
    .resize(targetWidth, targetHeight, { fit: 'cover' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels: Pixel[] = []
  const { width, height, channels } = info

  // Конвертируем в пиксели
  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      const idx = (y * width + x) * channels
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const a = channels === 4 ? data[idx + 3] : 255

      // Фильтруем слишком темные пиксели
      const brightness = (r + g + b) / 3
      if (brightness > threshold) {
        pixels.push({ x, y, r, g, b, a })
      }
    }
  }

  // Добавляем случайный разброс для анимации
  const pixelsWithAnimation = pixels.map(p => ({
    ...p,
    startX: p.x + (Math.random() - 0.5) * 200,
    startY: -Math.random() * 500 - 100,
    delay: Math.random() * 2,
  }))

  const result = {
    width,
    height,
    pixelSize,
    pixels: pixelsWithAnimation,
    count: pixelsWithAnimation.length
  }

  // Сохраняем JSON
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))
  console.log(`✅ Converted: ${pixelsWithAnimation.length} pixels saved to ${outputPath}`)
}

// CLI usage
if (require.main === module) {
  const inputFile = process.argv[2] || 'public/photo/portrait_1.png'
  const outputFile = process.argv[3] || 'public/data/pixel-portrait-1.json'
  
  // Создаем папку если нет
  const dir = path.dirname(outputFile)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  convertToPixels(inputFile, outputFile, {
    pixelSize: 3,
    targetWidth: 60,
    targetHeight: 100,
    threshold: 40
  }).catch(console.error)
}
