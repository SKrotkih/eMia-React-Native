/**
 * Sample React Native App
 * https://github.com/SKrotkih/eMia-React-Native
 *
 * @format
 * @flow
 */

import {combineReducers} from 'redux';

import {reducer as authReducer} from '../screens/Auth';
import {reducer as homeReducer} from '../screens/Home';

function lastAction(state = null, action) {
  return action;
}

// Combine all the reducers
const rootReducer = combineReducers({auth: authReducer, home: homeReducer, lastAction});

export default rootReducer;
