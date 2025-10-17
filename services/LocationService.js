export default class LocationService {
    getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) reject(new Error("Геолокация не поддерживается"));
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
}
