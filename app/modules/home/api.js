import { database } from '../../config/firebase';

export function fetchAllUsers (callback) {
  database.ref('main').child('users').once('value')
    .then(function (snapshot) {
      var items = [];
      if (snapshot.val() !== null) {
        snapshot.forEach((child) => {
          items.push({
            value: child.val(),
            key: child.key
          });
        });
      }
      const data = { items };
      callback(data, null);
    })
    .catch(error => callback(null, error));
}
