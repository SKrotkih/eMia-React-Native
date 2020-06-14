import {auth} from '../config';
import {getUser} from '../database/users';
import {LOGGED_IN, LOGGED_OUT} from '../../dbinteractor/login/actionTypes';

// Sign user in with their email and password
export function signIn(data) {
  return new Promise((resolve, reject) => {
    const {email, password} = data;
    console.log('API. LOGIN email: ', email, 'password: ', password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((value) => {
        const uid = value.user.uid;
        resolve(uid);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Send Password Reset Email
export function resetPassword(data) {
  return new Promise((resolve, reject) => {
    const {email} = data;
    auth
      .sendPasswordResetEmail(email)
      .then((user) => {
        resolve();
      })
      .catch((error) => {
        reject(error)
      });
  });
}

export function signOut() {
  return new Promise((resolve, reject) => {
    auth
      .signOut()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error)
      });
  });
}

// Register the user using email and password
export function registerNewUser(data) {
  return new Promise((resolve, reject) => {
    const {email, password} = data;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
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
        fetchUserData(uid)
          .then((currentUser) => {
            resolve(currentUser);
          })
          .catch((error) => {
            reject(`Error while fetch user data: ${error}`);
          });
      })
      .catch((error) => {
        reject(`Could not get Auth User response. Error: ${error}`);
      });
  });
}

export function fetchUserData(uid) {
  return new Promise((resolve, reject) => {
    getUser(uid)
      .then((currentUser) => {
        if (currentUser === null) {
          reject(`User with uid=${uid} is not presented in the data base`);
        } else {
          resolve(currentUser);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
