import empty from './empty.include';
// @ts-check
/**
 * @param {string} eventName - either custom | standard event name
 * @param {object} detail - event detail value with custom values
 */
const dispatch = function (eventName, detail) {
	var event = empty(detail)
		? new Event(eventName)
		: new CustomEvent(eventName, { bubbles: true, detail });
	window.dispatchEvent(event);
};
/**
 * @param {string} message - success message
 */
const success = function (message) {
	var styles = `
        display: inline-block;
        color: rgba(132, 203, 77);
        background-color: #287c03;
        padding-top: 10px;
        padding-right: 15px;
        padding-bottom: 10px;
        padding-left: 15px;
        font-size: 18px;
    `;
	console.log('%cSuccess::' + message, styles);
};
/**
 * @param {string} warning - warning message
 */
const warn = function (warning) {
	console.warn('❗️Warning::' + warning);
};
/**
 * @param {string} errorName - custom error name / message
 * @throws {Error}
 */
const err = function (errorName) {
	throw new Error('🚨Error::' + errorName);
};

export { dispatch, success, warn, err };
