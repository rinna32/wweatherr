export default class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async getWeatherByCoords(lat, lon) {
        const response = await fetch(`${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
        if (!response.ok) throw new Error('Ошибка получения погоды');
        return response.json();
    }
}
