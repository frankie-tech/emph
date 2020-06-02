import type from './type.d';
import EmphEvents from './includes/event.include';
import EmphMessages from './includes/message.include';
import EmphSettings from './includes/settings.include';

class EmphBase {
	events = new EmphEvents();
	messages = new EmphMessages();
	constructor() { }

	type(variable: any): string {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}

	distinct(list: Array<any>): Array<any> {
		return Array.from(new Set(list));
	}

	// checks if the variable is equal to a false/empty value
	empty(variable: any): boolean {
		if ([undefined, null, false, 0, '', '0'].includes(variable)) return true;
		if (variable.pop) return variable.length === 0 ? true : false;
		if (variable instanceof Object)
			return Object.entries(variable).length === 0 ? true : false;

		return false;
	}

	requestIdle(cb: Function) {
		'requestIdleCallback' in window
			? window.requestIdleCallback(() => cb())
			: setTimeout(function () {
				var start = Date.now();
				cb({
					didTimeout: false,
					timeRemaining: function () {
						return Math.max(0, 50 - (Date.now() - start));
					},
				});
			}, 1);
	}

	cancelIdle(id: number) {
		'cancelIdleCallback' in window
			? window.cancelIdleCallback(id)
			: clearTimeout(id);
	}
}

class Emph extends EmphBase {
	constructor() {
		super();

		new EmphSettings(this, {
			author: 'frankie',
			version: '0.0.1',
		});
	}
}

// https://github.com/shichuan/javascript-patterns/blob/master/function-patterns/immediate-object-initialization.html
export default Emph;
