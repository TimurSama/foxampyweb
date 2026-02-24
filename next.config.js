/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем статический экспорт для Render (SSR)
  // Render поддерживает полноценный Next.js с сервером
  
  images: {
    // Временно отключаем оптимизацию для локальной сборки
    // На Render sharp будет работать нормально
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Отключаем SWC минимизацию для экономии памяти
  swcMinify: true,
  
  // Оптимизации для production
  compress: true,
  poweredByHeader: false,
  
  // Исключаем тяжелые файлы из сборки
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig
