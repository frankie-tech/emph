// Types
import { Instance, Base, Event, Settings, workerSource } from './type.d';

// Classes
import EmphEvents from './includes/event.include';
import EmphSettings from './includes/settings.include';
class EmphBase implements Base {
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
	// create workerr functions
	tostring(func: Function): string {
		return func.toString().match(/^function[^{]*{((.|\n)*)}$/)[1];
	}
	toblob(str: string): Blob {
		return new Blob([str], { type: 'application/javascript' });
	}
	tourl(blob: Blob): string {
		return window.URL.createObjectURL(blob);
	}
	pipeThrough(...functions: Function[]): any {
		return function (value: any) {
			functions.reduce((currentValue: any, currentFunction: Function) => {
				return currentFunction(currentValue);
			}, value);
		}
	}
}


export default class Emph extends EmphBase implements Instance {
	workers: Worker[];
	handlers: Event.Emitters;
	_store: Settings.Store;
	_settings: Settings.Target;
	emitter: EmphEvents;
	constructor() {
		super();
		this.handlers = new Map();
		this.emitter = new EmphEvents(this);
		new EmphSettings(this, {
			author: 'frankie',
			version: '0.0.1',
			events: true,
		});
	}

	m(n: Function) {
		const r = new Map();
		return (i: any) => r.get(i) || r.set(i, n(i)).get(i);
	}

	prepareWorker(source: workerSource): string {
		switch (this.type(source)) {
			case 'function':
				return this.pipeThrough(this.tostring, this.toblob, this.tourl)(source);
			case 'string':
			case 'URL':
				return this.pipeThrough(this.toblob, this.tourl)(source);
			default:
				return;
		}
	}

	createWorker(source: workerSource) {
		const workerSource = this.prepareWorker(source);
		const worker = new Worker(workerSource);

		this.workers = this.workers || [];

		this.workers.push(worker);
	}

	knowinglyUpdateOrCreateSettings(setting: Settings.Key, value: Settings.Value): boolean {
		this[Symbol.for('settings')][setting] = value;
		return true;
	}
}
