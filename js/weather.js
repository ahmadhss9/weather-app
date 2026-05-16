/* ==========================================
   WEATHERVERSE — WEATHER API MODULE
   ========================================== */

const WeatherAPI = (() => {
    const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';
    const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';

    // WMO Weather Code Mapping
    const WMO_CODES = {
        0: { condition: 'Clear Sky', icon: 'clear', mode: 'sunny' },
        1: { condition: 'Mainly Clear', icon: 'clear', mode: 'sunny' },
        2: { condition: 'Partly Cloudy', icon: 'partly-cloudy', mode: 'cloudy' },
        3: { condition: 'Overcast', icon: 'cloudy', mode: 'cloudy' },
        45: { condition: 'Fog', icon: 'fog', mode: 'cloudy' },
        48: { condition: 'Depositing Rime Fog', icon: 'fog', mode: 'cloudy' },
        51: { condition: 'Light Drizzle', icon: 'drizzle', mode: 'rain' },
        53: { condition: 'Moderate Drizzle', icon: 'drizzle', mode: 'rain' },
        55: { condition: 'Dense Drizzle', icon: 'drizzle', mode: 'rain' },
        56: { condition: 'Freezing Drizzle', icon: 'drizzle', mode: 'rain' },
        57: { condition: 'Heavy Freezing Drizzle', icon: 'drizzle', mode: 'rain' },
        61: { condition: 'Slight Rain', icon: 'rain', mode: 'rain' },
        63: { condition: 'Moderate Rain', icon: 'rain', mode: 'rain' },
        65: { condition: 'Heavy Rain', icon: 'heavy-rain', mode: 'rain' },
        66: { condition: 'Freezing Rain', icon: 'rain', mode: 'rain' },
        67: { condition: 'Heavy Freezing Rain', icon: 'heavy-rain', mode: 'rain' },
        71: { condition: 'Slight Snow', icon: 'snow', mode: 'snow' },
        73: { condition: 'Moderate Snow', icon: 'snow', mode: 'snow' },
        75: { condition: 'Heavy Snow', icon: 'heavy-snow', mode: 'snow' },
        77: { condition: 'Snow Grains', icon: 'snow', mode: 'snow' },
        80: { condition: 'Slight Showers', icon: 'rain', mode: 'rain' },
        81: { condition: 'Moderate Showers', icon: 'rain', mode: 'rain' },
        82: { condition: 'Violent Showers', icon: 'heavy-rain', mode: 'rain' },
        85: { condition: 'Snow Showers', icon: 'snow', mode: 'snow' },
        86: { condition: 'Heavy Snow Showers', icon: 'heavy-snow', mode: 'snow' },
        95: { condition: 'Thunderstorm', icon: 'thunderstorm', mode: 'thunder' },
        96: { condition: 'Thunderstorm with Hail', icon: 'thunderstorm', mode: 'thunder' },
        99: { condition: 'Thunderstorm with Heavy Hail', icon: 'thunderstorm', mode: 'thunder' }
    };

    function getWeatherInfo(code) {
        return WMO_CODES[code] || { condition: 'Unknown', icon: 'clear', mode: 'sunny' };
    }

    // Detect current location using Geolocation API
    function detectLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser.'));
                return;
            }
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (error) => {
                    reject(new Error('Location access denied. Please search for a city.'));
                },
                { timeout: 10000, enableHighAccuracy: false }
            );
        });
    }

    // Reverse geocode coordinates to city name
    async function reverseGeocode(lat, lon) {
        try {
            const response = await fetch(
                `${NOMINATIM_BASE}/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
                { headers: { 'Accept-Language': 'en' } }
            );
            const data = await response.json();
            const addr = data.address || {};
            const city = addr.city || addr.town || addr.village || addr.county || addr.state || 'Unknown';
            const country = addr.country || '';
            return { city, country, displayName: `${city}, ${country}` };
        } catch (error) {
            return { city: 'Unknown', country: '', displayName: 'Unknown Location' };
        }
    }

    // Search for cities using Nominatim
    async function searchCity(query) {
        if (!query || query.length < 2) return [];
        try {
            const response = await fetch(
                `${NOMINATIM_BASE}/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`,
                { headers: { 'Accept-Language': 'en' } }
            );
            const data = await response.json();
            return data.map(item => ({
                displayName: item.display_name,
                city: item.address?.city || item.address?.town || item.address?.village || item.name,
                country: item.address?.country || '',
                lat: parseFloat(item.lat),
                lon: parseFloat(item.lon)
            }));
        } catch (error) {
            console.error('Search failed:', error);
            return [];
        }
    }

    // Fetch full weather data from Open-Meteo
    async function fetchWeather(lat, lon, timezone = 'auto') {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lon,
            current: [
                'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
                'weather_code', 'wind_speed_10m', 'is_day'
            ].join(','),
            hourly: [
                'temperature_2m', 'weather_code', 'precipitation_probability'
            ].join(','),
            daily: [
                'weather_code', 'temperature_2m_max', 'temperature_2m_min',
                'sunrise', 'sunset', 'uv_index_max', 'precipitation_probability_max'
            ].join(','),
            timezone: timezone,
            forecast_days: 7
        });

        const response = await fetch(`${OPEN_METEO_BASE}?${params}`);
        if (!response.ok) throw new Error('Weather data unavailable');
        const data = await response.json();
        return parseWeatherData(data);
    }

    // Parse raw API data into a structured format
    function parseWeatherData(raw) {
        const current = raw.current;
        const daily = raw.daily;
        const hourly = raw.hourly;
        const isDay = current.is_day === 1;
        const weatherInfo = getWeatherInfo(current.weather_code);

        // Determine weather mode (taking night into account)
        let weatherMode = weatherInfo.mode;
        if (!isDay && (weatherMode === 'sunny' || weatherMode === 'cloudy')) {
            weatherMode = 'night';
        }

        // Current weather
        const currentWeather = {
            temperature: Math.round(current.temperature_2m),
            feelsLike: Math.round(current.apparent_temperature),
            humidity: current.relative_humidity_2m,
            windSpeed: Math.round(current.wind_speed_10m),
            condition: weatherInfo.condition,
            icon: weatherInfo.icon,
            weatherMode: weatherMode,
            isDay: isDay,
            weatherCode: current.weather_code,
            sunrise: daily.sunrise[0],
            sunset: daily.sunset[0],
            uvIndex: daily.uv_index_max[0]
        };

        // 7-day forecast
        const forecast = [];
        for (let i = 0; i < daily.time.length; i++) {
            const dayInfo = getWeatherInfo(daily.weather_code[i]);
            forecast.push({
                date: daily.time[i],
                day: getDayName(daily.time[i], i === 0),
                high: Math.round(daily.temperature_2m_max[i]),
                low: Math.round(daily.temperature_2m_min[i]),
                condition: dayInfo.condition,
                icon: dayInfo.icon,
                weatherCode: daily.weather_code[i],
                precipitation: daily.precipitation_probability_max[i],
                isToday: i === 0
            });
        }

        // Hourly forecast (next 24 hours)
        const now = new Date();
        const currentHourIndex = hourly.time.findIndex(t => new Date(t) >= now);
        const startIndex = Math.max(0, currentHourIndex);
        const hourlyForecast = [];

        for (let i = startIndex; i < Math.min(startIndex + 24, hourly.time.length); i++) {
            const hourInfo = getWeatherInfo(hourly.weather_code[i]);
            const hourDate = new Date(hourly.time[i]);
            hourlyForecast.push({
                time: hourly.time[i],
                hour: formatHour(hourDate),
                temperature: Math.round(hourly.temperature_2m[i]),
                icon: hourInfo.icon,
                condition: hourInfo.condition,
                precipitation: hourly.precipitation_probability[i],
                isNow: i === startIndex
            });
        }

        return { current: currentWeather, forecast, hourly: hourlyForecast };
    }

    function getDayName(dateStr, isToday) {
        if (isToday) return 'Today';
        const date = new Date(dateStr + 'T00:00:00');
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    }

    function formatHour(date) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
    }

    return {
        detectLocation,
        reverseGeocode,
        searchCity,
        fetchWeather,
        getWeatherInfo
    };
})();
