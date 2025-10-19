import { showHome, showCityWeather, showAbout } from './script.js';

export function navigate(url) {
    location.hash = url;
    handleRoute();
}

export function handleRoute() {
    const path = location.hash.slice(1) || '/';
    const content = document.getElementById('content');
    if (!content) return;

    if (path.startsWith('/city/')) {
        const cityName = path.split('/city/')[1];
        showCityWeather(cityName);
    } else if (path === '/about') {
        showAbout();
    } else {
        showHome();
    }
}

window.addEventListener('hashchange', handleRoute);

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('homeLink').addEventListener('click', e => {
        e.preventDefault();
        navigate('/');
    });

    document.getElementById('aboutLink').addEventListener('click', e => {
        e.preventDefault();
        navigate('/about');
    });

    handleRoute();
});
