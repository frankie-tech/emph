import _ from './core';
declare global {
    interface Window {
        _: _;
        emph: _;
        requestIdleCallback: ((callback: ((deadline: requestIdleCallbackDeadline) => void), opts?: RequestIdleCallbackOptions, ) => RequestIdleCallbackHandle);
        cancelIdleCallback: ((handle: RequestIdleCallbackHandle) => void);
    }
}

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
    timeout: number;
};

type requestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: (() => number);
};

export default global;
