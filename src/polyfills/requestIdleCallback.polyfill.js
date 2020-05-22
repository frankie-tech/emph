// @ts-check
// https://github.com/pladaria/requestidlecallback-polyfill

/**
 * Polyfill for requestIdleCallback
 * @param {Function} cb - valid callback function to run inside of a setTimeout
 */
function requestIdlePoly(cb) {
	var start = Date.now();
	return setTimeout(function () {
		cb({
			didTimeout: false,
			timeRemaining: function () {
				return Math.max(0, 50 - (Date.now() - start));
			},
		});
	}, 1);
}

/**
 * Polyfill for cancelIdleCallback
 * @param {number} id - a random number generated to cancel a setTimeout when it is no longer needed
 */
function cancelIdlePoly(id) {
	clearTimeout(id);
}

/**
 * Function that calls requestIdleCallback with a fallback to a polyfill
 * @param {Function} cb - valid requestIdleCallback & setTimeout callback function
 */
function requestIdle(cb) {
	'requestIdleCallback' in window
		? // prettier-ignore
		  // @ts-ignore
		  requestIdleCallback(cb)
		: requestIdlePoly(cb);
}

/**
 * Function that calls cancelIdleCallback with a fallback to a polyfill
 * @param {number } id - a random number generated to cancel a cancelIdleCallback || setTimeout when it is no longer needed
 */
function cancelIdle(id) {
	// @ts-ignore
	'cancelIdleCallback' in window ? cancelIdleCallback(id) : cancelIdlePoly(id);
}
export { requestIdle, cancelIdle };
