import ImagePicker from "react-native-image-picker";

export default function takePhoto(): Promise<string> {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
    },
  };
  return new Promise<string>((resolve, reject) => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        reject('User cancelled photo picker');
      } else if (response.error) {
        reject(`ImagePicker Error: ${response.error}`);
      } else if (response.customButton) {
        reject(`User tapped custom button: ${response.customButton}`);
      } else {
        resolve(response.uri);
      }
    });
  })
}
