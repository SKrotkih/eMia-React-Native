import {auth, database, storage, provider} from '@model/firebase';

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

function getImageUrl(photoName, callback) {
  console.log('API. getImageUrl');
  const imageRef = storage.ref(photoName);
  imageRef.getDownloadURL().then(
    function (url) {
      callback(url);
    },
    function (error) {
      console.log(error);
      callback(null);
    },
  );

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
