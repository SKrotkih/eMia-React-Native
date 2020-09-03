/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */
import {ImagePickerResponse} from "react-native-image-picker";

export interface DBStorageInteractor {
  uploadImage(photo: ImagePickerResponse, id: string): Promise<string>;
}
