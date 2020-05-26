import {auth} from '@model/firebase/config';
import {getUser} from '@model/firebase/database/api';
import {getImageUrl} from '@model/firebase/storage/api';
import {LOGGED_IN, LOGGED_OUT} from '@model/actions/login/actionTypes';

// Sign user in with their email and password
export function login(data, callback) {
  const {email, password} = data;
  console.log('API. LOGIN email: ', email, 'password: ', password);
  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      const uid = user.user.uid;
      console.log('API. LOGIN SUCCESS. User UID=', uid);
      getUser(uid, callback);
    })
    .catch((error) => {
      console.log('API. LOGIN ERROR: ', error.message);
      callback(false, null, error);
    });
}

// Send Password Reset Email
export function resetPassword(data, callback) {
  const {email} = data;
  auth
    .sendPasswordResetEmail(email)
    .then((user) => {
      callback(true, null, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

export function signOut(callback) {
  auth
    .signOut()
    .then(() => {
      if (callback) {
        callback(true, null, null);
      }
    })
    .catch((error) => {
      if (callback) {
        callback(false, null, error);
      }
    });
}

// Register the user using email and password
export function register(data, callback) {
  const {email, password} = data;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      callback(true, user, null);
    })
    .catch((error) => {
      callback(false, null, error);
    });
}

export function checkLoginStatus(callback) {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      let isLoggedIn = user !== null;
      if (isLoggedIn) {
        dispatch({type: LOGGED_IN, data: user});
      } else {
        dispatch({type: LOGGED_OUT});
      }
      callback(isLoggedIn);
    });
  };
}

// Get current registered user from the Authentication Firebase database
export function getCurrentUser(callback) {
  console.log('API. getCurrentUser');
  auth.onAuthStateChanged((user) => {
    if (user === null) {
      callback(null);
    } else {
      let uid = user.uid;
      console.log('API. getCurrentUser: ', uid);
      getUser(uid, function (success, data, error) {
        if (success && data.exists) {
          let currentUser = data.user;
          console.log('API. GET IMAGE: ', uid);
          let avatarName = uid + '.jpg';
          getImageUrl(avatarName, function (url) {
            currentUser.avatarUrl = url;
            callback(currentUser);
          });
        } else {
          callback(null);
        }
      });
    }
  });
}
