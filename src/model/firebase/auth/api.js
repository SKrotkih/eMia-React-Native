import {auth} from '@model/firebase/config';
import {getUser} from '@model/firebase/database/users';
import {getDownloadURL} from '@model/firebase/storage/api';
import {LOGGED_IN, LOGGED_OUT} from '@model/actions/login/actionTypes';

// Sign user in with their email and password
export function signIn(data, callback) {
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

export function getUserAsync() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user === null) {
        reject('The User has not signed in yet');
      } else {
        resolve(user);
      }
    });
  });
}

export function checkLoginStatus(callback) {
  return (dispatch) => {
    getUserAsync()
      .then((user) => {
        dispatch({type: LOGGED_IN, data: user});
        callback(true);
      })
      .catch((error) => {
        dispatch({type: LOGGED_OUT});
        callback(false);
      });
  };
}

// Get current registered user from the Authentication Firebase database
export function getCurrentUserAsync() {
  console.log('API. getCurrentUserAsync');
  return new Promise((resolve, reject) => {
    getUserAsync()
      .then((user) => {
        let uid = user.uid;
        getUser(uid, function (success, data, error) {
          if (success && data.exists) {
            let currentUser = data.user;
            console.log('API. GET IMAGE: ', uid);
            let avatarName = uid + '.jpg';
            getDownloadURL(avatarName, (url) => {
              currentUser.avatarUrl = url;
              resolve(currentUser);
            });
          } else {
            reject('Could not get User response');
          }
        });
      })
      .catch((error) => {
        reject(`Could not get Auth User response. Error: ${error}`);
      });
  });
}
