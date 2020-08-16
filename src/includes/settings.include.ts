import { Instance, Settings, SettingsBase } from '../type';

export default class EmphSettings implements SettingsBase {
	Instance: Instance;
	_store: Settings.Store;
	_settings: Settings.Target;
	constructor(Instance: Instance, BaseObject = {}) {
		const _store = Symbol();
		const _settings = Symbol.for('settings');
		const _data = function (): ProxyHandler<object> {
			return {
				get: function (target: Settings.Store, key: Settings.Key): Settings.Value {
					//? for now does not support nested objects/arrays
					// if (['object', 'array'].indexOf(type(obj[key])) > -1) {
					// return new Proxy(obj[key], data(instance));
					// }

					if (key.toString().indexOf('_') === 0) return undefined;
					return target[key];
				},
				set: function (obj: Settings.Store, key: Settings.Key, value: Settings.Value): boolean {
					if (obj[key] === value) return true;
					if (key.toString().indexOf('_') === 0) {

						Instance[_store].set(key.toString(), value);
						return true;
					}
					Object.defineProperty(obj, key, {
						value,
						writable: true
					});
					return true;
				},
				deleteProperty: function (obj: Settings.Store, key: Settings.Key): boolean {
					//? looks for a secret key just in case;
					if (key.toString().indexOf('_') === 0) {
						return Instance[_store].has(key.toString()) ? Instance[_store].delete(key.toString()) : false;
					}
					if (key in obj) {
						delete obj[key];
						return true;
					}
					return false;
				},
			};
		};

		Instance[_store] = new Map();
		Instance[_settings] = new Proxy(
			BaseObject,
			_data()
		);
	}
}
