//! Safe to delete
/**
 * Run event when specific load event runs
 * @param {EventListener} func - callback function
 * @param {boolean} win - should the event be attatched to the window
 */
export default function (func, win) {
    !win
        ? document.addEventListener('DOMContentLoaded', func, {
            capture: true,
            once: true,
        })
        : window.addEventListener('load', func, {
            capture: true,
            once: true,
        });
}
