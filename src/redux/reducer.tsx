import {removeStorageItem, setStorageObjectItem} from '../model/LocalStorage/storage';
import {LOGGED_IN, LOGGED_OUT} from './actionTypes';

let initialState = {
  isLoggedIn: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      const user = action.data;

      // Save token and data to the AsyncStorage
      setStorageObjectItem('user', user)
        .then(() => {
          state = Object.assign({}, state, {isLoggedIn: true, user: user});
          return state;
        })
        .catch((error) => {
          console.log(`Error: ${error}`)
          return state;
        });

    case LOGGED_OUT:
      removeStorageItem('user')
        .then(() => {
          state = Object.assign({}, state, {isLoggedIn: false, user: null});
        })
        .catch((error) => {
          return state;
        })

    default:
      return state;
  }
};

export default authReducer;
