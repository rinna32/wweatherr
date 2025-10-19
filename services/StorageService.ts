import EventBus from '../eventBus';

export default class LocationService {
    getCurrentPosition(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) return reject(new Error('Геолокация не найдена'));

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve(position);
                    EventBus.emit('locationObtained', position);
                },
                (error) => {
                    reject(error);
                    EventBus.emit('locationError', error);
                }
            );
        });
    }
}
