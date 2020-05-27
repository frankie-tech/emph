// @ts-check
'use strict';
import ready from './includes/ready.include';
import type from './includes/type.include';
import listen from './includes/listen.include';
// import Settings from './includes/settings.include';
import urlParse from './includes/urlParse.include';
import empty from './includes/empty.include';
import Settings from './includes/settings.include';
import {
	requestIdle,
	cancelIdle,
} from './polyfills/requestIdleCallback.polyfill';

const _ = (() => {
	'use strict';

	const env = {
		src: 'https://github.com/frankie-tech/emph',
		docs: 'https://github.com/frankie-tech/emph/README.md',
	};

	function Emph() {}

	/*
	Emph.prototype.settings = {
		internal: {},
	};
	Emph.config = new Settings(Emph.int, 'internal');
    */

	/**
	 * @param {any} variable - anything to see if it is equal to empty
	 */
	Emph.prototype.empty = (variable) => empty(variable);

	Emph.distinct = Emph.prototype.distinct = function () {
		let list = Array.from(arguments);
		return Array.from(new Set(list));
	};

	/**
	 * @param {any} obj - checks the variable to see what the true type of it is
	 */
	Emph.type = Emph.prototype.type = (obj) => type(obj);

	/**
	 * @param {Function} cb - requestIdleCallback callback function
	 */
	Emph.requestIdle = Emph.prototype.requestIdle = (cb) => requestIdle(cb);
	/**
	 * @param {number} id - the id of a requestIdleCallback function
	 */
	Emph.cancelIdle = Emph.prototype.cancelIdle = (id) => cancelIdle(id);

	/**
	 * @param {string} str - pseudo polyfill for URLSearchParams
	 */
	Emph.urlParse = Emph.prototype.urlParse = (str) => urlParse(str);

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
	 * @param {EventListener} func - callback function for load event
	 * @param {boolean} win - should the load event be assigned to window | document
	 */
	Emph.ready = (func, win) => ready(func, win);

	Emph.env = Settings(Emph, env);

	return Emph;
})();

// https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/immediate-object-initialization.html
export default _;
