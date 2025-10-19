import { WeatherData } from '../services/WeatherService';

export default class WeatherWidget {
    private container: HTMLElement | null;

    constructor() {
        this.container = document.getElementById('weather-container');
    }

    init(): void {
        if (this.container) {
            this.container.innerHTML = 'Получение погоды';
        }
    }

    render(weatherData: WeatherData): void {
        if (!this.container) return;

        const { temp } = weatherData.main;
        const description = weatherData.weather[0]?.description ?? 'Нет данных';

        this.container.innerHTML = `
            <h2>Погода в вашем городе</h2>
            <p>Температура: ${temp}°C</p>
            <p>Состояние: ${description}</p>
        `;
    }
}
