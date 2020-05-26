import {removeStorageItem, setStorageObjectItem} from '@utils/storage';
import {LOGGED_IN, LOGGED_OUT} from '@model/actions/login/actionTypes';

let initialState = {
  isLoggedIn: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      const user = action.data;

      // Save token and data to the AsyncStorage
      setStorageObjectItem('user', user);

      state = Object.assign({}, state, {isLoggedIn: true, user: user});

      return state;

    case LOGGED_OUT:
      removeStorageItem('user');

      state = Object.assign({}, state, {isLoggedIn: false, user: null});

      return state;

    default:
      return state;
  }
};

export default authReducer;
