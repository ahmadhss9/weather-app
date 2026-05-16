/* ==========================================
   WEATHERVERSE — SEARCH MODULE
   ========================================== */

const Search = (() => {
    let searchTimeout = null;
    let isExpanded = false;

    function init(onCitySelected) {
        const searchToggle = document.getElementById('search-toggle');
        const searchContainer = document.getElementById('search-container');
        const searchInput = document.getElementById('search-input');
        const suggestionsBox = document.getElementById('search-suggestions');

        // Toggle search expansion
        searchToggle.addEventListener('click', () => {
            isExpanded = !isExpanded;
            if (isExpanded) {
                searchContainer.classList.add('expanded');
                setTimeout(() => searchInput.focus(), 300);
            } else {
                searchContainer.classList.remove('expanded');
                searchInput.value = '';
                suggestionsBox.classList.remove('active');
                suggestionsBox.innerHTML = '';
            }
        });

        // Close search on outside click
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target) && isExpanded) {
                isExpanded = false;
                searchContainer.classList.remove('expanded');
                searchInput.value = '';
                suggestionsBox.classList.remove('active');
                suggestionsBox.innerHTML = '';
            }
        });

        // Search input with debounce
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim();

            if (searchTimeout) clearTimeout(searchTimeout);

            if (query.length < 2) {
                suggestionsBox.classList.remove('active');
                suggestionsBox.innerHTML = '';
                return;
            }

            searchTimeout = setTimeout(async () => {
                const results = await WeatherAPI.searchCity(query);
                renderSuggestions(results, suggestionsBox, searchInput, searchContainer, onCitySelected);
            }, 350);
        });

        // Handle enter key
        searchInput.addEventListener('keydown', async (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query.length >= 2) {
                    const results = await WeatherAPI.searchCity(query);
                    if (results.length > 0) {
                        selectCity(results[0], searchInput, suggestionsBox, searchContainer, onCitySelected);
                    }
                }
            }
            if (e.key === 'Escape') {
                isExpanded = false;
                searchContainer.classList.remove('expanded');
                searchInput.value = '';
                suggestionsBox.classList.remove('active');
                suggestionsBox.innerHTML = '';
            }
        });
    }

    function renderSuggestions(results, suggestionsBox, searchInput, searchContainer, onCitySelected) {
        suggestionsBox.innerHTML = '';

        if (results.length === 0) {
            suggestionsBox.innerHTML = `<div class="suggestion-item" style="color:var(--text-muted);cursor:default;">No cities found</div>`;
            suggestionsBox.classList.add('active');
            return;
        }

        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'suggestion-item';
            // Truncate to reasonable length
            const shortName = result.displayName.length > 60
                ? result.displayName.substring(0, 60) + '...'
                : result.displayName;
            item.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="suggestion-pin">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>${shortName}</span>
            `;
            item.addEventListener('click', () => {
                selectCity(result, searchInput, suggestionsBox, searchContainer, onCitySelected);
            });
            suggestionsBox.appendChild(item);
        });

        suggestionsBox.classList.add('active');
    }

    function selectCity(result, searchInput, suggestionsBox, searchContainer, onCitySelected) {
        searchInput.value = '';
        suggestionsBox.classList.remove('active');
        suggestionsBox.innerHTML = '';
        searchContainer.classList.remove('expanded');
        isExpanded = false;

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
