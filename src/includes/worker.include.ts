
// yyx990803/workerify - https://github.com/yyx990803/workerify/
/**
 * Workerify - when passed an anonymous function, will run said function in its own thread.
 * Now the function will not impact the performance of the main thread,
 * allowing it to focus on more important things that it is designed for,
 * like UI and interactions
 */
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
