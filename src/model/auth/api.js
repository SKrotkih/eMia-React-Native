import { auth, database, storage, provider } from '@model/firebase';

// Register the user using email and password
export function register (data, callback) {
  const { email, password } = data;
  auth.createUserWithEmailAndPassword(email, password)
    .then((user) => callback(true, user, null))
    .catch((error) => callback(false, null, error));
}

// Create new user object in realtime database
export function createUser (user, callback) {
  database.ref('main').child('users').child(user.id).update({ ...user })
    .then(() => callback(true, null, null))
    .catch((error) => callback(false, null, {message: error}));
}

// Sign user in with their email and password
export function login (data, callback) {
  const { email, password } = data
  auth.signInWithEmailAndPassword(email, password)
    .then((user) => getUser(user, callback))
    .catch((error) => callback(false, null, error))
}

// Get user object from the realtime database
export function getUser (user, callback) {
  database.ref('main').child('users').child(user.uid).once('value')
    .then(function (snapshot) {
      const exists = (snapshot.val() !== null)
      // if the user exist in the DB, replace the user variable with the returned snapshot
      if (exists) {
        user = snapshot.val()
      }
      const data = { exists, user }
      callback(true, data, null)
    })
    .catch(error => callback(false, null, error))
}

// Get current registered user from the Authentication Firebase database
export function getCurrentUser (callback) {
  auth.onAuthStateChanged((user) => {
    if (user === null) {
      callback(null)
    } else {
    }
    getUser({uid: user.uid}, function (success, data, error) {
      if (success && data.exists) {
        var currentUser = data.user;
        var avatarName = currentUser.id+'.jpg';
        getDownloadURL(avatarName, (function (url) {
          currentUser.avatarUrl = url;
          callback(currentUser)
        }))
      } else {
        callback(null)
      }
    })
  })
}

function getDownloadURL(photoName, callback) {
  const imageRef = storage.ref(photoName);
  imageRef.getDownloadURL().then(function (url) {
    callback(url);
  }, function (error) {
    console.log(error);
    callback(null);    
  });
}

// Send Password Reset Email
export function resetPassword (data, callback) {
  const { email } = data
  auth.sendPasswordResetEmail(email)
    .then((user) => callback(true, null, null))
    .catch((error) => callback(false, null, error))
}

export function signOut (callback) {
  auth.signOut()
    .then(() => {
      if (callback) {
        callback(true, null, null)
      }
    })
    .catch((error) => {
      if (callback) {
        callback(false, null, error)
      }
    })
}
