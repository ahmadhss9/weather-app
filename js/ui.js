/* ==========================================
   WEATHERVERSE — UI RENDERING MODULE
   ========================================== */

const UI = (() => {
    // SVG Weather Icons — inline, animated, no external assets needed
    const WEATHER_ICONS = {
        'clear': (isDay = true) => isDay ? `
            <svg viewBox="0 0 100 100" class="weather-icon-svg wi-sun">
                <circle cx="50" cy="50" r="16" fill="#FDBA74" stroke="#F59E0B" stroke-width="1"/>
                <g stroke="#FDBA74" stroke-width="3" stroke-linecap="round" opacity="0.9">
                    <line x1="50" y1="12" x2="50" y2="24"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/></line>
                    <line x1="50" y1="76" x2="50" y2="88"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="0.3s" repeatCount="indefinite"/></line>
                    <line x1="12" y1="50" x2="24" y2="50"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="0.6s" repeatCount="indefinite"/></line>
                    <line x1="76" y1="50" x2="88" y2="50"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="0.9s" repeatCount="indefinite"/></line>
                    <line x1="22" y1="22" x2="30" y2="30"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="1.2s" repeatCount="indefinite"/></line>
                    <line x1="70" y1="70" x2="78" y2="78"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="1.5s" repeatCount="indefinite"/></line>
                    <line x1="22" y1="78" x2="30" y2="70"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="1.8s" repeatCount="indefinite"/></line>
                    <line x1="70" y1="30" x2="78" y2="22"><animate attributeName="opacity" values="0.6;1;0.6" dur="3s" begin="2.1s" repeatCount="indefinite"/></line>
                </g>
            </svg>` : `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <path d="M60 30 A25 25 0 1 0 40 70 A20 20 0 0 1 60 30Z" fill="#CBD5E1" stroke="#94A3B8" stroke-width="1"/>
                <circle cx="30" cy="25" r="2" fill="#F1F5F9" opacity="0.7"><animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/></circle>
                <circle cx="75" cy="35" r="1.5" fill="#F1F5F9" opacity="0.5"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.5s" begin="0.5s" repeatCount="indefinite"/></circle>
                <circle cx="20" cy="60" r="1.5" fill="#F1F5F9" opacity="0.6"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" begin="1s" repeatCount="indefinite"/></circle>
                <circle cx="80" cy="70" r="2" fill="#F1F5F9" opacity="0.4"><animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" begin="0.3s" repeatCount="indefinite"/></circle>
            </svg>`,
        'partly-cloudy': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <circle cx="38" cy="35" r="14" fill="#FDBA74" stroke="#F59E0B" stroke-width="1"/>
                <g stroke="#FDBA74" stroke-width="2" stroke-linecap="round" opacity="0.6">
                    <line x1="38" y1="10" x2="38" y2="17"/>
                    <line x1="18" y1="25" x2="13" y2="22"/>
                    <line x1="16" y1="42" x2="10" y2="46"/>
                </g>
                <path d="M35 72 Q20 72 20 62 Q20 52 30 50 Q28 38 42 35 Q56 30 62 42 Q65 38 74 40 Q84 42 84 52 Q90 54 90 62 Q90 72 78 72 Z" fill="#94A3B8" stroke="#64748B" stroke-width="1">
                    <animateTransform attributeName="transform" type="translate" values="0,0;2,-1;0,0" dur="4s" repeatCount="indefinite"/>
                </path>
            </svg>`,
        'cloudy': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg wi-cloud">
                <path d="M28 70 Q12 70 12 58 Q12 46 24 44 Q22 28 38 24 Q54 18 62 32 Q66 26 78 28 Q90 30 90 44 Q98 46 98 58 Q98 70 82 70 Z" fill="#94A3B8" stroke="#64748B" stroke-width="1">
                    <animateTransform attributeName="transform" type="translate" values="0,0;3,-2;0,0" dur="5s" repeatCount="indefinite"/>
                </path>
                <path d="M15 80 Q6 80 6 72 Q6 64 14 62 Q12 52 24 50 Q36 46 42 56 Q45 52 52 54 Q60 55 60 64 Q66 66 66 72 Q66 80 56 80 Z" fill="#64748B" opacity="0.5">
                    <animateTransform attributeName="transform" type="translate" values="0,0;-2,1;0,0" dur="6s" repeatCount="indefinite"/>
                </path>
            </svg>`,
        'fog': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <line x1="15" y1="40" x2="85" y2="40" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" opacity="0.5"><animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite"/></line>
                <line x1="10" y1="52" x2="90" y2="52" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" opacity="0.7"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.5s" begin="0.5s" repeatCount="indefinite"/></line>
                <line x1="20" y1="64" x2="80" y2="64" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" opacity="0.4"><animate attributeName="opacity" values="0.2;0.5;0.2" dur="5s" begin="1s" repeatCount="indefinite"/></line>
            </svg>`,
        'drizzle': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <path d="M25 55 Q12 55 12 45 Q12 35 22 33 Q20 20 34 17 Q48 12 55 24 Q58 20 68 22 Q78 24 78 35 Q85 37 85 45 Q85 55 72 55 Z" fill="#64748B" stroke="#475569" stroke-width="1"/>
                <line x1="30" y1="62" x2="28" y2="72" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/></line>
                <line x1="50" y1="62" x2="48" y2="72" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.3s" repeatCount="indefinite"/></line>
                <line x1="70" y1="62" x2="68" y2="72" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.6s" repeatCount="indefinite"/></line>
            </svg>`,
        'rain': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <path d="M25 50 Q12 50 12 40 Q12 30 22 28 Q20 15 34 12 Q48 7 55 20 Q58 15 68 17 Q78 19 78 30 Q85 32 85 40 Q85 50 72 50 Z" fill="#475569" stroke="#334155" stroke-width="1"/>
                <line x1="28" y1="58" x2="24" y2="74" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"><animate attributeName="y1" values="58;60;58" dur="0.6s" repeatCount="indefinite"/><animate attributeName="y2" values="74;78;74" dur="0.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" repeatCount="indefinite"/></line>
                <line x1="42" y1="56" x2="38" y2="72" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"><animate attributeName="opacity" values="0.4;1;0.4" dur="0.7s" begin="0.2s" repeatCount="indefinite"/></line>
                <line x1="56" y1="58" x2="52" y2="74" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"><animate attributeName="opacity" values="0.4;1;0.4" dur="0.9s" begin="0.4s" repeatCount="indefinite"/></line>
                <line x1="70" y1="56" x2="66" y2="72" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"><animate attributeName="opacity" values="0.4;1;0.4" dur="0.8s" begin="0.1s" repeatCount="indefinite"/></line>
            </svg>`,
        'heavy-rain': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <path d="M22 48 Q8 48 8 38 Q8 28 18 26 Q16 12 32 8 Q46 2 54 16 Q57 11 68 13 Q80 15 80 28 Q88 30 88 38 Q88 48 74 48 Z" fill="#334155" stroke="#1E293B" stroke-width="1"/>
                <line x1="25" y1="55" x2="18" y2="80" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.5s" repeatCount="indefinite"/></line>
                <line x1="38" y1="53" x2="31" y2="78" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.4s" begin="0.15s" repeatCount="indefinite"/></line>
                <line x1="51" y1="55" x2="44" y2="80" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.6s" begin="0.3s" repeatCount="indefinite"/></line>
                <line x1="64" y1="53" x2="57" y2="78" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.45s" begin="0.1s" repeatCount="indefinite"/></line>
                <line x1="77" y1="55" x2="70" y2="80" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"><animate attributeName="opacity" values="0.3;1;0.3" dur="0.55s" begin="0.25s" repeatCount="indefinite"/></line>
            </svg>`,
        'snow': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <path d="M25 52 Q12 52 12 42 Q12 32 22 30 Q20 17 34 14 Q48 9 55 22 Q58 17 68 19 Q78 21 78 32 Q85 34 85 42 Q85 52 72 52 Z" fill="#94A3B8" stroke="#64748B" stroke-width="1"/>
                <circle cx="30" cy="64" r="3" fill="#E2E8F0"><animate attributeName="cy" values="60;80;60" dur="3s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite"/></circle>
                <circle cx="50" cy="62" r="3.5" fill="#E2E8F0"><animate attributeName="cy" values="58;78;58" dur="3.5s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="3.5s" begin="0.5s" repeatCount="indefinite"/></circle>
                <circle cx="70" cy="64" r="3" fill="#E2E8F0"><animate attributeName="cy" values="60;80;60" dur="2.8s" begin="1s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.8s" begin="1s" repeatCount="indefinite"/></circle>
            </svg>`,
        'heavy-snow': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <path d="M22 48 Q8 48 8 38 Q8 28 18 26 Q16 12 32 8 Q46 2 54 16 Q57 11 68 13 Q80 15 80 28 Q88 30 88 38 Q88 48 74 48 Z" fill="#64748B" stroke="#475569" stroke-width="1"/>
                <circle cx="22" cy="60" r="3" fill="#E2E8F0"><animate attributeName="cy" values="56;82;56" dur="2.5s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.5s" repeatCount="indefinite"/></circle>
                <circle cx="38" cy="58" r="3.5" fill="#E2E8F0"><animate attributeName="cy" values="54;80;54" dur="3s" begin="0.3s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="3s" begin="0.3s" repeatCount="indefinite"/></circle>
                <circle cx="54" cy="60" r="3" fill="#E2E8F0"><animate attributeName="cy" values="56;82;56" dur="2.8s" begin="0.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.8s" begin="0.6s" repeatCount="indefinite"/></circle>
                <circle cx="70" cy="58" r="3.5" fill="#E2E8F0"><animate attributeName="cy" values="54;80;54" dur="3.2s" begin="0.9s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="3.2s" begin="0.9s" repeatCount="indefinite"/></circle>
                <circle cx="84" cy="60" r="3" fill="#E2E8F0"><animate attributeName="cy" values="56;82;56" dur="2.6s" begin="1.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0;1" dur="2.6s" begin="1.2s" repeatCount="indefinite"/></circle>
            </svg>`,
        'thunderstorm': () => `
            <svg viewBox="0 0 100 100" class="weather-icon-svg">
                <path d="M22 44 Q8 44 8 34 Q8 24 18 22 Q16 8 32 4 Q46 -2 54 12 Q57 7 68 9 Q80 11 80 24 Q88 26 88 34 Q88 44 74 44 Z" fill="#334155" stroke="#1E293B" stroke-width="1"/>
                <polygon points="48,48 40,68 50,68 42,90 62,62 52,62 58,48" fill="#FDBA74" stroke="#F59E0B" stroke-width="1">
                    <animate attributeName="opacity" values="0.4;1;0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
                </polygon>
                <line x1="30" y1="50" x2="26" y2="68" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.5s" repeatCount="indefinite"/></line>
                <line x1="72" y1="50" x2="68" y2="68" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"><animate attributeName="opacity" values="0.3;0.8;0.3" dur="0.6s" begin="0.2s" repeatCount="indefinite"/></line>
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
            this.style.position = 'relative';
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
