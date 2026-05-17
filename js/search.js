/* ==========================================
   WEATHERVERSE — SEARCH MODULE
   ========================================== */

const Search = (() => {
    let searchTimeout = null;
    let activeIndex = -1; // keyboard navigation index

    function init(onCitySelected) {
        const searchToggle = document.getElementById('search-toggle');
        const searchContainer = document.getElementById('search-container');
        const searchInput = document.getElementById('search-input');
        const suggestionsBox = document.getElementById('search-suggestions');

        // Focus search input when clicking the search icon
        searchToggle.addEventListener('click', () => {
            searchInput.focus();
        });

        // Close search suggestions on outside click
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                suggestionsBox.classList.remove('active');
                activeIndex = -1;
            }
        });

        // Live search on every keystroke with fast debounce
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();

            if (searchTimeout) clearTimeout(searchTimeout);

            if (query.length < 1) {
                suggestionsBox.classList.remove('active');
                suggestionsBox.innerHTML = '';
                activeIndex = -1;
                return;
            }

            // Show a quick "Searching..." indicator
            suggestionsBox.innerHTML = `<div class="suggestion-item suggestion-loading"><span>Searching for "${query}"...</span></div>`;
            suggestionsBox.classList.add('active');

            searchTimeout = setTimeout(async () => {
                const results = await WeatherAPI.searchCity(query);
                activeIndex = -1;
                renderSuggestions(results, query, suggestionsBox, searchInput, searchContainer, onCitySelected);
            }, 200); // Fast 200ms debounce for live feel
        });

        // Keyboard navigation (ArrowUp, ArrowDown, Enter, Escape)
        searchInput.addEventListener('keydown', async (e) => {
            const items = suggestionsBox.querySelectorAll('.suggestion-item:not(.suggestion-loading):not(.suggestion-empty)');

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = Math.min(activeIndex + 1, items.length - 1);
                updateActiveItem(items);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = Math.max(activeIndex - 1, -1);
                updateActiveItem(items);
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (activeIndex >= 0 && items[activeIndex]) {
                    items[activeIndex].click();
                } else {
                    // Select the first result
                    const query = searchInput.value.trim();
                    if (query.length >= 1) {
                        const results = await WeatherAPI.searchCity(query);
                        if (results.length > 0) {
                            selectCity(results[0], searchInput, suggestionsBox, searchContainer, onCitySelected);
                        }
                    }
                }
            } else if (e.key === 'Escape') {
                searchInput.blur();
                suggestionsBox.classList.remove('active');
                activeIndex = -1;
            }
        });

        // Re-show suggestions when focusing back on input
        searchInput.addEventListener('focus', () => {
            const query = searchInput.value.trim();
            if (query.length >= 1 && suggestionsBox.children.length > 0) {
                suggestionsBox.classList.add('active');
            }
        });
    }

    function updateActiveItem(items) {
        items.forEach((item, i) => {
            if (i === activeIndex) {
                item.classList.add('suggestion-active');
                item.scrollIntoView({ block: 'nearest' });
            } else {
                item.classList.remove('suggestion-active');
            }
        });
    }

    function renderSuggestions(results, query, suggestionsBox, searchInput, searchContainer, onCitySelected) {
        suggestionsBox.innerHTML = '';

        if (results.length === 0) {
            suggestionsBox.innerHTML = `<div class="suggestion-item suggestion-empty" style="color:var(--text-muted);cursor:default;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="suggestion-pin" style="opacity:0.4">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <span>No cities found for "<strong>${query}</strong>"</span>
            </div>`;
            suggestionsBox.classList.add('active');
            return;
        }

        results.forEach((result, i) => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';

            // Highlight the matching part of the city name
            const cityName = result.city || '';
            const highlightedCity = highlightMatch(cityName, query);

            // Build location details (state/region + country)
            const parts = result.displayName.split(', ');
            const details = parts.slice(1).join(', ');

            item.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="suggestion-pin">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                <div class="suggestion-text">
                    <span class="suggestion-city">${highlightedCity}</span>
                    <span class="suggestion-details">${details}</span>
                </div>
            `;

            item.addEventListener('click', () => {
                selectCity(result, searchInput, suggestionsBox, searchContainer, onCitySelected);
            });

            // Hover highlight
            item.addEventListener('mouseenter', () => {
                activeIndex = i;
                const allItems = suggestionsBox.querySelectorAll('.suggestion-item:not(.suggestion-loading):not(.suggestion-empty)');
                updateActiveItem(allItems);
            });

            suggestionsBox.appendChild(item);
        });

        suggestionsBox.classList.add('active');
    }

    function highlightMatch(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig');
        return text.replace(regex, '<mark>$1</mark>');
    }

    function selectCity(result, searchInput, suggestionsBox, searchContainer, onCitySelected) {
        searchInput.value = '';
        suggestionsBox.classList.remove('active');
        suggestionsBox.innerHTML = '';
        activeIndex = -1;

        if (onCitySelected) {
            onCitySelected({
                lat: result.lat,
                lon: result.lon,
                city: result.city,
                country: result.country,
                displayName: `${result.city}, ${result.country}`
            });
        }
    }

    return { init };
})();
