import { Instance } from '../type';
import { Event } from '../type';


export default class EmphEvents {
    handlers: Event.Emitters;
    Instance: Instance;
    constructor(Instance: Instance) {
        Instance.handlers = Instance.handlers || new Map();
        this.Instance = Instance
    }

    on(eventType: Event.Type, eventHandler: Event.Handler): void {
        let currentHandlers = this.Instance.handlers.get(eventType) || [];

        if (!currentHandlers.length) {
            currentHandlers.push(eventHandler);
            this.Instance.handlers.set(eventType, [eventHandler]);
        }
    }

    off(eventType: Event.Type, eventHandler: Event.Handler): void {
        let currentHandlers = this.Instance.handlers.get(eventType);
        if (currentHandlers) {
            currentHandlers.splice(currentHandlers.indexOf(eventHandler) >>> 0, 1);
        }
    }

    emit(eventType: Event.Type, eventData: {}): void {
        let eventHandlersForType = this.Instance.handlers.get(eventType) || [];
        let eventHandlersForAny = this.Instance.handlers.get('*') || [];

        eventHandlersForType.slice().map(handler => handler(eventData));
        eventHandlersForAny.slice().map(handler => handler(eventType, eventData))
    }
}
