export interface WeatherData {
    main: { temp: number };
    weather: { description: string }[];
}

export default class WeatherService {
    private apiKey: string;
    private baseUrl: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    async getWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
        const response = await fetch(`${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
        if (!response.ok) throw new Error('Ошибка получения погоды');
        return response.json() as Promise<WeatherData>;
    }
}
