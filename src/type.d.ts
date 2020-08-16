import Rockbell from './core';
declare global {
	interface Window {
		requestIdleCallback: ((callback: ((deadline: RequestIdleCallbackDeadline) => void), opts?: RequestIdleCallbackOptions,) => RequestIdleCallbackHandle);
		cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
		rockbell: Rockbell;
	}
}

export default global;

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
	timeout: number;
};

type RequestIdleCallbackDeadline = {
	readonly didTimeout: boolean;
	timeRemaining: (() => number);
};

export interface Base {
	type: (variable: any) => string;
	distinct: (list: Array<any>) => Array<any>;
	empty: (variable: any) => boolean;
	requestIdle: (cb: Function) => void;
	cancelIdle: (id: number) => void;
}


export type workerSource = string | Function | URL;

export interface Instance {
	handlers: Event.Emitters;
	_store: Settings.Store;
	_settings: object;
	knowinglyUpdateOrCreateSettings: (setting: Settings.Key, value: Settings.Value) => boolean;
}

/* Settings Types */
export namespace Settings {
	export type Key = string | number;
	export type Value = undefined | string | number | symbol;
	export type Target = {
		[key in Settings.Key]: Settings.Value;
	};
	export type Store = Map<Settings.Key, Settings.Value>;
	export interface Interface {
		Instance: Instance;
		_settings: Settings.Target;
		_store: Settings.Store;
	}
}

/* Event Types */
export namespace Event {
	export type Type = string;
	export type Handler = Function;
	export type Handlers = Array<Handler>;
	export type Emitters = Map<Type, Handlers>;
}
