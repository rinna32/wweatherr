export default class StorageService {
    setItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }
}
