/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import ImagePicker, {ImagePickerResponse} from "react-native-image-picker";

// Returns image uri
export default function takePhoto(): Promise<ImagePickerResponse> {
  const options = {
    allowsEditing: true,
    base64: true,
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
    },
  };

  return new Promise<ImagePickerResponse>((resolve, reject) => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        reject('User cancelled photo picker');
      } else if (response.error) {
        reject(`ImagePicker Error: ${response.error}`);
      } else if (response.customButton) {
        reject(`User tapped custom button: ${response.customButton}`);
      } else {
        resolve(response);
      }
    });
  })
}
