/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

export const LOGGED_IN = 'auth/LOGGED_IN';
export const LOGGED_OUT = 'auth/LOGGED_OUT';
export const REGISTERED_NEW_USER = 'auth/REGISTERED_NEW_USER';
export const ADD_POST = 'post/ADD_POST';

export const isAuthAction = (action) => {
  const actions = [LOGGED_IN, LOGGED_OUT, REGISTERED_NEW_USER];
  return actions.indexOf(action.type) !== -1;
};
