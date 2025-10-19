import WeatherService from '../services/WeatherService.js';

describe('WeatherService', () => {
    const API_KEY = 'test-key';
    let service;

    beforeEach(() => {
        service = new WeatherService(API_KEY);
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ temp: 25 })
            })
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test('должен получать погоду по координатам', async () => {
        const data = await service.getWeatherByCoords(55.75, 37.61);
        expect(data.temp).toBe(25);
        expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('lat=55.75'));
    });
});
