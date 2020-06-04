import Emph from './core';
declare global {
    interface Window {
        requestIdleCallback: ((callback: ((deadline: RequestIdleCallbackDeadline) => void), opts?: RequestIdleCallbackOptions, ) => RequestIdleCallbackHandle);
        cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
        _: Emph;
        emph: Emph;
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


export interface Instance {
    handlers: Event.Emitters;
    _store: Settings.Store;
    _settings: object;
    knowinglyUpdateOrCreateSettings: (setting: Settings.Key, value: Settings.Value) => boolean;
}

/* Settings Types */
export interface SettingsBase {
    Instance: Instance;
    _settings: Settings.Target;
    _store: Settings.Store;
}

export namespace Settings {
    export type Key = string | number;
    export type Value = undefined | string | number | symbol;
    export type Target = {
        [key in Settings.Key]: Settings.Value;
    };
    export type Store = Map<Settings.Key, Settings.Value>;
}


/*
export {
    Settings,
    settingKey,
    settingValue,
    settingTarget,
    settingStore
}
*/
/* Event Types */
export namespace Event {
    export type Type = string;
    export type Handler = Function;
    export type Handlers = Array<Handler>;
    export type Emitters = Map<Type, Handlers>;
}

/*
type eventType = string;
type eventHandler = Function;
type eventHandlers = Array<eventHandler>;
type eventEmitters = Map<eventType, eventHandlers>;

export {
    eventType,
    eventHandler,
    eventHandlers,
    eventEmitters,
}
*/
