// yyx990803/workerify - https://github.com/yyx990803/workerify/
export default function (func) {
	if (typeof func !== 'function') {
		throw new Error('expects a function to workerify.');
	}
	var script = func.toString().match(/^function[^{]*{((.|\n)*)}$/)[1],
		blob = new Blob([script], { type: 'application/javascript' }),
		url = window.URL.createObjectURL(blob);
	return new Worker(url);
}
