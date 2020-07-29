export const LOGGED_IN = 'auth/LOGGED_IN';
export const LOGGED_OUT = 'auth/LOGGED_OUT';
export const REGISTERED_NEW_USER = 'auth/REGISTERED_NEW_USER';
export const ADD_POST = 'post/ADD_POST';

export const isAuthAction = (action) => {
  return action.type === LOGGED_IN ||
    action.type === LOGGED_OUT ||
    action.type === REGISTERED_NEW_USER;
}
