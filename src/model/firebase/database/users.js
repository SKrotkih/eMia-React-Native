import {database} from '@model/firebase/config';

// Create new user object in realtime database
export function createUser(user, callback) {
  database
    .ref('main')
    .child('users')
    .child(user.user.uid)
    .update({...user})
    .then(() => {
      callback(true, null, null);
    })
    .catch((error) => {
      callback(false, null, {message: error});
    });
}

// Get user object from the realtime database
export function getUser(uid, callback) {
  console.log('API. getUser uid=', uid);
  database
    .ref('main')
    .child('users')
    .child(uid)
    .once('value')
    .then(function (snapshot) {
      let exists = snapshot.val() != null;
      if (exists) {
        const user = snapshot.val();
        const data = {exists, user};
        callback(true, data, null);
      } else {
        callback(false, null, null);
      }
    })
    .catch((error) => {
      console.log('API. GET USER error: ', error.message);
      callback(false, null, error);
    });
}

export function fetchAllUsers(callback) {
  console.log('API. fetchAllUsers');
  database
    .ref('main')
    .child('users')
    .once('value')
    .then(function (snapshot) {
      var items = [];
      if (snapshot.val() !== null) {
        snapshot.forEach((child) => {
          items.push({
            value: child.val(),
            key: child.key,
          });
        });
      }
      const data = {items};
      callback(data, null);
    })
    .catch((error) => callback(null, error));
}
