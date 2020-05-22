// https://github.com/pladaria/requestidlecallback-polyfill

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

function cancelIdlePoly(id) {
	clearTimeout(id);
}

function requestIdle(cb) {
	'requestIdleCallback' in window
		? window.requestIdleCallback(cb)
		: requestIdlePoly(cb);
}
function cancelIdle(id) {
	'cancelIdleCallback' in window
		? window.cancelIdleCallback(id)
		: cancelIdlePoly(id);
}
export { requestIdle, cancelIdle };
