import { writable } from 'svelte/store';

export const defaultLoggedOutUserObject = { loggedIn: false };

export const currentUser = writable(defaultLoggedOutUserObject);
