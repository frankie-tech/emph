// Types
import { Instance, Base, Event, Settings } from './type.d';

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
}


export default class Emph extends EmphBase implements Instance {
    handlers: Event.Emitters;
    _store: Settings.Store;
    _settings: Settings.Target;
    constructor() {
        super();
        new EmphEvents(this);
        new EmphSettings(this, {
            author: 'frankie',
            version: '0.0.1',
            events: true,
        });
    }

    knowinglyUpdateOrCreateSettings(setting: Settings.Key, value: Settings.Value): boolean {
        this[Symbol.for('settings')][setting] = value;
        return true;
    }
}
