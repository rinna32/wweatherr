import { WeatherData } from '../services/WeatherService';

export default class TemperatureWidget {
    private container: HTMLElement | null;

    constructor() {
        this.container = document.getElementById('temperature-container');
    }

    render(weatherData: WeatherData) {
        if (this.container) {
            this.container.textContent = `Температура: ${weatherData.main.temp}°C`;
        }
    }
}
