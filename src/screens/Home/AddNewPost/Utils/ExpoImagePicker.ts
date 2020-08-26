import * as ImagePicker from 'expo-image-picker';

export async function takePhoto() {

  let image = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [3, 3],
    quality: 1,
    base64: true,
  })

  return image;
}

