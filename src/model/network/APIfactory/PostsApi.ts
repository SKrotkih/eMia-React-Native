/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {PostsDBInteractor as FirebasePostsDBInteractor} from "../firebase/PostsDBInteractor";
import {PostsDBInteractor as ServerPostsDBInteractor} from "../server/PostsDBInteractor";
import {DBPostsInteractor} from "../interfaces/DBPostsInteractor";
import {BackendTypeState, TypeBackend} from "../backend.dispatch.hook";

const firebasePostsInteractor = new FirebasePostsDBInteractor();
const serverPostsInteractor = new ServerPostsDBInteractor();

export default function PostsApi(): Promise<DBPostsInteractor> {
  return new Promise<DBPostsInteractor>((resolve, reject) => {
    BackendTypeState.getBackend().then((backend) => {
      switch (backend) {
        case TypeBackend.Nodejs:
          resolve(serverPostsInteractor);
          break;
        case TypeBackend.Firebase:
          resolve(firebasePostsInteractor);
          break;
      }
    });
  });
}
