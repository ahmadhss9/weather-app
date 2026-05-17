/* ==========================================
   WEATHERVERSE — UI RENDERING MODULE
   ========================================== */

const UI = (() => {
    // SVG Weather Icons — inline, animated, no external assets needed
    // Premium 3D-like Glowing Weather Icons
    const WEATHER_ICONS = {
        'clear': (isDay = true) => isDay ? `
            <svg viewBox="0 0 100 100" class="weather-icon-svg wi-sun">
                <defs>
                    <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#FFE066"/>
                        <stop offset="100%" stop-color="#F59E0B"/>
                    </linearGradient>
                    <filter id="glowSun" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <circle cx="50" cy="50" r="22" fill="url(#sunGrad)" filter="url(#glowSun)"/>
                <g stroke="#FDE68A" stroke-width="4" stroke-linecap="round" opacity="0.9">
                    <line x1="50" y1="8" x2="50" y2="18"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/></line>
                    <line x1="50" y1="82" x2="50" y2="92"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.2s" repeatCount="indefinite"/></line>
                    <line x1="8" y1="50" x2="18" y2="50"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.4s" repeatCount="indefinite"/></line>
                    <line x1="82" y1="50" x2="92" y2="50"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.6s" repeatCount="indefinite"/></line>
                    <line x1="20" y1="20" x2="28" y2="28"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="0.8s" repeatCount="indefinite"/></line>
                    <line x1="72" y1="72" x2="80" y2="80"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="1s" repeatCount="indefinite"/></line>
                    <line x1="20" y1="80" x2="28" y2="72"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="1.2s" repeatCount="indefinite"/></line>
                    <line x1="72" y1="28" x2="80" y2="20"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" begin="1.4s" repeatCount="indefinite"/></line>
                </g>
            </svg>` : `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <defs>
                    <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#F1F5F9"/>
                        <stop offset="100%" stop-color="#94A3B8"/>
                    </linearGradient>
                    <filter id="glowMoon">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
                <path d="M 50 20 A 30 30 0 1 1 50 80 A 15 30 0 1 0 50 20 Z" fill="url(#moonGrad)" filter="url(#glowMoon)"/>
                <circle cx="25" cy="25" r="2" fill="#FFF"><animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="80" cy="30" r="1.5" fill="#FFF"><animate attributeName="opacity" values="0.2;1;0.2" dur="2.5s" begin="0.5s" repeatCount="indefinite"/></circle>
                <circle cx="20" cy="70" r="1.5" fill="#FFF"><animate attributeName="opacity" values="0.2;1;0.2" dur="3s" begin="1s" repeatCount="indefinite"/></circle>
                <circle cx="75" cy="80" r="2" fill="#FFF"><animate attributeName="opacity" values="0.2;1;0.2" dur="1.8s" begin="0.3s" repeatCount="indefinite"/></circle>
            </svg>`,
        'partly-cloudy': (isDay = true) => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <defs>
                    <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#FFFFFF"/>
                        <stop offset="100%" stop-color="#CBD5E1"/>
                    </linearGradient>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="#000" flood-opacity="0.2"/>
                    </filter>
                </defs>
                ${isDay ? '<circle cx="35" cy="35" r="18" fill="#F59E0B" filter="url(#shadow)"/>' : '<path d="M45 25 A18 18 0 1 0 35 55 A15 15 0 0 1 45 25Z" fill="#94A3B8" filter="url(#shadow)"/>'}
                <path d="M30 75 Q15 75 15 60 Q15 45 30 43 Q30 25 50 25 Q70 25 72 43 Q85 45 85 60 Q85 75 70 75 Z" fill="url(#cloudGrad)" filter="url(#shadow)">
                    <animateTransform attributeName="transform" type="translate" values="0,0;3,-1;0,0" dur="4s" repeatCount="indefinite"/>
                </path>
            </svg>`,
        'cloudy': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg wi-cloud">
                <defs>
                    <linearGradient id="cloudGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#FFFFFF"/>
                        <stop offset="100%" stop-color="#CBD5E1"/>
                    </linearGradient>
                    <linearGradient id="cloudGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#E2E8F0"/>
                        <stop offset="100%" stop-color="#94A3B8"/>
                    </linearGradient>
                    <filter id="shadowCloud">
                        <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.15"/>
                    </filter>
                </defs>
                <path d="M25 80 Q10 80 10 65 Q10 50 25 48 Q25 30 45 30 Q65 30 67 48 Q80 50 80 65 Q80 80 65 80 Z" fill="url(#cloudGrad2)" opacity="0.8" filter="url(#shadowCloud)">
                    <animateTransform attributeName="transform" type="translate" values="0,0;-4,2;0,0" dur="5s" repeatCount="indefinite"/>
                </path>
                <path d="M35 70 Q20 70 20 55 Q20 40 35 38 Q35 20 55 20 Q75 20 77 38 Q90 40 90 55 Q90 70 75 70 Z" fill="url(#cloudGrad1)" filter="url(#shadowCloud)">
                    <animateTransform attributeName="transform" type="translate" values="0,0;4,-2;0,0" dur="6s" repeatCount="indefinite"/>
                </path>
            </svg>`,
        'fog': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <defs>
                    <linearGradient id="fogGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
                        <stop offset="50%" stop-color="rgba(255,255,255,0.9)"/>
                        <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
                    </linearGradient>
                </defs>
                <rect x="10" y="35" width="80" height="8" rx="4" fill="url(#fogGrad)"><animate attributeName="x" values="5;15;5" dur="3s" repeatCount="indefinite"/></rect>
                <rect x="20" y="50" width="60" height="8" rx="4" fill="url(#fogGrad)"><animate attributeName="x" values="25;15;25" dur="4s" repeatCount="indefinite"/></rect>
                <rect x="15" y="65" width="70" height="8" rx="4" fill="url(#fogGrad)"><animate attributeName="x" values="10;20;10" dur="3.5s" repeatCount="indefinite"/></rect>
            </svg>`,
        'drizzle': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <defs>
                    <linearGradient id="cloudRain" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#E2E8F0"/>
                        <stop offset="100%" stop-color="#64748B"/>
                    </linearGradient>
                </defs>
                <path d="M30 65 Q15 65 15 50 Q15 35 30 33 Q30 15 50 15 Q70 15 72 33 Q85 35 85 50 Q85 65 70 65 Z" fill="url(#cloudRain)"/>
                <line x1="35" y1="70" x2="33" y2="80" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="1s" repeatCount="indefinite"/></line>
                <line x1="50" y1="70" x2="48" y2="80" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.3s" repeatCount="indefinite"/></line>
                <line x1="65" y1="70" x2="63" y2="80" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.6s" repeatCount="indefinite"/></line>
            </svg>`,
        'rain': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <defs>
                    <linearGradient id="cloudHeavyRain" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#94A3B8"/>
                        <stop offset="100%" stop-color="#475569"/>
                    </linearGradient>
                </defs>
                <path d="M30 55 Q15 55 15 40 Q15 25 30 23 Q30 5 50 5 Q70 5 72 23 Q85 25 85 40 Q85 55 70 55 Z" fill="url(#cloudHeavyRain)"/>
                <line x1="30" y1="65" x2="25" y2="85" stroke="#0EA5E9" stroke-width="3.5" stroke-linecap="round"><animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" repeatCount="indefinite"/><animate attributeName="y1" values="60;70;60" dur="0.6s" repeatCount="indefinite"/><animate attributeName="y2" values="80;90;80" dur="0.6s" repeatCount="indefinite"/></line>
                <line x1="45" y1="65" x2="40" y2="85" stroke="#0EA5E9" stroke-width="3.5" stroke-linecap="round"><animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" begin="0.2s" repeatCount="indefinite"/><animate attributeName="y1" values="60;70;60" dur="0.6s" begin="0.2s" repeatCount="indefinite"/><animate attributeName="y2" values="80;90;80" dur="0.6s" begin="0.2s" repeatCount="indefinite"/></line>
                <line x1="60" y1="65" x2="55" y2="85" stroke="#0EA5E9" stroke-width="3.5" stroke-linecap="round"><animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" begin="0.4s" repeatCount="indefinite"/><animate attributeName="y1" values="60;70;60" dur="0.6s" begin="0.4s" repeatCount="indefinite"/><animate attributeName="y2" values="80;90;80" dur="0.6s" begin="0.4s" repeatCount="indefinite"/></line>
                <line x1="75" y1="65" x2="70" y2="85" stroke="#0EA5E9" stroke-width="3.5" stroke-linecap="round"><animate attributeName="opacity" values="0.2;1;0.2" dur="0.6s" begin="0.1s" repeatCount="indefinite"/><animate attributeName="y1" values="60;70;60" dur="0.6s" begin="0.1s" repeatCount="indefinite"/><animate attributeName="y2" values="80;90;80" dur="0.6s" begin="0.1s" repeatCount="indefinite"/></line>
            </svg>`,
        'heavy-rain': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <defs>
                    <linearGradient id="cloudStorm" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#64748B"/>
                        <stop offset="100%" stop-color="#1E293B"/>
                    </linearGradient>
                </defs>
                <path d="M25 50 Q10 50 10 35 Q10 20 25 18 Q25 0 45 0 Q65 0 67 18 Q80 20 80 35 Q80 50 65 50 Z" fill="url(#cloudStorm)"/>
                <line x1="25" y1="60" x2="18" y2="95" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.4s" repeatCount="indefinite"/></line>
                <line x1="40" y1="60" x2="33" y2="95" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.3s" begin="0.1s" repeatCount="indefinite"/></line>
                <line x1="55" y1="60" x2="48" y2="95" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.5s" begin="0.2s" repeatCount="indefinite"/></line>
                <line x1="70" y1="60" x2="63" y2="95" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.4s" begin="0.15s" repeatCount="indefinite"/></line>
            </svg>`,
        'snow': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <defs>
                    <linearGradient id="cloudSnow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#F1F5F9"/>
                        <stop offset="100%" stop-color="#94A3B8"/>
                    </linearGradient>
                    <filter id="glowSnow">
                        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#38BDF8" flood-opacity="0.5"/>
                    </filter>
                </defs>
                <path d="M30 55 Q15 55 15 40 Q15 25 30 23 Q30 5 50 5 Q70 5 72 23 Q85 25 85 40 Q85 55 70 55 Z" fill="url(#cloudSnow)"/>
                <circle cx="30" cy="70" r="4" fill="#FFF" filter="url(#glowSnow)"><animate attributeName="cy" values="60;90;60" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite"/></circle>
                <circle cx="50" cy="70" r="4.5" fill="#FFF" filter="url(#glowSnow)"><animate attributeName="cy" values="65;95;65" dur="3.5s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="3.5s" begin="0.5s" repeatCount="indefinite"/></circle>
                <circle cx="70" cy="70" r="4" fill="#FFF" filter="url(#glowSnow)"><animate attributeName="cy" values="55;85;55" dur="2.8s" begin="1s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.8s" begin="1s" repeatCount="indefinite"/></circle>
            </svg>`,
        'heavy-snow': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <defs>
                    <linearGradient id="cloudSnowHeavy" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#CBD5E1"/>
                        <stop offset="100%" stop-color="#64748B"/>
                    </linearGradient>
                </defs>
                <path d="M25 50 Q10 50 10 35 Q10 20 25 18 Q25 0 45 0 Q65 0 67 18 Q80 20 80 35 Q80 50 65 50 Z" fill="url(#cloudSnowHeavy)"/>
                <circle cx="20" cy="65" r="3.5" fill="#FFF"><animate attributeName="cy" values="60;95;60" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="35" cy="65" r="4" fill="#FFF"><animate attributeName="cy" values="55;90;55" dur="2.2s" begin="0.3s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.2s" begin="0.3s" repeatCount="indefinite"/></circle>
                <circle cx="50" cy="65" r="3.5" fill="#FFF"><animate attributeName="cy" values="65;100;65" dur="1.8s" begin="0.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="1.8s" begin="0.6s" repeatCount="indefinite"/></circle>
                <circle cx="65" cy="65" r="4.5" fill="#FFF"><animate attributeName="cy" values="55;90;55" dur="2.5s" begin="0.8s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.5s" begin="0.8s" repeatCount="indefinite"/></circle>
                <circle cx="80" cy="65" r="3.5" fill="#FFF"><animate attributeName="cy" values="60;95;60" dur="2.1s" begin="0.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.1s" begin="0.2s" repeatCount="indefinite"/></circle>
            </svg>`,
        'thunderstorm': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <defs>
                    <linearGradient id="cloudThunder" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#475569"/>
                        <stop offset="100%" stop-color="#0F172A"/>
                    </linearGradient>
                    <filter id="glowLightning">
                        <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#FCD34D" flood-opacity="0.8"/>
                    </filter>
                </defs>
                <path d="M30 45 Q15 45 15 30 Q15 15 30 13 Q30 -5 50 -5 Q70 -5 72 13 Q85 15 85 30 Q85 45 70 45 Z" fill="url(#cloudThunder)"/>
                <polygon points="55,45 45,70 58,70 48,98 75,60 62,60 70,45" fill="#FCD34D" filter="url(#glowLightning)">
                    <animate attributeName="opacity" values="0.1;1;0.1;1;0.1" dur="1.5s" repeatCount="indefinite"/>
                </polygon>
                <line x1="30" y1="55" x2="25" y2="85" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="0.4s" repeatCount="indefinite"/></line>
                <line x1="80" y1="55" x2="75" y2="85" stroke="#38BDF8" stroke-width="3" stroke-linecap="round"><animate attributeName="opacity" values="0.2;0.8;0.2" dur="0.5s" begin="0.2s" repeatCount="indefinite"/></line>
            </svg>`
    };

    function getWeatherIcon(iconName, isDay = true, size = 'normal') {
        const iconFn = WEATHER_ICONS[iconName] || WEATHER_ICONS['clear'];
        return iconFn(isDay);
    }

    // Format time string from ISO
    function formatTime(isoString) {
        if (!isoString) return '--:--';
        const date = new Date(isoString);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    }

    // Format current date
    function formatCurrentDate() {
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        });
    }

    // Update hero section
    function updateHero(data, location) {
        const heroTemp = document.getElementById('hero-temp');
        const heroCondition = document.getElementById('hero-condition');
        const heroCityName = document.getElementById('hero-city-name');
        const heroDate = document.getElementById('hero-date');
        const heroIcon = document.getElementById('hero-weather-icon');
        const cityNameNav = document.getElementById('city-name-nav');

        // Animate temperature counter
        animateTemperature(heroTemp, data.temperature);

        heroCondition.textContent = data.condition;
        heroCityName.textContent = location.displayName;
        heroDate.textContent = formatCurrentDate();
        heroIcon.innerHTML = getWeatherIcon(data.icon, data.isDay);
        cityNameNav.textContent = location.city;
    }

    // Animated temperature counter
    function animateTemperature(element, target) {
        const current = parseInt(element.textContent) || 0;
        const diff = target - current;
        const duration = 800;
        const start = performance.now();

        function step(timestamp) {
            const elapsed = timestamp - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const value = Math.round(current + diff * eased);
            element.textContent = `${value}°`;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // Update weather details panel
    function updateDetails(data) {
        document.getElementById('feels-like').textContent = `${data.feelsLike}°`;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('wind-speed').textContent = `${data.windSpeed} km/h`;
        document.getElementById('uv-index').textContent = data.uvIndex != null ? data.uvIndex : '--';
        document.getElementById('sunrise').textContent = formatTime(data.sunrise);
        document.getElementById('sunset').textContent = formatTime(data.sunset);

        // Animate detail cards with stagger
        const cards = document.querySelectorAll('.detail-card');
        cards.forEach((card, i) => {
            card.classList.remove('visible');
            setTimeout(() => {
                card.classList.add('visible');
            }, 100 + i * 80);
        });
    }

    // Render hourly forecast
    function renderHourly(hourlyData, isDay) {
        const container = document.getElementById('hourly-container');
        container.innerHTML = '';

        hourlyData.forEach((hour, i) => {
            const card = document.createElement('div');
            card.className = `hourly-card${hour.isNow ? ' now' : ''}`;
            card.innerHTML = `
                <div class="hourly-time">${hour.isNow ? 'Now' : hour.hour}</div>
                <div class="hourly-icon">${getWeatherIcon(hour.icon, isDay)}</div>
                <div class="hourly-temp">${hour.temperature}°</div>
                <div class="hourly-rain">${hour.precipitation || 0}%</div>
            `;
            container.appendChild(card);

            // Stagger animation
            setTimeout(() => card.classList.add('visible'), 50 + i * 40);
        });
    }

    // Render 7-day forecast
    function renderForecast(forecastData) {
        const container = document.getElementById('forecast-container');
        container.innerHTML = '';

        forecastData.forEach((day, i) => {
            const card = document.createElement('div');
            card.className = `forecast-card${day.isToday ? ' today' : ''}`;
            card.innerHTML = `
                <div class="forecast-day">${day.day}</div>
                <div class="forecast-icon">${getWeatherIcon(day.icon, true)}</div>
                <div class="forecast-temps">
                    <span class="forecast-high">${day.high}°</span>
                    <span class="forecast-low">${day.low}°</span>
                </div>
                <div class="forecast-condition">${day.condition}</div>
            `;
            container.appendChild(card);

            // Stagger animation
            setTimeout(() => card.classList.add('visible'), 150 + i * 80);
        });
    }

    // Render all weather UI
    function renderWeather(weatherData, location) {
        updateHero(weatherData.current, location);
        updateDetails(weatherData.current);
        renderHourly(weatherData.hourly, weatherData.current.isDay);
        renderForecast(weatherData.forecast);
    }

    // Show / hide loading screen
    function hideLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        const app = document.getElementById('app');
        loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            app.classList.remove('hidden');
            app.classList.add('visible');
        }, 800);
    }

    function updateLoadingProgress(percent) {
        const bar = document.getElementById('loading-bar');
        if (bar) bar.style.width = `${percent}%`;
    }

    // Setup scroll buttons for hourly
    function setupHourlyScroll() {
        const container = document.getElementById('hourly-container');
        const leftBtn = document.getElementById('hourly-scroll-left');
        const rightBtn = document.getElementById('hourly-scroll-right');

        leftBtn.addEventListener('click', () => {
            container.scrollBy({ left: -200, behavior: 'smooth' });
        });
        rightBtn.addEventListener('click', () => {
            container.scrollBy({ left: 200, behavior: 'smooth' });
        });
    }

    // Ripple effect for buttons
    function addRipple(button) {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${e.clientX - rect.left - 100}px`;
            ripple.style.top = `${e.clientY - rect.top - 100}px`;
            
            if (window.getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }

    return {
        renderWeather,
        hideLoadingScreen,
        updateLoadingProgress,
        getWeatherIcon,
        setupHourlyScroll,
        addRipple,
        formatCurrentDate
    };
})();
