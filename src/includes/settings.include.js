const Settings = (() => {
	function Context(instance, key, proxyTarget, proxyHandler) {
		this.target = proxyTarget || {};
		this.handler = proxyHandler || {};
		const proxy = new Proxy(this.target, this.handler);
		instance.settings[key] = proxy;
		return proxy;
	}

	Context.prototype.createHandler = function () {};

	return Context;
})();

export default Settings;
