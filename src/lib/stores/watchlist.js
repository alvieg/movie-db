// $lib/stores/watchlist.js
import { writable } from 'svelte/store';

const initial =
	typeof localStorage !== 'undefined' ? JSON.parse(localStorage.getItem('watchlist') || '[]') : [];

export const watchlist = writable(initial);

if (typeof localStorage !== 'undefined') {
	watchlist.subscribe((value) => {
		localStorage.setItem('watchlist', JSON.stringify(value));
	});
}
