// @ts-check
'use strict';
import ready from './includes/ready.include';
import type from './includes/type.include';
import listen from './includes/listen.include';
// import Settings from './includes/settings.include';
import urlParse from './includes/urlParse.include';
import matchMediaWrapper from './includes/matchMediaWrapper.include';
import empty from './includes/empty.include';

import {
	requestIdle,
	cancelIdle,
} from './polyfills/requestIdleCallback.polyfill';

const _ = (() => {
	'use strict';

	function Emph() {}

	Emph.int = Emph.prototype;
	/*
	Emph.int.settings = {
		internal: {},
	};
	Emph.config = new Settings(Emph.int, 'internal');
    */

	Emph.int.empty = (variable) => empty(variable);

	Emph.distinct = Emph.int.distinct = function () {
		let list = Array.from(arguments);
		return Array.from(new Set(list));
	};

	/**
	 * @param {any} obj - checks the variable to see what the true type of it is
	 */
	Emph.type = Emph.int.type = (obj) => type(obj);

	/**
	 * @param {Function} cb - requestIdleCallback callback function
	 */
	Emph.requestIdle = Emph.int.requestIdle = (cb) => requestIdle(cb);
	/**
	 * @param {number} id - the id of a requestIdleCallback function
	 */
	Emph.cancelIdle = Emph.int.cancelIdle = (id) => cancelIdle(id);

	/**
	 * @param {string} str - pseudo polyfill for URLSearchParams
	 */
	Emph.urlParse = Emph.int.urlParse = (str) => urlParse(str);

	// imported functions
	/**
	 * @param {object} queries - see './includes/matchMediaWrapper.include.js' for an example mediaquery settings object
	 */
	Emph.media = (queries) => matchMediaWrapper(queries);
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

	return Emph;
})();

// https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/immediate-object-initialization.html
export default _;
