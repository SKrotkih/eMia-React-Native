import {database} from '@model/firebase/config';
import {User} from '@model/entities/user';

// Create new user object in realtime database
export function updateUser(user) {
  return new Promise((resolve, reject) => {
    database
      .ref('main')
      .child('users')
      .child(user.id)
      .update({...user})
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
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
      if (snapshot.val() != null) {
        let value = snapshot.val();
        let user = new User(value.id, value.username);
        user.address = value.address === undefined ? '' : value.address;
        user.email = value.email === undefined ? '' : value.email;
        user.gender = value.gender === undefined ? 1 : value.gender;
        user.tokenAndroid = value.tokenAndroid === undefined ? '' : value.tokenAndroid;
        user.tokenIOS = value.tokenIOS === undefined ? '' : value.tokenIOS;
        user.yearbirth = value.yearbirth === undefined ? 0 : value.yearbirth;
        if (user.id === undefined) {
          user.id = value.uid;
        }
        callback(user);
      } else {
        callback(null);
      }
    })
    .catch((error) => {
      console.log('API. GET USER error: ', error.message);
      callback(null);
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
