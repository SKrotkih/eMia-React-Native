/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {Post} from "../../model/entities/post";
import store from "../store";
import ACTIONS from "../types";

export function savePost(post: Post) {
  return new Promise((resolve, reject) => {
    post
      .submitOnServer()
      .then(() => {
        store.dispatch(ACTIONS.addPost(post));
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}
