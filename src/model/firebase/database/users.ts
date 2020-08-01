/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {database} from '../config';
import {User} from '../../entities/user';

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
        console.log('API. updateUser error: ', error.message);
        reject(error);
      });
  });
}

// Get user object from the realtime database
export function getUser(uid) {
  console.log('API. getUser uid=', uid);
  return new Promise((resolve, reject) => {
    database
      .ref('main')
      .child('users')
      .child(uid)
      .once('value')
      .then(function (snapshot) {
        let value = snapshot.val();
        if (value != null) {
          let user = new User(value.id, value.username);
          user.parse(value);
          resolve(user);
        } else {
          resolve(null);
        }
      })
      .catch((error) => {
        console.log('API. getUser error: ', error.message);
        reject();
      });
  });
}

export function fetchAllUsers() {
  console.log('API. fetchAllUsers');
  return new Promise((resolve, reject) => {
    database
      .ref('main')
      .child('users')
      .once('value')
      .then(function (snapshot) {
        let users = [];
        if (snapshot.val() !== null) {
          snapshot.forEach((child) => {
            let value = child.val();
            let user = new User(value.id, value.username);
            user.parse(value);
            users.push({
              value: user,
              key: child.key,
            });
          });
        }
        resolve(users);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
