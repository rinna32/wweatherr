import EventBus from '../eventBus';

export default class LocationService {
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) reject(new Error("Геолокация не поддерживается"));

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
