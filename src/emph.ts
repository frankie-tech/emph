declare global {
    interface Window {
        _: _;
        emph: _;
    }
}
import _ from './core';

window.emph = window._ = _;
