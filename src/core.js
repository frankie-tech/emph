// @ts-check
'use strict';
import ready from './includes/ready.include';
import type from './includes/type.include';
// import Settings from './includes/settings.include';
import urlParse from './includes/urlParse.include';

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
	/**
	 * @param {any} variable
	 * @return {boolean} is empty?
	 */
	Emph.int.empty = function (variable) {
		if ([undefined, null, false, 0, '', '0'].includes(variable)) return true;
		if (variable.pop) return variable.length === 0 ? true : false;
		if (variable instanceof Object)
			// @ts-ignore
			return Object.entries(variable).length === 0 ? true : false;

		return false;
	};

	// (c) 2018 Chris Ferdinandi, MIT License, https://vanillajstoolkit.com/helpers/truetypeof/
	/**
	 * @param {any} obj - checks the variable to see what the true type of it is
	 */
	Emph.type = Emph.int.type = (obj) => type(obj);

	Emph.distinct = Emph.int.distinct = function () {
		let list = Array.from(arguments);
		return Array.from(new Set(list));
	};

	// imported functions
	/**
	 * @param {Function} func - callback function for load event
	 * @param {boolean} win - should the load event be assigned to window | document
	 */
	Emph.ready = (func, win) => ready(func, win);
	/**
	 * @param {Function} cb - requestIdleCallback callback function
	 */
	Emph.requestIdle = Emph.int.requestIdle = (cb) => requestIdle(cb);
	/**
	 * @param {string} id - the id of a requestIdleCallback function
	 */
	Emph.cancelIdle = Emph.int.cancelIdle = (id) => cancelIdle(id);

	Emph.urlParse = Emph.int.urlParse = (str) => urlParse(str);

	return Emph;
})();
// https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/immediate-object-initialization.html
export default _;
