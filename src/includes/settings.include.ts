export default class EmphSettings {
	store: Map<string, any>;
	settings: ProxyHandler<object>;
	constructor(Instance, BaseObject: {}) {
		let _store = Symbol();
		let _settings = Symbol()
		let self = this;
		const _data = function (): ProxyHandler<object> {
			return {
				get: function (obj: { [key: string]: string | number }, key: string): undefined | string | number {
					// for now does not support nested objects/arrays
					// if (['object', 'array'].indexOf(type(obj[key])) > -1) {
					// return new Proxy(obj[key], data(instance));
					// }

					if (key.indexOf('_') === 0) return undefined;
					return obj[key];
				},
				set: function (obj: { [key: string]: string | number }, key: string, value: string | number): boolean {
					if (obj[key] === value) return true;
					if (key.indexOf('_') === 0) {
						self.store.set(key, value);
						return true;
					}
					obj[key] = value;
					return true;
				},
				deleteProperty: function (obj: { [key: string]: string | number }, key: string) {
					// looks for a secret key just in case;
					if (key.indexOf('_') === 0) {
						return self.store.has(key) ? self.store.delete(key) : false;
					}
					if (key in obj) {
						delete obj[key];
						return true;
					}
					return false;
				},
			};
		};

		self.store = Instance.prototype[_store] = new Map();
		self.settings = Instance.prototype[_settings] = new Proxy(
			BaseObject,
			_data()
		);
	}
}
