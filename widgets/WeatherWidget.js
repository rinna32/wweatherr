export default class WeatherWidget {
    constructor() {
        this.container = document.getElementById('weather-container');
    }

    init() {
        this.container.innerHTML = 'Получение погоды';
    }

    render(weatherData) {
        this.container.innerHTML = `
      <h2>Погода в вашем городе</h2>
      <p>Температура: ${weatherData.main.temp}°C</p>
      <p>Состояние: ${weatherData.weather[0].description}</p>
    `;
    }
}
