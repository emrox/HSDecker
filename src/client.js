import * as sapper from '@sapper/app';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../firebase.config';

import { currentUser } from './stores/currentUser.store';

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser.set({
      user: user,
      loggedIn: true,
      email: user.email,
    })
  } else {
    currentUser.set({
      loggedIn: false,
    })
  }
});

sapper.start({
  target: document.querySelector('#sapper')
});
