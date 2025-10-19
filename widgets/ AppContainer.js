import WeatherWidget from './WeatherWidget';
import EventBus from '../eventBus';
import LocationService from '../services/LocationService';
import WeatherService from '../services/WeatherService';

export default class AppContainer {
    constructor() {
        this.weather = new WeatherWidget();
        this.locationService = new LocationService();
        this.weatherService = new WeatherService('ebee27a19798f9f0e1aa8449bd035783');
    }

    async init() {
        this.weather.init();

        try {
            const position = await this.locationService.getCurrentPosition();
            const { latitude, longitude } = position.coords;
            const weatherData = await this.weatherService.getWeatherByCoords(latitude, longitude);
            EventBus.emit('weatherUpdated', weatherData);
        } catch (error) {
            console.error('Ошибка получения погоды:', error);
        }

        EventBus.on('weatherUpdated', (weatherData) => {
            this.weather.render(weatherData);
        });
    }
}
