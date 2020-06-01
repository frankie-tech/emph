// @ts-check
'use strict';

export default function () {
	const self = this;

	function init() {
		self.handlers = self.handlers || new Map();

		/**
		 *
		 * @param {string} eventType - custom event name
		 * @param {Function} eventHandler - callback function to run when event is emitted
		 */
		const on = function (eventType, eventHandler) {
			const eventHandlers = self.handlers.get(eventType);
			const added = eventHandlers && eventHandlers.push(eventHandler);
			if (!added) {
				self.handlers.set(eventType, [eventHandler]);
			}
		};

		/**
		 *
		 * @param {string} eventType - custom event name
		 * @param {Function} eventHandler - callback function to run when event is emitted
		 */
		const off = function (eventType, eventHandler) {
			const eventHandlers = self.handlers.get(eventType);
			if (eventHandlers) {
				eventHandlers.splice(eventHandlers.indexOf(eventHandler) >>> 0, 1);
			}
		};

		/**
		 *
		 * @param {string} eventType - event name to emit
		 * @param {object} event - object to pass to the handler function
		 */
		const emit = function (eventType, event) {
			const eventHandlerOfType = self.handlers.get(eventType) || [];
			const eventHandlerAny = self.handlers.get('*') || [];

			eventHandlerOfType.slice().map((handler) => handler(event));
			eventHandlerAny.slice().map((handler) => handler(eventType, event));
		};

		return {
			on,
			off,
			emit,
		};
	}
	return init;
}
