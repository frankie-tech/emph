export default function (func, win) {
	if (win)
		return window.addEventListener('load', func, {
			capture: true,
			once: true,
		});
	document.addEventListener('DOMContentLoaded', func, {
		capture: true,
		once: true,
	});
}
