import LocationService from '../services/LocationService.js';

describe('LocationService', () => {
    it('возвращает координаты', async () => {
        const service = new LocationService();
        navigator.geolocation = {
            getCurrentPosition: jest.fn(cb => cb({ coords: { latitude: 10, longitude: 20 } }))
        };
        const pos = await service.getCurrentPosition();
        expect(pos.coords.latitude).toBe(10);
        expect(pos.coords.longitude).toBe(20);
    });
});
