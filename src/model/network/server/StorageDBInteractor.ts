import {DBStorageInteractor} from '../interfaces';
import {BASE_URL} from '../../../config/constants';
import {Platform} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob/index';

export class StorageDBInteractor implements DBStorageInteractor {
  // Upload image to the Cloudinary
  async uploadImage(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const body = this.createFormData(photo, id);
      const url = 'https://api.cloudinary.com/v1_1/emia/image/upload';
      fetch(url, {method: 'POST', body})
        .then((res) => {
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

  createFormData(photo: ImagePickerResponse, id: string): FormData {
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

  // Upload to the app server
  // Form Data

  async uploadImage3(photo: ImagePickerResponse, id: string): Promise<string> {
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

  createFormData3(photo: ImagePickerResponse, id: string): FormData {
    const formData: FormData = new FormData();
    const uri: string =
      Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', '');
    const name = `eMia${id}`;
    const type = photo.type;
    formData.append('photo', {uri, name, type});
    return formData;
  }

  // BLOB
  // https://github.com/joltup/rn-fetch-blob#user-content-upload-example--dropbox-files-upload-api

  async uploadImage2(photo: ImagePickerResponse, id: string): Promise<string> {
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
