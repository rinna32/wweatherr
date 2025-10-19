import { navigate } from './router.js';
import { StorageService, WeatherService } from './services/index.js';

const form = document.getElementById('cityForm');
const input = document.getElementById('cityInput');

form.addEventListener('submit', e => {
    e.preventDefault();
    const city = input.value.trim();
    if (city) navigate(`/city/${city}`);
});

export function showHome() {
    const content = document.getElementById('content');
    content.innerHTML = '<h1>Главная страница</h1><p>Введите город для просмотра погоды</p>';
}

export function showCityWeather(cityName) {
    const content = document.getElementById('content');
    content.innerHTML = `<h1>Погода в ${cityName}</h1>
    <ul id="historyList"></ul>`;

    saveCityHistory(cityName);
    renderHistory();
}

export function showAbout() {
    const content = document.getElementById('content');
    content.innerHTML = `
    <h1>О приложении</h1>
    <p>Приложение показывает погоду для выбранного города.</p>`;
}

function saveCityHistory(cityName) {
    let history = JSON.parse(localStorage.getItem('history') || '[]');
    if (!history.includes(cityName)) history.push(cityName);
    localStorage.setItem('history', JSON.stringify(history));
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;

    historyList.innerHTML = '';
    const history = JSON.parse(localStorage.getItem('history') || '[]');

    history.forEach(city => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#/city/${city}`;
        a.textContent = city;
        a.addEventListener('click', e => {
            e.preventDefault();
            navigate(`/city/${city}`);
        });
        li.appendChild(a);
        historyList.appendChild(li);
    });
}
