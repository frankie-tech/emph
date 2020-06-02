type EmphSettingKey = string | number;
type EmphSettingValue = undefined | string | number | symbol;
type EmphSettingTarget = {
    [key in EmphSettingKey]: any;
};

export default class EmphSettings {
    constructor(Instance: any, BaseObject = {}) {
        let _store = Symbol();
        let _settings = Symbol()
        let self = this;
        const _data = function (): ProxyHandler<object> {
            return {
                get: function (target: EmphSettingTarget, key: EmphSettingKey): EmphSettingValue {
                    // for now does not support nested objects/arrays
                    // if (['object', 'array'].indexOf(type(obj[key])) > -1) {
                    // return new Proxy(obj[key], data(instance));
                    // }

                    if (key.toString().indexOf('_') === 0) return undefined;
                    return target[key];
                },
                set: function (obj: EmphSettingTarget, key: EmphSettingKey, value: EmphSettingValue): boolean {
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
                deleteProperty: function (obj: EmphSettingTarget, key: EmphSettingKey): boolean {
                    // looks for a secret key just in case;
                    if (key.toString().indexOf('_') === 0) {
                        return Instance[_store].has(key.toString()) ? Instance[_store].delete(key.toString()) : false;
                    }
                    if (key in obj) {
                        obj.deleteProperty(key);
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
