type eventType = string;
type eventHandlers = Array<Function>;
type EmphHandlers = Map<eventType, eventHandlers>;
export default class EmphEvents {
	handlers: EmphHandlers;
	constructor() {
		this.handlers = this.handlers || new Map();
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
