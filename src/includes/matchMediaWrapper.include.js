import { dispatch, err } from './message.include';
import type from './type.include';
/*
{
    key // "desktop" // : query
}
*/

function getSettings(queries) {
	const settingsObject = queries || {
		XLDesktop: '(min-width: 1200px)',
		Desktop: '(min-width: 992px)',
		Laptop: '(min-width: 768px)',
		Tablet: '(min-width: 576px)',
	};

	const mediaQueries = makeMediaQueries(settingsObject);
	return new Map(mediaQueries);
}

function makeMediaQueries(object) {
	const entries = Object.entries(object);
	for (let [key] in entries) {
		entries[key][1] = window.matchMedia(entries[key][1]);
	}
	return entries;
}

function assignMediaQueryEventListeners(mediaQuery, eventName, mapObject) {
	if (type(mediaQuery) !== 'mediaquerylist')
		// prettier-ignore
		return err('MatchMedia - MediaQueryList was not found in Breakpoints object');
	const detail = {
		breakpoint: eventName,
		mediaQuery,
		mediaQueryObject: mapObject,
	};
	mediaQuery.addListener(
		// prettier-ignore
		(mq) => mq.matches
            ? dispatch(`Media::Match`, detail)
            : dispatch(`Media::MisMatch`, detail)
	);
}

export default function (queries) {
	const breakpoints = getSettings(queries);
	breakpoints.forEach(assignMediaQueryEventListeners);
}
