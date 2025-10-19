export default class TemperatureWidget {
    constructor() {
        this.container = document.getElementById('temperature-container');
    }

    render(weatherData) {
        this.container.textContent = `Температура: ${weatherData.main.temp}°C`;
    }
}
