import EventBus from '../eventBus.js';

describe('EventBus', () => {
    let bus;

    beforeEach(() => {
        bus = new EventBus();
    });

    test('on + emit', () => {
        const callback = jest.fn();
        bus.on('testEvent', callback);
        bus.emit('testEvent', 123);
        expect(callback).toHaveBeenCalledWith(123);
    });

    test('off', () => {
        const callback = jest.fn();
        bus.on('testEvent', callback);
        bus.off('testEvent', callback);
        bus.emit('testEvent', 123);
        expect(callback).not.toHaveBeenCalled();
    });
});
