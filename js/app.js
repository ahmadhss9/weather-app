/* ==========================================
   WEATHERVERSE — MAIN APPLICATION
   ========================================== */

const App = (() => {
    let currentTheme = 'light';
    let audioEnabled = true;
    let currentWeatherMode = null;
    let currentLocation = null;

    // ========== INITIALIZATION ==========
    async function init() {
        UI.updateLoadingProgress(10);

        // Setup theme
        const savedTheme = localStorage.getItem('weatherverse-theme') || 'light';
        setTheme(savedTheme);

        // Unlock audio on first interaction (browser autoplay policy)
        document.body.addEventListener('click', function unlockAudio() {
            if (audioEnabled) {
                const bgMusic = document.getElementById('audio-bg-sweet');
                if (bgMusic && bgMusic.paused) {
                    bgMusic.play().catch(() => {});
                    if (currentWeatherMode) updateAudioForWeather(currentWeatherMode);
                }
            }
            document.body.removeEventListener('click', unlockAudio);
        }, { once: true });

        // Setup event listeners
        setupThemeToggle();
        setupAudioToggle();
        setupNavbarScroll();
        setupLocationButton();
        UI.setupHourlyScroll();

        // Add ripple effects to buttons
        document.querySelectorAll('.search-toggle, .audio-toggle, .theme-toggle, .scroll-btn, .city-indicator').forEach(btn => {
            UI.addRipple(btn);
        });

        UI.updateLoadingProgress(20);

        // Initialize search
        Search.init(handleCitySelected);

        // Setup scroll animations
        Animations.setupScrollAnimations();

        UI.updateLoadingProgress(40);

        // Fast path for LCP: Use IP location
        try {
            const ipData = await WeatherAPI.detectLocationIP();
            currentLocation = { ...ipData, displayName: `${ipData.city}${ipData.country ? ', ' + ipData.country : ''}` };
            
            const weatherData = await WeatherAPI.fetchWeather(ipData.lat, ipData.lon);
            UI.updateLoadingProgress(90);
            renderAll(weatherData, currentLocation);
            UI.updateLoadingProgress(100);
            
            setTimeout(() => UI.hideLoadingScreen(), 300);

            // Attempt high accuracy in background silently (optional)
            if (navigator.geolocation) {
                navigator.permissions.query({ name: 'geolocation' }).then(result => {
                    if (result.state === 'granted') {
                        WeatherAPI.detectLocation().then(async (coords) => {
                            const locationInfo = await WeatherAPI.reverseGeocode(coords.lat, coords.lon);
                            currentLocation = { ...locationInfo, lat: coords.lat, lon: coords.lon };
                            const freshWeather = await WeatherAPI.fetchWeather(coords.lat, coords.lon);
                            renderAll(freshWeather, currentLocation);
                        }).catch(() => {});
                    }
                }).catch(() => {});
            }

        } catch (error) {
            console.warn('IP Location failed, falling back to London:', error.message);
            await loadWeatherForCity(51.5074, -0.1278, 'London', 'United Kingdom');
        }
    }

    // ========== LOAD WEATHER FOR COORDINATES ==========
    async function loadWeatherForCity(lat, lon, city, country) {
        try {
            UI.updateLoadingProgress(70);

            const locationInfo = city
                ? { city, country, displayName: `${city}, ${country}` }
                : await WeatherAPI.reverseGeocode(lat, lon);

            currentLocation = { ...locationInfo, lat, lon };

            const weatherData = await WeatherAPI.fetchWeather(lat, lon);
            UI.updateLoadingProgress(100);

            renderAll(weatherData, currentLocation);

            setTimeout(() => UI.hideLoadingScreen(), 300);
        } catch (error) {
            console.error('Failed to load weather:', error);
        }
    }

    // ========== RENDER ALL ==========
    function renderAll(weatherData, location) {
        // Update UI
        UI.renderWeather(weatherData, location);

        // Set weather atmosphere
        const mode = weatherData.current.weatherMode;
        if (mode !== currentWeatherMode) {
            currentWeatherMode = mode;
            Animations.setWeatherMode(mode);
            updateAudioForWeather(mode);
        }
    }

    // ========== CITY SELECTED FROM SEARCH ==========
    async function handleCitySelected(locationData) {
        currentLocation = locationData;

        try {
            const weatherData = await WeatherAPI.fetchWeather(locationData.lat, locationData.lon);
            renderAll(weatherData, locationData);
        } catch (error) {
            console.error('Failed to fetch weather for selected city:', error);
        }
    }

    // ========== LOCATION BUTTON ==========
    function setupLocationButton() {
        const btn = document.getElementById('city-indicator');
        btn.addEventListener('click', async () => {
            const cityNameNav = document.getElementById('city-name-nav');
            const originalText = cityNameNav.textContent;
            cityNameNav.textContent = 'Detecting...';
            btn.style.opacity = '0.7';
            btn.style.pointerEvents = 'none';

            try {
                const coords = await WeatherAPI.detectLocation();
                const locationInfo = await WeatherAPI.reverseGeocode(coords.lat, coords.lon);
                currentLocation = { ...locationInfo, lat: coords.lat, lon: coords.lon };
                const weatherData = await WeatherAPI.fetchWeather(coords.lat, coords.lon);
                renderAll(weatherData, currentLocation);
            } catch (error) {
                console.warn('Location detection failed:', error.message);
                cityNameNav.textContent = originalText;
                alert("Could not detect location. Please check browser permissions.");
            } finally {
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            }
        });
    }

    // ========== NAVBAR SCROLL BEHAVIOR ==========
    function setupNavbarScroll() {
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            if (window.scrollY < 50) {
                // Always show at the top
                navbar.classList.remove('navbar-hidden');
            } else if (window.scrollY > lastScrollY) {
                // Scrolling down
                navbar.classList.add('navbar-hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('navbar-hidden');
            }
            lastScrollY = window.scrollY;
        });
    }

    // ========== THEME TOGGLE ==========
    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(currentTheme);
        });
    }

    function setTheme(theme) {
        currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('weatherverse-theme', theme);
    }

    // ========== AUDIO SYSTEM ==========
    function setupAudioToggle() {
        const toggle = document.getElementById('audio-toggle');
        const audioOn = toggle.querySelector('.audio-on');
        const audioOff = toggle.querySelector('.audio-off');

        toggle.addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            if (audioEnabled) {
                toggle.classList.remove('muted');
                audioOn.style.display = 'block';
                audioOff.style.display = 'none';
                updateAudioForWeather(currentWeatherMode);
            } else {
                toggle.classList.add('muted');
                audioOn.style.display = 'none';
                audioOff.style.display = 'block';
                stopAllAudio();
            }
        });

        // Start based on audioEnabled flag
        if (audioEnabled) {
            toggle.classList.remove('muted');
            audioOn.style.display = 'block';
            audioOff.style.display = 'none';
        } else {
            toggle.classList.add('muted');
            audioOn.style.display = 'none';
            audioOff.style.display = 'block';
        }
    }

    function updateAudioForWeather(mode) {
        if (!audioEnabled) return;

        stopAllAudio();

        try {
            // ALWAYS play soft background music
            const bgMusic = document.getElementById('audio-bg-sweet');
            if (bgMusic) bgMusic.play().catch(e => console.log('Audio error (autoplay blocked?):', e));

            if (mode === 'rain') {
                const rain = document.getElementById('audio-rain');
                if (rain) rain.play().catch(e => console.log('Audio error:', e));
                const softMusic = document.getElementById('audio-soft-rain-music');
                if (softMusic) softMusic.play().catch(e => console.log('Audio error:', e));
            } else if (mode === 'thunder') {
                const thunder = document.getElementById('audio-thunder');
                if (thunder) thunder.play().catch(e => console.log('Audio error:', e));
                const rain = document.getElementById('audio-rain');
                if (rain) rain.play().catch(e => console.log('Audio error:', e));
            } else if (mode === 'sunny') {
                const birds = document.getElementById('audio-birds');
                if (birds) birds.play().catch(e => console.log('Audio error:', e));
            } else if (mode === 'snow' || mode === 'cloudy') {
                const wind = document.getElementById('audio-wind');
                if (wind) wind.play().catch(e => console.log('Audio error:', e));
            } else if (mode === 'night') {
                const night = document.getElementById('audio-night');
                if (night) night.play().catch(e => console.log('Audio error:', e));
            }
        } catch (error) {
            console.log('Audio playback failed', error);
        }
    }

    function stopAllAudio() {
        ['audio-rain', 'audio-thunder', 'audio-wind', 'audio-birds', 'audio-night', 'audio-bg-sweet', 'audio-soft-rain-music'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.pause();
                el.currentTime = 0;
            }
        });
    }

    // ========== START ==========
    document.addEventListener('DOMContentLoaded', init);

    return { init };
})();
