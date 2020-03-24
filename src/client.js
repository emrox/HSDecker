import * as sapper from '@sapper/app';

import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import { firebaseConfig } from '../firebase.config';

firebase.initializeApp(firebaseConfig);

sapper.start({
  target: document.querySelector('#sapper')
});
