# WeatherVerse — Cinematic Weather Experience

A premium, fully animated cinematic weather platform built with **pure HTML, CSS, and Vanilla JavaScript**. No frameworks, no libraries — just raw web technologies delivering a movie-like weather experience.

![WeatherVerse](https://img.shields.io/badge/WeatherVerse-Cinematic%20Weather-38BDF8?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## Features

### Core Functionality

- **Automatic Geolocation** — Detects your current location on load
- **Live Weather Data** — Real-time accurate weather forecasting
- **City Search** — Search any city worldwide instantly
- **7-Day Forecast** — Daily high/low temps, conditions, and weather icons
- **Hourly Timeline** — Scrollable 24-hour forecast with precipitation chances
- **Weather Details** — Feels like, humidity, wind speed, UV index, sunrise & sunset

### Dynamic Atmosphere System

The website automatically transforms its entire visual atmosphere based on current weather:

| Mode           | Description                                                 |
| -------------- | ----------------------------------------------------------- |
| ☀️ **Sunny**   | Golden gradients, animated sun, warm particles, soft clouds |
| 🌧️ **Rain**    | Falling rain drops, dark sky, storm clouds, water effects   |
| ❄️ **Snow**    | Falling snowflakes, frost-blue gradients, fog layers        |
| 🌙 **Night**   | Twinkling stars, moon glow, dark atmospheric sky            |
| ⛈️ **Thunder** | Lightning flashes, heavy rain, dramatic dark sky            |
| ☁️ **Cloudy**  | Drifting clouds, muted gradients, calm atmosphere           |

### Premium Design

- Cinematic typography with **Outfit** and **Inter** fonts
- Dark & Light theme toggle with smooth transitions
- Solid modern cards with layered shadows (no blur/glassmorphism)
- 60fps animations — CSS keyframes and transforms
- Responsive from desktop to mobile

### Animation System

- Animated weather backgrounds (clouds, particles, rain, snow, stars)
- Card entrance animations with stagger delays
- Smooth temperature counter animation
- Ripple click effects on buttons
- Hover lift and scale transitions
- Loading screen with animated icons and progress bar

---

## Project Structure

```
weather-app/
│
├── index.html              # Main HTML structure
├── css/
│   ├── style.css           # Core design system & component styles
│   ├── animations.css      # All CSS keyframe animations
│   ├── weather.css         # Weather-mode-specific styles
│   └── responsive.css      # Responsive breakpoints
│
├── js/
│   ├── app.js              # Main application orchestrator
│   ├── weather.js          # Weather API & data module
│   ├── ui.js               # UI rendering & weather icons
│   ├── animations.js       # Dynamic weather effects engine
│   └── search.js           # City search module
│
└── README.md               # This file
```

---


## Getting Started

1. **Clone or download** this folder
2. **Open `index.html`** in any modern browser
3. **Allow location access** when prompted (or search for a city)
4. Enjoy the cinematic weather experience!

> No build tools, no npm install, no server setup required. Just open and go.

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Color Themes

### Dark Theme

| Color     | Hex       | Usage                |
| --------- | --------- | -------------------- |
| Deep Navy | `#060816` | Primary background   |
| Slate     | `#0F172A` | Secondary background |
| Dark Card | `#111827` | Card backgrounds     |
| Cyan      | `#38BDF8` | Accent / highlights  |
| Purple    | `#8B5CF6` | Secondary accent     |

### Light Theme

| Color      | Hex       | Usage                |
| ---------- | --------- | -------------------- |
| White      | `#FFFFFF` | Card backgrounds     |
| Light Gray | `#F1F5F9` | Secondary background |
| Blue       | `#93C5FD` | Accent elements      |
| Orange     | `#FDBA74` | Warm highlights      |

---

## Credits

- Fonts by [Google Fonts](https://fonts.google.com/)

---

**WeatherVerse © 2026** — Cinematic Weather Experience
