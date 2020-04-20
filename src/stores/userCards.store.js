import { writable } from 'svelte/store';
import { currentUser } from './currentUser.store';

export const userCards = writable({});

currentUser.subscribe(userStore => {
  if (!userStore.loggedIn) {
    userCards.set({});

    return;
  }

  userStore.cardCollection.get().then((doc) => {
    if (doc.exists) {
      userCards.set(doc.data());
    } else {
      userCards.set({ _initialized: true });
    }
  });
});
