import {DBStorageInteractor} from "../interfaces";

export class StorageDBInteractor implements DBStorageInteractor {

  uploadImage(uri, id): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      reject();
    });
  }
}
