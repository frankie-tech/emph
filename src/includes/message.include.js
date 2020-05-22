// @ts-check
/**
 * @param {string} eventName - either custom | standard event name
 * @param {object} detail - event detail value with custom values
 */
function dispatch(eventName, detail) {
	var event = this.empty(detail)
		? new Event('_' + eventName)
		: new CustomEvent('_' + eventName, { bubbles: true, detail });
	window.dispatchEvent(event);
}
/**
 * @param {string} message - success message
 */
function success(message) {
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
}
/**
 * @param {string} warning - warning message
 */
function warn(warning) {
	console.warn('❗️Warning::' + warning);
}
/**
 * @param {string} errorName - custom error name / message
 * @throws {Error}
 */
function err(errorName) {
	throw new Error('🚨Error::' + errorName);
}

export { dispatch, success, warn, err };
