/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import ACTIONS from './types';
import {User} from '../model/entities/user';

interface IAuthModel {
  isLoggedIn: boolean,
  user: User,
}

let initialState: IAuthModel = {
  isLoggedIn: false,
  user: null,
};

// Redux reducer for the authentication on the Firebase server

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.Types.LOGGED_IN:
      const user = action.payload;
      return Object.assign({}, state, {isLoggedIn: true, user: user});
    case ACTIONS.Types.LOGGED_OUT:
      return Object.assign({}, state, {isLoggedIn: false, user: null});
    case ACTIONS.Types.REGISTERED_NEW_USER:
      const newUser = action.payload;
      return Object.assign({}, state, {isLoggedIn: true, user: newUser});
    default:
      return state;
  }
};

export default authReducer;
