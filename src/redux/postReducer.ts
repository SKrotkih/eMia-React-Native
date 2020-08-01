/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {ADD_POST} from './actionTypes';
import {Post} from "../model/entities/post";

interface IPostModel {
  newPost: Post,
}

let initialState: IPostModel = {newPost: null};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      const post = action.payload;
      return Object.assign({}, state, {newPost: post});
    default:
      return state;
  }
};

export default postReducer;
