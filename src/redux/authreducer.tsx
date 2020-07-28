import {LOGGED_IN, LOGGED_OUT} from './actionTypes';

let initialState = {
  isLoggedIn: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN:
      const user = action.data;
      return Object.assign({}, state, {isLoggedIn: true, user: user});
    case LOGGED_OUT:
      return Object.assign({}, state, {isLoggedIn: false, user: null});
    default:
      return state;
  }
};

export default authReducer;
