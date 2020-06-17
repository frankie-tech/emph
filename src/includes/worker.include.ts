
// yyx990803/workerify - https://github.com/yyx990803/workerify/
/**
 * Workerify - when passed an anonymous function, will run said function in its own thread.
 * Now the function will not impact the performance of the main thread,
 * allowing it to focus on more important things that it is designed for,
 * like UI and interactions
 */
/*
function tostring(func: Function): string {
    return func.toString().match(/^function[^{]*{((.|\n)*)}$/)[1];
}
function toblob(str: string): Blob {
    return new Blob([str], { type: 'application/javascript' });
}
function tourl(blob: Blob): string {
    return window.URL.createObjectURL(blob);
}
export default function (func: Function, options: {}): Worker {
    const str = tostring(func);
    const blob = toblob(str);
    const url = tourl(blob)
    return new Worker(url, options);
}

*/

export default class EmphWorker {
    constructor(func: Function) {
        const workerUrl = this.generate(func);
        new Worker(workerUrl);
    }
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
    generate(func: Function) {
        const pipeFunctions = [this.tostring, this.toblob, this.tourl];
        return this.pipeThrough(...pipeFunctions)(func);
    }
}
