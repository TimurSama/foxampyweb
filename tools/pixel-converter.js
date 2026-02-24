/**
 * Pixel Art Converter (JavaScript version)
 */

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

async function convertToPixels(inputPath, outputPath, options = {}) {
  const {
    pixelSize = 4,
    targetWidth = 80,
    targetHeight = 120,
    threshold = 30
  } = options

  console.log(`Converting ${inputPath}...`)
  
  const image = sharp(inputPath)
  const { data, info } = await image
    .resize(targetWidth, targetHeight, { fit: 'cover' })
    .raw()
    .toBuffer({ resolveWithObject: true })

  const pixels = []
  const { width, height, channels } = info

  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      const idx = (y * width + x) * channels
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const a = channels === 4 ? data[idx + 3] : 255

      const brightness = (r + g + b) / 3
      if (brightness > threshold) {
        pixels.push({
          x: Math.floor(x / pixelSize),
          y: Math.floor(y / pixelSize),
          r, g, b, a,
          startX: Math.floor(x / pixelSize) + (Math.random() - 0.5) * 50,
          startY: -Math.floor(Math.random() * 100) - 20,
          delay: Math.random() * 1.5
        })
      }
    }
  }

  const result = {
    width: Math.ceil(width / pixelSize),
    height: Math.ceil(height / pixelSize),
    pixelSize,
    pixels,
    count: pixels.length
  }

  const dir = path.dirname(outputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2))
  console.log(`✅ Saved ${pixels.length} pixels to ${outputPath}`)
}

// Convert both portraits
async function main() {
  try {
    await convertToPixels('public/photo/portrait_1.png', 'public/data/pixel-portrait-1.json', {
      pixelSize: 2,
      targetWidth: 100,
      targetHeight: 150,
      threshold: 50
    })
    
    await convertToPixels('public/photo/portrait_2.png', 'public/data/pixel-portrait-2.json', {
      pixelSize: 2,
      targetWidth: 100,
      targetHeight: 150,
      threshold: 50
    })
    
    console.log('\n✅ All conversions complete!')
  } catch (err) {
    console.error('Error:', err.message)
  }
}

main()
