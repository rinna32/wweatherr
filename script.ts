import { navigate } from './router';
import StorageService from './services/StorageService';
import WeatherService from './services/WeatherService';


const form = document.getElementById('cityForm') as HTMLFormElement;
const input = document.getElementById('cityInput') as HTMLInputElement;

form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city) navigate(`/city/${city}`);
});

export function showHome() {
    const content = document.getElementById('content');
    if (!content) return;
    content.innerHTML = '<h1>Главная страница</h1><p>Введите город для просмотра погоды</p>';
}

export function showCityWeather(cityName: string) {
    const content = document.getElementById('content');
    if (!content) return;

    content.innerHTML = `<h1>Погода в ${cityName}</h1>
        <ul id="historyList"></ul>`;

    saveCityHistory(cityName);
    renderHistory();
}

export function showAbout() {
    const content = document.getElementById('content');
    if (!content) return;

    content.innerHTML = `
        <h1>О приложении</h1>
        <p>Приложение показывает погоду для выбранного города</p>
    `;
}

function saveCityHistory(cityName: string) {
    const history: string[] = JSON.parse(localStorage.getItem('history') || '[]');
    if (!history.includes(cityName)) history.push(cityName);
    localStorage.setItem('history', JSON.stringify(history));
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;

    const history: string[] = JSON.parse(localStorage.getItem('history') || '[]');

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
