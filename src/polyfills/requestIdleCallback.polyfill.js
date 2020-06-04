// ! safe to delete
// https://github.com/pladaria/requestidlecallback-polyfill

/**
 * Polyfill for requestIdleCallback
 * @param {Function} cb - valid callback function to run inside of a setTimeout
 */
const requestIdlePoly = function (cb) {
    var start = Date.now();
    return setTimeout(function () {
        cb({
            didTimeout: false,
            timeRemaining: function () {
                return Math.max(0, 50 - (Date.now() - start));
            },
        });
    }, 1);
};

/**
 * Polyfill for cancelIdleCallback
 * @param {number} id - a random number generated to cancel a setTimeout when it is no longer needed
 */
const cancelIdlePoly = function (id) {
    clearTimeout(id);
};

/**
 * Function that calls requestIdleCallback with a fallback to a polyfill
 * @param {Function} cb - valid requestIdleCallback & setTimeout callback function
 */
const requestIdle = function (cb) {
    'requestIdleCallback' in window
        ? // prettier-ignore
        // @ts-ignore
        requestIdleCallback(cb)
        : requestIdlePoly(cb);
};

/**
 * Function that calls cancelIdleCallback with a fallback to a polyfill
 * @param {number } id - a random number generated to cancel a cancelIdleCallback || setTimeout when it is no longer needed
 */
const cancelIdle = function (id) {
    // @ts-ignore
    'cancelIdleCallback' in window ? cancelIdleCallback(id) : cancelIdlePoly(id);
};
export { requestIdle, cancelIdle };
