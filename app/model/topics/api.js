import { database, storage } from '../firebase';

// import RNFetchBlob from 'react-native-fetch-blob';
// var ImagePicker = require('react-native-image-picker');

// // Prepare Blob support
// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

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

export function fetchAllPosts (callback) {
  database.ref('main').child('posts').once('value')
    .then(function (snapshot) {
      var items = [];
      parsePosts(snapshot, items);
      putUrlsPhoto(items, callback);
    })
    .catch(error => callback(null, error));
}

function parsePosts(snapshot, items) {
  if (snapshot.val() !== null) {
    snapshot.forEach((child) => {
      items.push({
        value: child.val(),
        url: '',
        avatarUrl: '',        
        key: child.key
      });
    });
  }
}

function putUrlsPhoto(items, completion) {
  var counter = items.length;
  if (counter > 0) {
    items.forEach((item) => {
      var photoName = item.value.id+'.jpg';      
      getDownloadURL(photoName, (function(url) {
        item.url = url;
        var avatarName = item.value.uid+'.jpg';      
        getDownloadURL(avatarName, (function(url) {
          item.avatarUrl = url;
          counter -= 1;
          if (counter === 0) {
            const data = { items };
            completion(data, null);
          } 
        }));  
      }));
    });
  } else {
    const data = { items };
    completion(data, null);
  }
}

function getDownloadURL(photoName, callback) {
  const imageRef = storage.ref(photoName);

  imageRef.getDownloadURL().then(function(url) {
    callback(url);
  }, function(error) {
    console.log(error);
  });
}

// Upload image
export function uploadImage(uri, mime = 'application/octet-stream') {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;

    const imageRef = FirebaseClient.storage().ref('images').child('image_001');

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, { contentType: mime });
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
    });
  });
}

export function getImage(){

  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      // let source = { uri: response.uri };
      // this.setState({image_uri: response.uri})

      // You can also display the image using data:
      // let image_uri = { uri: 'data:image/jpeg;base64,' + response.data };

    this.uploadImage(response.uri)
      .then(url => { alert('uploaded'); this.setState({image_uri: url}); })
      .catch(error => console.log(error));

    }
  });

  // export default class App extends Component {
  //   constructor(){
  //     super()
  //     this.getImage = this.getImage.bind(this)
  //     this.state = {
  //       image_uri: 'https://avatars0.githubusercontent.com/u/12028011?v=3&s=200'
  //     }
  //   }

//  <Image
//    style={{width: 100, height: 100}}
//    source={{uri: this.state.image_uri}}
//  />


}
