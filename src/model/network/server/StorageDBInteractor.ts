import {DBStorageInteractor} from '../interfaces';
import {BASE_URL} from '../../../config/constants';
import {Platform} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob/index';

export class StorageDBInteractor implements DBStorageInteractor {
  async uploadImage(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const file =
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
          const imageUrl = response.secure_url;
          resolve(imageUrl);
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
      body.append('file', file);
      body.append('name', `eMia${id}`);
      request.send(body);
    });
  }

  // Upload image to the Cloudinary
  // https://dev.to/godswillokokon/react-native-how-to-upload-an-image-to-cloudinary-4okg
  // Almost works. The image appears on the Cloudinary Dashboard but i don't get its URL
  async uploadImage2(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const body = this.createBody(photo, id);
      const url = 'https://api.cloudinary.com/v1_1/emia/image/upload';
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

  createBody(photo: ImagePickerResponse, id: string): FormData {
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
    return body;
  }

  // Form Data (does not work. Don't get body on the server side)
  // https://github.com/g6ling/React-Native-Tips/tree/master/How_to_upload_photo%2Cfile_in%20react-native

  async sendImageOnServerAsFormData(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      if (!(photo && photo.uri)) {
        reject(Error('The Image is not presented so it has not uploaded on server'));
        return;
      }

      const apiUrl = BASE_URL + '/api/images/upload';

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      };

      const body = this.createFormData(photo, id);

      const options = {
        method: 'POST',
        body: body,
        headers: headers,
      };

      console.log('URL ' + apiUrl);
      console.log('options:');
      console.log(options);

      fetch(apiUrl, options)
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

  createFormData(photo: ImagePickerResponse, id: string): FormData {
    const formData: FormData = new FormData();
    const uri: string =
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '');
    const name = `eMia${id}`;
    const type = photo.type;
    formData.append('photo', {uri, name, type});
    return formData;
  }

  // BLOB (does not work. Don't get body on the server side)
  // https://github.com/joltup/rn-fetch-blob#user-content-upload-example--dropbox-files-upload-api

  async sendImageOnServerAsBlobData(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const apiUrl = BASE_URL + '/api/images/upload';
      console.log('URL ' + apiUrl);

      const blobHeaders = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      };

      const blobData = this.createBlobData(photo, id);

      RNFetchBlob.fetch('POST', apiUrl, blobHeaders, blobData)
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
