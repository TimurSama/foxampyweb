# 🚀 Деплой на Render

## Быстрый старт (2 минуты)

### Шаг 1: Запушь на GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/foxampy-web.git
git push -u origin main
```

### Шаг 2: Создай сервис на Render

1. Зайди на [render.com](https://render.com) (регистрация через GitHub)
2. Нажми **New +** → **Web Service**
3. Выбери свой репозиторий `foxampy-web`
4. Заполни поля:

| Поле | Значение |
|------|----------|
| Name | `foxampy` |
| Runtime | Node |
| Build Command | `npm install && npm run convert-pixels && npm run build` |
| Start Command | `npm start` |
| Plan | Free |

5. Нажми **Create Web Service**

### Шаг 3: Готово! 🎉

Сайт будет доступен через 2-3 минуты по адресу:
```
https://foxampy.onrender.com
```

## Автодеплой

При каждом `git push` в main ветку сайт автоматически пересоберётся!

## Переменные окружения (опционально)

В Dashboard → Environment добавь:

```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Почему Render лучше GitHub Pages?

| | Render | GitHub Pages |
|---|--------|--------------|
| **Скорость** | ⚡ SSR - быстрее | 🐌 Static - медленнее |
| **URL** | foxampy.onrender.com | username.github.io/repo |
| **3D/WebGL** | ✅ Работает идеально | ⚠️ Могут быть проблемы |
| **API Routes** | ✅ Поддерживаются | ❌ Не поддерживаются |
| **Анимации** | ✅ Плавные 60fps | ⚠️ Зависит от устройства |

## Решение проблем

### Сборка долгая
На Free плане сборка может занимать 3-5 минут - это нормально.

### Ошибка памяти
Если видишь "out of memory" - обнови package.json:
```json
"build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
```

### Не отображаются пиксельные портреты
Убедись что скрипт конвертации отработал:
```bash
npm run convert-pixels
```

## Свой домен (опционально)

В Dashboard → Settings → Custom Domain можно подключить свой домен бесплатно:
- Бесплатные SSL сертификаты
- Автообновление
