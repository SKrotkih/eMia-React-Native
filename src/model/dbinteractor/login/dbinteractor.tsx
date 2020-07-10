import {
  signIn,
  signOut,
  registerNewUser,
  resetPassword,
  fetchUserData,
} from '../../firebase/auth/api';

export function login(data, successCB, errorCB) {
  signIn(data)
    .then((uid) => {
      console.log('LOGIN SUCCESS. User UID=', uid);
      fetchUserData(uid)
        .then((currentUser) => {
          successCB(uid, currentUser);
        })
        .catch((error) => {
          console.error(error);
          successCB(uid, null);
        });
    })
    .catch((error) => {
      console.log('LOGIN ERROR: ', error);
      errorCB(error);
    });
}

export function register(data, successCB, errorCB) {
  registerNewUser(data)
    .then((user) => {
      successCB(user);
    })
    .catch((error) => {
      errorCB(error);
    });
}

export function logOut(successCB, errorCB) {
  signOut()
    .then(() => {
      successCB();
    })
    .catch((error) => {
      errorCB(error);
    });
}

export function remindPassword(data, successCB, errorCB) {
  resetPassword(data)
    .then(() => {
      successCB();
    })
    .catch((error) => {
      errorCB(error);
    });
}
