# Foxampy Portfolio

Персональный сайт-портфолио с пиксельной эстетикой и неоморфным дизайном.

🔗 **Живой сайт**: https://foxampy.onrender.com

## 🎨 Структура сайта

1. **Hero** — Пиксельные колонны с табличками и портрет в ASCII-стиле
2. **NeuroPlanet** — 3D планета с нейро-связями и карточками методологий
3. **Projects** — Проекты на неоморфном гексагональном фоне
4. **Gallery** — Фотогалерея + видео с волновым фоном
5. **Cases** — Кейсы, исследования и разработки

## 🚀 Технологии

- **Framework**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + CSS Modules
- **Animation**: GSAP + Framer Motion
- **3D**: Three.js + React Three Fiber
- **Deploy**: Render (SSR)

## 📦 Установка

```bash
npm install
```

## 🔧 Разработка

```bash
npm run dev
# Откроется на http://localhost:3000
```

## 🖼️ Конвертация фото в пиксели

```bash
npm run convert-pixels
```

## 🏗️ Сборка

```bash
npm run build
npm start
```

## 🌐 Деплой на Render

### Вариант 1: Автодеплой из GitHub (рекомендуется)

1. Запушь код на GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/foxampy-web.git
git push -u origin main
```

2. На [render.com](https://render.com):
   - New → Web Service
   - Connect GitHub repository
   - Name: `foxampy`
   - Build Command: `npm install && npm run convert-pixels && npm run build`
   - Start Command: `npm start`
   - Plan: Free
   - Create Web Service

3. Готово! Сайт будет доступен по `https://foxampy.onrender.com`

### Вариант 2: Через Deploy Hook

1. В настройках сервиса на Render скопируй **Deploy Hook** URL
2. В GitHub репозитории: Settings → Secrets → New repository secret
3. Название: `RENDER_DEPLOY_HOOK`
4. Значение: твой Deploy Hook URL
5. Теперь при каждом push в main будет автодеплой

### Вариант 3: Blueprint (render.yaml)

Файл `render.yaml` уже создан. При подключении репозитория Render автоматически распознает конфигурацию.

## 📁 Структура проекта

```
├── app/
│   ├── sections/          # Экраны сайта
│   ├── components/        # React компоненты
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utilities
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Главная страница
├── public/                # Статические файлы
│   ├── photo/             # Фото для пиксель-эффекта
│   ├── fation/            # Фото галереи
│   ├── video/             # Видео
│   ├── architecture/      # Фото архитектуры
│   └── data/              # JSON с пиксельными данными
├── tools/                 # Скрипты
│   └── pixel-converter.js # Конвертер фото в пиксели
├── render.yaml            # Конфигурация Render
└── package.json
```

## 🎯 Преимущества Render vs GitHub Pages

| Feature | Render | GitHub Pages |
|---------|--------|--------------|
| SSR | ✅ Да | ❌ Нет |
| API Routes | ✅ Да | ❌ Нет |
| URL | Красивый субдомен | USERNAME.github.io |
| Скорость | Быстрее (SSR) | Медленнее (Static) |
| Автодеплой | ✅ Есть | ✅ Есть |

## 📄 Лицензия

MIT © Foxampy
