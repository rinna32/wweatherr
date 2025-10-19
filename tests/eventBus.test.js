import EventBus from './eventBus';

describe('EventBus', () => {
    test('on + emit', () => {
        const callback = jest.fn();
        EventBus.on('testEvent', callback);
        EventBus.emit('testEvent', 123);
        expect(callback).toHaveBeenCalledWith(123);
    });

    test('off', () => {
        const callback = jest.fn();
        EventBus.on('testEvent', callback);
        EventBus.off('testEvent', callback);
        EventBus.emit('testEvent', 123);
        expect(callback).not.toHaveBeenCalled();
    });
});
