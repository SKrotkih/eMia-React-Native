import {DBStorageInteractor} from '../interfaces';
import {BASE_URL} from '../../../config/constants';
import {Platform} from 'react-native';
import {ImagePickerResponse} from 'react-native-image-picker';

export class StorageDBInteractor implements DBStorageInteractor {
  uploadImage(photo: ImagePickerResponse, id: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const url = BASE_URL + '/api/images/upload';
      fetch(url, {
        method: 'POST',
        body: this.createFormData(photo, id),
      })
        .then(response => response.json())
        .then(response => {
          console.log('upload success', response);
          resolve();
        })
        .catch(error => {
          console.log('upload error', error);
          reject(Error('Upload failed!'));
        });
    });
  }

  createFormData(photo: ImagePickerResponse, id: string) {
    const data = new FormData();
    data.append('photo', {
      name: `{id}`,
      type: photo.type,
      uri:
        Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });
    return data;
  }
}
