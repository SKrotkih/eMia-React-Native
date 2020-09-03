import {DBStorageInteractor} from '../interfaces/DBStorageInteractor';
import {BASE_URL} from '../../../config/constants';
import {Platform} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob/index';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';

export class StorageDBInteractor implements DBStorageInteractor {
  async uploadImage(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      if (!photo) {
        reject(Error('Photo is not presented'));
        return;
      }
      this.getBody(photo, id)
        .then((body) => {
          const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          };
          const options = {
            method: 'POST',
            body: body,
            headers: headers,
          };
          fetch(`${BASE_URL()}/api/images/upload`, options)
            .then((response) => response.json())
            .then((response) => {
              const secureUrl = response.secure_url;
              console.log('Uploaded successfully. Url=', secureUrl);
              resolve(secureUrl);
            })
            .catch((error) => {
              const message = `Failed uploading. Error=${error}`;
              console.log(message);
              reject(Error(message));
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getBody(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (photo.fileSize < 100000) {
        resolve(
          JSON.stringify({
            img: photo.data,
            name: `eMia${id}.${this.getFileExtension(photo.uri)}`,
          })
        );
      } else {
        ImageResizer.createResizedImage(photo.uri, 400, 400, 'JPEG', 80)
          .then(({uri}) => {
            RNFS.readFile(uri, 'base64')
              .then((data) => {
                resolve(
                  JSON.stringify({
                    img: data,
                    name: `eMia${id}.${this.getFileExtension(photo.uri)}`,
                  })
                );
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      }
    });
  }

  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  // Some different ways which were used to try upload image on Cloudinary direction and on the app server
  async uploadImage2(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const fileUri: string =
       Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '');
      const cloudName = 'emia';
      const unsignedUploadPreset = 'emiaapppreset';
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const request = new XMLHttpRequest();
      const body = new FormData();
      request.open('POST', url, true);
      request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      request.onreadystatechange = (event) => {
        if (request.readyState === 4 && request.status === 200) {
          // File uploaded successfully
          const response = JSON.parse(request.responseText);
          // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
          const url = response.secure_url;
          if (url) {
            resolve(url);
          } else {
            reject(Error('Image Url is not defined'));
          }
        } else {
          try {
            const response = JSON.parse(request.responseText);
            const message = `Status ${request.status}: ${response.error.message}`;
            console.log(message);
            reject(Error(message));
          } catch (error) {
            console.log(error);
          }
        }
      };
      body.append('upload_preset', unsignedUploadPreset);
      body.append('tags', 'eMia_react_native_upload'); // Optional - add tag for image admin in Cloudinary
      body.append('file', fileUri);
      body.append('name', `eMia${id}`);
      request.send(body);
    });
  }

  // Upload image to the Cloudinary
  // https://dev.to/godswillokokon/react-native-how-to-upload-an-image-to-cloudinary-4okg
  // Almost works. The image appears on the Cloudinary Dashboard but i don't get its URL
  async uploadImage3(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const uploadPreset = 'emiaapppreset';
      const cloudName = 'emia';

      const body = new FormData();
      const uri: string =
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '');
      const type = photo.type;
      const name = `eMia${id}.jpeg`;
      const file = {uri, type, name};
      body.append('file', file);
      body.append('upload_preset', uploadPreset);
      body.append('cloud_name', cloudName);
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      fetch(url, {method: 'POST', body})
        .then((res) => {
          // I don't have Body here so i don't have the image url :(
          console.log(res);
          res.json();
        })
        .then((json) => {
          console.log(json);
          const url = json.secure_url;
          console.log(url);
          resolve(url);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  // BLOB (does not work. Don't get body on the server side)
  // https://github.com/joltup/rn-fetch-blob#user-content-upload-example--dropbox-files-upload-api
  async sendImageOnServerAsBlobData(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const url = BASE_URL() + '/api/images/upload';
      console.log('URL ' + url);

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      };

      const body = this.createBlobData(photo, id);

      RNFetchBlob.fetch('POST', url, null, body)
        .then((response) => response.json())
        .then((response) => {
          console.log('upload success', response);
          resolve('');
        })
        .catch((error) => {
          console.log('upload error', error);
          reject(Error('Upload failed!'));
        });
    });
  }

  createBlobData(photo: ImagePickerResponse, id: string): Array<any> {
    const uri: string =
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '');
    return [
      {
        name: `eMia${id}`,
        filename: `eMia${id}.jpg`,
        type: 'image/jpg',
        data: RNFetchBlob.wrap(uri),
      },
    ];
  }
}
