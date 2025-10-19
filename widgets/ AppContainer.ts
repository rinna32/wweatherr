import WeatherWidget from './WeatherWidget';
import EventBus from '../eventBus';
import LocationService from '../services/LocationService';
import WeatherService, { WeatherData } from '../services/WeatherService';

export default class AppContainer {
    private weather: WeatherWidget;
    private locationService: LocationService;
    private weatherService: WeatherService;

    constructor() {
        this.weather = new WeatherWidget();
        this.locationService = new LocationService();
        this.weatherService = new WeatherService('ebee27a19798f9f0e1aa8449bd035783');
    }

    async init(): Promise<void> {
        this.weather.init();

        try {
            const position = await this.locationService.getCurrentPosition();
            const { latitude, longitude } = position.coords;

            const weatherData: WeatherData = await this.weatherService.getWeatherByCoords(latitude, longitude);

            EventBus.emit('weatherUpdated', weatherData);
        } catch (error) {
            console.error('Ошибка получения погоды:', error);
        }

        EventBus.on('weatherUpdated', (weatherData: WeatherData) => {
            this.weather.render(weatherData);
        });
    }
}
