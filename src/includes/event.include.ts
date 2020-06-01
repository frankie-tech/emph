type eventType = string;
type eventHandlers = Array<Function>;
type EmphEmitters = Map<eventType, eventHandlers>;

export default class EmphEvents {
    handlers: EmphEmitters;

    constructor() {
        this.handlers = this.handlers || new Map();
    }

    listen(eventName: string, eventTarget: Document | Window | HTMLElement, eventListener: EventListener, options: EventListenerOptions): void {
        if (!eventTarget) {
            document.addEventListener(eventName, eventListener, options);
        }

        eventTarget.addEventListener(eventName, eventListener, options);
    }

    ready(eventListener: EventListener, win: boolean): void {
        if (!win) {
            document.addEventListener('DOMContentLoaded', eventListener, { capture: true, once: true });
            return;
        }
        window.addEventListener('load', eventListener, { once: true });
    }

    on(eventType: string, eventHandler: Function): void {
        let currentHandlers = this.handlers.get(eventType);
        let hasCurrentEvent = currentHandlers.push(eventHandler);
        if (!hasCurrentEvent) {
            this.handlers.set(eventType, [eventHandler]);
        }
    }

    off(eventType: string, eventHandler: Function): void {
        let currentHandlers = this.handlers.get(eventType);
        if (currentHandlers) {
            currentHandlers.splice(currentHandlers.indexOf(eventHandler) >>> 0, 1);
        }
    }

    emit(eventType: string, event: {}): void {
        let eventHandlersForType = this.handlers.get(eventType) || [];
        let eventHandlersForAny = this.handlers.get('*') || [];

        eventHandlersForType.slice().map(handler => handler(event));
        eventHandlersForAny.slice().map(handler => handler(eventType, event))
    }
}
