import { WeatherData } from './services/WeatherService';

type EventMap = {
    locationObtained: GeolocationPosition;
    locationError: GeolocationPositionError;
    weatherUpdated: WeatherData;
};

type EventKey = keyof EventMap;
type EventCallback<K extends EventKey> = (payload: EventMap[K]) => void;

export default class EventBus {
    private static events: Partial<Record<EventKey, EventCallback<any>[]>> = {};

    static on<K extends EventKey>(event: K, callback: EventCallback<K>): void {
        const callbacks = (this.events[event] ??= [] as EventCallback<K>[]);
        callbacks.push(callback);
    }

    static off<K extends EventKey>(event: K, callback: EventCallback<K>): void {
        const callbacks = this.events[event] as EventCallback<K>[] | undefined;
        if (!callbacks) return;
        this.events[event] = callbacks.filter(cb => cb !== callback);
    }

    static emit<K extends EventKey>(event: K, payload: EventMap[K]): void {
        const callbacks = this.events[event] as EventCallback<K>[] | undefined;
        if (!callbacks) return;
        callbacks.forEach(cb => cb(payload));
    }
}
