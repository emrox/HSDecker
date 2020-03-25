import { writable } from 'svelte/store';

export const currentUser = writable({ status: 'out' });
