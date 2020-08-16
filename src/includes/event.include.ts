import { Instance } from '../type';
import { Event } from '../type';


export default class EmphEvents {
	handlers: Event.Emitters;
	constructor(Instance: Instance) {
		this.handlers = Instance.handlers || new Map();
	}

	on(eventType: Event.Type, eventHandler: Event.Handler): void {
		let currentHandlers = this.handlers.get(eventType) || [];

		if (!currentHandlers.length) {
			currentHandlers.push(eventHandler);
			this.handlers.set(eventType, [eventHandler]);
		}
	}

	off(eventType: Event.Type, eventHandler: Event.Handler): void {
		let currentHandlers = this.handlers.get(eventType);
		if (currentHandlers) {
			currentHandlers.splice(currentHandlers.indexOf(eventHandler) >>> 0, 1);
		}
	}

	emit(eventType: Event.Type, eventData: {}): void {
		(this.handlers.get(eventType) || []).slice().map(handler => handler(eventData));
		(this.handlers.get('*') || []).slice().map(handler => handler(eventType, eventData))
	}
}
