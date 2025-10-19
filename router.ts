type RouteHandler = () => void;

interface Routes {
    [path: string]: RouteHandler;
}

const routes: Routes = {
    '/': showHome,
    '/about': showAbout,
};

export function navigate(url: string): void {
    const route = routes[url];
    if (route) {
        route();
    } else if (url.startsWith('/city/')) {
        const cityName = url.split('/city/')[1];
        showCityWeather(cityName);
    }
}

const homeLink = document.getElementById('homeLink');
if (homeLink) {
    homeLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        navigate('/');
    });
}

const aboutLink = document.getElementById('aboutLink');
if (aboutLink) {
    aboutLink.addEventListener('click', (e: Event) => {
        e.preventDefault();
        navigate('/about');
    });
}

function showHome(): void {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = '<h1>Главная страница</h1><p>Введите город для просмотра погоды</p>';
    }
}

function showAbout(): void {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = `
      <h1>О приложении</h1>
      <p>Приложение показывает погоду для выбранного города</p>
    `;
    }
}

function showCityWeather(cityName: string): void {
    const content = document.getElementById('content');
    if (content) {
        content.innerHTML = `<h1>Погода в ${cityName}</h1><ul id="historyList"></ul>`;
    }
    saveCityHistory(cityName);
    renderHistory();
}

function saveCityHistory(cityName: string): void {
    const history: string[] = JSON.parse(localStorage.getItem('history') || '[]');
    if (!history.includes(cityName)) history.push(cityName);
    localStorage.setItem('history', JSON.stringify(history));
}

function renderHistory(): void {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;

    historyList.innerHTML = '';
    const history: string[] = JSON.parse(localStorage.getItem('history') || '[]');

    history.forEach((city) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#/city/${city}`;
        a.textContent = city;
        a.addEventListener('click', (e: Event) => {
            e.preventDefault();
            navigate(`/city/${city}`);
        });
        li.appendChild(a);
        historyList.appendChild(li);
    });
}
