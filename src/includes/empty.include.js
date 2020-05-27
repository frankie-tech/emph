// @ts-check
/**
 * @param {any} variable
 * @return {boolean} is empty?
 */
export default function (variable) {
	if ([undefined, null, false, 0, '', '0'].includes(variable)) return true;
	if (variable.pop) return variable.length === 0 ? true : false;
	if (variable instanceof Object)
		// @ts-ignore
		return Object.entries(variable).length === 0 ? true : false;

	return false;
}
