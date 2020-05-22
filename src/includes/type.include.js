// @ts-check
/**
 * @param {any} obj - an object thats type cannot be normally derived with typeof
 */
export default function (obj) {
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}
