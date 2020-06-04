//! Safe to delete
export default function (eventTarget, eventName, eventHandler, options = {}) {
    if (!eventTarget)
        return document.addEventListener(eventName, eventHandler, options);

    eventTarget.addEventListener(eventName, eventHandler, options);
}
