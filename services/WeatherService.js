import EventBus from '../eventBus';

export default class WeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    }

    async getWeatherByCoords(lat, lon) {
        try {
            const response = await fetch(`${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
            if (!response.ok) throw new Error(`Ошибка получения погоды: ${response.status} ${response.statusText}`);
            const data = await response.json();

            EventBus.emit('weatherUpdated', data);

            return data;
        } catch (error) {
            console.error('Ошибка WeatherService:', error);
            EventBus.emit('weatherError', error);
            throw error;
        }
    }
}
