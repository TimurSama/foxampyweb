/** @type {import('next').NextConfig} */
// Этот конфиг для статической сборки (GitHub Pages fallback)
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
