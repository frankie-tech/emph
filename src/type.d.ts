import _ from './core';
declare global {
    interface Window {
        _: _;
        emph: _;
    }
}

export default global;
