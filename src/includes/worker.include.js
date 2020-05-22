// @ts-check
import type from './type.include';
// yyx990803/workerify - https://github.com/yyx990803/workerify/
/**
 * Workerify - when passed an anonymous function, will run said function in its own thread.
 * Now the function will not impact the performance of the main thread,
 * allowing it to focus on more important things that it is designed for,
 * like UI and interactions
 * @param {Function} func - anonymouns function to stringify into an inline worker
 * @param {object} options - an object of valid worker options
 */
export default function (func, options = {}) {
	if (type(func) !== 'function') {
		throw new Error('expects a function to workerify.');
	}
	var script = func.toString().match(/^function[^{]*{((.|\n)*)}$/)[1],
		blob = new Blob([script], { type: 'application/javascript' }),
		url = window.URL.createObjectURL(blob);
	return new Worker(url, options);
}
