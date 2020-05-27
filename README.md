### Emph

Total size:
| Type | UMD | Modern |
|------------|--------|--------|
| Unminified | 2.93kb | 2.56kb |
| Minified | 1.82kb | 1.66kb |
| GZip | 855b | 832b |
| Brotli | 719b | 705b |

Collection of snippets that are useful in day to day development.
Uses a design pattern similar to jQuery to get assign both to `Emph` and `_`.

Avoid using libraries that also use `_`, and there is not a 'noConflict' mode built into Emph, yet.

#### MediaWrapper

**Events**
MediaWrapper emits two events
_Match_ and _MisMatch_

Initialize MediaWrapper like so

```js
_.media();

// you can also add your own queries object if you want
_.media({
	desktop: '(min-width: 1440px)',
});
```

Then MediaWrapper will automatically add a MediaQueryListener that emits one of those a CustomEvent

```js
// using the custom query object above
const detail = {
	breakpoint: 'desktop',
	mediaQuery: `object`, // MediaQueryList object
	mediaQueryObject: mediaQueryMap, // a Map of all the MediaQueryLists passed to MediaWrapper
};
```
