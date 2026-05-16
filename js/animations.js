/* ==========================================
   WEATHERVERSE — ANIMATIONS MODULE
   ========================================== */

const Animations = (() => {
    let currentMode = null;
    let rainDrops = [];
    let snowParticles = [];
    let stars = [];
    let atmoParticles = [];
    let clouds = [];
    let lightningInterval = null;
    let animationFrameId = null;

    const particleLayer = () => document.getElementById('particle-layer');
    const cloudLayer = () => document.getElementById('cloud-layer');
    const overlayLayer = () => document.getElementById('overlay-layer');
    const starsLayer = () => document.getElementById('stars-layer');
    const weatherBg = () => document.getElementById('weather-bg');
    const moonContainer = () => document.getElementById('moon-container');

    // Clear all weather effects
    function clearEffects() {
        const pLayer = particleLayer();
        const cLayer = cloudLayer();
        const oLayer = overlayLayer();
        const sLayer = starsLayer();

        if (pLayer) pLayer.innerHTML = '';
        if (cLayer) cLayer.innerHTML = '';
        if (oLayer) oLayer.innerHTML = '';
        if (sLayer) sLayer.innerHTML = '';

        rainDrops = [];
        snowParticles = [];
        stars = [];
        atmoParticles = [];
        clouds = [];

        if (lightningInterval) {
            clearInterval(lightningInterval);
            lightningInterval = null;
        }

        const bg = weatherBg();
        if (bg) {
            bg.className = 'weather-background';
        }

        const moon = moonContainer();
        if (moon) moon.style.opacity = '0';

        const sL = starsLayer();
        if (sL) sL.style.opacity = '0';
    }

    // Set weather mode on background
    function setWeatherMode(mode) {
        if (currentMode === mode) return;
        currentMode = mode;
        clearEffects();

        const bg = weatherBg();
        if (bg) bg.classList.add(`weather-mode-${mode}`);

        // Add gradient overlay
        const overlay = overlayLayer();
        if (overlay) {
            const gradOverlay = document.createElement('div');
            gradOverlay.className = 'weather-gradient-overlay';
            overlay.appendChild(gradOverlay);
        }

        switch (mode) {
            case 'sunny': createSunnyEffects(); break;
            case 'rain': createRainEffects(); break;
            case 'snow': createSnowEffects(); break;
            case 'night': createNightEffects(); break;
            case 'cloudy': createCloudyEffects(); break;
            case 'thunder': createThunderEffects(); break;
            default: createSunnyEffects();
        }

        createClouds(mode);
        createAtmosphericParticles(mode);
    }

    // ========== SUNNY EFFECTS ==========
    function createSunnyEffects() {
        const overlay = overlayLayer();
        if (!overlay) return;

        // Sun element
        const sun = document.createElement('div');
        sun.className = 'sun-element';
        overlay.appendChild(sun);
    }

    // ========== RAIN EFFECTS ==========
    function createRainEffects() {
        const pLayer = particleLayer();
        if (!pLayer) return;

        const count = window.innerWidth < 600 ? 60 : 120;
        for (let i = 0; i < count; i++) {
            const drop = document.createElement('div');
            drop.className = `rain-drop${Math.random() > 0.7 ? ' heavy' : ''}`;
            drop.style.left = `${Math.random() * 100}%`;
            drop.style.height = `${15 + Math.random() * 25}px`;
            drop.style.animationDuration = `${0.4 + Math.random() * 0.6}s`;
            drop.style.animationDelay = `${Math.random() * 2}s`;
            drop.style.opacity = `${0.3 + Math.random() * 0.5}`;
            pLayer.appendChild(drop);
        }
    }

    // ========== SNOW EFFECTS ==========
    function createSnowEffects() {
        const pLayer = particleLayer();
        if (!pLayer) return;

        const count = window.innerWidth < 600 ? 40 : 80;
        for (let i = 0; i < count; i++) {
            const flake = document.createElement('div');
            flake.className = 'snow-particle';
            const size = 2 + Math.random() * 5;
            flake.style.width = `${size}px`;
            flake.style.height = `${size}px`;
            flake.style.left = `${Math.random() * 100}%`;
            flake.style.animationDuration = `${4 + Math.random() * 6}s`;
            flake.style.animationDelay = `${Math.random() * 5}s`;
            pLayer.appendChild(flake);
        }

        // Fog layer
        const overlay = overlayLayer();
        if (overlay) {
            const fog = document.createElement('div');
            fog.className = 'fog-layer';
            overlay.appendChild(fog);
        }
    }

    // ========== NIGHT EFFECTS ==========
    function createNightEffects() {
        const sLayer = starsLayer();
        if (!sLayer) return;

        sLayer.style.opacity = '1';

        // Stars
        const count = window.innerWidth < 600 ? 50 : 120;
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            const size = 1 + Math.random() * 2.5;
            star.className = `star${Math.random() > 0.8 ? ' bright' : ''}`;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 60}%`;
            star.style.animationDuration = `${2 + Math.random() * 4}s`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            sLayer.appendChild(star);
        }

        // Moon
        const moon = moonContainer();
        if (moon) {
            moon.style.opacity = '1';
        }
    }

    // ========== CLOUDY EFFECTS ==========
    function createCloudyEffects() {
        // Just clouds + atmospheric particles (handled separately)
    }

    // ========== THUNDER EFFECTS ==========
    function createThunderEffects() {
        // Rain first
        createRainEffects();

        // Lightning flashes
        const overlay = overlayLayer();
        if (!overlay) return;

        const lightning = document.createElement('div');
        lightning.className = 'lightning-overlay';
        overlay.appendChild(lightning);

        lightningInterval = setInterval(() => {
            if (Math.random() > 0.4) {
                lightning.classList.remove('flash');
                void lightning.offsetWidth; // trigger reflow
                lightning.classList.add('flash');
            }
        }, 3000 + Math.random() * 5000);
    }

    // ========== CLOUDS ==========
    function createClouds(mode) {
        const cLayer = cloudLayer();
        if (!cLayer) return;

        let cloudCount, cloudOpacity;
        switch (mode) {
            case 'sunny':
                cloudCount = 3; cloudOpacity = 0.1;
                break;
            case 'cloudy':
                cloudCount = 6; cloudOpacity = 0.25;
                break;
            case 'rain':
            case 'thunder':
                cloudCount = 5; cloudOpacity = 0.2;
                break;
            case 'snow':
                cloudCount = 4; cloudOpacity = 0.15;
                break;
            case 'night':
                cloudCount = 2; cloudOpacity = 0.06;
                break;
            default:
                cloudCount = 3; cloudOpacity = 0.1;
        }

        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-svg-element';
            const sizeClass = ['large', 'medium', 'small'][Math.floor(Math.random() * 3)];
            cloud.classList.add(sizeClass);

            const topPos = 5 + Math.random() * 40;
            const direction = Math.random() > 0.5 ? 'cloudDrift1' : 'cloudDrift2';
            const duration = 40 + Math.random() * 60;

            cloud.style.top = `${topPos}%`;
            cloud.style.opacity = cloudOpacity + Math.random() * 0.1;
            cloud.style.animation = `${direction} ${duration}s linear infinite`;
            cloud.style.animationDelay = `${-Math.random() * duration}s`;

            const fill = mode === 'night' ? '#1E293B' :
                         mode === 'rain' || mode === 'thunder' ? '#2d3a50' :
                         mode === 'snow' ? '#8faabe' : '#c4d4e4';

            cloud.innerHTML = `
                <svg viewBox="0 0 200 100">
                    <path d="M40 80 Q10 80 10 60 Q10 40 30 36 Q26 15 50 10 Q74 2 85 20 Q90 12 108 16 Q126 18 126 38 Q140 40 140 56 Q140 80 110 80 Z" 
                          fill="${fill}" opacity="0.8"/>
                </svg>
            `;

            cLayer.appendChild(cloud);
        }
    }

    // ========== ATMOSPHERIC PARTICLES ==========
    function createAtmosphericParticles(mode) {
        const pLayer = particleLayer();
        if (!pLayer) return;

        let count, type;
        switch (mode) {
            case 'sunny':
                count = 15; type = 'warm';
                break;
            case 'rain':
            case 'thunder':
                count = 8; type = 'cool';
                break;
            case 'snow':
                count = 10; type = 'cool';
                break;
            case 'night':
                count = 12; type = 'neutral';
                break;
            default:
                count = 8; type = 'neutral';
        }

        if (window.innerWidth < 600) count = Math.floor(count / 2);

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = `atmo-particle ${type}`;
            const size = 3 + Math.random() * 6;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${40 + Math.random() * 50}%`;
            particle.style.animationDuration = `${6 + Math.random() * 10}s`;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            pLayer.appendChild(particle);
        }
    }

    // ========== INTERSECTION OBSERVER FOR SECTIONS ==========
    function setupScrollAnimations() {
        const sections = document.querySelectorAll('.weather-panel, .hourly-section, .forecast-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => observer.observe(section));
    }

    return {
        setWeatherMode,
        clearEffects,
        setupScrollAnimations
    };
})();
