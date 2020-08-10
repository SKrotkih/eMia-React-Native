/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import * as firebase from 'firebase';
import * as firebaseConstants from '../../../config/GoogleService-Info';

// Initialize Firebase
const config = {
  apiKey: firebaseConstants.FIREBASE_API_KEY,
  authDomain: firebaseConstants.FIREBASE_AUTH_DOMAIN,
  databaseURL: firebaseConstants.FIREBASE_DATABASE_URL,
  projectId: firebaseConstants.FIREBASE_PROJECT_ID,
  storageBucket: firebaseConstants.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: firebaseConstants.FIREBASE_MESSAGING_SENDER_ID,
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const provider = new firebase.auth.FacebookAuthProvider();
