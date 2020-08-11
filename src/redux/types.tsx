/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */
import {User} from "../model/entities/user";
import {Post} from "../model/entities/post";

const Types = {
  LOGGED_IN: 'auth/LOGGED_IN',
  LOGGED_OUT: 'auth/LOGGED_OUT',
  REGISTERED_NEW_USER: 'auth/REGISTERED_NEW_USER',
  ADD_POST: 'post/ADD_POST',
};

const isTypeAuthAction = (action) => {
  const actions = [Types.LOGGED_IN, Types.LOGGED_OUT, Types.REGISTERED_NEW_USER];
  return actions.indexOf(action.type) !== -1;
};

// Actions
const loggedIn = (user: User) => ({
  type: Types.LOGGED_IN,
  payload: user,
});

const loggedOut = () => ({
  type: Types.LOGGED_OUT,
});

const registeredNewUser = (user: User) => ({
  type: Types.REGISTERED_NEW_USER,
  payload: user,
});

const addPost = (post: Post) => ({
  type: Types.ADD_POST,
  payload: post,
});

export default {
  Types,
  isTypeAuthAction,
  loggedIn,
  loggedOut,
  registeredNewUser,
  addPost,
};
