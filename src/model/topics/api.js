import { database, storage } from '@model/firebase'
import * as usersActions from '@model/auth/actions'

export function fetchAllUsers (callback) {
  database.ref('main').child('users').once('value')
    .then(function (snapshot) {
      var items = []
      if (snapshot.val() !== null) {
        snapshot.forEach((child) => {
          items.push({
            value: child.val(),
            key: child.key
          })
        })
      }
      const data = { items }
      callback(data, null)
    })
    .catch(error => callback(null, error))
}

export function fetchAllPosts (callback) {
  database.ref('main').child('posts').once('value')
    .then(function (snapshot) {
      var items = []
      parsePosts(snapshot, items)
      putUrlsPhoto(items, callback)
    })
    .catch(error => callback(null, error))
}

function parsePosts (snapshot, items) {
  if (snapshot.val() !== null) {
    snapshot.forEach((child) => {
      items.push({
        value: child.val(),
        url: '',
        avatarUrl: '',
        author: null,
        key: child.key
      })
    })
  }
}

function putUrlsPhoto (items, completion) {
  var counter = items.length
  if (counter > 0) {
    items.forEach((item) => {
      var photoName = item.value.id + '.jpg'      
      getDownloadURL(photoName, (function (url) {
        item.url = url
        var avatarName = item.value.uid + '.jpg'      
        getDownloadURL(avatarName, (function (url) {
          item.avatarUrl = url
          usersActions.getUser(item.value.uid, (function (user) {
            item.author = user
            counter -= 1
            if (counter === 0) {
              const data = { items }
              completion(data, null)
            } 
          }))
        }))  
      }))
    })
  } else {
    const data = { items }
    completion(data, null)
  }
}

function getDownloadURL (photoName, callback) {
  const imageRef = storage.ref(photoName)

  imageRef.getDownloadURL().then(function (url) {
    callback(url)
  }, function (error) {
    console.log(error)
  })
}
