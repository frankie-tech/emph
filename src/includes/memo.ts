function m(n: Function) {
	var r = new Map(); return (i: any) => r.get(i) || r.set(i, n(i)).get(i);
}

function mc(n: Function, g = window) {
	// @ts-ignore
	g.c = g.c || new Map();
	// @ts-ignore
	g.c.set(n.name, new Map());
	// @ts-ignore
	var c = g.c.get(n.name);
	return (i: any) => c.get(i) || c.set(i, n(i)).get(i);
}

export { m, mc }
