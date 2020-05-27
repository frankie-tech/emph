import type from './type.include';
import { err } from './message.include';

const Settings = (function () {
	/**
	 *
	 * @param {Emph} instance - this would be the Emph or Javascript function/prototype that you are storing settings for
	 * @param {object} baseObject - default object, either fill with custom settings of your own but will default to empty object
	 */
	function Context(instance, baseObject) {
		const _this = instance;
		const self = this;
		self.store = _this.prototype[Symbol('_store')] = new Map();

		const data = function () {
			return {
				get: function (obj, key) {
					/* for now does not support nested objects/arrays
                    if (['object', 'array'].indexOf(type(obj[key])) > -1) {
                        return new Proxy(obj[key], data(instance));
                    }
                    */
					if (key.indexOf('_') === 0) return undefined;
					return obj[key];
				},
				set: function (obj, key, value) {
					if (obj[key] === value) return true;
					if (key.indexOf('_') === 0) {
						return self.store.set(key, value);
					}
					console.log(key);
					obj[key] = value;
					return true;
				},
				deleteProperty: function (obj, key) {
					// looks for a secret key just in case;
					if (key.indexOf('_') === 0) {
						self.store.delete(key);
						return true;
					}
					if (key in obj) {
						delete obj[key];
						return true;
					}
				},
			};
		};

		const dataHandler = data(instance);
		this.settings = _this.prototype[Symbol('_settings')] = new Proxy(
			baseObject,
			dataHandler
		);

		return this.settings;
	}
	/*
	Context.prototype.createTarget = function (target) {
		if (type(target) !== 'object')
			throw err('@param:target needs to be of type Object');
    };
    */

	return Context;
})();

export default Settings;
