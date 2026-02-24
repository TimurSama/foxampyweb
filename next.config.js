/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export для Render (надежнее чем SSR на Free плане)
  output: 'export',
  distDir: 'dist',
  
  images: {
    unoptimized: true,
  },
  
  // trailingSlash для правильных путей
  trailingSlash: true,
  
  // Отключаем source maps для уменьшения размера
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
