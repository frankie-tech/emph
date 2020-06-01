'use strict';
interface _ { };
import './type';
import ready from './includes/ready.include';
// import type from './includes/type.include';
import listen from './includes/listen.include';
import { dispatch } from './includes/message.include';
// import Settings from './includes/settings.include';
// import empty from './includes/empty.include';
import Settings from './includes/settings.include';
import EmphEvents from './includes/event.include';
/*
import {
	requestIdle,
	cancelIdle,
} from './polyfills/requestIdleCallback.polyfill';
*/
const _ = (() => {
	'use strict';

	const env = {
		src: 'https://github.com/frankie-tech/emph',
		docs: 'https://github.com/frankie-tech/emph/README.md',
	};

	function Emph() { }

	// imported functions
	/**
	 * @param {EventTarget} eventTarget
	 * @param {string} eventName
	 * @param {EventListener} eventHandler
	 * @param {object} options
	 */
	Emph.listen = (eventTarget, eventName, eventHandler, options) =>
		listen(eventTarget, eventName, eventHandler, options);

	/**
	 * @param {string} eventName - either system or custom event name
	 * @param {object} detail - detail object to assign to a custom event
	 */
	Emph.dispatch = (eventName, detail) => dispatch(eventName, detail);
	/**
	 * @param {EventListener} func - callback function for load event
	 * @param {boolean} win - should the load event be assigned to window | document
	 */
	Emph.ready = (func, win) => ready(func, win);

	Emph.env = Settings(Emph, env);

	return Emph;
})();

class EmphBase {
	events = new EmphEvents();

	constructor() { }
	type(variable: any): string {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	distinct() {
		return Array.from(new Set(Array.from(arguments)));
	}

	// checks if the variable is equal to a false/empty value
	empty(variable: any): boolean {
		if ([undefined, null, false, 0, '', '0'].includes(variable)) return true;
		if (variable.pop) return variable.length === 0 ? true : false;
		if (variable instanceof Object)
			return Object.entries(variable).length === 0 ? true : false;

		return false;
	}
	requestIdle(cb: Function) {
		'requestIdleCallback' in window
			? window.requestIdleCallback(() => cb())
			: setTimeout(function () {
				var start = Date.now();
				cb({
					didTimeout: false,
					timeRemaining: function () {
						return Math.max(0, 50 - (Date.now() - start));
					},
				});
			}, 1);
	}
	cancelIdle(id: number) {
		'cancelIdleCallback' in window
			? window.cancelIdleCallback(id)
			: clearTimeout(id);
	}
}

// https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/immediate-object-initialization.html
export default _;
